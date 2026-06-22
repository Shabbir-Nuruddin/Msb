import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

const MSB_LOGO = "/msb-logo.svg";
// Drop an MSB campus photo URL into these to show real photography; otherwise
// the brand gradient panels are used.
const HERO_IMAGE = "";
const CAMPUS_IMAGE = "";

const RED = "#1850C0";       // MSB royal blue
const RED_DARK = "#16306E";  // MSB deep navy

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "1985", label: "Cambridge Since" },
  { value: "1,600+", label: "Students Enrolled" },
  { value: "76%", label: "A*–C at IGCSE" },
  { value: "1 : 10", label: "Teacher to Student" },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Generated Notes",
    desc: "Instantly create comprehensive revision notes for any topic. Aligned to your exact Cambridge syllabus — IGCSE, AS and A Level.",
    tag: "Students",
  },
  {
    icon: "🗺️",
    title: "Personalised Roadmap",
    desc: "A dynamic revision plan that adapts to your exam dates and weak topics. Always know what to study next.",
    tag: "Students",
  },
  {
    icon: "📝",
    title: "Instant Mock Papers",
    desc: "Generate full mock papers and receive detailed, Cambridge mark-scheme-accurate feedback within seconds.",
    tag: "Students",
  },
  {
    icon: "📊",
    title: "Progress Dashboard",
    desc: "Visualise improvement over time. Identify weak topics before they cost you marks in the real exam.",
    tag: "Students",
  },
  {
    icon: "👁️",
    title: "Parent Monitoring",
    desc: "See exactly how much your child is studying, their mock scores, streak, and which subjects need attention — in real time.",
    tag: "Parents",
  },
  {
    icon: "🏫",
    title: "Teacher Analytics",
    desc: "Track performance across your whole class, set AI-assisted targets, and intervene early with data-backed insights.",
    tag: "Teachers",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create your account", desc: "Register in under a minute using your school email. Choose your role — Student, Teacher, or Parent." },
  { step: "02", title: "Choose your year", desc: "Tell us your year group — Year 11 (IGCSE), Year 12 (AS) or Year 13 (A Level) — and pick your subjects. Everything personalises to your Cambridge syllabus." },
  { step: "03", title: "Start revising with AI", desc: "Generate notes, build your roadmap, attempt mock papers, and track your progress all in one place." },
  { step: "04", title: "Parents & Teachers stay informed", desc: "Parents and teachers get a live view of study activity, scores, and progress — no chasing needed." },
];

const SUBJECTS = [
  { emoji: "📐", name: "Mathematics" },
  { emoji: "⚛️", name: "Physics" },
  { emoji: "🧪", name: "Chemistry" },
  { emoji: "🧬", name: "Biology" },
];

