// @ts-nocheck 
import React, { useState } from "react";
import {
  PlayCircle, Heart, Compass, Users, Briefcase, ShieldCheck, Star,
  ClipboardCheck, CheckCircle2, Circle, ArrowRight, ArrowLeft, PenLine,
  Sparkles, Quote, Check, Bell, FolderOpen, Download,
  Trophy, Flag
} from "lucide-react";

/* ---------------------------------- tokens ---------------------------------- */
const C = {
  navy: "#0E1B45", navyLight: "#16245C", orange: "#F2782F", orangeLight: "#FFA559",
  cream: "#F6F2E9", card: "#FFFFFF", ink: "#1B1F2A", sub: "#6B7280", green: "#1FA67A",
};
const GRAD = `linear-gradient(120deg, ${C.navy} 0%, #4B3C86 45%, ${C.orange} 100%)`;
const GRADS = [
  `linear-gradient(135deg, ${C.navy} 0%, #3A2E73 100%)`,
  `linear-gradient(135deg, #3A2E73 0%, ${C.orange} 100%)`,
  `linear-gradient(135deg, ${C.navy} 0%, #6B4FA0 100%)`,
  `linear-gradient(135deg, #5B3FA0 0%, ${C.orangeLight} 100%)`,
];

/* ---------------------------------- content ---------------------------------- */
const VALORES = ["Servicio", "Excelencia", "Cercanía", "Integridad", "Mejora continua"];

const MAPA_VALOR = [
  { area: "Academia", nombre: "Sandra Salazar", cargo: "Gerencia Académica", videoId: "DndBb7k9VVE" },
  { area: "Comercial", nombre: "Heldrich Santizo", cargo: "Ventas y Marketing", videoId: "Sj78Ai-rqSg" },
  { area: "Atención", nombre: "Pilar Alcocer", cargo: "Directora de Servicios", videoId: "wzbaSNujq-w" },
  { area: "Operaciones", nombre: "Mariana Bortolotti", cargo: "Seguimiento Académico", videoId: "Vvwt_biwpnM" },
];

const PRINCIPIOS = [
  { n: 1, title: "Don al Servicio", desc: "Nuestra misión es sanar el tejido social y transformar vidas." },
  { n: 2, title: "Raíz Espiritual", desc: "Discernimiento y valores en el centro de cada decisión." },
  { n: 3, title: "Sabios Accesibles", desc: "Mentores cercanos que acompañan el descubrimiento." },
  { n: 4, title: "Más y Mejor", desc: "Crecimiento constante y elevación de calidad." },
  { n: 5, title: "Responsabilidad por Resultados", desc: "Confianza y libertad basadas en el fruto del trabajo, no solo en el horario." },
  { n: 6, title: "Verdad en Sincronía", desc: "Comunicación honesta, rápida y transparente." },
  { n: 7, title: "Semilla de Mejora", desc: "Usamos el error para auditar y rediseñar procesos." },
  { n: 8, title: "Filtro Natural", desc: "Buscamos profesionales brillantes con ética y humildad." },
];

const RECURSOS = [
  { nombre: "Manifiesto de Cultura", formato: "PDF interactivo", responsable: "EMC (Oscar Narváez)" },
  { nombre: "PDI / Modelo educativo", formato: "Guía digital", responsable: "Dirección Académica" },
  { nombre: "Manual de Identidad (logos)", formato: "Brand Kit (.zip)", responsable: "Marketing Creativo" },
  { nombre: "Guías de Ejecución Rápida", formato: "Checklist", responsable: "Mejora Continua" },
];

const QUIZ = [
  { q: "¿Cuál es la misión de CESUMA?", options: ["Vender cursos online masivos", "Democratizar el acceso a educación superior de calidad", "Ser la universidad más grande de México", "Competir solo por precio con otras universidades"], correct: 1 },
  { q: "Según la cultura CESUMA, ¿qué se espera de un colaborador incluso cuando nadie lo está viendo?", options: ["Que cumpla solo su horario", "Que espere instrucciones de su jefe", "Que tome las mejores decisiones por el bien del objetivo común", "Que reporte únicamente errores ajenos"], correct: 2 },
  { q: '¿Qué es tu "Victoria Temprana"?', options: ["Un bono económico del primer mes", "Un examen de conocimientos generales", "Una evaluación de desempeño anual", "Una meta pequeña y medible para sentir resultados desde el inicio"], correct: 3 },
  { q: "¿Qué principio habla de comunicación honesta, rápida y transparente?", options: ["Filtro Natural", "Más y Mejor", "Verdad en Sincronía", "Sabios Accesibles"], correct: 2 },
  { q: "¿Cómo se llama el espacio digital donde se comparten logros, tips y noticias entre todas las áreas?", options: ["Mapa de Valor", "Comunidad CESUMA", "Centro de Mando", "Maletín Digital"], correct: 1 },
];

