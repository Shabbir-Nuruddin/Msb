import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

// ─── Brand + real MSB assets (from msbdubai.com) ───────────────────────────────
const LOGO = "/msb-logo.png";
const HERO_VIDEO = "https://msbdubai.com/wp-content/uploads/2026/01/MSB-Video.mp4";
const POSTER = "https://msbdubai.com/wp-content/uploads/2024/08/campus1.jpg";
const IMG_SECONDARY = "https://msbdubai.com/wp-content/uploads/2024/08/Secondary-Campus.jpg";
const IMG_JUNIOR = "https://msbdubai.com/wp-content/uploads/2024/08/junior-campus.jpg";
const IMG_LIFE = "https://msbdubai.com/wp-content/uploads/2026/01/AMC04275.jpg.webp";

// MSB's actual brand palette (from msbdubai.com)
const BLUE = "#2B4392";     // primary
const MAROON = "#952231";   // secondary accent
const NAVY = "#001049";     // headings / text
const INK = "#3a4663";      // body text
const TINT = "#eef3fb";     // pale blue surface
const BORDER = "#dde6f4";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "1985", label: "Established in Dubai" },
  { value: "1,600+", label: "Students" },
  { value: "76%", label: "A*–C at IGCSE" },
  { value: "1 : 10", label: "Teacher to student" },
];

const YEARS = [
  { year: "Year 11", level: "Cambridge IGCSE", codes: "0580 · 0610 · 0620 · 0625", note: "Build strong foundations across your IGCSE subjects.", color: BLUE },
  { year: "Year 12", level: "Cambridge AS Level", codes: "9709 · 9700 · 9701 · 9702", note: "Master the AS units that lead into full A Level.", color: MAROON },
  { year: "Year 13", level: "Cambridge A Level", codes: "Full AS + A2", note: "Complete the A Level syllabus and target your best grades.", color: BLUE },
];

const FEATURES = [
  { icon: "🤖", title: "AI-Generated Notes", tag: "Students", desc: "Comprehensive, exam-focused notes for any topic — aligned to your exact Cambridge syllabus in seconds." },
  { icon: "🗺️", title: "Personalised Roadmap", tag: "Students", desc: "A revision plan that adapts to your exam dates and weak topics, so you always know what to study next." },
  { icon: "📝", title: "Instant Mock Papers", tag: "Students", desc: "Full mock papers generated and marked against Cambridge mark schemes, with examiner-grade feedback." },
  { icon: "📊", title: "Progress Dashboard", tag: "Students", desc: "See your mastery by topic and subject, and spot weak areas before they cost you marks." },
  { icon: "👁️", title: "Parent Monitoring", tag: "Parents", desc: "Follow your child's study time, mock scores and streaks in real time — no app to install." },
  { icon: "🎯", title: "Teacher Targets", tag: "Teachers", desc: "Class analytics by year and section, plus AI-assisted targets you can set and share with parents." },
];

const ROLES = [
  { icon: "🎓", title: "Students", role: "student", cta: "Student Login", color: BLUE, points: ["AI notes for every Cambridge topic", "Personalised roadmap & exam countdown", "Papers generated and marked instantly", "Streaks & progress milestones"] },
  { icon: "👩‍🏫", title: "Teachers", role: "teacher", cta: "Teacher Portal", color: MAROON, points: ["Live class performance overview", "Set AI-assisted targets per student", "Spot weak topics across the group", "Support students proactively"] },
  { icon: "👨‍👩‍👧", title: "Parents", role: "parent", cta: "Parent Access", color: NAVY, points: ["Real-time study activity feed", "Mock paper scores & feedback", "Revision streaks & consistency", "Web-based — nothing to install"] },
];

const GALLERY = [
  { src: IMG_JUNIOR, label: "Junior Campus" },
  { src: IMG_SECONDARY, label: "Secondary Campus" },
  { src: IMG_LIFE, label: "Student life" },
];

