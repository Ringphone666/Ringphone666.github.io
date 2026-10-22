import Navbar from "@/components/Navbar";
import EducationSection from "@/components/EducationSection";
import FeaturedProject from "@/components/FeaturedProject";
import ResearchSection from "@/components/ResearchSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ---- Asset URLs ----
const PROFILE_PHOTO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/profile-new_20facfe5.webp";
const TRANSCRIPT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/transcript_233e0480.jpg";

// ---- Certificate URLs ----
const CERT_MCM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-mcm_b8ac46cd.png";
const CERT_NATIONAL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-national_51674a51.png";
const CERT_APMCM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-apmcm_6b74da5a.png";
const CERT_MATHORCUP =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-mathorcup_1cb07fb2.png";
const CERT_DAWANQU =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-dawanqu_867184d1.webp";
const CERT_SHENZHEN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/cert-shenzhen_591ec8e9.jpg";

// ---- Animated counter ----
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

// ---- Section Heading ----
function SectionHeading({
  children,
  en,
}: {
  children: React.ReactNode;
  en?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="section-heading text-2xl md:text-3xl text-foreground">
        {children}
      </h2>
      {en && (
        <p
          className="mt-1 ml-5 text-xs tracking-[0.2em] text-muted-foreground uppercase font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {en}
        </p>
      )}
    </div>
  );
}

// ---- Awards data ---- (sorted by award level: 1st > 2nd > Honorable Mention; national before provincial within same level)
const competitions = [
  // 一等奖
  {
    name: "全国大学生数学建模竞赛",
    level: "国家级",
    award: "一等奖",
    color: "primary",
    cert: CERT_NATIONAL,
  },
  {
    name: '"\u5927\u6e7e\u533a\u676f"粤港澳金融数学建模竞赛',
    level: "省级",
    award: "一等奖",
    color: "primary",
    cert: CERT_DAWANQU,
  },
  {
    name: "深圳杯数学建模挑战赛",
    level: "省级",
    award: "一等奖",
    color: "primary",
    cert: CERT_SHENZHEN,
  },
  // 二等奖
  {
    name: "亚太地区大学生数学建模竞赛（APMCM）",
    level: "省级",
    award: "二等奖",
    color: "gold",
    cert: CERT_APMCM,
  },
  {
    name: "MathorCup高校数学建模挑战赛",
    level: "省级",
    award: "二等奖",
    color: "gold",
    cert: CERT_MATHORCUP,
  },
  // Honorable Mention
  {
    name: "美国大学生数学建模竞赛（MCM/ICM）",
    level: "国家级",
    award: "Honorable Mention",
    color: "primary",
    cert: CERT_MCM,
  },
];

const honors = [
  "2024-2025年度国家奖学金",
  "2024-2025年度华南理工大学经济与金融学院优秀共青团员",
  "2024-2025年度华南理工大学经济与金融学院优秀学生干部",
  "星级志愿者",
];

