import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMyRole } from "@/lib/useMyRole";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ApexLogo } from "@/components/ApexLogo";
import LoadingGameOverlay from "@/components/game/LoadingGameOverlay";
import {
  SubjectCode, GRADES, Grade, Board, UnitMeta, getSubjectsForBoard, formatDuration,
} from "@/lib/subjects";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { scheduleOnboardingEmails } from "@/lib/onboardingEmails";

interface UnitInput {
  selected: boolean;
}
interface SubjectInput {
  selected: boolean;
  target_grade: Grade;
  current_grade: Grade;
  units: Record<number, UnitInput>;
}

// MSB is a Cambridge-only school. Onboarding asks which year group the student
// is in, and maps that to the right Cambridge board + unit scope:
//   Year 11 → Cambridge IGCSE
//   Year 12 → Cambridge AS Level (AS units only — the non-A2 units)
//   Year 13 → Cambridge A Level (full AS + A2 units)
type Year = "11" | "12" | "13";
interface YearMeta {
  id: Year;
  name: string;
  level: string;
  board: Board;
  asOnly: boolean;
  spec: string;
}
const YEARS: YearMeta[] = [
  { id: "11", name: "Year 11", level: "Cambridge IGCSE",    board: "cie-igcse", asOnly: false, spec: "0580 · 0610 · 0620 · 0625" },
  { id: "12", name: "Year 12", level: "Cambridge AS Level", board: "cie",       asOnly: true,  spec: "9709 · 9700 · 9701 · 9702 (AS)" },
  { id: "13", name: "Year 13", level: "Cambridge A Level",  board: "cie",       asOnly: false, spec: "9709 · 9700 · 9701 · 9702 (A2)" },
];
const yearMeta = (y: Year) => YEARS.find((x) => x.id === y)!;

const STATS = [
  "Students who study 45 mins/day improve by 1.5 grades on average.",
  "Spaced repetition beats cramming by 2x in long-term recall.",
  "Past paper practice in the final 2 weeks correlates with +1 grade.",
  "Daily streaks predict exam outcomes better than IQ.",
  "Active recall is 3x more effective than re-reading notes.",
];

// Sentinel date: 1 year out. Replaced by the user's actual scheduled tests
// from the Exams page, which drives urgency timers.
const sentinelFutureDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

// Units in scope for a subject under a given year group (AS hides the A2 units).
const visibleUnits = (b: Board, aOnly: boolean, code: SubjectCode): UnitMeta[] => {
  const units = getSubjectsForBoard(b)[code]?.units || [];
  return aOnly ? units.filter((u) => !u.aLevelOnly) : units;
};

