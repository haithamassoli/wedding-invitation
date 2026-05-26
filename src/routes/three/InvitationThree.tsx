import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { CONTENT } from "../../constants/content";
import { useCountdown } from "../../hooks/useCountdown";
import { useGuestGender, useGuestName } from "../../hooks/useGuestName";
import "./invitation-three.css";

gsap.registerPlugin(ScrollTrigger);

function createEightPointShape() {
  const shape = new THREE.Shape();
  const points = 16;

  for (let i = 0; i <= points; i += 1) {
    const angle = (i / points) * Math.PI * 2 + Math.PI / 8;
    const radius = i % 2 === 0 ? 0.42 : 0.18;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  return shape;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function InvitationThree() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const guestName = useGuestName();
  const guestGender = useGuestGender();
  const countdown = useCountdown();
  const greeting = guestName
    ? CONTENT.greetingPersonal(guestName, guestGender)
    : CONTENT.greetingGeneral;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".threeInvitation__card",
        { autoAlpha: 0, y: 48, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        ".threeInvitation__heroSeal",
        { rotate: -18, scale: 0.82 },
        {
          rotate: 0,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "35% top",
            scrub: 0.8,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = prefersReducedMotion();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070d, 0.055);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.3, 13);

    const group = new THREE.Group();
    scene.add(group);

    const starGeometry = new THREE.ShapeGeometry(createEightPointShape());
    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8bc77,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const instanceCount = 17 * 17;
    const pattern = new THREE.InstancedMesh(
      starGeometry,
      starMaterial,
      instanceCount,
    );
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    let instanceIndex = 0;

    for (let y = -8; y <= 8; y += 1) {
      for (let x = -8; x <= 8; x += 1) {
        const offset = y % 2 === 0 ? 0 : 0.62;
        const scale = 0.55 + ((Math.abs(x * y) % 5) / 16);
        matrix.compose(
          new THREE.Vector3((x + offset) * 1.22, y * 1.08, -5.8),
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, 0, ((x + y) * Math.PI) / 8),
          ),
          new THREE.Vector3(scale, scale, scale),
        );
        pattern.setMatrixAt(instanceIndex, matrix);
        pattern.setColorAt(
          instanceIndex,
          color.setHSL(0.11, 0.46, 0.46 + ((x + 8) % 4) * 0.045),
        );
        instanceIndex += 1;
      }
    }
    group.add(pattern);

    const ringGroup = new THREE.Group();
    group.add(ringGroup);
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xf5d99a,
      transparent: true,
      opacity: 0.34,
    });
    const ringGeometries: THREE.BufferGeometry[] = [];

    for (let ring = 0; ring < 5; ring += 1) {
      const radius = 1.7 + ring * 1.05;
      const points: THREE.Vector3[] = [];
      const vertices = 8;

      for (let point = 0; point <= vertices * 2; point += 1) {
        const angle = (point / (vertices * 2)) * Math.PI * 2;
        const r = point % 2 === 0 ? radius : radius * 0.72;
        points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, -1.4 - ring * 0.2));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      ringGeometries.push(geometry);
      const line = new THREE.LineLoop(geometry, ringMaterial);
      line.rotation.z = ring * 0.24;
      ringGroup.add(line);
    }

    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleColor = new THREE.Color();

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = -8 + Math.random() * 12;
      particleColor.setHSL(0.12, 0.72, 0.58 + Math.random() * 0.26);
      particleColors[i * 3] = particleColor.r;
      particleColors[i * 3 + 1] = particleColor.g;
      particleColors[i * 3 + 2] = particleColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.74,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const pointer = new THREE.Vector2(0, 0);
    let scrollProgress = 0;
    let frame = 0;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
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
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
    };

    const render = () => {
      if (!reducedMotion) {
        frame = window.requestAnimationFrame(render);
        group.rotation.z += 0.0018;
        ringGroup.rotation.z -= 0.0026;
        particles.rotation.y += 0.0012;
      }

      group.rotation.x = pointer.y * 0.08 + scrollProgress * 0.32;
      group.rotation.y = pointer.x * 0.08 - scrollProgress * 0.28;
      camera.position.z = 13 - scrollProgress * 2.1;
      renderer.render(scene, camera);
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
      if (frame) window.cancelAnimationFrame(frame);
      scene.remove(group);
      starGeometry.dispose();
      starMaterial.dispose();
      ringGeometries.forEach((geometry) => geometry.dispose());
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main className="threeInvitation" dir="rtl" ref={rootRef}>
      <canvas
        className="threeInvitation__canvas"
        ref={canvasRef}
      />

      <section className="threeInvitation__section threeInvitation__hero" aria-label="الدعوة">
        <div className="threeInvitation__heroSeal" aria-hidden="true" />
        <p className="threeInvitation__eyebrow">{CONTENT.bismillah}</p>
        <h1>{CONTENT.weddingInvitation}</h1>
        <p className="threeInvitation__greeting">{greeting}</p>
        <div className="threeInvitation__names" aria-label="العروسان">
          <span>{CONTENT.groomName}</span>
          <small>{CONTENT.andWord}</small>
          <span>{CONTENT.brideName}</span>
        </div>
        <p className="threeInvitation__hint">{CONTENT.scrollHint}</p>
      </section>

      <section className="threeInvitation__section" aria-label="آية قرآنية">
        <article className="threeInvitation__card threeInvitation__verse">
          <p>{CONTENT.quranVerse}</p>
          <p className="threeInvitation__hadith">{CONTENT.propheticHadith}</p>
          <span>{CONTENT.quranReference}</span>
        </article>
      </section>

      <section className="threeInvitation__section" aria-label="موعد الحفل ومكانه">
        <article className="threeInvitation__card threeInvitation__details">
          <div>
            <span>{CONTENT.dateLabel}</span>
            <strong>{CONTENT.dateValue}</strong>
          </div>
          <div>
            <span>{CONTENT.timeLabel}</span>
            <strong>{CONTENT.timeValue}</strong>
          </div>
          <div>
            <span>{CONTENT.locationLabel}</span>
            <a href={CONTENT.locationMapUrl} target="_blank" rel="noreferrer">
              {CONTENT.locationValue}
            </a>
          </div>
        </article>
      </section>

      <section className="threeInvitation__section" aria-label="العد التنازلي">
        <article className="threeInvitation__card threeInvitation__countdown">
          {countdown.isExpired ? (
            <strong>{CONTENT.countdownExpired}</strong>
          ) : (
            <>
              <div>
                <strong>{countdown.days}</strong>
                <span>{CONTENT.countdownDays}</span>
              </div>
              <div>
                <strong>{countdown.hours}</strong>
                <span>{CONTENT.countdownHours}</span>
              </div>
              <div>
                <strong>{countdown.minutes}</strong>
                <span>{CONTENT.countdownMinutes}</span>
              </div>
              <div>
                <strong>{countdown.seconds}</strong>
                <span>{CONTENT.countdownSeconds}</span>
              </div>
            </>
          )}
        </article>
      </section>

      <section className="threeInvitation__section" aria-label="تنبيهات الحفل">
        <article className="threeInvitation__card threeInvitation__instructions">
          <h2>{CONTENT.instructionsTitle}</h2>
          <p>{CONTENT.noMusic}</p>
          <p>{CONTENT.noPhotography}</p>
        </article>
      </section>

      <section className="threeInvitation__section" aria-label="دعاء الختام">
        <article className="threeInvitation__card threeInvitation__closing">
          <p>{CONTENT.closingPrayer}</p>
          <span>{CONTENT.closingWish}</span>
        </article>
      </section>
    </main>
  );
}
