import {
  ArrowUpRight,
  Monitor,
  Server,
  Cloud,
  Wrench,
  Sun,
  Moon,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionDivider() {
  return (
    <div className="relative">
      <div className="h-px w-full bg-[color:var(--border)]" />
      <div className="absolute left-1/2 -top-px h-px w-24" />
    </div>
  );
}

/* ================= CONTAINER ================= */
function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Content({ children }) {
  return <div className="w-full max-w-4xl">{children}</div>;
}

const NAVBAR_OFFSET = 64;

function smoothScrollToHash(e, href, offset = NAVBAR_OFFSET) {
  e.preventDefault();

  const el = document.querySelector(href);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });

  history.pushState(null, "", href);
}

/* ================= THEME HELPERS ================= */
const THEME_KEY = "na_theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function applyThemeToDocument(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/* ================= PAGE ================= */
export default function Home() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const isDark = theme === "dark";

  const themeVars = useMemo(() => {
    return isDark
      ? {
          "--bg": "#05060c",
          "--bg2": "#0a0b10",
          "--bg3": "#090b18",
          "--card": "rgba(255,255,255,0.02)",
          "--text": "rgb(248 250 252)", // slate-50
          "--muted": "rgb(148 163 184)", // slate-400
          "--muted2": "rgb(100 116 139)", // slate-500
          "--border": "rgba(255,255,255,0.10)",
          "--grid": "rgba(255,255,255,0.03)",
        }
      : {
          "--bg": "#f8fafc",
          "--bg2": "#ffffff",
          "--bg3": "#eef2ff",
          "--card": "rgba(2,6,23,0.03)",
          "--text": "rgb(15 23 42)", // slate-900
          "--muted": "rgb(51 65 85)", // slate-700
          "--muted2": "rgb(71 85 105)", // slate-600
          "--border": "rgba(2,6,23,0.10)",
          "--grid": "rgba(2,6,23,0.05)",
        };
  }, [isDark]);

  return (
    <main
      style={themeVars}
      className="
        min-h-screen
        selection:bg-violet-500 selection:text-black
        bg-[var(--bg)]
        text-[color:var(--text)]
      "
    >
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <Hero isDark={isDark} />
      <PhilosophySection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <StackTecnico />
      <SectionDivider />
      <Footer />
    </main>
  );
}

/* ================= HERO ================= */
function Hero({ isDark }) {
  return (
    <section
  className="
    relative
    min-h-[100svh]
    flex items-center justify-center
    overflow-hidden
    bg-gradient-to-b
    from-[var(--bg)]
    via-[var(--bg3)]
    to-[var(--bg)]
    pt-32   /* navbar (64px) + aire */
    pb-16
  "
>
      {/* Glow */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none" />

      {/* Graph background */}
      <GraphBackground isDark={isDark} />

      <Container className="relative z-20 flex justify-center">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20"
          >
            <span className="text-xs tracking-widest text-violet-500 font-medium">
              FULL STACK WEB DEVELOPER
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[color:var(--text)]">
              Construyo aplicaciones escalables, mantenibles y orientadas a
              resultados.
            </h1>

            <p className="mt-6 max-w-xl leading-relaxed text-[15px] sm:text-[16px] text-[color:var(--muted)]">
              Egresado de la Universidad Tecnológica Nacional (UTN), con
              formación sólida en desarrollo de software.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
  {/* CTA: Ver proyectos (más “luz”) */}
  <a
    href="#projects"
    onClick={(e) => smoothScrollToHash(e, "#projects")}
    className="
      relative isolate
      w-full sm:w-auto text-center
      px-6 py-3 rounded-md
      font-medium text-white
      bg-violet-600
      transition
      shadow-[0_0_0_1px_rgba(139,92,246,0.35),0_18px_45px_rgba(139,92,246,0.22)]
      hover:bg-violet-500
      hover:shadow-[0_0_0_1px_rgba(139,92,246,0.45),0_22px_60px_rgba(139,92,246,0.30)]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]
      active:scale-[0.98]
    "
  >
    {/* Halo / glow */}
    <span
      aria-hidden="true"
      className="
        pointer-events-none absolute -inset-1 -z-10
        rounded-lg
        bg-gradient-to-r from-violet-500/35 via-fuchsia-500/20 to-violet-500/35
        blur-xl
        opacity-70
        transition-opacity duration-300
        group-hover:opacity-100
      "
    />
    {/* Shine */}
    <span
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0 -z-10
        rounded-md
        bg-[radial-gradient(120px_60px_at_30%_20%,rgba(255,255,255,0.28),transparent_60%)]
        opacity-80
      "
    />
    Ver proyectos
  </a>

  {/* CTA: Contacto (hover más notorio en light) */}
  <a
    href="#contact"
    onClick={(e) => smoothScrollToHash(e, "#contact")}
    className="
      w-full sm:w-auto text-center
      px-6 py-3 rounded-md
      border border-[color:var(--border)]
      text-[color:var(--text)]
      transition
      bg-transparent
      hover:bg-violet-600/10
      hover:border-violet-500/45
      hover:shadow-[0_0_0_1px_rgba(139,92,246,0.18)]
      dark:hover:bg-white/5
      dark:hover:border-violet-500/30
      focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]
      active:scale-[0.98]
    "
  >
    Contacto
  </a>
</div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 w-full border-t border-[color:var(--border)]" />
    </section>
  );
}