const Chip = ({ children, color = BLUE }: { children: React.ReactNode; color?: string }) => (
  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: `${color}14`, color }}>
    {children}
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main style={{ fontFamily: "'Source Sans 3','Inter',sans-serif", background: "#fff", color: INK, minHeight: "100vh" }}>
      <SEO
        title="MSB Smart Revision — MSB Private School, Dubai"
        description="The official AI-powered revision platform for MSB Private School, Dubai. Cambridge IGCSE, AS & A Level notes, mock papers, roadmaps and parent monitoring."
        path="/"
      />

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: "rgba(255,255,255,0.92)", borderColor: BORDER }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="MSB Private School" className="h-11 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>MSB Smart Revision</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#9aa6bf" }}>MSB Private School · Dubai</div>
            </div>
          </div>
          <nav className="flex items-center gap-1.5">
            <a href="#about" className="hidden md:inline text-sm font-medium hover:opacity-70 px-3 py-2" style={{ color: "#54627d" }}>About</a>
            <a href="#curriculum" className="hidden md:inline text-sm font-medium hover:opacity-70 px-3 py-2" style={{ color: "#54627d" }}>Curriculum</a>
            <a href="#features" className="hidden md:inline text-sm font-medium hover:opacity-70 px-3 py-2" style={{ color: "#54627d" }}>Platform</a>
            <button onClick={() => navigate("/auth?role=student")} className="hidden sm:inline text-sm font-semibold px-4 py-2 hover:opacity-70" style={{ color: NAVY }}>Sign in</button>
            <button onClick={() => navigate("/auth?mode=signup")} className="px-5 py-2 rounded-full text-sm font-bold text-white shadow-sm hover:opacity-90" style={{ background: BLUE }}>Get started</button>
          </nav>
        </div>
      </header>

      {/* ── HERO — light, airy, video framed in a card ── */}
      <section className="relative overflow-hidden" style={{ background: "#fff" }}>
        {/* soft cloud glows */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full" style={{ background: `${BLUE}1f`, filter: "blur(90px)" }} />
        <div className="pointer-events-none absolute top-40 -left-24 h-80 w-80 rounded-full" style={{ background: `${MAROON}14`, filter: "blur(90px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: `${BLUE}12`, color: BLUE, border: `1px solid ${BLUE}22` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: MAROON }} /> Official AI revision platform · MSB Dubai
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>
              Revise smarter,<br /><span style={{ color: BLUE }}>the MSB way.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-3 max-w-lg" style={{ color: INK }}>
              AI notes, mock papers, roadmaps and live parent &amp; teacher dashboards — built exclusively for
              <span style={{ color: NAVY, fontWeight: 600 }}> MSB Private School</span> students sitting Cambridge IGCSE, AS &amp; A Level.
            </p>
            <p className="text-sm italic mb-8" style={{ color: MAROON }}>“To learning, and acquiring new skills and knowledge, there is no finish line.”</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={() => navigate("/auth?mode=signup&role=student")} className="px-7 py-3.5 rounded-full text-base font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: BLUE }}>
                Create student account →
              </button>
              <button onClick={() => navigate("/auth?role=teacher")} className="px-7 py-3.5 rounded-full text-base font-bold border-2 hover:bg-blue-50 transition-all" style={{ borderColor: BLUE, color: BLUE }}>
                Staff / Parent access
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-lg">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] mt-0.5" style={{ color: "#8a93ab" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video framed in a clean card */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] -z-10" style={{ background: `linear-gradient(135deg, ${BLUE}22, ${MAROON}1a)` }} />
            <div className="rounded-[1.6rem] overflow-hidden shadow-2xl border bg-white" style={{ borderColor: BORDER }}>
              <video autoPlay muted loop playsInline preload="metadata" poster={POSTER} className="w-full h-full object-cover" style={{ aspectRatio: "4 / 3" }}>
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
              <div className="flex items-center gap-2.5 px-5 py-3 border-t" style={{ borderColor: BORDER }}>
                <img src={LOGO} alt="" className="h-7 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="text-xs font-semibold" style={{ color: NAVY }}>Inside MSB Private School, Dubai</div>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: `${MAROON}14`, color: MAROON }}>Est. 1985</span>
              </div>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="border-t" style={{ borderColor: BORDER, background: "#fafbfe" }}>
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#9aa6bf" }}>
            <span>Cambridge International</span><span style={{ color: BORDER }}>•</span>
            <span>IGCSE</span><span style={{ color: BORDER }}>•</span>
            <span>AS Level</span><span style={{ color: BORDER }}>•</span>
            <span>A Level</span><span style={{ color: BORDER }}>•</span>
            <span>Dubai since 1985</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ── */}
      <section id="about" className="py-20 lg:py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative order-2 lg:order-1">
            <img src={IMG_SECONDARY} alt="MSB Secondary Campus, Dubai" loading="lazy" className="w-full rounded-3xl shadow-xl object-cover" style={{ height: 430 }} onError={(e) => { (e.target as HTMLImageElement).src = POSTER; }} />
            <div className="absolute -bottom-6 -right-6 rounded-2xl px-6 py-5 shadow-xl hidden md:block text-white" style={{ background: BLUE }}>
              <div className="text-3xl font-extrabold" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>40+ yrs</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/85">A Cambridge education</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Chip color={MAROON}>About MSB</Chip>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>
              We motivate our children to seek knowledge and to believe in themselves.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: INK }}>
              Since 1985, MSB Private School has delivered the internationally recognised Cambridge curriculum in Dubai —
              from the Foundation Stage through to Cambridge IGCSE, AS and A Level. With over 1,600 students across two
              campuses just 100 metres apart, MSB is part of a global network of 25 schools across 7 countries.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: INK }}>
              MSB Smart Revision brings that same standard online — combining the school's academic rigour with the latest
              AI to give every student the best possible chance in their Cambridge examinations.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📍", text: "Dubai, UAE" },
                { icon: "🎓", text: "Cambridge (CAIE)" },
                { icon: "📚", text: "IGCSE · AS · A Level" },
                { icon: "🏛️", text: "Two campuses" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2.5 rounded-xl border px-4 py-3" style={{ borderColor: BORDER, background: TINT }}>
                  <span className="text-xl">{b.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: NAVY }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM / YEARS ── */}
      <section id="curriculum" className="py-20 lg:py-24" style={{ background: TINT }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <Chip>Your Cambridge journey</Chip>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Built around your year group</h2>
            <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: INK }}>Tell us your year and the platform tailors every note, question and mark scheme to your exact syllabus.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {YEARS.map((y, i) => (
              <div key={y.year} className="rounded-2xl p-7 bg-white shadow-sm hover:shadow-lg transition-all border" style={{ borderColor: BORDER, borderTop: `4px solid ${y.color}` }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: y.color }}>Step {i + 1}</div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>{y.year}</div>
                <div className="text-sm font-semibold mb-3" style={{ color: y.color }}>{y.level}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: INK }}>{y.note}</p>
                <div className="text-[11px] font-mono px-2.5 py-1 rounded-md inline-block" style={{ background: TINT, color: "#54627d" }}>{y.codes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 lg:py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <Chip>The platform</Chip>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Everything a student, teacher<br className="hidden sm:inline" /> and parent needs</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: INK }}>One platform, three roles — included free for the whole MSB community.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const c = i % 3 === 1 ? MAROON : BLUE;
              return (
                <div key={f.title} className="p-7 rounded-2xl border hover:shadow-lg transition-all bg-white" style={{ borderColor: BORDER }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{f.icon}</div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ background: `${c}14`, color: c }}>{f.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: NAVY }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: INK }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARENT HIGHLIGHT ── */}
      <section className="py-20 lg:py-24" style={{ background: TINT }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl border bg-white" style={{ borderColor: BORDER }}>
            <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: BORDER, background: NAVY }}>
              <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <span className="text-white/60 text-xs ml-2">Parent Dashboard · Aisha Rahman</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm" style={{ color: NAVY }}>Your child's revision this week</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#dcfce7", color: "#15803d" }}>Active</span>
              </div>
              {[
                { subject: "📐 Mathematics", sessions: 4, score: "78%", bar: 78 },
                { subject: "🧪 Chemistry", sessions: 3, score: "65%", bar: 65 },
                { subject: "⚛️ Physics", sessions: 2, score: "82%", bar: 82 },
              ].map((row) => (
                <div key={row.subject} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: "#33415c" }}>{row.subject}</span>
                    <span className="text-xs font-mono" style={{ color: BLUE }}>{row.score} avg mock</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#dbe6f7" }}>
                    <div className="h-2 rounded-full" style={{ width: `${row.bar}%`, background: BLUE }} />
                  </div>
                  <div className="text-xs" style={{ color: "#9aa6bf" }}>{row.sessions} sessions this week</div>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: BORDER }}>
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: NAVY }}>12-day revision streak</div>
                  <div className="text-xs" style={{ color: "#9aa6bf" }}>Last active: today at 4:32 PM</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Chip color={MAROON}>For Parents</Chip>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Stay close to your<br />child's progress</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: INK }}>
              A dedicated dashboard shows exactly how much your child is revising, which subjects they're practising,
              their mock scores, and whether they're keeping up their streak — all updated in real time.
            </p>
            <ul className="space-y-3 mb-8">
              {["Live study activity as it happens", "Mock paper scores with subject breakdowns", "Streak & consistency tracking", "Free for all MSB families — no app required"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "#33415c" }}>
                  <span className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ background: BLUE }}>✓</span>{p}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("/auth?role=parent")} className="px-7 py-3.5 rounded-full text-base font-bold text-white shadow-lg hover:opacity-90" style={{ background: BLUE }}>Parent access →</button>
          </div>
        </div>
      </section>

      {/* ── THREE ROLES (light cards) ── */}
      <section className="py-20 lg:py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <Chip>One platform</Chip>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Built for the whole school community</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ROLES.map((r) => (
              <div key={r.title} className="p-8 rounded-2xl flex flex-col gap-5 border shadow-sm hover:shadow-lg transition-all bg-white" style={{ borderColor: BORDER, borderTop: `4px solid ${r.color}` }}>
                <div className="text-4xl">{r.icon}</div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>{r.title}</h3>
                <ul className="space-y-2 flex-1">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: INK }}>
                      <span className="mt-1 shrink-0 h-1.5 w-1.5 rounded-full" style={{ background: r.color }} />{p}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/auth?role=${r.role}`)} className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition-all" style={{ background: r.color }}>{r.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS GALLERY ── */}
      <section className="py-20" style={{ background: TINT }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <Chip color={MAROON}>Life at MSB</Chip>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Two campuses, one community</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {GALLERY.map((g) => (
              <div key={g.label} className="relative rounded-2xl overflow-hidden shadow-md group">
                <img src={g.src} alt={g.label} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = POSTER; }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,16,73,0.7), transparent 55%)" }} />
                <div className="absolute bottom-3 left-4 text-white font-semibold text-sm">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: `${BLUE}12`, color: BLUE }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: MAROON }} /> Free for all MSB students
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: NAVY }}>Ready to start revising smarter?</h2>
          <p className="text-lg mb-10" style={{ color: INK }}>Set up takes less than two minutes — pick your year, choose your subjects, and your roadmap is ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/auth?mode=signup&role=student")} className="px-10 py-4 rounded-full text-base font-bold text-white shadow-xl hover:opacity-90" style={{ background: BLUE }}>Create free student account →</button>
            <button onClick={() => navigate("/auth?role=parent")} className="px-10 py-4 rounded-full text-base font-bold border-2 hover:bg-blue-50" style={{ borderColor: BLUE, color: BLUE }}>Parent / Teacher access</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: NAVY }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO} alt="MSB" className="h-12 w-auto object-contain bg-white rounded-lg p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div>
                  <div className="font-bold text-white text-sm" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>MSB Private School</div>
                  <div className="text-xs text-white/45">Smart Revision · Internal Platform</div>
                </div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed max-w-xs">Inspiring excellence in Dubai since 1985 · A Cambridge education for every learner.</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/45 mb-4">Access</div>
              <div className="space-y-2">
                {[
                  { label: "Student Login", role: "student" },
                  { label: "Teacher Portal", role: "teacher" },
                  { label: "Parent Access", role: "parent" },
                  { label: "Create Account", extra: "?mode=signup" },
                ].map((l) => (
                  <button key={l.label} onClick={() => navigate(`/auth?role=${l.role || "student"}${l.extra || ""}`)} className="block text-sm text-white/60 hover:text-white text-left">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/45 mb-4">Contact MSB</div>
              <div className="space-y-2 text-sm text-white/60">
                <a href="mailto:info@msbdubai.com" className="block hover:text-white">info@msbdubai.com</a>
                <a href="tel:+97142677100" className="block hover:text-white">+971 4 2677100</a>
                <a href="https://msbdubai.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white">msbdubai.com ↗</a>
                <p className="text-white/40 text-xs pt-2">P.O. Box 94550<br />Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <p className="text-xs text-white/35">© {new Date().getFullYear()} MSB Private School, Dubai. For MSB members only.</p>
            <div className="flex items-center gap-4 text-xs text-white/45">
              <button onClick={() => navigate("/privacy")} className="hover:text-white">Privacy Policy</button>
              <span className="text-white/20">·</span>
              <button onClick={() => navigate("/terms")} className="hover:text-white">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