const QUIZ_PASSING = 3; // de 5, 60%

const STEPS = [
  { id: "bienvenida", label: "Bienvenida", icon: PlayCircle, points: 10 },
  { id: "quienes", label: "Quiénes somos", icon: Compass, points: 10 },
  { id: "mapa", label: "Mapa de valor", icon: Users, points: 15 },
  { id: "equipo", label: "Tu equipo", icon: Heart, points: 10 },
  { id: "puesto", label: "Tu puesto", icon: Briefcase, points: 10 },
  { id: "principios", label: "Principios y firma", icon: ShieldCheck, points: 20 },
  { id: "recursos", label: "Maletín digital", icon: FolderOpen, points: 5 },
  { id: "victoria", label: "Victoria temprana", icon: Star, points: 30 },
  { id: "quiz", label: "Cuestionario", icon: ClipboardCheck, points: 50 },
  { id: "listo", label: "Listo", icon: CheckCircle2, points: 0 },
];

function nivelLabel(pts) {
  if (pts >= 140) return "Talento CESUMA";
  if (pts >= 90) return "Casi listo";
  if (pts >= 40) return "En camino";
  return "Iniciando";
}

/* ---------------------------------- atoms ---------------------------------- */
function Card({ children, className = "" }) {
  return <div className={`rounded-2xl p-6 lg:p-8 ${className}`} style={{ background: C.card, boxShadow: "0 1px 3px rgba(14,27,69,0.08), 0 1px 2px rgba(14,27,69,0.06)" }}>{children}</div>;
}
function VideoCover({ title, subtitle, grad, big = false }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white text-center ${big ? "p-14 lg:p-20" : "p-8 lg:p-10"}`} style={{ background: grad, minHeight: big ? 260 : 170 }}>
      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm"><PlayCircle size={32} /></div>
      <div className="font-bold text-lg lg:text-xl">{title}</div>
      {subtitle && <div className="text-sm lg:text-base text-white/75 mt-1">{subtitle}</div>}
    </div>
  );
}
function StepHeader({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-start gap-3 mb-6 lg:mb-8">
      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${C.navy}10` }}><Icon size={20} style={{ color: C.navy }} /></div>
      <div><h2 className="text-xl lg:text-2xl font-extrabold" style={{ color: C.navy }}>{title}</h2>{sub && <p className="text-sm lg:text-base" style={{ color: C.sub }}>{sub}</p>}</div>
    </div>
  );
}
function NavButtons({ onBack, onNext, nextLabel = "Continuar", nextDisabled = false, hideBack = false, points }) {
  return (
    <div className="flex justify-between items-center mt-8">
      {!hideBack ? <button onClick={onBack} className="px-5 py-2.5 rounded-full text-sm font-bold inline-flex items-center gap-1.5" style={{ color: C.navy }}><ArrowLeft size={16} /> Atrás</button> : <span />}
      <div className="flex items-center gap-3">
        {points ? <span className="text-xs font-bold" style={{ color: C.orange }}>+{points} pts</span> : null}
        <button onClick={onNext} disabled={nextDisabled} className="px-6 py-2.5 rounded-full text-sm font-bold text-white inline-flex items-center gap-1.5 disabled:opacity-40" style={{ background: C.orange }}>
          {nextLabel} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
function OrgBox({ name, role, highlight }) {
  return (
    <div className="rounded-xl px-4 py-2.5 text-center border-2" style={{ borderColor: highlight ? C.orange : "#E7E2D4", background: highlight ? `${C.orange}0D` : "white", minWidth: 150 }}>
      <div className="text-sm font-bold" style={{ color: C.navy }}>{name}</div>
      <div className="text-xs" style={{ color: C.sub }}>{role}</div>
    </div>
  );
}
const Connector = () => <div className="w-px h-5" style={{ background: "#E7E2D4" }} />;

/* ---------------------------------- app ---------------------------------- */
export default function App() {
  const [stepIdx, setStepIdx] = useState(0);
  const [maxDone, setMaxDone] = useState(0);
  const [signature, setSignature] = useState({ accepted: false, name: "", signed: false });
  const [victoria, setVictoria] = useState({ entregableLink: "", entregado: false, capacitadorConfirmado: false });
  const [quizAnswers, setQuizAnswers] = useState(Array(QUIZ.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [activated, setActivated] = useState(false);

  const goTo = (i) => { if (i <= maxDone) setStepIdx(i); };
  const next = () => { const n = Math.min(stepIdx + 1, STEPS.length - 1); setStepIdx(n); setMaxDone((m) => Math.max(m, n)); };
  const back = () => setStepIdx((s) => Math.max(0, s - 1));

  const quizScore = quizAnswers.reduce((acc, a, i) => acc + (a === QUIZ[i].correct ? 1 : 0), 0);
  const quizPassed = quizSubmitted && quizScore >= QUIZ_PASSING;
  const retryQuiz = () => { setQuizAnswers(Array(QUIZ.length).fill(null)); setQuizSubmitted(false); setQuizAttempts((a) => a + 1); };
  const totalPoints =
    10 * (maxDone >= 1) + 10 * (maxDone >= 2) + 15 * (maxDone >= 3) + 10 * (maxDone >= 4) + 10 * (maxDone >= 5) +
    (signature.signed ? 20 : 0) + (maxDone >= 7 ? 5 : 0) + (victoria.capacitadorConfirmado ? 30 : 0) +
    (quizSubmitted ? quizScore * 10 : 0);

  const step = STEPS[stepIdx].id;
  const progressPct = Math.round((maxDone / (STEPS.length - 1)) * 100);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.cream, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* ── Header ── */}
      <div className="text-white" style={{ background: C.navy }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "white" }}>M</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1 }}>KIT DE <span style={{ color: C.orangeLight }}>BIENVENIDA</span></div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.3 }}>Universidad CESUMA · Tu primera semana</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "4px 10px" }}>
              <Trophy size={12} style={{ color: C.orangeLight }} /> {totalPoints} pts · {nivelLabel(totalPoints)}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Paso {stepIdx + 1} de {STEPS.length}</div>
          </div>
        </div>
        {/* progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)" }}>
          <div style={{ height: 4, width: `${progressPct}%`, background: C.orange, transition: "width 0.3s ease" }} />
        </div>
        {/* dot stepper */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "10px 20px 14px", display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
          {STEPS.map((s, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            const reachable = i <= maxDone;
            return (
              <React.Fragment key={s.id}>
                <button onClick={() => reachable && goTo(i)} disabled={!reachable}
                  title={s.label}
                  style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: reachable ? "pointer" : "default", padding: 0, opacity: !reachable ? 0.35 : 1 }}>
                  <div style={{ width: active ? 28 : 20, height: active ? 28 : 20, borderRadius: "50%", background: done ? C.green : active ? C.orange : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                    {done ? <CheckCircle2 size={13} color="white" /> : <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{i + 1}</span>}
                  </div>
                  {active && <span style={{ fontSize: 12, fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>{s.label}</span>}
                </button>
                {i < STEPS.length - 1 && <div style={{ flex: 1, minWidth: 8, height: 2, background: i < stepIdx ? C.green : "rgba(255,255,255,0.15)", borderRadius: 1 }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "28px 20px 48px" }}>
          {step === "bienvenida" && (
            <div>
              <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", width: "100%" }}>
  <iframe
    width="100%" height="100%"
    src="https://www.youtube.com/embed/HlG32u5JllA"
    title="Bienvenida Rector CESUMA"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{ display: "block", minHeight: 260 }}
  />
</div>
              <Card className="mt-6">
                <Quote size={32} style={{ color: `${C.orange}55` }} />
                <p className="text-xl font-bold mt-2 mb-2" style={{ color: C.navy }}>"Hoy inicias una etapa para Aprender, Emprender y Trascender"</p>
                <p className="text-sm" style={{ color: C.sub }}>Bienvenido al Centro de Mando del Colaborador. Cada paso de esta inducción suma puntos: termínala y llega lista tu primera victoria.</p>
              </Card>
              <NavButtons onBack={back} onNext={next} hideBack nextLabel="Comenzar mi inducción" points={STEPS[0].points} />
            </div>
          )}

          {step === "quienes" && (
            <div>
              <StepHeader icon={Compass} title="Quiénes somos" sub="Misión, visión, valores e historia de CESUMA." />
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Card><div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.orange }}>Misión</div><p className="text-sm" style={{ color: C.ink }}>Democratizar el acceso a educación superior de calidad, formando profesionales que transforman su entorno.</p></Card>
                <Card><div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.orange }}>Visión</div><p className="text-sm" style={{ color: C.ink }}>Ser la red universitaria de mayor impacto social en Latinoamérica.</p></Card>
              </div>
              <Card className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.orange }}>Valores</div>
                <div className="flex flex-wrap gap-2">{VALORES.map((v) => <span key={v} className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: `${C.navy}0D`, color: C.navy }}>{v}</span>)}</div>
              </Card>
              <Card>
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.orange }}>Nuestra historia</div>
                <p className="text-sm" style={{ color: C.ink }}>CESUMA nació para llevar educación superior de calidad a comunidades que tradicionalmente no tenían acceso a ella. Desde entonces, cada área trabaja con un mismo propósito: que el talento de nuestros estudiantes no dependa de su punto de partida.</p>
              </Card>
              <NavButtons onBack={back} onNext={next} points={STEPS[1].points} />
            </div>
          )}

          {step === "mapa" && (
            <div>
              <StepHeader icon={Users} title="Mapa de valor" sub="Cada líder te explica en 60 segundos qué hace su área, en qué te puede ayudar y en qué necesita tu ayuda." />
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {MAPA_VALOR.map((m, i) => (
  <div key={m.area}>
    {m.videoId ? (
      <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", width: "100%" }}>
        <iframe
          width="100%" height="100%"
          src={`https://www.youtube.com/embed/${m.videoId}`}
          title={`Video ${m.area}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: "block", minHeight: 180 }}
        />
      </div>
    ) : (
      <VideoCover title={m.area} subtitle={m.nombre} grad={GRADS[i % GRADS.length]} />
    )}
    <p className="text-sm mt-2 px-1" style={{ color: C.navy }}>{m.nombre} · {m.cargo}</p></div>
                ))}
              </div>
              <Card>
                <div className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: C.orange }}>Organigrama CESUMA</div>
                <div className="flex flex-col items-center gap-2">
                  <OrgBox name="Pablo Lamamié de Clairac" role="Rector" highlight />
                  <Connector />
                  <div className="flex gap-3 flex-wrap justify-center">
                    {MAPA_VALOR.map((m) => <OrgBox key={m.area} name={m.nombre} role={m.area} />)}
                  </div>
                  <Connector />
                  <OrgBox name="Heldrich Santizo" role="Jefe Marketing y Comunicación" />
                  <Connector />
                  <OrgBox name="Jacobo Elordi (tú)" role="Creative Performance Manager" highlight />
                </div>
              </Card>
              <NavButtons onBack={back} onNext={next} points={STEPS[2].points} />
            </div>
          )}

          {step === "equipo" && (
            <div>
              <StepHeader icon={Heart} title="Tu equipo" sub="La persona que te acompañará 1 a 1 durante tu inducción." />
              <Card className="flex items-center gap-4 flex-wrap">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold text-white shrink-0" style={{ background: GRAD }}>H</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide" style={{ color: C.orange }}>Tu capacitador será</div>
                  <div className="text-lg font-extrabold" style={{ color: C.navy }}>Heldrich Santizo</div>
                  <p className="text-sm mt-1" style={{ color: C.sub }}>Jefe de Marketing y Comunicación. Será tu ancla operativa: te ayudará a alcanzar tu primera victoria temprana y resolver cualquier duda durante tus primeros días.</p>
                </div>
              </Card>
              <div className="mt-4 rounded-xl p-4 flex items-center gap-3" style={{ background: `${C.green}0D` }}>
                <Bell size={18} style={{ color: C.green }} />
                <span className="text-sm font-semibold" style={{ color: C.green }}>Heldrich Santizo fue notificado de tu llegada y de que será tu capacitador.</span>
              </div>
              <NavButtons onBack={back} onNext={next} points={STEPS[3].points} />
            </div>
          )}

          {step === "puesto" && (
            <div>
              <StepHeader icon={Briefcase} title="Tu puesto" sub="Adjuntamos tu descripción de puesto completa." />
              <Card>
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.orange }}>Tu puesto es</div>
                <div className="text-xl font-extrabold mb-3" style={{ color: C.navy }}>Creative Performance Manager</div>
                <p className="text-sm mb-3" style={{ color: C.ink }}>Responsable de la estrategia creativa aplicada al desempeño digital: concepto, mensaje, segmentación, estructura de campaña y tácticas de optimización para resultados medibles en captación, posicionamiento y fidelización de audiencias.</p>
                <p className="text-sm" style={{ color: C.ink }}>Trabaja en colaboración directa con el equipo en la definición estratégica de campañas, contribuyendo al diseño de estrategias anuales de comunicación y a la alineación con los objetivos institucionales y comerciales.</p>
              </Card>
              <NavButtons onBack={back} onNext={next} points={STEPS[4].points} />
            </div>
          )}

          {step === "principios" && (
            <div>
              <StepHeader icon={ShieldCheck} title="Principios de Cultura CESUMA" sub="Lo que guía cómo trabajamos todos los días." />
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {PRINCIPIOS.map((p) => <div key={p.n} className="rounded-xl p-4 border" style={{ borderColor: "#E7E2D4" }}><div className="text-xs font-bold mb-1" style={{ color: C.orange }}>{p.n}. {p.title}</div><p className="text-xs" style={{ color: C.sub }}>{p.desc}</p></div>)}
              </div>
              <Card>
                <div className="flex items-center gap-2 mb-4"><PenLine size={18} style={{ color: C.navy }} /><span className="font-bold" style={{ color: C.navy }}>Firma digital</span></div>
                <label className="flex items-start gap-2.5 text-sm mb-3 cursor-pointer" style={{ color: C.ink }}>
                  <input type="checkbox" checked={signature.accepted} onChange={(e) => setSignature({ ...signature, accepted: e.target.checked })} className="mt-0.5" />
                  He leído y acepto los principios de cultura CESUMA.
                </label>
                <input type="text" placeholder="Escribe tu nombre completo" value={signature.name} onChange={(e) => setSignature({ ...signature, name: e.target.value })} className="w-full rounded-lg px-3 py-2.5 text-sm border mb-3" style={{ borderColor: "#E7E2D4" }} />
                {!signature.signed ? (
                  <button onClick={() => setSignature({ ...signature, signed: true })} disabled={!signature.accepted || !signature.name.trim()} className="px-5 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40" style={{ background: C.orange }}>Firmar manifiesto digital ✍️</button>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.green }}><Check size={18} /> Firmado por {signature.name}</div>
                )}
              </Card>
              <NavButtons onBack={back} onNext={next} nextDisabled={!signature.signed} points={STEPS[5].points} />
            </div>
          )}

          {step === "recursos" && (
            <div>
              <StepHeader icon={FolderOpen} title="Tu maletín digital" sub="Documentos clave que vas a usar seguido. Quedan guardados también en tu plataforma diaria." />
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left border-b" style={{ borderColor: "#E7E2D4" }}>
                      <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>Activo</th>
                      <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>Formato</th>
                      <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>Responsable</th>
                      <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}></th>
                    </tr></thead>
                    <tbody>
                      {RECURSOS.map((r) => (
                        <tr key={r.nombre} className="border-b last:border-0" style={{ borderColor: "#F1EDE0" }}>
                          <td className="py-3 pr-4 font-semibold" style={{ color: C.navy }}>{r.nombre}</td>
                          <td className="py-3 pr-4" style={{ color: C.sub }}>{r.formato}</td>
                          <td className="py-3 pr-4" style={{ color: C.sub }}>{r.responsable}</td>
                          <td className="py-3 pr-4"><span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: C.orange }}><Download size={14} /> Ver</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <NavButtons onBack={back} onNext={next} points={STEPS[6].points} />
            </div>
          )}

          {step === "victoria" && (
            <div>
              <StepHeader icon={Star} title="Tu victoria temprana" sub="Una meta pequeña y medible para que sientas un resultado real desde el primer día." />
              <Card className="mb-4">
                <div className="rounded-xl p-4 mb-4" style={{ background: C.cream }}>
                  <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.orange }}>Reto de tu primera semana</div>
                  <p className="font-semibold" style={{ color: C.navy }}>Analizar las campañas activas y proponer una mejora que reduzca el costo por adquisición.</p>
                </div>
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.orange }}>Instrucciones</div>
                <ol className="text-sm space-y-1.5 list-decimal pl-5" style={{ color: C.ink }}>
                  <li>Pide a tu capacitador acceso al reporte de campañas activas.</li>
                  <li>Identifica la campaña con el costo por adquisición más alto.</li>
                  <li>Propón una mejora concreta (segmentación, creatividad o presupuesto).</li>
                  <li>Entrega tu propuesta antes de que termine tu primera semana.</li>
                </ol>
                <div className="text-xs font-bold uppercase tracking-wide mt-4 mb-2" style={{ color: C.orange }}>Entregable</div>
                <input type="text" placeholder="Pega el link de tu documento o resumen aquí" value={victoria.entregableLink} onChange={(e) => setVictoria({ ...victoria, entregableLink: e.target.value })} disabled={victoria.entregado} className="w-full rounded-lg px-3 py-2.5 text-sm border mb-3 disabled:opacity-60" style={{ borderColor: "#E7E2D4" }} />
                {!victoria.entregado ? (
                  <button onClick={() => setVictoria({ ...victoria, entregado: true })} disabled={!victoria.entregableLink.trim()} className="px-5 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40" style={{ background: C.navy }}>Marcar como entregado</button>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.green }}><Check size={18} /> Entregado</div>
                )}
              </Card>
              <Card>
                <div className="flex items-center gap-2 mb-3"><Flag size={18} style={{ color: C.navy }} /><span className="font-bold" style={{ color: C.navy }}>Confirmación de tu capacitador</span></div>
                {!victoria.entregado && <p className="text-sm" style={{ color: C.sub }}>Disponible una vez que entregues tu propuesta.</p>}
                {victoria.entregado && !victoria.capacitadorConfirmado && (
                  <div>
                    <p className="text-sm mb-3" style={{ color: C.sub }}>Esta acción la realiza Heldrich Santizo para oficializar que tu victoria temprana quedó completa. En este prototipo puedes simularla.</p>
                    <button onClick={() => setVictoria({ ...victoria, capacitadorConfirmado: true })} className="px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: C.orange }}>Simular confirmación de Heldrich Santizo</button>
                  </div>
                )}
                {victoria.capacitadorConfirmado && <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.green }}><Check size={18} /> Confirmado por Heldrich Santizo — victoria temprana completada oficialmente.</div>}
              </Card>
              <NavButtons onBack={back} onNext={next} nextDisabled={!victoria.capacitadorConfirmado} points={STEPS[7].points} />
            </div>
          )}

          {step === "quiz" && (
            <div>
              <StepHeader icon={ClipboardCheck} title="Cuestionario de cultura CESUMA" sub={`Responde con lo que aprendiste en tu inducción. Necesitas al menos ${QUIZ_PASSING}/${QUIZ.length} correctas para continuar.`} />
              <Card>
                <div className="space-y-6">
                  {QUIZ.map((item, qi) => (
                    <div key={qi}>
                      <p className="font-semibold text-sm mb-2" style={{ color: C.navy }}>{qi + 1}. {item.q}</p>
                      <div className="space-y-1.5">
                        {item.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          let style = { borderColor: "#E7E2D4", color: C.ink };
                          if (quizSubmitted) {
                            if (oi === item.correct) style = { borderColor: C.green, background: `${C.green}0D`, color: C.green };
                            else if (selected) style = { borderColor: "#D1495B", background: "#D1495B0D", color: "#D1495B" };
                          } else if (selected) style = { borderColor: C.orange, background: `${C.orange}0D`, color: C.navy };
                          return (
                            <button key={oi} disabled={quizSubmitted} onClick={() => { const copy = [...quizAnswers]; copy[qi] = oi; setQuizAnswers(copy); }} className="w-full text-left text-sm px-3 py-2 rounded-lg border" style={style}>{opt}</button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {!quizSubmitted ? (
                  <button onClick={() => setQuizSubmitted(true)} disabled={quizAnswers.includes(null)} className="mt-6 px-5 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40" style={{ background: C.navy }}>Enviar respuestas</button>
                ) : quizPassed ? (
                  <div className="mt-6 rounded-xl p-4 flex items-center gap-3" style={{ background: `${C.green}0D` }}><Sparkles size={20} style={{ color: C.green }} /><span className="text-sm font-semibold" style={{ color: C.green }}>Obtuviste {quizScore}/{QUIZ.length} respuestas correctas. ¡Aprobado!</span></div>
                ) : (
                  <div className="mt-6 rounded-xl p-4" style={{ background: "#D1495B0D" }}>
                    <p className="text-sm font-semibold mb-3" style={{ color: "#D1495B" }}>Obtuviste {quizScore}/{QUIZ.length}. Necesitas al menos {QUIZ_PASSING}/{QUIZ.length} para continuar{quizAttempts > 0 ? ` (intento ${quizAttempts + 1})` : ""}.</p>
                    <button onClick={retryQuiz} className="px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: "#D1495B" }}>Volver a intentar</button>
                  </div>
                )}
              </Card>
              <NavButtons onBack={back} onNext={next} nextDisabled={!quizPassed} nextLabel="Finalizar inducción" points={quizSubmitted ? quizScore * 10 : STEPS[8].points} />
            </div>
          )}

          {step === "listo" && (
            <div>
              <div className="rounded-2xl p-10 sm:p-14 lg:p-16 text-white text-center relative overflow-hidden" style={{ background: GRAD }}>
                <Sparkles size={140} className="absolute -right-6 -top-6 opacity-10" />
                <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 mb-6">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center font-extrabold text-xs text-white" style={{ background: GRAD }}>M</div>
                  <span className="font-extrabold text-sm" style={{ color: C.navy }}>UNIVERSIDAD <span style={{ color: C.orange }}>CESUMA</span></span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">¡Estás listo para comenzar! 🎉</h2>
                <p className="text-white/80 max-w-md mx-auto mb-2">Completaste tu Kit de Bienvenida. A partir de hoy, tu día a día — actividades, objetivos y evaluación — vive en tu Centro de Mando.</p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-7" style={{ background: "rgba(255,255,255,0.15)" }}><Trophy size={15} style={{ color: C.orangeLight }} /> {totalPoints} puntos · {nivelLabel(totalPoints)}</div>
                <div>
                  {!activated ? (
                    <button onClick={() => setActivated(true)} className="px-8 py-3.5 rounded-full font-extrabold text-base inline-flex items-center gap-2" style={{ background: C.orange, boxShadow: "0 0 24px rgba(242,120,47,0.5)" }}>
                      Ingresar a mi Centro de Mando <ArrowRight size={18} />
                    </button>
                  ) : (
                    <div className="rounded-xl p-4 max-w-md mx-auto" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <div className="flex items-center justify-center gap-2 font-bold mb-1"><Check size={18} /> ¡Listo, {signature.name.split(" ")[0] || "bienvenido"}!</div>
                      <p className="text-sm text-white/80">Tu administrador de RRHH activará tu cuenta en el Centro de Mando con esta misma información. En cuanto esté lista, ahí verás tus actividades, tus objetivos del semestre y tu evaluación.</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/50 mt-6">Propuesta por Estrategia y Mejora Continua (EMC)</p>
              </div>
              <Card className="mt-6">
                <div className="space-y-2 text-sm">
                  {[
                    "Conociste la misión, visión e historia de CESUMA",
                    "Viste el mapa de valor y el organigrama de cada área",
                    "Conociste a tu capacitador (ya fue notificado)",
                    "Revisaste tu descripción de puesto",
                    "Firmaste el manifiesto de cultura",
                    "Revisaste tu maletín digital",
                    "Entregaste tu victoria temprana y tu capacitador la confirmó",
                    `Aprobaste el cuestionario (${quizScore}/${QUIZ.length} correctas)`,
                  ].map((t) => <div key={t} className="flex items-center gap-2.5"><CheckCircle2 size={16} style={{ color: C.green }} /><span style={{ color: C.ink }}>{t}</span></div>)}
                </div>
              </Card>
              <p className="text-center text-xs mt-6" style={{ color: C.sub }}>Este micrositio deja de usarse una vez activada tu cuenta en tu Centro de Mando.</p>
            </div>
          )}
      </div>
    </div>
  );
}