/* ================= GRAPH BACKGROUND (CONSTELLATION) ================= */
function GraphBackground({ isDark }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ w: Math.max(300, cr.width), h: Math.max(300, cr.height) });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // En light: más densidad para que se note
  const DENSITY = isDark ? 0.000055 : 0.00007;
  const count = Math.round(size.w * size.h * DENSITY);

  const points = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min);

    return Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * size.w;
      const y = Math.random() * size.h;

      const r =
        Math.random() < 0.82
          ? rand(0.7, 1.35)
          : Math.random() < 0.9
          ? rand(1.35, 2.1)
          : rand(2.1, 2.9);

      // En light: subimos opacidad para que no quede lavado
      const a = isDark
        ? Math.random() < 0.85
          ? rand(0.12, 0.28)
          : rand(0.28, 0.55)
        : Math.random() < 0.82
        ? rand(0.18, 0.38)
        : rand(0.38, 0.68);

      const glow = Math.random() < (isDark ? 0.14 : 0.18);

      const tw = rand(2.8, 6.5);
      const delay = rand(0, 3.5);

      return { id: i, x, y, r, a, glow, tw, delay };
    });
  }, [count, size.w, size.h, isDark]);

  const links = useMemo(() => {
    const maxDist = Math.min(size.w, size.h) * (isDark ? 0.12 : 0.13);
    const maxDist2 = maxDist * maxDist;

    const out = [];
    const pickCandidates = 14;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      const targetLinks =
        Math.random() < 0.65 ? 1 : Math.random() < 0.35 ? 0 : 2;

      let made = 0;
      for (let k = 0; k < pickCandidates && made < targetLinks; k++) {
        const j = Math.floor(Math.random() * points.length);
        if (j === i) continue;

        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;

        if (d2 < maxDist2) {
          const base = isDark
            ? 0.06 + (1 - d2 / maxDist2) * 0.12
            : 0.1 + (1 - d2 / maxDist2) * 0.18;

          const a =
            p.glow && q.glow
              ? isDark
                ? Math.min(0.26, base + 0.1)
                : Math.min(0.42, base + 0.16)
              : base;

          out.push({
            id: `${i}-${j}-${k}`,
            x1: p.x,
            y1: p.y,
            x2: q.x,
            y2: q.y,
            a,
          });
          made++;
        }
      }
    }

    return out;
  }, [points, size.w, size.h, isDark]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="violetGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.65 0"
              result="colored"
            />
            <feMerge>
              <feMergeNode in="colored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.00)"
                  : "rgba(109,40,217,0.00)"
              }
            />
            <stop
              offset="35%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.55)"
                  : "rgba(109,40,217,0.65)"
              }
            />
            <stop
              offset="65%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.55)"
                  : "rgba(109,40,217,0.65)"
              }
            />
            <stop
              offset="100%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.00)"
                  : "rgba(109,40,217,0.00)"
              }
            />
          </linearGradient>

          <radialGradient id="softFog" cx="50%" cy="35%" r="70%">
            <stop
              offset="0%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.08)"
                  : "rgba(109,40,217,0.10)"
              }
            />
            <stop
              offset="55%"
              stopColor={
                isDark
                  ? "rgba(139,92,246,0.02)"
                  : "rgba(109,40,217,0.04)"
              }
            />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <rect
          width={size.w}
          height={size.h}
          fill="url(#softFog)"
          opacity={isDark ? 0.8 : 0.95}
        />

        <g opacity="0.95">
          {links.map((l) => (
            <line
              key={l.id}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="url(#linkGrad)"
              strokeWidth={isDark ? 1 : 1.15}
              opacity={l.a}
              strokeLinecap="round"
            />
          ))}
        </g>

        <g>
          {points.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={
                isDark
                  ? p.glow
                    ? "rgba(167,139,250,0.95)"
                    : "rgba(167,139,250,0.85)"
                  : p.glow
                  ? "rgba(109,40,217,0.95)"
                  : "rgba(109,40,217,0.85)"
              }
              opacity={p.a}
              filter={p.glow ? "url(#violetGlow)" : undefined}
              style={{
                animation: `twinkle ${p.tw}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--twA, 1); transform: translateZ(0); }
          50% { opacity: calc(var(--twA, 1) * 0.45); }
        }
      `}</style>
    </div>
  );
}

