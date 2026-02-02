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
import { useEffect, useMemo, useState } from "react";

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
    // Podés ajustar estos colores si querés otro "light theme" más minimal
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
      <Hero />
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
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--bg)] via-[var(--bg3)] to-[var(--bg)] pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Glow */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none" />

      {/* Graph background */}
      <GraphBackground />

      <Container className="relative z-20 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Content */}
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
              <a
                href="#projects"
                onClick={(e) => smoothScrollToHash(e, "#projects")}
                className="w-full sm:w-auto text-center px-6 py-3 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-500 transition shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                Ver proyectos
              </a>

              <a
                href="#contact"
                onClick={(e) => smoothScrollToHash(e, "#contact")}
                className="w-full sm:w-auto text-center px-6 py-3 rounded-md border border-[color:var(--border)] text-[color:var(--text)] hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                Contacto
              </a>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* CIERRE VISUAL DEL HERO */}
      <div className="absolute bottom-0 left-0 w-full border-t border-[color:var(--border)]" />
    </section>
  );
}

/* ================= GRAPH BACKGROUND ================= */
function GraphBackground() {
  const GRAPH_COUNT = 18;

  const graphs = useMemo(() => {
    return Array.from({ length: GRAPH_COUNT }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.22 + Math.random() * 0.28,
    }));
  }, []);

  return (
    <svg
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="var(--grid)"
            strokeWidth="0.2"
          />
        </pattern>
      </defs>

      {/* grid */}
      <rect width="100" height="100" fill="url(#grid)" />

      {/* mini graphs */}
      {graphs.map((g, i) => (
        <MiniGraph
          key={i}
          offsetX={g.x}
          offsetY={g.y}
          scale={g.scale}
          index={i}
        />
      ))}
    </svg>
  );
}

