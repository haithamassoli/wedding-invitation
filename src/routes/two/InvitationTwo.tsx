import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { CONTENT } from "../../constants/content";
import { useCountdown } from "../../hooks/useCountdown";
import { useGuestName } from "../../hooks/useGuestName";
import styles from "./InvitationTwo.module.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function GoldOrnament() {
  return (
    <svg
      className={styles.ornament}
      viewBox="0 0 260 78"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M130 8c-19 24-43 35-72 31 22 17 46 15 72-2 26 17 50 19 72 2-29 4-53-7-72-31Z" />
      <path d="M21 54c29-28 65-31 109-9 44-22 80-19 109 9" />
      <path d="M72 31c-19-12-37-10-53 6 17 4 31 1 42-10" />
      <path d="M188 31c19-12 37-10 53 6-17 4-31 1-42-10" />
      <path d="M111 48c7 16 31 16 38 0" />
    </svg>
  );
}

function useInvitationScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(reducedMotionQuery).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.35, 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !reduceMotion,
      canvas,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));

    const group = new THREE.Group();
    scene.add(group);

    const cardMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f6d887"),
      metalness: 0.42,
      roughness: 0.38,
      side: THREE.DoubleSide,
    });
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#b37b22"),
      metalness: 0.82,
      roughness: 0.24,
      side: THREE.DoubleSide,
    });
    const leftGeometry = new THREE.PlaneGeometry(1.75, 3.1, 12, 12);
    const rightGeometry = new THREE.PlaneGeometry(1.75, 3.1, 12, 12);
    const left = new THREE.Mesh(leftGeometry, cardMaterial);
    const right = new THREE.Mesh(rightGeometry, cardMaterial.clone());
    left.position.x = -0.88;
    right.position.x = 0.88;
    group.add(left, right);

    const ringGeometry = new THREE.TorusGeometry(1.95, 0.035, 12, 96);
    const ring = new THREE.Mesh(ringGeometry, edgeMaterial);
    ring.scale.y = 0.78;
    ring.position.z = -0.035;
    group.add(ring);

    const sealGeometry = new THREE.CylinderGeometry(0.34, 0.34, 0.08, 48);
    const seal = new THREE.Mesh(sealGeometry, edgeMaterial.clone());
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0, -0.16, 0.08);
    group.add(seal);

    const light = new THREE.DirectionalLight("#fff0bf", 3.2);
    light.position.set(2.4, 3.2, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight("#d6a741", 1.1));

    let raf = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = Math.sin(elapsed * 0.35) * 0.08;
      group.rotation.x = Math.sin(elapsed * 0.24) * 0.04;
      left.rotation.y = -0.55 - Math.sin(elapsed * 0.45) * 0.04;
      right.rotation.y = 0.55 + Math.sin(elapsed * 0.45) * 0.04;
      seal.rotation.z = elapsed * 0.18;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };

    resize();
    if (reduceMotion) {
      left.rotation.y = -0.48;
      right.rotation.y = 0.48;
      renderer.render(scene, camera);
    } else {
      render();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
      leftGeometry.dispose();
      rightGeometry.dispose();
      ringGeometry.dispose();
      sealGeometry.dispose();
      cardMaterial.dispose();
      edgeMaterial.dispose();
      if (right.material instanceof THREE.Material) right.material.dispose();
      if (seal.material instanceof THREE.Material) seal.material.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);
}

export default function InvitationTwo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const guestName = useGuestName();
  const countdown = useCountdown();
  const greeting = guestName
    ? CONTENT.greetingPersonal(guestName)
    : CONTENT.greetingGeneral;

  useInvitationScene(canvasRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(reducedMotionQuery).matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-piece]", {
        autoAlpha: 0,
        y: 28,
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.12,
      });

      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.18 },
      );

      panels.forEach((panel) => {
        gsap.set(panel, { autoAlpha: 0, y: 34 });
        observer.observe(panel);
      });

      return () => observer.disconnect();
    }, root);

    return () => ctx.revert();
  }, []);

  const timeItems = [
    [CONTENT.countdownDays, countdown.days],
    [CONTENT.countdownHours, countdown.hours],
    [CONTENT.countdownMinutes, countdown.minutes],
    [CONTENT.countdownSeconds, countdown.seconds],
  ] as const;

  return (
    <div ref={rootRef} className={styles.shell} dir="rtl">
      <section className={styles.hero} aria-label="دعوة الزفاف الذهبية">
        <canvas ref={canvasRef} className={styles.scene} aria-hidden="true" />
        <div className={styles.veil} />
        <div className={styles.scrollCard}>
          <div data-hero-piece>
            <GoldOrnament />
          </div>
          <p className={styles.bismillah} data-hero-piece>
            {CONTENT.bismillah}
          </p>
          <p className={styles.eyebrow} data-hero-piece>
            {CONTENT.weddingInvitation}
          </p>
          <h1 className={styles.names} data-hero-piece>
            <span>{CONTENT.groomName}</span>
            <span className={styles.andWord}>{CONTENT.andWord}</span>
            <span>{CONTENT.brideName}</span>
          </h1>
          <p className={styles.guest} data-hero-piece>
            {greeting}
          </p>
          <p className={styles.hint} data-hero-piece>
            {CONTENT.scrollHint}
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.panel} data-panel>
          <GoldOrnament />
          <p className={styles.verse}>{CONTENT.quranVerse}</p>
          <p className={styles.hadith}>{CONTENT.propheticHadith}</p>
          <p className={styles.reference}>{CONTENT.quranReference}</p>
        </section>

        <section className={styles.panel} data-panel aria-label="تفاصيل الموعد">
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>{CONTENT.dateLabel}</span>
              <span className={styles.value}>{CONTENT.dateValue}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>{CONTENT.timeLabel}</span>
              <span className={styles.value}>{CONTENT.timeValue}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>{CONTENT.locationLabel}</span>
              <span className={styles.value}>{CONTENT.locationValue}</span>
              <a className={styles.mapLink} href={CONTENT.locationMapUrl}>
                عرض الموقع
              </a>
            </div>
          </div>
        </section>

        <section className={styles.panel} data-panel aria-label="العد التنازلي">
          {countdown.isExpired ? (
            <p className={styles.expired}>{CONTENT.countdownExpired}</p>
          ) : (
            <div className={styles.countdown}>
              {timeItems.map(([label, value]) => (
                <div className={styles.countItem} key={label}>
                  <span className={styles.countNumber}>{value}</span>
                  <span className={styles.countLabel}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.panel} data-panel>
          <h2 className={styles.instructionsTitle}>{CONTENT.instructionsTitle}</h2>
          <ul className={styles.instructions}>
            <li>{CONTENT.noMusic}</li>
            <li>{CONTENT.noPhotography}</li>
          </ul>
        </section>

        <section className={styles.panel} data-panel>
          <p className={styles.closing}>{CONTENT.closingPrayer}</p>
          <p className={styles.wish}>{CONTENT.closingWish}</p>
        </section>
      </main>
    </div>
  );
}