// ---- Transcript semester data ----
const transcriptSemesters = [
  {
    term: "2023-2024学年第1学期",
    courses: [
      { name: "体育（一）", type: "必修", credit: 1.0, score: 90 },
      { name: "中华人民共和国史", type: "选修", credit: 1.0, score: 78 },
      { name: "工科数学分析（一）", type: "必修", credit: 5.0, score: 86 },
      { name: "离散数学", type: "必修", credit: 4.0, score: 91 },
      { name: "军事技能", type: "必修", credit: 2.0, score: "良好" },
      { name: "经济学原理", type: "必修", credit: 4.0, score: 83 },
      {
        name: "高级语言程序设计(C++)（一）",
        type: "必修",
        credit: 3.5,
        score: 97,
      },
      { name: "金融科技概论", type: "必修", credit: 1.0, score: 89 },
      { name: "计算机科学概论", type: "必修", credit: 1.0, score: 85 },
      {
        name: "习近平新时代中国特色社会主义思想概论",
        type: "必修",
        credit: 3.0,
        score: 80,
      },
      { name: "线性代数与解析几何", type: "必修", credit: 3.0, score: 90 },
      { name: "信息安全导论", type: "必修", credit: 1.0, score: 91 },
      { name: "学术英语（一）", type: "必修", credit: 3.0, score: 85 },
      { name: "IT前沿技术", type: "必修", credit: 1.0, score: 85 },
      { name: "ACM程序设计竞赛实验", type: "选修", credit: 1.0, score: 98 },
      { name: "Corporate Finance", type: "必修", credit: 3.0, score: 93 },
      { name: "计量经济学实验", type: "必修", credit: 1.0, score: 93 },
      {
        name: "公募基金高质量发展与创新",
        type: "选修",
        credit: 2.0,
        score: 90,
      },
      { name: "人工智能导论", type: "必修", credit: 2.0, score: 91 },
      { name: "International Finance", type: "必修", credit: 3.0, score: 90 },
      { name: "数据结构大作业", type: "必修", credit: 1.0, score: "优秀" },
      { name: "马克思主义基本原理", type: "必修", credit: 2.5, score: 97 },
      { name: "数据清洗实验", type: "必修", credit: 1.0, score: 96 },
      { name: "体育（四）", type: "必修", credit: 1.0, score: 84 },
    ],
  },
  {
    term: "2023-2024学年第2学期",
    courses: [
      { name: "工科数学分析（二）", type: "必修", credit: 7.0, score: 88 },
      { name: "概率论与数理统计", type: "必修", credit: 3.0, score: 90 },
      { name: "交通运输与城市发展", type: "选修", credit: 2.0, score: 89 },
      { name: "军事理论", type: "必修", credit: 2.0, score: 96 },
      { name: "形体训练与形象塑造", type: "选修", credit: 2.0, score: 98 },
      {
        name: "高级语言程序设计(C++)（二）",
        type: "必修",
        credit: 1.5,
        score: 87,
      },
      { name: "会计学原理", type: "必修", credit: 3.0, score: 95 },
      { name: "孙子兵法", type: "选修", credit: 2, score: 90 },
      { name: "思想道德与法治", type: "必修", credit: 2.5, score: 91 },
      { name: "高级语言程序设计大作业", type: "必修", credit: 2.0, score: 100 },
      { name: "数据库", type: "必修", credit: 3.5, score: 89 },
      { name: "体育（二）", type: "必修", credit: 1.0, score: 96 },
      { name: "学术英语（二）", type: "必修", credit: 3.0, score: 85 },
    ],
  },
  {
    term: "2024-2025学年第1学期",
    courses: [
      { name: "中国近现代史纲要", type: "必修", credit: 2.5, score: 93 },
      { name: "金融学原理", type: "必修", credit: 3.0, score: 95 },
      { name: "数据结构", type: "必修", credit: 3.5, score: 95 },
      { name: "Python数据分析", type: "必修", credit: 3.0, score: 98 },
      { name: "电路与电子技术", type: "必修", credit: 4.0, score: 90 },
      { name: "体育（三）", type: "必修", credit: 1.0, score: 90 },
      { name: "Java程序设计", type: "选修", credit: 2.5, score: 83 },
      { name: "电路与电子技术实验", type: "必修", credit: 1.0, score: 89 },
      { name: "物流与社会", type: "选修", credit: 2.0, score: 90 },
      { name: "马克思主义理论与实践", type: "必修", credit: 2.0, score: 92 },
      { name: "数字逻辑", type: "必修", credit: 1.5, score: 97 },
      { name: "统计学", type: "选修", credit: 3.0, score: 87 },
    ],
  },
  {
    term: "2024-2025学年第2学期",
    courses: [
      { name: "保险学原理", type: "选修", credit: 3.0, score: 91 },
      { name: "Econometrics", type: "选修", credit: 3.0, score: 97 },
      { name: "创新研究实践II", type: "选修", credit: 2.0, score: "优秀" },
      { name: "计算机组成与体系结构", type: "必修", credit: 3.5, score: 90 },
      {
        name: "毛泽东思想和中国特色社会主义理论体系概论",
        type: "必修",
        credit: 2.5,
        score: 88,
      },
    ],
  },
  {
    term: "2025-2026学年第1学期",
    courses: [
      { name: "操作系统", type: "必修", credit: 3.5, score: 90 },
      { name: "计算机网络", type: "必修", credit: 3.5, score: 89 },
      { name: "中国传统文化", type: "选修", credit: 2.0, score: 97 },
      { name: "电子工艺与创新实验I", type: "必修", credit: 1.0, score: 87 },
      { name: "数据库课程设计", type: "选修", credit: 2.0, score: 100 },
      { name: "金融计算与优化投资", type: "必修", credit: 3.0, score: 90 },
      { name: "期货和衍生品理论与实务", type: "必修", credit: 3.0, score: 87 },
      { name: "高性能计算与云计算", type: "选修", credit: 2.5, score: 89 },
      { name: "数学建模与实验", type: "选修", credit: 2.0, score: 97 },
      { name: "证券投资分析", type: "必修", credit: 3.0, score: 93 },
      { name: "金融工程", type: "必修", credit: 3.0, score: 83 },
      { name: "软件工程", type: "必修", credit: 2.5, score: 89 },
    ],
  },
];