function MiniGraph({ offsetX, offsetY, scale, index }) {
  const layers = {
    edge: [
      { id: "e1", x: 10, y: 18 },
      { id: "e2", x: 28, y: 16 },
      { id: "e3", x: 72, y: 18 },
      { id: "e4", x: 90, y: 16 },
    ],
    services: [
      { id: "s1", x: 14, y: 48 },
      { id: "s2", x: 80, y: 48 },
      { id: "s3", x: 75, y: 45 },
    ],
    core: [
      { id: "c1", x: 38, y: 78 },
      { id: "c2", x: 62, y: 78 },
    ],
  };

  const links = [
    ["e1", "s1"],
    ["e2", "s1"],
    ["e3", "s2"],
    ["e4", "s3"],
    ["s1", "c1"],
    ["s2", "c2"],
    ["s3", "c2"],
    ["c1", "c2"],
  ];

  const allNodes = Object.values(layers).flat();
  const getNode = (id) => allNodes.find((n) => n.id === id);

  return (
    <g
  transform={`translate(${offsetX} ${offsetY}) scale(${scale})`}
  opacity={0.2}
>
      {/* links */}
      {links.map(([a, b], i) => {
        const from = getNode(a);
        const to = getNode(b);
        const isCore = a.startsWith("c") && b.startsWith("c");

        return (
          <motion.line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={
  isCore
    ? "rgba(139,92,246,0.22)"
    : "rgba(139,92,246,0.12)"
}
strokeWidth={isCore ? 0.45 : 0.3}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
          />
        );
      })}

      {/* nodes */}
      {allNodes.map((n) => {
        const isCore = n.id.startsWith("c");
        const isService = n.id.startsWith("s");

        return (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={isCore ? 0.9 : isService ? 0.7 : 0.55}
            fill="#a78bfa"
            opacity={0.7}
          />
        );
      })}
    </g>
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
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[color:var(--bg)]/80 border-b border-[color:var(--border)]">
      <nav className="h-16">
        <Container className="h-full flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.pushState(null, "", "#top");
            }}
            className="text-lg font-semibold tracking-tight cursor-pointer transition-all duration-300 hover:text-violet-500 text-[color:var(--text)]"
          >
            Nahuel Arriola
          </a>

          <div className="flex items-center gap-3">
            <ul className="hidden md:flex gap-8 text-sm text-[color:var(--muted)]">
              {links.map((item) => (
                <li key={item.href} className="group relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="hover:text-[color:var(--text)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 rounded"
                  >
                    {item.label}
                  </a>

                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>

            {/* Theme Toggle (icon only, no border) */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
              }
              className="
                inline-flex items-center justify-center
                p-2
                rounded-md
                text-[color:var(--muted)]
                hover:text-[color:var(--text)]
                hover:bg-black/5 dark:hover:bg-white/5
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70
              "
            >
              {isDark ? (
                <Sun size={18} aria-hidden="true" focusable="false" />
              ) : (
                <Moon size={18} aria-hidden="true" focusable="false" />
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
            {/* Left */}
            <header>
              <h2
                id="philosophy-title"
                className="text-3xl font-semibold text-[color:var(--text)]"
              >
                Filosofía
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-violet-500" />
            </header>

            {/* Right */}
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
            {/* Left */}
            <header>
              <h2
                id="about-title"
                className="text-3xl font-semibold text-[color:var(--text)]"
              >
                Sobre mí
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-violet-500" />
            </header>

            {/* Right */}
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
          {/* Title */}
          <header className="mb-14">
            <h2
              id="projects-title"
              className="text-3xl font-semibold text-[color:var(--text)]"
            >
              Proyectos Destacados
            </h2>
            <div className="mt-3 h-[3px] w-12 bg-violet-500" />
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <ProjectCard
              title="Gestión Contable Ampuero"
              problem="El estudio contable gestionaba compras y ventas mediante planillas de Excel, lo que generaba riesgo de errores en la carga manual de comprobantes, dificultades para discriminar correctamente impuestos y posibles alteraciones accidentales de datos."
              solution="Desarrollo de un sistema web que centraliza la carga de comprobantes, automatiza la discriminación de impuestos (gravados y no gravados) y permite generar informes impositivos claros y confiables para la gestión contable diaria."
              decisions="Se diseñó un sistema orientado a minimizar errores de carga mediante validaciones y estructura de datos clara. La solución reemplaza el uso de planillas por un entorno web controlado, asegurando integridad de la información, facilidad de uso y escalabilidad futura."
              result="Sistema web funcional que optimiza la gestión contable del estudio, reduce errores en la carga de comprobantes, mejora la generación de informes impositivos y aporta una imagen profesional y moderna hacia los clientes."
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
      {/* Subtle glow overlay */}
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
        {/* Header */}
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

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed">
          <ProjectBlock label="EL PROBLEMA">{problem}</ProjectBlock>
          <ProjectBlock label="LA SOLUCIÓN">{solution}</ProjectBlock>
          <ProjectBlock label="DECISIONES TÉCNICAS">{decisions}</ProjectBlock>
          <ProjectBlock label="RESULTADO" highlight>
            {result}
          </ProjectBlock>
        </div>

        {/* Tech stack */}
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
          {/* TÍTULO */}
          <header className="mb-14">
            <h2
              id="stack-title"
              className="text-3xl font-semibold text-[color:var(--text)]"
            >
              Stack Técnico
            </h2>
            <div className="mt-3 h-[3px] w-12 bg-violet-500" />
          </header>

          {/* GRID STACK */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* FRONTEND */}
            <StackCard
              icon={<Monitor size={20} aria-hidden="true" focusable="false" />}
              title="Frontend"
              items={["JavaScript / TypeScript", "Angular", "React", "Next.js"]}
            />

            {/* BACKEND */}
            <StackCard
              icon={<Server size={20} aria-hidden="true" focusable="false" />}
              title="Backend"
              items={[".NET (ASP.NET)", "MySQL", "PostgreSQL"]}
            />

            {/* CLOUD */}
            <StackCard
              icon={<Cloud size={20} aria-hidden="true" focusable="false" />}
              title="Cloud & DevOps"
              items={["Docker", "Google Cloud Platform"]}
            />

            {/* DESARROLLO DE SOFTWARE */}
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

          {/* DIVIDER */}
          <div className="my-20 h-px w-full bg-[color:var(--border)]" />

          {/* EDUCACIÓN */}
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
            {/* Top */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              {/* Left */}
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

              {/* Right */}
              <nav aria-label="Enlaces de contacto" className="w-full md:w-auto">
                <ul className="flex flex-wrap items-center gap-3 md:gap-4">
                  <li>
                    <FooterLink href="https://github.com/ArriolaXY" label="GitHub">
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
                    <FooterLink href="https://wa.me/543816439602" label="WhatsApp">
                      <FaWhatsapp size={18} aria-hidden="true" focusable="false" />
                    </FooterLink>
                  </li>

                  <li>
                    <FooterLink
                      href="mailto:nahuel.arriola777@gmail.com"
                      label="Email"
                    >
                      <FaEnvelope size={18} aria-hidden="true" focusable="false" />
                    </FooterLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* DIVIDER */}
            <div className="mt-12 mb-5 h-px w-full bg-[color:var(--border)]" />

            {/* Bottom */}
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
      {/* ÍCONO */}
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

      {/* TEXTO */}
      <span className="tracking-tight relative">
        {label}
        {/* underline accesible */}
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

      {/* Aviso para lectores de pantalla cuando abre en nueva pestaña */}
      {isExternal && (
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      )}
    </a>
  );
}