const ROLES = [
  {
    icon: "🎓",
    title: "Students",
    points: [
      "AI notes for every topic in your Cambridge syllabus",
      "Personalised revision roadmap & exam countdown",
      "Practice papers generated & marked instantly",
      "Streak tracking & progress milestones",
    ],
    cta: "Student Login",
    role: "student",
  },
  {
    icon: "👩‍🏫",
    title: "Teachers",
    points: [
      "Live class performance overview",
      "Set AI-assisted targets for each student",
      "Identify weak topics across the group",
      "Support struggling students proactively",
    ],
    cta: "Teacher Portal",
    role: "teacher",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parents",
    points: [
      "Real-time study activity feed",
      "View mock paper scores & feedback",
      "Track revision streaks & consistency",
      "No app install required — web-based",
    ],
    cta: "Parent Access",
    role: "parent",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main style={{ fontFamily: "'Source Sans 3','Inter',sans-serif", background: "#fff", color: "#1a1a1a", minHeight: "100vh" }}>
      <SEO
        title="MSB Smart Revision — MSB Private School, Dubai"
        description="The official AI-powered revision platform for MSB Private School, Dubai. Cambridge IGCSE, AS & A Level — built for students, teachers and parents."
        path="/"
      />

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ background: "rgba(255,255,255,0.95)", borderColor: "#dbe6f7" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={MSB_LOGO} alt="MSB" className="h-11 w-11 rounded-full object-contain bg-white shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div>
              <div className="font-bold text-sm sm:text-base leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
                MSB Private School
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#999" }}>
                Smart Revision · Dubai
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a href="#features" className="hidden md:inline text-sm font-medium hover:opacity-70 transition-opacity px-3 py-2" style={{ color: "#555" }}>Features</a>
            <a href="#how-it-works" className="hidden md:inline text-sm font-medium hover:opacity-70 transition-opacity px-3 py-2" style={{ color: "#555" }}>How it works</a>
            <a href="#roles" className="hidden md:inline text-sm font-medium hover:opacity-70 transition-opacity px-3 py-2" style={{ color: "#555" }}>Roles</a>
            <button onClick={() => navigate("/auth?role=student")} className="hidden sm:inline font-semibold text-sm px-4 py-2 hover:opacity-70 transition-opacity" style={{ color: RED_DARK }}>
              Sign in
            </button>
            <button onClick={() => navigate("/auth?mode=signup")} className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 shadow-sm" style={{ background: RED }}>
              Get started
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {HERO_IMAGE && (
          <img src={HERO_IMAGE} alt="MSB students" className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${RED_DARK} 0%, ${RED_DARK}f0 40%, ${RED}dd 75%, ${RED}99 100%)` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 w-full py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Exclusively for MSB · Dubai, UAE
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
              MSB Smart<br />
              <span style={{ color: "#BFD4FF" }}>Revision</span>
            </h1>

            <p className="text-xl text-white/90 mb-4 max-w-xl leading-relaxed">
              The official AI-powered revision platform built exclusively for
              <span className="text-white font-semibold"> MSB Private School, Dubai</span>.
            </p>
            <p className="text-sm text-white/60 mb-10">
              Cambridge IGCSE, AS & A Level · Notes · Mock papers · Roadmaps · Parent monitoring — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button onClick={() => navigate("/auth?mode=signup&role=student")}
                className="px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-105 shadow-xl"
                style={{ background: "#fff", color: RED_DARK }}>
                Create student account →
              </button>
              <button onClick={() => navigate("/auth?role=teacher")}
                className="px-8 py-4 rounded-full text-base font-bold text-white transition-all border-2 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.55)" }}>
                Staff / Parent access
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{s.value}</div>
                  <div className="text-xs text-white/55 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE SCHOOL ── */}
      <section className="py-20" style={{ background: "#f6f8fd" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: "#e8f0fc", color: RED_DARK }}>
                About MSB
              </div>
              <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
                A Cambridge education<br />in Dubai since 1985
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
                MSB Private School has been nurturing young minds in Dubai since 1985, delivering the
                internationally recognised Cambridge curriculum from the Foundation Stage right through to
                Cambridge IGCSE, AS and A Level. With over 1,600 students across two campuses, MSB motivates
                children to seek knowledge and to believe in themselves.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
                MSB Smart Revision is built exclusively for MSB students, teachers, and parents — combining
                the school's academic standards with the latest AI to give every student the best possible
                chance in their Cambridge examinations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "📍", text: "Dubai, UAE" },
                  { icon: "🎓", text: "Cambridge (CAIE)" },
                  { icon: "📚", text: "IGCSE · AS · A Level" },
                  { icon: "🏆", text: "Established 1985" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-sm" style={{ color: "#444" }}>
                    <span className="text-xl">{b.icon}</span>
                    <span className="font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {CAMPUS_IMAGE ? (
                <img
                  src={CAMPUS_IMAGE}
                  alt="MSB campus"
                  className="w-full rounded-2xl shadow-xl object-cover"
                  style={{ height: "380px" }}
                />
              ) : (
                <div className="w-full rounded-2xl shadow-xl flex items-center justify-center"
                  style={{ height: "380px", background: `linear-gradient(135deg, ${RED_DARK}, ${RED})` }}>
                  <img src={MSB_LOGO} alt="MSB crest" className="h-56 w-56 object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-lg hidden md:block"
                style={{ background: RED, color: "#fff" }}>
                <div className="text-2xl font-extrabold" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>40+</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-white/80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 lg:py-28" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "#e8f0fc", color: RED_DARK }}>
              Platform Features
            </div>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
              Everything a student, teacher<br className="hidden sm:inline" /> and parent needs
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#777" }}>
              One platform. Three roles. No subscriptions, no paywalls — every feature is unlocked for all MSB members.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-7 rounded-2xl border hover:shadow-lg transition-all group" style={{ borderColor: "#dbe6f7", background: "#fff", borderTop: `4px solid ${RED}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{f.icon}</div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#e8f0fc", color: RED_DARK }}>{f.tag}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: RED_DARK }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARENT MONITORING HIGHLIGHT ── */}
      <section className="py-20" style={{ background: "#f6f8fd" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Visual mock */}
            <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: "#dbe6f7", background: "#fff" }}>
              <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: "#dbe6f7", background: RED_DARK }}>
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="text-white/60 text-xs ml-2">Parent Dashboard · Aisha Rahman</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm" style={{ color: RED_DARK }}>Your child's revision this week</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#dcfce7", color: "#15803d" }}>Active</span>
                </div>
                {[
                  { subject: "📐 Mathematics", sessions: 4, score: "78%", bar: 78 },
                  { subject: "🧪 Chemistry",   sessions: 3, score: "65%", bar: 65 },
                  { subject: "⚛️ Physics",      sessions: 2, score: "82%", bar: 82 },
                ].map((row) => (
                  <div key={row.subject} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium" style={{ color: "#333" }}>{row.subject}</span>
                      <span className="text-xs font-mono" style={{ color: RED }}>{row.score} avg mock</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "#dbe6f7" }}>
                      <div className="h-2 rounded-full" style={{ width: `${row.bar}%`, background: RED }} />
                    </div>
                    <div className="text-xs" style={{ color: "#999" }}>{row.sessions} sessions this week</div>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#dbe6f7" }}>
                  <span className="text-2xl">🔥</span>
                  <div>
                    <div className="font-bold text-sm" style={{ color: RED_DARK }}>12-day revision streak</div>
                    <div className="text-xs" style={{ color: "#999" }}>Last active: today at 4:32 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: "#e8f0fc", color: RED_DARK }}>
                For Parents
              </div>
              <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
                Stay close to your<br />child's progress
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#555" }}>
                As a parent you get a dedicated dashboard showing exactly how much your child is revising,
                which subjects they're practising, their mock paper scores, and whether they're keeping
                up their revision streak — all updated in real time.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Live study activity — see sessions as they happen",
                  "Mock paper scores with subject breakdowns",
                  "Streak & consistency tracking day by day",
                  "No app needed — works in any browser",
                  "Completely free — included for all MSB families",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm" style={{ color: "#444" }}>
                    <span className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ background: RED }}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate("/auth?role=parent")}
                className="px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:opacity-90 shadow-lg"
                style={{ background: RED_DARK }}>
                Parent access →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 lg:py-28" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "#e8f0fc", color: RED_DARK }}>
              How it works
            </div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
              Up and running in minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative p-7 rounded-2xl border" style={{ borderColor: "#dbe6f7", background: "#fff" }}>
                <div className="text-5xl font-black mb-4" style={{ color: "#e8f0fc", fontFamily: "'Playfair Display',Georgia,serif" }}>{step.step}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: RED_DARK }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECTS ── */}
      <section className="py-16" style={{ background: "#f6f8fd" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
              Core Cambridge subjects, fully AI-supported
            </h2>
            <p className="text-sm" style={{ color: "#999" }}>Cambridge IGCSE, AS & A Level — aligned to your MSB year group</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SUBJECTS.map((s) => (
              <div key={s.name} className="flex items-center gap-2 px-5 py-3 rounded-full border font-semibold text-sm transition-all hover:shadow-md"
                style={{ borderColor: "#dbe6f7", background: "#fff", color: RED_DARK }}>
                <span className="text-xl">{s.emoji}</span>
                {s.name}
              </div>
            ))}
            <div className="flex items-center gap-2 px-5 py-3 rounded-full border font-semibold text-sm"
              style={{ borderColor: "#dbe6f7", background: "#fff", color: "#999" }}>
              + more coming
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE ROLES ── */}
      <section id="roles" className="py-20 lg:py-28" style={{ background: RED_DARK }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              One platform
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
              Built for the whole school community
            </h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">
              Students, teachers and parents each get a role-specific experience — one login, one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map((r) => (
              <div key={r.title} className="p-8 rounded-2xl flex flex-col gap-5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="text-4xl">{r.icon}</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{r.title}</h3>
                <ul className="space-y-2 flex-1">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[10px]" style={{ background: "rgba(255,255,255,0.2)" }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/auth?role=${r.role}`)}
                  className="mt-2 px-5 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
                  style={{ background: "#fff", color: RED_DARK }}>
                  {r.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "#e8f0fc", color: RED_DARK }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: RED }} />
            Free for all MSB students
          </div>
          <h2 className="text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: RED_DARK }}>
            Ready to start revising smarter?
          </h2>
          <p className="text-lg mb-10" style={{ color: "#777" }}>
            Join MSB students already using AI to prepare for their Cambridge exams. Set up takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/auth?mode=signup&role=student")}
              className="px-10 py-4 rounded-full text-base font-bold text-white transition-all hover:opacity-90 shadow-xl"
              style={{ background: RED }}>
              Create free student account →
            </button>
            <button onClick={() => navigate("/auth?role=parent")}
              className="px-10 py-4 rounded-full text-base font-bold transition-all border-2 hover:bg-blue-50"
              style={{ borderColor: RED, color: RED_DARK }}>
              Parent / Teacher access
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={MSB_LOGO} alt="MSB" className="h-10 w-10 rounded-full object-contain bg-white"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div>
                  <div className="font-bold text-white text-sm leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                    MSB Private School
                  </div>
                  <div className="text-xs text-white/40">Internal Revision Platform</div>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                A Cambridge Education · Inspiring Excellence Since 1985 · Dubai, UAE
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Access</div>
              <div className="space-y-2">
                {[
                  { label: "Student Login", role: "student" },
                  { label: "Teacher Portal", role: "teacher" },
                  { label: "Parent Access", role: "parent" },
                  { label: "Create Account", extra: "?mode=signup" },
                ].map((l) => (
                  <button key={l.label}
                    onClick={() => navigate(`/auth?role=${l.role || "student"}${l.extra || ""}`)}
                    className="block text-sm text-white/55 hover:text-white/90 transition-colors text-left">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact</div>
              <div className="space-y-2 text-sm text-white/55">
                <a href="mailto:info@msbdubai.com" className="block hover:text-white/90 transition-colors">info@msbdubai.com</a>
                <a href="https://msbdubai.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white/90 transition-colors">msbdubai.com ↗</a>
                <p className="text-white/30 text-xs pt-2">
                  MSB Private School<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: "#333" }}>
            <p className="text-xs text-white/30">© {new Date().getFullYear()} MSB Private School, Dubai. For MSB members only.</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <button onClick={() => navigate("/privacy")} className="hover:text-white/80 transition-colors">Privacy Policy</button>
              <span className="text-white/20">·</span>
              <button onClick={() => navigate("/terms")} className="hover:text-white/80 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