// ---- Transcript Modal ----
function TranscriptModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"table" | "image">("table");

  // Close on backdrop click or Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset to table tab when reopened
  useEffect(() => {
    if (open) setActiveTab("table");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(15,23,42,0.85)] backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal panel */}
          <motion.div
            className="relative z-10 bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border">
              <div>
                <h3
                  className="text-base font-bold text-foreground"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  华南理工大学 · 主修成绩单
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  South China University of Technology · Official Transcript
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Tab switcher */}
                <div className="flex bg-[#F1F5F9] rounded-xl p-0.5 text-xs">
                  <button
                    onClick={() => setActiveTab("table")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeTab === "table"
                        ? "bg-white text-foreground shadow-sm font-medium"
                        : "text-muted-foreground hover:text-[#334155]"
                    }`}
                  >
                    成绩表格
                  </button>
                  <button
                    onClick={() => setActiveTab("image")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeTab === "image"
                        ? "bg-white text-foreground shadow-sm font-medium"
                        : "text-muted-foreground hover:text-[#334155]"
                    }`}
                  >
                    原始成绩单
                  </button>
                </div>
                <button
                  onClick={onClose}
                  aria-label="关闭成绩单"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="overflow-auto flex-1">
              {activeTab === "table" ? (
                <div className="p-5 space-y-6">
                  {transcriptSemesters.map(sem => (
                    <div key={sem.term}>
                      {/* Semester heading */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                        <h4
                          className="text-sm font-semibold text-foreground"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {sem.term}
                        </h4>
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground">
                          {sem.courses.length} 门课程
                        </span>
                      </div>
                      {/* Table */}
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-background">
                            <th className="text-left py-1.5 px-3 text-muted-foreground font-medium border border-border w-[45%]">
                              课程名称
                            </th>
                            <th className="text-center py-1.5 px-2 text-muted-foreground font-medium border border-border w-[15%]">
                              性质
                            </th>
                            <th className="text-center py-1.5 px-2 text-muted-foreground font-medium border border-border w-[15%]">
                              学分
                            </th>
                            <th className="text-center py-1.5 px-2 text-muted-foreground font-medium border border-border w-[25%]">
                              总评
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map((c, i) => {
                            const isNum = typeof c.score === "number";
                            const score = isNum ? (c.score as number) : null;
                            const isHigh = score !== null && score >= 95;
                            const isMid =
                              score !== null && score >= 90 && score < 95;
                            return (
                              <tr
                                key={i}
                                className={
                                  i % 2 === 0 ? "bg-white" : "bg-background"
                                }
                              >
                                <td className="py-1.5 px-3 text-[#334155] border border-border">
                                  {c.name}
                                </td>
                                <td className="py-1.5 px-2 text-center text-muted-foreground border border-border">
                                  {c.type}
                                </td>
                                <td className="py-1.5 px-2 text-center text-muted-foreground border border-border">
                                  {c.credit}
                                </td>
                                <td className="py-1.5 px-2 text-center border border-border">
                                  <span
                                    className="inline-block px-2 py-0.5 rounded-xl font-semibold"
                                    style={{
                                      fontFamily: "var(--font-display)",
                                      fontSize: "13px",
                                      background: isHigh
                                        ? "rgba(37,99,235,0.1)"
                                        : isMid
                                          ? "rgba(79,70,229,0.1)"
                                          : "transparent",
                                      color: isHigh
                                        ? "#1D4ED8"
                                        : isMid
                                          ? "#4338CA"
                                          : "#64748B",
                                    }}
                                  >
                                    {c.score}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <img
                    src={TRANSCRIPT_IMG}
                    alt="华南理工大学主修成绩单"
                    className="w-full h-auto rounded-xl border border-border"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                打印日期：2026-03-19 · 证明专用章 · 学号：202330372351
              </p>
              <button
                onClick={onClose}
                className="text-xs px-4 py-1.5 bg-primary text-white rounded-xl hover:bg-[#1D4ED8] transition-colors"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [photoUnavailable, setPhotoUnavailable] = useState(false);
  const awardsRef = useScrollAnimation();
  const honorsRef = useScrollAnimation();
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [certModal, setCertModal] = useState<{
    open: boolean;
    url: string;
    name: string;
  }>({ open: false, url: "", name: "" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Text content (3/5) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tag line */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary" />
                <span
                  className="text-xs tracking-[0.25em] text-primary uppercase font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AI Engineering · Finance & CS
                </span>
              </div>

              {/* Name */}
              <div>
                <h1
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  杨凌锋
                </h1>
                <p
                  className="mt-2 text-xl md:text-2xl text-muted-foreground font-light tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Yang Lingfeng
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2 max-w-xl">
                <p className="text-base text-[#334155] leading-relaxed">
                  华南理工大学 · 计算机科学与工程学院
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  金融学 + 计算机科学与技术双学位试点项目 · 本科大四在读
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  聚焦 AI 应用工程、语音与音频智能、时间序列分析
                </p>
                <p className="pt-1 text-xs font-medium leading-relaxed tracking-wide text-primary">
                  Python / FastAPI · React / TypeScript · LLM / 语义检索 ·
                  流式语音
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4 sm:grid-cols-4">
                <div className="text-center">
                  <div
                    className="font-display text-3xl tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#2563EB",
                    }}
                  >
                    <AnimatedCounter target={90} suffix=".22" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    加权平均分
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="font-display text-3xl tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#2563EB",
                    }}
                  >
                    <AnimatedCounter target={1} />
                    <span className="text-2xl text-muted-foreground">/15</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">专业排名</p>
                </div>
                <div className="text-center">
                  <div
                    className="font-display text-3xl tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#2563EB",
                    }}
                  >
                    <AnimatedCounter target={3} suffix=".84" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    GPA / 4.0
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="font-display text-3xl tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#2563EB",
                    }}
                  >
                    <AnimatedCounter target={6} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">竞赛奖项</p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="mailto:Ringphone1221@163.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-card text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  联系我
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("research")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-[rgba(37,99,235,0.05)] transition-colors"
                >
                  查看科研经历
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-[rgba(37,99,235,0.05)]"
                >
                  查看工程作品 <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Right: Profile photo (2/5) */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-blue-200 bg-gradient-to-br from-blue-100/70 via-white to-indigo-100/70 shadow-[0_24px_80px_-24px_#2563eb33]"
                />
                {/* Photo */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-card shadow-xl">
                  {photoUnavailable ? (
                    <div
                      role="img"
                      aria-label="杨凌锋姓名缩写 YLF"
                      className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 text-primary"
                    >
                      <span className="font-display text-6xl font-extrabold tracking-[-0.08em]">
                        YLF<span className="text-indigo-400">.</span>
                      </span>
                      <span className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                        AI · FINANCE · CS
                      </span>
                    </div>
                  ) : (
                    <img
                      src={PROFILE_PHOTO}
                      alt="杨凌锋"
                      onError={() => setPhotoUnavailable(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground tracking-widest">
            SCROLL
          </span>
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ===== TRANSCRIPT MODAL ===== */}
      <TranscriptModal
        open={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
      />

      {/* ===== CERTIFICATE MODAL ===== */}
      <AnimatePresence>
        {certModal.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-[rgba(15,23,42,0.85)] backdrop-blur-sm"
              onClick={() => setCertModal(m => ({ ...m, open: false }))}
            />
            <motion.div
              className="relative z-10 bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
                <div>
                  <h3
                    className="text-sm font-bold text-foreground"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    获奖证书
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">
                    {certModal.name}
                  </p>
                </div>
                <button
                  onClick={() => setCertModal(m => ({ ...m, open: false }))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-auto flex-1 p-4">
                <img
                  src={certModal.url}
                  alt={certModal.name}
                  className="w-full h-auto rounded-xl border border-border"
                />
              </div>
              <div className="px-5 py-3 border-t border-border flex justify-end">
                <button
                  onClick={() => setCertModal(m => ({ ...m, open: false }))}
                  className="text-xs px-4 py-1.5 bg-primary text-white rounded-xl hover:bg-[#1D4ED8] transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EducationSection onOpenTranscript={() => setTranscriptOpen(true)} />

      {/* ===== RESEARCH SECTION ===== */}
      <ResearchSection />

      {/* ===== ENGINEERING PROJECTS ===== */}
      <FeaturedProject />

      {/* ===== AWARDS SECTION ===== */}
      <section id="awards" className="section-space bg-background">
        <div ref={awardsRef} className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Decoration + heading */}
            <div className="lg:col-span-2 fade-in-up">
              <SectionHeading en="Competition Awards">竞赛获奖</SectionHeading>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
                在数学建模领域深耕，连续参加国内外顶级竞赛，荣获多项省级及国家级奖项，展现出扎实的数学建模与跨学科解决问题能力。
              </p>
            </div>

            {/* Right: Awards list */}
            <div className="lg:col-span-3 space-y-4">
              {competitions.map((comp, i) => (
                <div
                  key={comp.name}
                  className="fade-in-up paper-card rounded-xl p-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                      <span
                        className="text-sm font-bold text-primary"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {comp.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {comp.level}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
                    <span
                      className={
                        comp.color === "primary"
                          ? "accent-badge"
                          : "secondary-badge"
                      }
                    >
                      {comp.award}
                    </span>
                    {comp.cert && (
                      <button
                        onClick={() =>
                          setCertModal({
                            open: true,
                            url: comp.cert!,
                            name: comp.name,
                          })
                        }
                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-xl border border-[#CBD5E1] text-[#475569] hover:border-primary hover:text-primary hover:bg-[rgba(37,99,235,0.05)] transition-all"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        证书
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HONORS SECTION ===== */}
      <section id="honors" className="section-space bg-[#F1F5F9]">
        <div ref={honorsRef} className="max-w-6xl mx-auto px-6">
          <div className="fade-in-up">
            <SectionHeading en="Honors & Awards">荣誉奖项</SectionHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {honors.map((honor, i) => (
              <div
                key={honor}
                className="fade-in-up paper-card rounded-xl p-6 text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgba(37,99,235,0.08)] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">
                  {honor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section className="section-space bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="paper-card rounded-xl p-6">
              <h3
                className="text-base font-bold text-foreground mb-5 flex items-center gap-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="w-1 h-5 bg-primary rounded-full" />
                技术栈与工程实践
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "语言与数据",
                    items: ["Python", "C++", "TypeScript", "SQL"],
                  },
                  {
                    label: "全栈应用",
                    items: ["FastAPI", "React 19", "SQLAlchemy", "WebSocket"],
                  },
                  {
                    label: "AI 与检索",
                    items: ["PyTorch", "LLM", "Embedding", "Rerank"],
                  },
                  {
                    label: "工程验证",
                    items: ["pytest", "Vitest", "Git", "GitHub Actions"],
                  },
                ].map(group => (
                  <div key={group.label}>
                    <p className="mb-2 text-xs text-muted-foreground">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(skill => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 bg-[#F1F5F9] text-[#334155] rounded-xl font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div className="paper-card rounded-xl p-6">
              <h3
                className="text-base font-bold text-foreground mb-5 flex items-center gap-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="w-1 h-5 bg-primary rounded-full" />
                研究方向
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "音频生成",
                  "空间音频",
                  "时间序列分析",
                  "异常检测",
                  "多模态学习",
                  "深度学习",
                ].map(area => (
                  <span
                    key={area}
                    className="text-xs px-2.5 py-1 bg-[rgba(37,99,235,0.08)] text-primary rounded-xl font-medium border border-[rgba(37,99,235,0.2)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="paper-card rounded-xl p-6">
              <h3
                className="text-base font-bold text-foreground mb-5 flex items-center gap-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="w-1 h-5 bg-primary rounded-full" />
                语言能力
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#334155]">中文（母语）</span>
                    <span className="text-primary font-medium">Native</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full">
                    <div className="h-full w-full bg-primary rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#334155]">
                      英语（CET-4: 576 / CET-6: 450）
                    </span>
                    <span className="text-primary font-medium">良好</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full">
                    <div className="h-full w-4/5 bg-[#93C5FD] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section-space bg-foreground">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-black text-background mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            联系我
          </h2>
          <p
            className="text-[#CBD5E1] mb-10 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
          >
            欢迎学术交流、科研合作或任何有趣的想法
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:Ringphone1221@163.com"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl hover:bg-[#1D4ED8] transition-colors group"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Ringphone1221@163.com</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(248,250,252,0.1)]">
            <p className="text-xs text-[#94A3B8]">
              © 2025 杨凌锋 · 华南理工大学 · 计算机科学与工程学院
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
