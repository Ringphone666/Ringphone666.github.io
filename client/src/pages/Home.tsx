/*
 * DESIGN: Warm Modern Scholar
 * Ivory paper texture + Crimson red accent + Asymmetric layout
 * Noto Serif SC headers + Noto Sans SC body + Crimson Pro numbers
 * Color palette: ivory #faf8f3, ink #2c1810, crimson #c0392b, gold #d4a017
 */
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";

// ---- Asset URLs ----
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/hero-bg-BzTbqYG5ReqEj2DiBZUPmX.webp";
const RESEARCH_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/research-bg-fkCBuBuRMSQg6dJm376NxV.webp";
const AWARDS_DECO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/awards-decoration-jRwuttpXpZRcVxxKwAT2Ve.webp";
const PROFILE_DECO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/profile-decoration-As4LKdJFiARD65zYm4XsC5.webp";
const PROFILE_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/profile-photo_033535d8.jpg";

// ---- Animated counter ----
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
      {count}{suffix}
    </span>
  );
}

// ---- Section Heading ----
function SectionHeading({ children, en }: { children: React.ReactNode; en?: string }) {
  return (
    <div className="mb-10">
      <h2 className="section-heading text-2xl md:text-3xl text-[oklch(0.18_0.02_55)]">
        {children}
      </h2>
      {en && (
        <p className="mt-1 ml-5 text-xs tracking-[0.2em] text-[oklch(0.52_0.025_60)] uppercase font-light"
           style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>
          {en}
        </p>
      )}
    </div>
  );
}

// ---- Courses data ----
const courses = [
  { name: "高级语言程序设计(C++)", score: 97 },
  { name: "Python数据分析", score: 98 },
  { name: "数据库课程设计", score: 100 },
  { name: "数据结构", score: 95 },
  { name: "计算机组成与体系结构", score: 90 },
  { name: "离散数学", score: 90 },
];

// ---- Awards data ----
const competitions = [
  { name: "美国大学生数学建模竞赛（MCM/ICM）", level: "国家级", award: "Honorable Mention", color: "crimson" },
  { name: "全国大学生数学建模竞赛", level: "省级", award: "一等奖", color: "crimson" },
  { name: "深圳杯数学建模挑战赛", level: "省级", award: "一等奖", color: "crimson" },
  { name: "亚太地区大学生数学建模竞赛（APMCM）", level: "省级", award: "二等奖", color: "gold" },
  { name: "MathorCup高校数学建模挑战赛", level: "省级", award: "二等奖", color: "gold" },
];

const honors = [
  "2024-2025年度国家奖学金",
  "2024-2025年度华南理工大学经济与金融学院优秀共青团员",
  "2024-2025年度华南理工大学经济与金融学院优秀学生干部",
  "星级志愿者",
];