const buildInitialSubjects = (b: Board, aOnly: boolean): Record<SubjectCode, SubjectInput> => {
  const list = Object.values(getSubjectsForBoard(b));
  return list.reduce((a, s) => ({
    ...a,
    [s.code]: {
      selected: false,
      target_grade: "A" as Grade,
      current_grade: "C" as Grade,
      // Pre-tick every unit that's in scope for this year group.
      units: visibleUnits(b, aOnly, s.code).reduce((u: any, unit) => ({
        ...u,
        [unit.number]: { selected: true },
      }), {} as Record<number, UnitInput>),
    },
  }), {} as Record<SubjectCode, SubjectInput>);
};

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile: roleProfile } = useMyRole();

  // Teachers and parents must never see student onboarding / roadmap generation.
  useEffect(() => {
    if (roleProfile && roleProfile.role !== "student") {
      navigate(roleProfile.role === "teacher" ? "/teacher" : "/parent", { replace: true });
    }
  }, [roleProfile, navigate]);

  const [step, setStep] = useState(0);
  const [year, setYear] = useState<Year>("13");
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [firstName, setFirstName] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [subjects, setSubjects] = useState<Record<SubjectCode, SubjectInput>>(() => buildInitialSubjects("cie", false));
  const [statIdx, setStatIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const board = yearMeta(year).board;
  const asOnly = yearMeta(year).asOnly;

  // If the user signed in via Google (no first_name on profile), prompt for it,
  // and default the year from the grade they set during student setup.
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("first_name, grade").eq("id", user.id).maybeSingle();
      const existing = (data?.first_name || "").trim();
      let resolvedName = existing;
      if (existing) {
        setFirstName(existing);
        setNeedsName(false);
      } else {
        const meta: any = (user as any)?.user_metadata || {};
        const fallback = (meta.given_name || meta.first_name || (meta.full_name || meta.name || "").split(" ")[0] || "").trim();
        if (fallback) {
          setFirstName(fallback);
          resolvedName = fallback;
        }
        setNeedsName(true);
      }
      // Prefill the year from the grade chosen during student setup.
      const grade = (data?.grade || "").toString();
      const m = grade.match(/1[123]/);
      if (m) {
        const y = m[0] as Year;
        setYear(y);
        setSubjects(buildInitialSubjects(yearMeta(y).board, yearMeta(y).asOnly));
      }
      if (user.email) {
        void scheduleOnboardingEmails({
          userId: user.id,
          email: user.email,
          firstName: resolvedName || null,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const SUBJECT_LIST = Object.values(getSubjectsForBoard(board));

  const handleYearChange = (y: Year) => {
    setYear(y);
    const m = yearMeta(y);
    setSubjects(buildInitialSubjects(m.board, m.asOnly));
  };

  const selectedSubjects = SUBJECT_LIST.filter((s) => subjects[s.code]?.selected);
  const selectedCount = selectedSubjects.length;

  const updateSubject = (code: SubjectCode, patch: Partial<SubjectInput>) =>
    setSubjects((p) => ({ ...p, [code]: { ...p[code], ...patch } }));
  const updateUnit = (code: SubjectCode, unitNum: number, patch: Partial<UnitInput>) =>
    setSubjects((p) => ({
      ...p,
      [code]: {
        ...p[code],
        units: { ...p[code].units, [unitNum]: { ...p[code].units[unitNum], ...patch } },
      },
    }));

  const handleSubmit = async () => {
    if (!user) return;

    const placeholderDate = sentinelFutureDate();
    const rows: any[] = [];
    for (const s of SUBJECT_LIST) {
      if (!subjects[s.code].selected) continue;
      for (const unit of visibleUnits(board, asOnly, s.code)) {
        const u = subjects[s.code].units[unit.number];
        if (!u?.selected) continue;
        rows.push({
          user_id: user.id,
          subject: s.code,
          unit_number: unit.number,
          unit_name: unit.name,
          paper_duration_minutes: unit.durationMinutes,
          exam_date: placeholderDate, // user adds real dates via Exams page
          target_grade: subjects[s.code].target_grade,
          current_grade: subjects[s.code].current_grade,
        });
      }
    }
    if (rows.length === 0) { toast.error("Pick at least one unit."); return; }

    setLoading(true);
    setStep(4);
    setProgress(4);
    const statTimer = setInterval(() => setStatIdx((i) => (i + 1) % STATS.length), 2200);

    try {
      setProgress(10);
      await supabase.from("user_subjects").delete().eq("user_id", user.id);
      const { error: e1 } = await supabase.from("user_subjects").insert(rows);
      if (e1) throw e1;
      setProgress(25);

      const profileUpdates: any = {
        onboarded: true,
        exam_board: board,
        grade: `Year ${year}`,
        hours_per_day: Math.max(1, Math.round(hoursPerDay)),
        theme: "msb",
      };
      if (firstName.trim()) profileUpdates.first_name = firstName.trim();
      const { error: e2 } = await supabase.from("profiles").update(profileUpdates).eq("id", user.id);
      if (e2) throw e2;
      setProgress(40);

      try {
        const { generateAndPersistRoadmap } = await import("@/lib/persistRoadmap");
        await generateAndPersistRoadmap(
          user.id,
          rows.map((r) => ({
            subject: r.subject,
            unit_number: r.unit_number,
            unit_name: r.unit_name,
            exam_date: r.exam_date,
            target_grade: r.target_grade,
            current_grade: r.current_grade,
          })),
          { weeklyMinutes: hoursPerDay * 60 * 7, studyStartTime: "16:00" }
        );
      } catch (rmErr) {
        console.error("Roadmap persistence failed", rmErr);
      }
      setProgress(70);

      try {
        const { generateRoadmapForUser } = await import("@/lib/roadmapNodes");
        await generateRoadmapForUser(user.id);
      } catch (rnErr) {
        console.error("Node roadmap generation failed", rnErr);
      }
      setProgress(100);

      clearInterval(statTimer);
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      clearInterval(statTimer);
      console.error("[Onboarding] handleSubmit failed", err);
      const msg =
        err instanceof Error && err.message
          ? err.message
          : (err as { message?: string; details?: string; hint?: string } | null)?.message
          || (err as { details?: string } | null)?.details
          || "Setup failed — please try again. If it keeps failing, screenshot this and message support.";
      toast.error(msg);
      setStep(3);
      setProgress(0);
      setLoading(false);
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--gradient-hero)" }}>
        <div className="text-center max-w-xl animate-fade-in">
          <ApexLogo size={48} className="justify-center mb-12" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Building your personalised<br/>revision roadmap…</h2>
          <p className="text-muted-foreground mb-12 font-mono text-sm h-6 transition-all">{STATS[statIdx]}</p>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-3 font-mono">{progress}%</div>
        </div>
        <LoadingGameOverlay open={step === 4} delayMs={1200} note="Setting up your roadmap — this closes itself when it's ready." />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <ApexLogo showTagline />
          <div className="font-mono text-xs text-muted-foreground">STEP {step + 1} / 4</div>
        </div>

        {step === 0 && (
          <div className="animate-in-up">
            {needsName && (
              <div className="glass-card rounded-2xl p-6 mb-8 max-w-md">
                <Label htmlFor="ob_name" className="text-sm font-semibold">What should we call you?</Label>
                <p className="text-xs text-muted-foreground mt-1 mb-3">We'll use this name when your tutor talks to you.</p>
                <Input
                  id="ob_name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="e.g. Aisha"
                  maxLength={40}
                  pattern="^[A-Za-z][A-Za-z'\- ]*$"
                  className="h-11"
                  autoFocus
                />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Which year are you in?</h1>
            <p className="text-muted-foreground mb-10">MSB follows the Cambridge curriculum. We'll tailor every note, question and mark scheme to your exact year and syllabus.</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {YEARS.map((y) => {
                const sel = year === y.id;
                return (
                  <button key={y.id} onClick={() => handleYearChange(y.id)}
                    className={`glass-card rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-0.5 ${sel ? "border-primary glow-primary" : "hover:border-primary/30"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="font-bold text-lg">{y.name}</div>
                      <Checkbox checked={sel} className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    </div>
                    <div className="text-sm text-primary font-semibold">{y.level}</div>
                    <div className="text-[11px] font-mono text-muted-foreground mt-2">{y.spec}</div>
                  </button>
                );
              })}
            </div>
            <Button
              size="lg"
              disabled={needsName && !firstName.trim()}
              onClick={() => {
                if (needsName && !/^[A-Za-z][A-Za-z'\- ]*$/.test(firstName.trim())) {
                  toast.error("Please enter a name (letters only).");
                  return;
                }
                setStep(1);
              }}
              className="bg-primary hover:bg-primary/90 h-12 px-8"
            >
              Continue as {yearMeta(year).name} · {yearMeta(year).level} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Which subjects are you taking?</h1>
            <p className="text-muted-foreground mb-10">Pick all that apply. You'll choose units next.</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {SUBJECT_LIST.map(s => {
                const sel = subjects[s.code].selected;
                return (
                  <button
                    key={s.code}
                    onClick={() => updateSubject(s.code, { selected: !sel })}
                    className={`glass-card rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-0.5 ${sel ? "border-primary glow-primary" : "hover:border-primary/30"}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{s.emoji}</div>
                      <Checkbox checked={sel} className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    </div>
                    <div className="font-bold text-lg">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">{yearMeta(year).level} · {s.spec}</div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(0)}>Back</Button>
              <Button size="lg" disabled={selectedCount === 0} onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90 h-12 px-8">
                Continue with {selectedCount} {selectedCount === 1 ? "subject" : "subjects"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Which units are you studying?</h1>
            <p className="text-muted-foreground mb-10">
              Tick every unit you're covering this year. You can add specific tests, mocks or board exams from
              the <span className="text-primary font-semibold">Exams</span> tab whenever you have one scheduled.
            </p>
            <div className="space-y-6 mb-10">
              {selectedSubjects.map(s => (
                <div key={s.code} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                    <div className="text-2xl">{s.emoji}</div>
                    <div>
                      <div className="font-bold text-lg">{s.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.spec}</div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {visibleUnits(board, asOnly, s.code).map(unit => {
                      const u = subjects[s.code].units[unit.number];
                      return (
                        <label key={unit.number} className={`rounded-xl border p-3 transition-all flex items-start gap-3 cursor-pointer ${u?.selected ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30"}`}>
                          <Checkbox
                            checked={!!u?.selected}
                            onCheckedChange={(v) => updateUnit(s.code, unit.number, { selected: !!v })}
                            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 min-w-0">
                            <div>
                              <span className="font-mono text-xs text-primary mr-2">{unit.unitCode || `UNIT ${unit.number}`}</span>
                              <span className="font-semibold text-sm">{unit.name}</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{unit.paperLabel} · {formatDuration(unit.durationMinutes)}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
              <Button size="lg" onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90 h-12 px-8">
                Set targets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Targets and intensity.</h1>
            <p className="text-muted-foreground mb-10">How hard are you pushing, and for how many hours a day?</p>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-semibold">Daily study hours</Label>
                <div className="font-mono text-2xl font-bold text-primary tabular">{hoursPerDay}h</div>
              </div>
              <Slider
                value={[hoursPerDay]}
                onValueChange={(v) => setHoursPerDay(v[0])}
                min={1}
                max={8}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-2">
                <span>Light · 1h</span>
                <span>Steady · 2–3h</span>
                <span>Heavy · 5h+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Your roadmap will pace topics so you cover roughly this much per day. You can change it anytime in Settings.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {selectedSubjects.map(s => (
                <div key={s.code} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{s.emoji}</div>
                    <div className="font-bold text-lg">{s.name}</div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">Target grade</Label>
                      <select value={subjects[s.code].target_grade}
                        onChange={e => updateSubject(s.code, { target_grade: e.target.value as Grade })}
                        className="mt-1.5 w-full h-10 rounded-md bg-background border border-input px-3 text-sm">
                        {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">Currently predicted</Label>
                      <select value={subjects[s.code].current_grade}
                        onChange={e => updateSubject(s.code, { current_grade: e.target.value as Grade })}
                        className="mt-1.5 w-full h-10 rounded-md bg-background border border-input px-3 text-sm">
                        {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>Back</Button>
              <Button variant="flip" size="lg" onClick={handleSubmit} disabled={loading} className="h-12 px-8">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Build my roadmap <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
