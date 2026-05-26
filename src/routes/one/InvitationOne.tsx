import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { CONTENT } from "../../constants/content";
import { useCountdown } from "../../hooks/useCountdown";
import { useGuestGender, useGuestName } from "../../hooks/useGuestName";
import "./invitation-one.css";

gsap.registerPlugin(ScrollTrigger);

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function isReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function createStarLine(radius: number) {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2;
    const r = i % 2 === 0 ? radius : radius * 0.46;
    points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0));
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function useCelestialScene(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = isReducedMotion();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !reducedMotion,
      canvas,
      powerPreference: "high-performance",
    });

    camera.position.set(0, 0, 9);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const garden = new THREE.Group();
    scene.add(garden);

    const starCount = reducedMotion ? 220 : 760;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i += 1) {
      const radius = 2 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[i * 3 + 2] = -10 + Math.random() * 12;
      color.setHSL(
        Math.random() > 0.62 ? 0.12 : 0.43,
        0.54,
        0.5 + Math.random() * 0.28,
      );
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    garden.add(stars);

    const motifMaterial = new THREE.LineBasicMaterial({
      color: 0xe8d48b,
      transparent: true,
      opacity: 0.26,
    });
    const motifGeometries: THREE.BufferGeometry[] = [];
    const motifs: THREE.LineLoop[] = [];

    for (let i = 0; i < 9; i += 1) {
      const geometry = createStarLine(0.9 + i * 0.12);
      motifGeometries.push(geometry);
      const motif = new THREE.LineLoop(geometry, motifMaterial);
      const angle = (i / 9) * Math.PI * 2;
      motif.position.set(
        Math.cos(angle) * (2.2 + i * 0.34),
        Math.sin(angle) * (1.45 + i * 0.18),
        -2.8 - i * 0.22,
      );
      motif.rotation.z = i * 0.34;
      motif.scale.setScalar(0.7 + (i % 3) * 0.28);
      motifs.push(motif);
      garden.add(motif);
    }

    const pointer = new THREE.Vector2(0, 0);
    let scrollProgress = 0;
    let animationFrame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const updateScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = window.scrollY / maxScroll;
    };

    const updatePointer = (event: PointerEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      stars.rotation.y = elapsed * 0.015 + scrollProgress * 0.24;
      stars.rotation.z = elapsed * 0.006;
      garden.rotation.x = pointer.y * 0.05 + scrollProgress * 0.14;
      garden.rotation.y = pointer.x * 0.05 - scrollProgress * 0.16;
      camera.position.z = 9 - scrollProgress * 1.6;

      motifs.forEach((motif, index) => {
        motif.rotation.z += 0.0015 + index * 0.00025;
      });

      renderer.render(scene, camera);
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    updateScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.cancelAnimationFrame(animationFrame);
      starGeometry.dispose();
      starMaterial.dispose();
      motifGeometries.forEach((geometry) => geometry.dispose());
      motifMaterial.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);
}

export default function InvitationOne() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement | null>(null);
  const guestName = useGuestName();
  const guestGender = useGuestGender();
  const countdown = useCountdown();
  const greeting = guestName
    ? `بدعوة ${CONTENT.greetingPersonal(guestName, guestGender)}`
    : "بدعوتكم مكرمين";

  useCelestialScene(canvasRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-one-hero]", {
        autoAlpha: 0,
        y: 34,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.utils
        .toArray<HTMLElement>("[data-one-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 54, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
              },
            },
          );
        });
    }, root);

    return () => context.revert();
  }, []);

  const countdownItems = [
    [CONTENT.countdownDays, countdown.days],
    [CONTENT.countdownHours, countdown.hours],
    [CONTENT.countdownMinutes, countdown.minutes],
    [CONTENT.countdownSeconds, countdown.seconds],
  ] as const;

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({
      behavior: isReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <main className="oneInvitation" dir="rtl" ref={rootRef}>
      <canvas className="oneInvitation__canvas" ref={canvasRef} />

      <section
        className="oneInvitation__section oneInvitation__hero"
        aria-label="دعوة الزفاف"
      >
        <p className="oneInvitation__bismillah" data-one-hero>
          {CONTENT.bismillah}
          <div className="oneInvitation__introText" data-one-hero>
            <p>بكل ما تحمله مشاعرنا من حــب ولأن فرحتنا تكتمل بمن نحــب</p>
            <strong>يتشــرف</strong>
          </div>
        </p>

        <h1 className="oneInvitation__names" data-one-hero>
          <span>{CONTENT.groomName}</span>
          <small>{CONTENT.andWord}</small>
          <span>{CONTENT.brideName}</span>
        </h1>
        <div className="oneInvitation__invitationLine" data-one-hero>
          <p className="oneInvitation__kicker">{greeting}</p>
          <span>لحضور حفل زفافهما، سائلين الله أن يكون زواجاً مباركاً.</span>
        </div>
        <button
          className="oneInvitation__hint"
          type="button"
          onClick={scrollToCards}
          data-one-hero
        >
          {CONTENT.scrollHint}
        </button>
      </section>

      <section
        className="oneInvitation__cards"
        aria-label="تفاصيل الدعوة"
        ref={cardsRef}
      >
        <article
          className="oneInvitation__panel oneInvitation__verse"
          data-one-reveal
        >
          <p>{CONTENT.quranVerse}</p>
          <span>{CONTENT.quranReference}</span>
          <p className="oneInvitation__hadith">{CONTENT.propheticHadith}</p>
        </article>

        <article
          className="oneInvitation__panel oneInvitation__countdownCard"
          data-one-reveal
          aria-label="العد التنازلي"
        >
          {countdown.isExpired ? (
            <p className="oneInvitation__expired">{CONTENT.countdownExpired}</p>
          ) : (
            <div className="oneInvitation__countdown">
              {countdownItems.map(([label, value]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article
          className="oneInvitation__panel oneInvitation__details"
          data-one-reveal
          aria-label="تفاصيل الحفل"
        >
          <div className="oneInvitation__detailItem">
            <span>{CONTENT.dateLabel}</span>
            <strong>{CONTENT.dateValue}</strong>
          </div>
          <div className="oneInvitation__detailItem">
            <span>{CONTENT.timeLabel}</span>
            <strong>{CONTENT.timeValue}</strong>
          </div>
          <div className="oneInvitation__detailItem oneInvitation__detailItem--location">
            <span>{CONTENT.locationLabel}</span>
            <strong>{CONTENT.locationValue}</strong>
            <a
              className="oneInvitation__mapButton"
              href={CONTENT.locationMapUrl}
              target="_blank"
              rel="noreferrer"
            >
              فتح الموقع في خرائط Google
            </a>
          </div>
        </article>

        <article
          className="oneInvitation__panel oneInvitation__instructions"
          data-one-reveal
          aria-label="تنبيهات الحفل"
        >
          <h2>{CONTENT.instructionsTitle}</h2>
          <p>{CONTENT.noMusic}</p>
          <p>{CONTENT.noPhotography}</p>
        </article>

        <article
          className="oneInvitation__panel oneInvitation__closing"
          data-one-reveal
          aria-label="دعاء الختام"
        >
          <p>{CONTENT.closingPrayer}</p>
          <span>{CONTENT.closingWish}</span>
        </article>
      </section>
    </main>
  );
}
