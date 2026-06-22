import { CIE_SUBJECTS } from "./cieSyllabus";

// --- IGCSE CIE Imports ---
import { ciePhysics0625 } from "./data/cie-physics-0625";
import { cieBiology0610 } from "./data/cie-biology-0610";
import { cieChemistry0620 } from "./data/cie-chemistry-0620";
import { cieMaths0580 } from "./data/cie-maths-0580";

export type SubjectCode = "mathematics" | "biology" | "chemistry" | "physics";
// MSB Dubai is a Cambridge (CAIE/CIE) school: IGCSE (Year 11) + AS/A Level (Years 12–13).
// Only the Cambridge boards are supported.
export type Board = "cie" | "cie-igcse";

export interface UnitMeta {
  number: number;
  name: string;
  paperLabel: string;
  durationMinutes: number;
  topics: string[];
  aLevelOnly?: boolean;
  section?: string;
  unitCode?: string; // Display code e.g. "P1", "U4", "M2"
}

export interface SubjectMeta {
  code: SubjectCode;
  name: string;
  emoji: string;
  spec: string;
  units?: UnitMeta[]; // Made optional to support IGCSE
  topics?: any[];    // Added to support IGCSE
}

// IGCSE syllabus files use { topics: [{title, subtopics}] }, but onboarding
// expects SubjectMeta with units[]. Adapter: each top-level topic becomes a unit.
const EMOJI: Record<SubjectCode, string> = { mathematics: "∑", biology: "🧬", chemistry: "🧪", physics: "⚛" };
const adaptIgcse = (raw: any, code: SubjectCode, spec: string): SubjectMeta => ({
  code,
  name: raw.name,
  emoji: EMOJI[code],
  spec,
  units: (raw.topics || []).map((t: any, i: number) => ({
    number: i + 1,
    unitCode: `T${i + 1}`,
    name: t.title,
    paperLabel: `Topic ${i + 1}`,
    durationMinutes: 60,
    topics: (t.subtopics || []).map((s: any) => s.title),
  })),
});

// === IGCSE CIE CATALOGUE (Cambridge IGCSE — Year 11) ===
export const IGCSE_CIE_SUBJECTS: Record<SubjectCode, SubjectMeta> = {
  mathematics: adaptIgcse(cieMaths0580, "mathematics", "0580"),
  biology: adaptIgcse(cieBiology0610, "biology", "0610"),
  chemistry: adaptIgcse(cieChemistry0620, "chemistry", "0620"),
  physics: adaptIgcse(ciePhysics0625, "physics", "0625"),
};

// === Default subject catalogue ===
// MSB uses the Cambridge International AS & A Level catalogue (9709/9700/9701/9702)
// as the default subject metadata across the app. IGCSE is handled separately.
export const SUBJECTS: Record<SubjectCode, SubjectMeta> = CIE_SUBJECTS;

export const SUBJECT_LIST: SubjectMeta[] = Object.values(SUBJECTS);

// Board-aware catalog: Cambridge AS/A Level (default) or Cambridge IGCSE.
export function getSubjectsForBoard(board: Board | string | null | undefined): Record<SubjectCode, SubjectMeta> {
  if (board === "cie-igcse") return IGCSE_CIE_SUBJECTS;
  return CIE_SUBJECTS;
}

export function getSubjectListForBoard(board: Board | string | null | undefined): SubjectMeta[] {
  return Object.values(getSubjectsForBoard(board));
}

export const BOARD_LABEL: Record<Board, string> = {
  "cie": "Cambridge International AS & A Level",
  "cie-igcse": "Cambridge IGCSE",
};

export const GRADES = ["A*", "A", "B", "C", "D", "E"] as const;
export type Grade = typeof GRADES[number];

export const gradeGap = (target: Grade, current: Grade): number => {
  const idx = (g: Grade) => GRADES.indexOf(g);
  return Math.max(0, idx(current) - idx(target));
};

// Helper: short unit label like "Maths P1" or "Chemistry U4"
export const unitShortLabel = (subject: SubjectCode, unit_number: number | null | undefined, board?: string): string => {
  const meta = getSubjectsForBoard(board)[subject];
  if (!meta) return "";

  if (meta.units && unit_number != null) {
    const u = meta.units.find(x => x.number === unit_number);
    const code = u?.unitCode ?? `U${unit_number}`;
    const subShort = subject === "mathematics" ? "Maths"
                 : subject === "biology" ? "Biology"
                 : subject === "chemistry" ? "Chemistry"
                 : "Physics";
    return `${subShort} ${code}`;
  }
  return meta.name;
};

export const urgencyScore = (gap: number, daysToExam: number): { value: number; level: "urgent" | "moderate" | "track"; color: string } => {
  const gapScore = Math.min(gap, 4) * 20;
  const timePressure = daysToExam <= 30 ? 40 : daysToExam <= 90 ? 25 : daysToExam <= 180 ? 12 : 5;
  const value = Math.min(100, gapScore + timePressure);
  if (value >= 65) return { value, level: "urgent", color: "hsl(var(--urgent))" };
  if (value >= 35) return { value, level: "moderate", color: "hsl(var(--accent))" };
  return { value, level: "track", color: "hsl(var(--success))" };
};

export const formatDuration = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
};

// Cambridge grade boundaries — indicative, recent data.
export interface GradeBoundary { grade: string; minPercent: number; }
export const GRADE_BOUNDARIES: Record<SubjectCode, GradeBoundary[]> = {
  mathematics: [
    { grade: "A*", minPercent: 90 },
    { grade: "A", minPercent: 80 },
    { grade: "B", minPercent: 70 },
    { grade: "C", minPercent: 60 },
    { grade: "D", minPercent: 50 },
    { grade: "E", minPercent: 40 },
  ],
  biology: [
    { grade: "A*", minPercent: 90 }, { grade: "A", minPercent: 80 }, { grade: "B", minPercent: 70 },
    { grade: "C", minPercent: 60 }, { grade: "D", minPercent: 50 }, { grade: "E", minPercent: 40 },
  ],
  chemistry: [
    { grade: "A*", minPercent: 90 }, { grade: "A", minPercent: 80 }, { grade: "B", minPercent: 70 },
    { grade: "C", minPercent: 60 }, { grade: "D", minPercent: 50 }, { grade: "E", minPercent: 40 },
  ],
  physics: [
    { grade: "A*", minPercent: 90 }, { grade: "A", minPercent: 80 }, { grade: "B", minPercent: 70 },
    { grade: "C", minPercent: 60 }, { grade: "D", minPercent: 50 }, { grade: "E", minPercent: 40 },
  ],
};

export const estimateGrade = (subject: SubjectCode, awarded: number, total: number): string => {
  if (total === 0) return "U";
  const pct = (awarded / total) * 100;
  const boundaries = GRADE_BOUNDARIES[subject];
  for (const b of boundaries) if (pct >= b.minPercent) return b.grade;
  return "U";
};

export const gradeColor = (grade: string): string => {
  switch (grade) {
    case "A*": return "hsl(45 95% 55%)";
    case "A":  return "hsl(152 76% 48%)";
    case "B":  return "hsl(210 90% 60%)";
    case "C":  return "hsl(36 92% 55%)";
    default:   return "hsl(230 12% 60%)";
  }
};

export const minutesPerMark = (subject: SubjectCode): number =>
  subject === "mathematics" ? 1.4 : 1.2;