export default function Home() {
  const educationRef = useScrollAnimation();
  const researchRef = useScrollAnimation();
  const awardsRef = useScrollAnimation();
  const honorsRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.008_80)]">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.985_0.008_80/0.7)] via-[oklch(0.985_0.008_80/0.5)] to-[oklch(0.985_0.008_80/0.3)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Text content (3/5) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tag line */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[oklch(0.48_0.18_25)]" />
                <span className="text-xs tracking-[0.25em] text-[oklch(0.48_0.18_25)] uppercase font-medium"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>
                  Personal Portfolio
                </span>
              </div>

              {/* Name */}
              <div>
                <h1
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-[oklch(0.18_0.02_55)] leading-none tracking-tight"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  杨凌锋
                </h1>
                <p
                  className="mt-2 text-xl md:text-2xl text-[oklch(0.52_0.025_60)] font-light tracking-[0.15em]"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}
                >
                  Yang Lingfeng
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2 max-w-xl">
                <p className="text-base text-[oklch(0.28_0.04_55)] leading-relaxed">
                  华南理工大学 · 计算机科学与工程学院
                </p>
                <p className="text-sm text-[oklch(0.52_0.025_60)] leading-relaxed">
                  金融学 + 计算机科学与技术双学位试点项目 · 本科在读
                </p>
                <p className="text-sm text-[oklch(0.52_0.025_60)] leading-relaxed">
                  专注于 AI 音频生成、时间序列异常检测等前沿研究领域
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center">
                  <div className="text-4xl" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 700, color: "oklch(0.48 0.18 25)" }}>
                    <AnimatedCounter target={90} suffix=".22" />
                  </div>
                  <p className="text-xs text-[oklch(0.52_0.025_60)] mt-1">加权平均分</p>
                </div>
                <div className="w-px bg-[oklch(0.88_0.018_75)] self-stretch" />
                <div className="text-center">
                  <div className="text-4xl" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 700, color: "oklch(0.48 0.18 25)" }}>
                    <AnimatedCounter target={1} /><span className="text-2xl text-[oklch(0.52_0.025_60)]">/15</span>
                  </div>
                  <p className="text-xs text-[oklch(0.52_0.025_60)] mt-1">专业排名</p>
                </div>
                <div className="w-px bg-[oklch(0.88_0.018_75)] self-stretch" />
                <div className="text-center">
                  <div className="text-4xl" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 700, color: "oklch(0.48 0.18 25)" }}>
                    <AnimatedCounter target={3} suffix=".84" />
                  </div>
                  <p className="text-xs text-[oklch(0.52_0.025_60)] mt-1">GPA / 4.0</p>
                </div>
                <div className="w-px bg-[oklch(0.88_0.018_75)] self-stretch" />
                <div className="text-center">
                  <div className="text-4xl" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 700, color: "oklch(0.48 0.18 25)" }}>
                    <AnimatedCounter target={5} />
                  </div>
                  <p className="text-xs text-[oklch(0.52_0.025_60)] mt-1">竞赛奖项</p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:Ringphone1221@163.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.48_0.18_25)] text-[oklch(0.98_0.005_80)] text-sm font-medium rounded-sm hover:bg-[oklch(0.42_0.18_25)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  联系我
                </a>
                <button
                  onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[oklch(0.48_0.18_25)] text-[oklch(0.48_0.18_25)] text-sm font-medium rounded-sm hover:bg-[oklch(0.48_0.18_25/0.05)] transition-colors"
                >
                  查看科研经历
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Profile photo (2/5) */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Decorative ring */}
                <img
                  src={PROFILE_DECO}
                  alt="decoration"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                {/* Photo */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-[oklch(0.98_0.005_80)] shadow-xl">
                  <img
                    src={PROFILE_PHOTO}
                    alt="杨凌锋"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-[oklch(0.52_0.025_60)] tracking-widest">SCROLL</span>
          <svg className="w-4 h-4 text-[oklch(0.52_0.025_60)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <section id="education" className="py-24 bg-[oklch(0.985_0.008_80)]">
        <div ref={educationRef} className="max-w-6xl mx-auto px-6">
          <div className="fade-in-up">
            <SectionHeading en="Education Background">教育背景</SectionHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main education card */}
            <div className="lg:col-span-3 fade-in-up">
              <div className="paper-card rounded-sm p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[oklch(0.18_0.02_55)]"
                          style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        华南理工大学
                      </h3>
                      <span className="crimson-badge">双一流 · 985</span>
                    </div>
                    <p className="text-sm text-[oklch(0.52_0.025_60)]">计算机科学与工程学院</p>
                  </div>
                  <span className="text-sm text-[oklch(0.52_0.025_60)] bg-[oklch(0.93_0.018_80)] px-3 py-1 rounded-sm">
                    2023.09 — 至今
                  </span>
                </div>

                <p className="text-sm text-[oklch(0.28_0.04_55)] mb-6 leading-relaxed">
                  金融学 + 计算机科学与技术双学位试点项目 · 本科
                </p>

                {/* Academic stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[oklch(0.97_0.01_80)] rounded-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[oklch(0.48_0.18_25)]"
                       style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                      90.22
                    </p>
                    <p className="text-xs text-[oklch(0.52_0.025_60)] mt-0.5">加权平均分</p>
                  </div>
                  <div className="text-center border-x border-[oklch(0.88_0.018_75)]">
                    <p className="text-2xl font-bold text-[oklch(0.48_0.18_25)]"
                       style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                      1/15
                    </p>
                    <p className="text-xs text-[oklch(0.52_0.025_60)] mt-0.5">专业排名</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[oklch(0.48_0.18_25)]"
                       style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                      3.84
                    </p>
                    <p className="text-xs text-[oklch(0.52_0.025_60)] mt-0.5">GPA / 4.0</p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[oklch(0.52_0.025_60)]">英语水平：</span>
                  <div className="flex gap-3">
                    <span className="text-sm font-medium text-[oklch(0.28_0.04_55)] bg-[oklch(0.93_0.018_80)] px-3 py-1 rounded-sm">
                      CET-4: <strong className="text-[oklch(0.48_0.18_25)]">576</strong>
                    </span>
                    <span className="text-sm font-medium text-[oklch(0.28_0.04_55)] bg-[oklch(0.93_0.018_80)] px-3 py-1 rounded-sm">
                      CET-6: <strong className="text-[oklch(0.48_0.18_25)]">450</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core courses */}
            <div className="lg:col-span-2 fade-in-up" style={{ transitionDelay: "0.15s" }}>
              <div className="paper-card rounded-sm p-6 h-full">
                <h4 className="text-sm font-semibold text-[oklch(0.28_0.04_55)] mb-5 tracking-wide uppercase"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>
                  核心课程成绩
                </h4>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div key={course.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-[oklch(0.28_0.04_55)]">{course.name}</span>
                        <span className="text-sm font-bold text-[oklch(0.48_0.18_25)]"
                              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                          {course.score}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[oklch(0.93_0.018_80)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${course.score}%`,
                            background: course.score >= 98
                              ? "oklch(0.48 0.18 25)"
                              : course.score >= 95
                              ? "oklch(0.55 0.15 25)"
                              : "oklch(0.72 0.12 75)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH SECTION ===== */}
      <section id="research" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={RESEARCH_BG} alt="" className="w-full h-full object-cover opacity-8" />
          <div className="absolute inset-0 bg-[oklch(0.14_0.02_250/0.95)]" />
        </div>

        <div ref={researchRef} className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="fade-in-up">
            <div className="mb-10">
              <h2 className="section-heading text-2xl md:text-3xl text-[oklch(0.95_0.005_80)]"
                  style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
                科研经历
              </h2>
              <p className="mt-1 ml-5 text-xs tracking-[0.2em] text-[oklch(0.6_0.02_250)] uppercase font-light"
                 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>
                Research Experience
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Research 1 */}
            <div className="fade-in-up">
              <div className="bg-[oklch(1_0.005_80/0.06)] border border-[oklch(1_0_0/0.12)] rounded-sm p-8 backdrop-blur-sm hover:bg-[oklch(1_0.005_80/0.10)] transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs bg-[oklch(0.48_0.18_25)] text-white px-2 py-0.5 rounded-sm font-medium">
                        论文 · Interspeech 在投
                      </span>
                      <span className="text-xs bg-[oklch(0.72_0.12_75/0.3)] text-[oklch(0.85_0.08_75)] px-2 py-0.5 rounded-sm font-medium">
                        第二作者
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[oklch(0.95_0.005_80)] leading-snug"
                        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                      FOLEYIMMERSIVE: DECOUPLING WHAT AND WHERE FOR VIDEO-TO-FIRST-ORDER AMBISONICS
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                      项目简介
                    </h4>
                    <p className="text-sm text-[oklch(0.78_0.01_250)] leading-relaxed">
                      研究沉浸式视频到一阶 Ambisonics（FOA）音频生成问题，针对现有 V2A 系统中语义信息稀疏与空间-内容耦合严重的问题，构建语义增强数据集，提出解耦式两阶段生成框架，实现语义一致且空间感知的沉浸式音频生成。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                      负责工作
                    </h4>
                    <ul className="space-y-1.5">
                      {[
                        "构建语义增强数据集 YT-AMBISEM（102k clips）",
                        "基于 Qwen2.5-VL 设计自动化多模态标注流程",
                        "复现并对比 ViSAGe、Diff-Foley 等 baseline",
                        "实现 FAD、KLD、CC、AUC 等语义与空间指标评估",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[oklch(0.78_0.01_250)]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.48_0.18_25)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Audio Generation", "Ambisonics", "Spatial Audio", "Multimodal", "Qwen2.5-VL", "V2A"].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-sm bg-[oklch(0.3_0.04_250/0.5)] text-[oklch(0.7_0.02_250)] border border-[oklch(1_0_0/0.08)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Research 2 */}
            <div className="fade-in-up" style={{ transitionDelay: "0.15s" }}>
              <div className="bg-[oklch(1_0.005_80/0.06)] border border-[oklch(1_0_0/0.12)] rounded-sm p-8 backdrop-blur-sm hover:bg-[oklch(1_0.005_80/0.10)] transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs bg-[oklch(0.35_0.06_250)] text-[oklch(0.85_0.02_250)] px-2 py-0.5 rounded-sm font-medium">
                        学生创新创业项目
                      </span>
                      <span className="text-xs bg-[oklch(0.72_0.12_75/0.3)] text-[oklch(0.85_0.08_75)] px-2 py-0.5 rounded-sm font-medium">
                        核心成员
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[oklch(0.95_0.005_80)] leading-snug"
                        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                      基于深度学习的多变量时间序列异常检测算法设计
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                      项目简介
                    </h4>
                    <p className="text-sm text-[oklch(0.78_0.01_250)] leading-relaxed">
                      针对多变量时间序列异常检测中未显式建模异方差不确定性以及重构模型存在 shortcut learning 导致判别能力不足的问题，提出 CORE 框架，将重构任务分解为异方差不确定性建模与核心结构信息保持两个子任务，在多个数据集上提升 F1（最高达 2.84%）。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                      负责工作
                    </h4>
                    <ul className="space-y-1.5">
                      {[
                        "参与问题建模与方法设计，实现重构目标分解",
                        "负责模型复现与训练流程搭建",
                        "对 SFR 编码器与 Transformer 解码器结构进行实验验证",
                        "进行超参数调优与性能优化，参与实验分析",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[oklch(0.78_0.01_250)]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.12_75)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Time Series", "Anomaly Detection", "Deep Learning", "Transformer", "CORE Framework", "F1 +2.84%"].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-sm bg-[oklch(0.3_0.04_250/0.5)] text-[oklch(0.7_0.02_250)] border border-[oklch(1_0_0/0.08)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <section id="awards" className="py-24 bg-[oklch(0.985_0.008_80)]">
        <div ref={awardsRef} className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Decoration + heading */}
            <div className="lg:col-span-2 fade-in-up">
              <SectionHeading en="Competition Awards">竞赛获奖</SectionHeading>
              <div className="relative mt-8 flex justify-center lg:justify-start">
                <img
                  src={AWARDS_DECO}
                  alt="decoration"
                  className="w-48 h-48 opacity-80"
                />
              </div>
              <p className="mt-6 text-sm text-[oklch(0.52_0.025_60)] leading-relaxed max-w-xs">
                在数学建模领域深耕，连续参加国内外顶级竞赛，荣获多项省级及国家级奖项，展现出扎实的数学建模与跨学科解决问题能力。
              </p>
            </div>

            {/* Right: Awards list */}
            <div className="lg:col-span-3 space-y-4">
              {competitions.map((comp, i) => (
                <div
                  key={comp.name}
                  className="fade-in-up paper-card rounded-sm p-5 flex items-center justify-between gap-4"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.93_0.018_80)] flex items-center justify-center">
                      <span className="text-sm font-bold text-[oklch(0.48_0.18_25)]"
                            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[oklch(0.18_0.02_55)] leading-snug">
                        {comp.name}
                      </p>
                      <p className="text-xs text-[oklch(0.52_0.025_60)] mt-0.5">{comp.level}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={comp.color === "crimson" ? "crimson-badge" : "gold-badge"}>
                      {comp.award}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HONORS SECTION ===== */}
      <section id="honors" className="py-24 bg-[oklch(0.96_0.015_80)]">
        <div ref={honorsRef} className="max-w-6xl mx-auto px-6">
          <div className="fade-in-up">
            <SectionHeading en="Honors & Awards">荣誉奖项</SectionHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {honors.map((honor, i) => (
              <div
                key={honor}
                className="fade-in-up paper-card rounded-sm p-6 text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[oklch(0.48_0.18_25/0.08)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[oklch(0.48_0.18_25)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[oklch(0.18_0.02_55)] leading-snug">
                  {honor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section className="py-20 bg-[oklch(0.985_0.008_80)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="paper-card rounded-sm p-6">
              <h3 className="text-base font-bold text-[oklch(0.18_0.02_55)] mb-5 flex items-center gap-2"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                <span className="w-1 h-5 bg-[oklch(0.48_0.18_25)] rounded-full" />
                编程技能
              </h3>
              <div className="flex flex-wrap gap-2">
                {["C++", "Python", "SQL", "PyTorch", "NumPy", "Pandas", "Matplotlib", "Git"].map((skill) => (
                  <span key={skill} className="text-xs px-2.5 py-1 bg-[oklch(0.93_0.018_80)] text-[oklch(0.28_0.04_55)] rounded-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div className="paper-card rounded-sm p-6">
              <h3 className="text-base font-bold text-[oklch(0.18_0.02_55)] mb-5 flex items-center gap-2"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                <span className="w-1 h-5 bg-[oklch(0.48_0.18_25)] rounded-full" />
                研究方向
              </h3>
              <div className="flex flex-wrap gap-2">
                {["音频生成", "空间音频", "时间序列分析", "异常检测", "多模态学习", "深度学习"].map((area) => (
                  <span key={area} className="text-xs px-2.5 py-1 bg-[oklch(0.48_0.18_25/0.08)] text-[oklch(0.48_0.18_25)] rounded-sm font-medium border border-[oklch(0.48_0.18_25/0.2)]">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="paper-card rounded-sm p-6">
              <h3 className="text-base font-bold text-[oklch(0.18_0.02_55)] mb-5 flex items-center gap-2"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                <span className="w-1 h-5 bg-[oklch(0.48_0.18_25)] rounded-full" />
                语言能力
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[oklch(0.28_0.04_55)]">中文（母语）</span>
                    <span className="text-[oklch(0.48_0.18_25)] font-medium">Native</span>
                  </div>
                  <div className="h-1.5 bg-[oklch(0.93_0.018_80)] rounded-full">
                    <div className="h-full w-full bg-[oklch(0.48_0.18_25)] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[oklch(0.28_0.04_55)]">英语（CET-4: 576 / CET-6: 450）</span>
                    <span className="text-[oklch(0.48_0.18_25)] font-medium">良好</span>
                  </div>
                  <div className="h-1.5 bg-[oklch(0.93_0.018_80)] rounded-full">
                    <div className="h-full w-4/5 bg-[oklch(0.72_0.12_75)] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-24 bg-[oklch(0.18_0.02_55)]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[oklch(0.95_0.005_80)] mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}>
            联系我
          </h2>
          <p className="text-[oklch(0.6_0.02_55)] mb-10 max-w-md mx-auto"
             style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "1.05rem" }}>
            欢迎学术交流、科研合作或任何有趣的想法
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:Ringphone1221@163.com"
              className="flex items-center gap-3 px-8 py-4 bg-[oklch(0.48_0.18_25)] text-white rounded-sm hover:bg-[oklch(0.42_0.18_25)] transition-colors group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Ringphone1221@163.com</span>
            </a>

            <a
              href="tel:13352634335"
              className="flex items-center gap-3 px-8 py-4 border border-[oklch(0.95_0.005_80/0.2)] text-[oklch(0.85_0.005_80)] rounded-sm hover:border-[oklch(0.95_0.005_80/0.5)] hover:text-[oklch(0.95_0.005_80)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">133 5263 4335</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-[oklch(0.95_0.005_80/0.1)]">
            <p className="text-xs text-[oklch(0.45_0.01_55)]">
              © 2025 杨凌锋 · 华南理工大学 · 计算机科学与工程学院
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