/* ================= NAVBAR ================= */
function Navbar({ isDark, onToggleTheme }) {
  const links = [
    { label: "Filosofía", href: "#philosophy" },
    { label: "Sobre mí", href: "#about" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  const handleClick = (e, href) => smoothScrollToHash(e, href);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* GLASS BASE (dark + light) */}
      <div
        className="
          absolute inset-0
          backdrop-blur-md
          border-b border-[color:var(--border)]
          bg-[color:var(--bg)]/80
          dark:bg-[color:var(--bg)]/70
        "
      />

      {/* VIOLET TINT (muy sutil, deja pasar el Hero real) */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-b
          from-violet-600/10 via-transparent to-transparent
          dark:from-violet-500/10
        "
      />

      <nav className="relative h-16">
        <Container className="h-full flex items-center justify-between">
          {/* LOGO */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.pushState(null, "", "#top");
            }}
            className="
              text-lg font-semibold tracking-tight cursor-pointer
              transition-colors duration-300
              hover:text-violet-500
              text-[color:var(--text)]
            "
          >
            Nahuel Arriola
          </a>

          <div className="flex items-center gap-3">
            {/* LINKS */}
            <ul className="hidden md:flex gap-8 text-sm text-[color:var(--muted)]">
              {links.map((item) => (
                <li key={item.href} className="group relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="
                      hover:text-[color:var(--text)]
                      transition
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-violet-500/70
                      rounded
                    "
                  >
                    {item.label}
                  </a>

                  <span
                    className="
                      absolute -bottom-1 left-0 w-0 h-px
                      bg-violet-500
                      transition-all duration-300
                      group-hover:w-full
                    "
                  />
                </li>
              ))}
            </ul>

            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
              }
              className="
                inline-flex items-center justify-center
                p-2 rounded-md
                text-[color:var(--muted)]
                hover:text-[color:var(--text)]
                hover:bg-black/5
                dark:hover:bg-white/5
                transition
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/70
              "
            >
              {isDark ? (
                <Sun size={18} aria-hidden="true" />
              ) : (
                <Moon size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </nav>
    </header>
  );
}

/* ================= PHILOSOPHY ================= */
function PhilosophySection() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="bg-[var(--bg)] pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <Container className="flex justify-center">
        <Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-start">
            <header>
              <h2
                id="philosophy-title"
                className="text-3xl font-semibold text-[color:var(--text)]"
              >
                Filosofía
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-violet-500" />
            </header>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="min-w-0"
            >
              <blockquote className="relative text-3xl leading-tight font-medium text-[color:var(--text)]">
                “Un buen desarrollo no se nota solo al lanzar, sino con el paso
                del tiempo.”
              </blockquote>

              <p className="mt-8 leading-relaxed text-[17px] text-[color:var(--muted)]">
                Como Desarrollador web Full Stack, creo aplicaciones web
                modernas, rápidas y seguras, pensadas para crecer junto a tu
                proyecto. Desarrollo tanto el frontend como el backend con foco
                en rendimiento, escalabilidad y facilidad de mantenimiento.
                <br />
                <br />
                Mi prioridad es entregar soluciones claras, eficientes y
                confiables, eligiendo siempre la tecnología adecuada para cada
                necesidad, sin sobrecomplicar. El objetivo: que tu sistema
                funcione bien hoy y siga funcionando mañana.
              </p>
            </motion.div>
          </div>
        </Content>
      </Container>
    </section>
  );
}

/* ================= ABOUT ================= */
function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-[var(--bg2)] pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <Container className="flex justify-center">
        <Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-start">
            <header>
              <h2
                id="about-title"
                className="text-3xl font-semibold text-[color:var(--text)]"
              >
                Sobre mí
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-violet-500" />
            </header>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-6 leading-relaxed text-[17px] min-w-0 text-[color:var(--muted)]"
            >
              <p>
                Soy Desarrollador web Full Stack y me dedico a crear aplicaciones
                web funcionales, claras y pensadas para crecer. Trabajo tanto en
                el frontend como en el backend, enfocándome en que cada parte
                del sistema sea entendible, mantenible y útil para el negocio.
              </p>

              <p>
                Me gusta encarar los proyectos desde el pensamiento técnico,
                entendiendo el problema antes de escribir código. No busco
                complicar con herramientas innecesarias, sino elegir las
                tecnologías adecuadas para cada caso y construir soluciones
                sólidas.
              </p>

              <p>
                Como desarrollador junior, tengo una mentalidad de aprendizaje
                constante, buena capacidad de adaptación y un fuerte compromiso
                con hacer las cosas bien desde la base.
              </p>

              <p>
                Si estás buscando a alguien que programe con criterio,
                responsabilidad y ganas de crecer junto a tu proyecto, estoy
                listo para aportar.
              </p>
            </motion.div>
          </div>
        </Content>
      </Container>
    </section>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-[var(--bg)] pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <Container className="flex justify-center">
        <Content>
          <header className="mb-14">
            <h2
              id="projects-title"
              className="text-3xl font-semibold text-[color:var(--text)]"
            >
              Proyectos Destacados
            </h2>
            <div className="mt-3 h-[3px] w-12 bg-violet-500" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <ProjectCard
              title="Gestión Contable Ampuero"
              problem="El estudio contable gestionaba compras y ventas mediante planillas de Excel, lo que generaba riesgo de errores en la carga manual de comprobantes, dificultades para discriminar correctamente impuestos y posibles alteraciones accidentales de datos."
              solution="Desarrollo de un sistema web que centraliza la carga de comprobantes, automatiza la discriminación de impuestos (gravados y no gravados) y permite generar informes impositivos claros y confiables para la gestión contable diaria."
              decisions="Se diseñó un sistema orientado a minimizar errores de carga mediante validaciones y estructura de datos clara. La solución reemplaza el uso de planillas por un entorno web controlado, asegurando integridad de la información, facilidad de uso y escalabilidad futura."
              result="Sistema web funcional que optimiza la gestión contable del estudio, reduce errores en la carga de comprobantes y mejora la generación de informes impositivos, permitiéndoles trabajar de manera más profesional y automatizada."
              tech={["React", "Node.js", "Express", "MySQL", "JWT"]}
            />
          </div>
        </Content>
      </Container>
    </section>
  );
}

/* ================= PROJECT CARD ================= */
function ProjectCard({ title, problem, solution, decisions, result, tech }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="
        group relative overflow-hidden
        rounded-2xl border border-[color:var(--border)]
        bg-[var(--bg2)]
        transition
        hover:border-violet-500/40
        hover:shadow-[0_0_0_1px_rgba(139,92,246,0.25)]
      "
      aria-labelledby={`${title}-title`}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-0
          bg-gradient-to-br from-violet-500/10 via-transparent to-transparent
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6 mb-6">
          <h3
            id={`${title}-title`}
            className="text-xl font-semibold tracking-tight text-[color:var(--text)]"
          >
            {title}
          </h3>

          <span
            className="
              inline-flex items-center justify-center
              rounded-full border border-[color:var(--border)]
              bg-[var(--card)]
              p-2
              text-[color:var(--muted)]
              transition
              group-hover:text-[color:var(--text)] group-hover:border-violet-500/30
              group-focus-within:text-[color:var(--text)]
            "
          >
            <ArrowUpRight
              aria-hidden="true"
              focusable="false"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <ProjectBlock label="EL PROBLEMA">{problem}</ProjectBlock>
          <ProjectBlock label="LA SOLUCIÓN">{solution}</ProjectBlock>
          <ProjectBlock label="DECISIONES TÉCNICAS">{decisions}</ProjectBlock>
          <ProjectBlock label="RESULTADO" highlight>
            {result}
          </ProjectBlock>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {tech.map((t) => (
            <span
              key={t}
              className="
                px-3 py-1 text-xs rounded-full
                border border-violet-500/30
                text-violet-600 dark:text-violet-400
                bg-violet-500/10
                transition
                group-hover:border-violet-400/60
                group-hover:text-violet-600 dark:group-hover:text-violet-300
              "
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectBlock({ label, children, highlight = false }) {
  return (
    <div>
      <p className="text-xs tracking-widest mb-2 text-[color:var(--muted2)]">
        {label}
      </p>
      <p
        className={
          highlight ? "text-[color:var(--text)]" : "text-[color:var(--muted)]"
        }
      >
        {children}
      </p>
    </div>
  );
}

/* ================= STACK TÉCNICO ================= */
function StackTecnico() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="bg-[var(--bg2)] pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <Container className="flex justify-center">
        <Content>
          <header className="mb-14">
            <h2
              id="stack-title"
              className="text-3xl font-semibold text-[color:var(--text)]"
            >
              Stack Técnico
            </h2>
            <div className="mt-3 h-[3px] w-12 bg-violet-500" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <StackCard
              icon={<Monitor size={20} aria-hidden="true" focusable="false" />}
              title="Frontend"
              items={["JavaScript / TypeScript", "Angular", "React", "Next.js"]}
            />

            <StackCard
              icon={<Server size={20} aria-hidden="true" focusable="false" />}
              title="Backend"
              items={[".NET (ASP.NET)", "MySQL", "PostgreSQL"]}
            />

            <StackCard
              icon={<Cloud size={20} aria-hidden="true" focusable="false" />}
              title="Cloud & DevOps"
              items={["Docker", "Google Cloud Platform"]}
            />

            <StackCard
              icon={<Wrench size={20} aria-hidden="true" focusable="false" />}
              title="Desarrollo de Software"
              items={[
                "Full Stack",
                "Arquitecturas escalables",
                "Integración de datos",
                "Despliegues en producción",
              ]}
            />
          </div>

          <div className="my-20 h-px w-full bg-[color:var(--border)]" />

          <section aria-labelledby="education-title">
            <header className="mb-10">
              <h2
                id="education-title"
                className="text-3xl font-semibold text-[color:var(--text)]"
              >
                Educación
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-violet-500" />
            </header>

            <div
              className="
                max-w-xl
                rounded-2xl border border-[color:var(--border)]
                bg-[var(--card)]
                px-6 py-5
                shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
              "
            >
              <h3 className="font-semibold mb-1 text-[color:var(--text)]">
                Universidad Tecnológica Nacional
              </h3>

              <p className="text-sm mt-1 text-[color:var(--muted)]">
                Tecnicatura Superior en Programación
              </p>

              <p className="text-sm text-violet-500 mt-2">2022–2025</p>
            </div>
          </section>
        </Content>
      </Container>
    </section>
  );
}

/* ================= STACK CARD ================= */
function StackCard({ icon, title, items, nowrapTitle = false }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="
        rounded-2xl border border-[color:var(--border)]
        bg-[var(--card)]
        p-7
        transition
        hover:border-violet-500/35 hover:bg-black/5 dark:hover:bg-white/[0.035]
        hover:shadow-[0_0_0_1px_rgba(139,92,246,0.18)]
        focus-within:ring-2 focus-within:ring-violet-500/40
        focus-within:ring-offset-2 focus-within:ring-offset-[var(--bg2)]
        min-h-[220px]
      "
    >
      <div className="inline-flex items-center gap-3 text-violet-500 mb-5">
        <span className="relative flex items-center justify-center">{icon}</span>

        <h3
          className={`font-semibold tracking-tight text-[color:var(--text)] ${
            nowrapTitle ? "whitespace-nowrap" : ""
          }`}
        >
          {title}
        </h3>
      </div>

      <ul className="space-y-2 text-sm leading-relaxed text-[color:var(--muted)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500/70 shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[var(--bg)] pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 border-t border-[color:var(--border)]"
      aria-labelledby="footer-title"
    >
      <Container className="flex justify-center">
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="min-w-0">
                <h3
                  id="footer-title"
                  className="text-3xl font-semibold tracking-tight text-[color:var(--text)]"
                >
                  Nahuel Arriola
                </h3>

                <p className="text-base mt-2 max-w-sm leading-relaxed text-[color:var(--muted)]">
                  Construyendo sistemas pensados para durar.
                </p>
              </div>

              <nav aria-label="Enlaces de contacto" className="w-full md:w-auto">
                <ul className="flex flex-wrap items-center gap-3 md:gap-4">
                  <li>
                    <FooterLink
                      href="https://github.com/ArriolaXY"
                      label="GitHub"
                    >
                      <FaGithub size={18} aria-hidden="true" focusable="false" />
                    </FooterLink>
                  </li>

                  <li>
                    <FooterLink
                      href="https://www.linkedin.com/in/nahuel-arriola-6794b9355/"
                      label="LinkedIn"
                    >
                      <FaLinkedinIn
                        size={18}
                        aria-hidden="true"
                        focusable="false"
                      />
                    </FooterLink>
                  </li>

                  <li>
                    <FooterLink
                      href="https://wa.me/543816439602"
                      label="WhatsApp"
                    >
                      <FaWhatsapp
                        size={18}
                        aria-hidden="true"
                        focusable="false"
                      />
                    </FooterLink>
                  </li>

                  <li>
                    <FooterLink
                      href="mailto:nahuel.arriola777@gmail.com"
                      label="Email"
                    >
                      <FaEnvelope
                        size={18}
                        aria-hidden="true"
                        focusable="false"
                      />
                    </FooterLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-12 mb-5 h-px w-full bg-[color:var(--border)]" />

            <p className="text-sm leading-relaxed text-[color:var(--muted2)]">
              © 2026 Nahuel Arriola. Todos los derechos reservados.
            </p>
          </motion.div>
        </Content>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children, label }) {
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="
        group inline-flex items-center gap-2
        rounded-full
        px-4 py-2
        text-sm
        border border-[color:var(--border)]
        bg-[var(--card)]
        transition
        hover:border-violet-500/40
        hover:bg-black/5 dark:hover:bg-white/[0.04]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]
        active:scale-[0.98]
        text-[color:var(--muted)]
        hover:text-[color:var(--text)]
      "
    >
      <span
        className="
          relative
          transition
          group-hover:text-violet-500
          group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.55)]
        "
      >
        {children}
      </span>

      <span className="tracking-tight relative">
        {label}
        <span
          aria-hidden="true"
          className="
            absolute left-0 -bottom-0.5 h-px w-0
            bg-violet-500/70
            transition-all duration-300
            group-hover:w-full
          "
        />
      </span>

      {isExternal && <span className="sr-only">(se abre en una pestaña nueva)</span>}
    </a>
  );
}
