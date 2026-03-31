/*
 * DESIGN: Warm Modern Scholar
 * Ivory paper texture + Crimson red accent + Asymmetric layout
 * Noto Serif SC headers + Noto Sans SC body + Crimson Pro numbers
 * Color palette: ivory #faf8f3, ink #2c1810, crimson #c0392b, gold #d4a017
 */
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ---- Asset URLs ----
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/hero-bg-BzTbqYG5ReqEj2DiBZUPmX.webp";
const RESEARCH_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/research-bg-fkCBuBuRMSQg6dJm376NxV.webp";
const AWARDS_DECO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/awards-decoration-jRwuttpXpZRcVxxKwAT2Ve.webp";
const PROFILE_DECO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/profile-decoration-As4LKdJFiARD65zYm4XsC5.webp";
const PROFILE_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/profile-photo_033535d8.jpg";
const TRANSCRIPT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477503304/28667RWdKRJ6VDs2gtXxKm/transcript_233e0480.jpg";

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

// ---- Research project detailed data ----
const researchProjects = [
  {
    id: "foley",
    badge: "论文 · Interspeech 在投",
    badgeColor: "bg-[oklch(0.48_0.18_25)] text-white",
    role: "第二作者",
    title: "FOLEYIMMERSIVE: DECOUPLING WHAT AND WHERE FOR VIDEO-TO-FIRST-ORDER AMBISONICS",
    summary: "研究沉浸式视频到一阶 Ambisonics（FOA）音频生成问题，针对现有 V2A 系统中语义信息稀疏与空间-内容耦合严重的问题，构建语义增强数据集，提出解耦式两阶段生成框架，实现语义一致且空间感知的沉浸式音频生成。",
    responsibilities: [
      "构建语义增强数据集 YT-AMBISEM（102k clips）",
      "基于 Qwen2.5-VL 设计自动化多模态标注流程",
      "复现并对比 ViSAGe、Diff-Foley 等 baseline",
      "实现 FAD、KLD、CC、AUC 等语义与空间指标评估",
    ],
    tags: ["Audio Generation", "Ambisonics", "Spatial Audio", "Multimodal", "Qwen2.5-VL", "V2A"],
    bulletColor: "bg-[oklch(0.48_0.18_25)]",
    details: {
      background: "沉浸式音频（Ambisonics）能够为用户提供 360° 空间声场体验，是 VR/AR 内容制作的核心技术之一。然而现有的 Video-to-Audio（V2A）系统主要针对单声道或立体声输出，无法直接生成具有空间感知能力的 FOA 音频。本研究填补了这一领域的空白。",
      innovation: [
        "提出 What-Where 解耦框架：将音频生成任务分解为语义内容生成（What）与空间位置建模（Where）两个独立子任务，有效缓解了传统端到端方法中空间-内容耦合导致的质量下降问题",
        "构建 YT-AMBISEM 数据集：包含 102k 个高质量视频-FOA 音频对，并利用 Qwen2.5-VL 多模态大模型自动生成细粒度语义标注，显著提升了训练数据的语义密度",
        "两阶段生成流程：第一阶段基于视频语义生成单声道音频内容，第二阶段利用视觉空间线索预测声源方位并完成 FOA 编码，两阶段均可独立优化",
      ],
      metrics: [
        { label: "数据集规模", value: "102k clips", desc: "YT-AMBISEM 语义增强数据集" },
        { label: "评估指标", value: "FAD / KLD / CC / AUC", desc: "语义一致性 + 空间感知双维度评估" },
        { label: "对比基线", value: "ViSAGe / Diff-Foley", desc: "与现有 SOTA 方法全面对比" },
        { label: "投稿会议", value: "Interspeech 2025", desc: "语音与音频领域顶级国际会议" },
      ],
      techStack: ["Python", "PyTorch", "Qwen2.5-VL", "Diffusion Models", "Ambisonics B-Format", "FFMPEG"],
    },
  },
  {
    id: "core",
    badge: "学生创新创业项目",
    badgeColor: "bg-[oklch(0.35_0.06_250)] text-[oklch(0.85_0.02_250)]",
    role: "核心成员",
    title: "基于深度学习的多变量时间序列异常检测算法设计",
    summary: "针对多变量时间序列异常检测中未显式建模异方差不确定性以及重构模型存在 shortcut learning 导致判别能力不足的问题，提出 CORE 框架，将重构任务分解为异方差不确定性建模与核心结构信息保持两个子任务，在多个数据集上提升 F1（最高达 2.84%）。",
    responsibilities: [
      "参与问题建模与方法设计，实现重构目标分解",
      "负责模型复现与训练流程搭建",
      "对 SFR 编码器与 Transformer 解码器结构进行实验验证",
      "进行超参数调优与性能优化，参与实验分析",
    ],
    tags: ["Time Series", "Anomaly Detection", "Deep Learning", "Transformer", "CORE Framework", "F1 +2.84%"],
    bulletColor: "bg-[oklch(0.72_0.12_75)]",
    details: {
      background: "工业传感器、金融交易、IT 系统监控等场景中，多变量时间序列的异常检测至关重要。现有基于重构的方法（如 Transformer-AE）存在两大缺陷：① 忽略了不同时间步、不同变量间的异方差不确定性；② 模型倾向于学习捷径（shortcut），即对异常样本也能重构良好，导致判别能力下降。",
      innovation: [
        "CORE 框架设计：将重构目标分解为异方差不确定性建模（Covariance-aware Reconstruction）与核心结构信息保持（Core Structure Preservation）两个子任务，通过多任务学习联合优化",
        "SFR 编码器：设计了 Structure-aware Feature Representation 编码器，能够在特征提取阶段显式捕捉变量间的相关性结构，为后续解码提供更丰富的结构先验",
        "异方差损失函数：引入基于高斯负对数似然的异方差损失，使模型对不同位置的重构误差赋予自适应权重，从而提升对真实异常的敏感性",
      ],
      metrics: [
        { label: "F1 提升", value: "+2.84%", desc: "在最优数据集上相比基线的最大提升" },
        { label: "验证数据集", value: "多个公开数据集", desc: "SMD、MSL、SMAP 等标准异常检测基准" },
        { label: "核心模块", value: "SFR + Transformer", desc: "编码器-解码器架构" },
        { label: "优化目标", value: "F1 / Precision / Recall", desc: "异常检测标准评估指标" },
      ],
      techStack: ["Python", "PyTorch", "Transformer", "NumPy", "Scikit-learn", "Matplotlib"],
    },
  },
];

// ---- ResearchSection component ----
function ResearchSection({ researchRef }: { researchRef: React.RefObject<HTMLDivElement | null> }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="research" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={RESEARCH_BG} alt="" className="w-full h-full object-cover opacity-8" />
        <div className="absolute inset-0 bg-[oklch(0.14_0.02_250/0.95)]" />
      </div>

      <div ref={researchRef} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in-up">
          <div className="mb-10">
            <h2
              className="section-heading text-2xl md:text-3xl text-[oklch(0.95_0.005_80)]"
              style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
            >
              科研经历
            </h2>
            <p
              className="mt-1 ml-5 text-xs tracking-[0.2em] text-[oklch(0.6_0.02_250)] uppercase font-light"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}
            >
              Research Experience
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {researchProjects.map((proj, i) => (
            <div
              key={proj.id}
              className="fade-in-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Card header */}
              <div className="bg-[oklch(1_0.005_80/0.06)] border border-[oklch(1_0_0/0.12)] rounded-sm backdrop-blur-sm">
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${proj.badgeColor}`}>
                          {proj.badge}
                        </span>
                        <span className="text-xs bg-[oklch(0.72_0.12_75/0.3)] text-[oklch(0.85_0.08_75)] px-2 py-0.5 rounded-sm font-medium">
                          {proj.role}
                        </span>
                      </div>
                      <h3
                        className="text-base md:text-lg font-bold text-[oklch(0.95_0.005_80)] leading-snug"
                        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                      >
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                        项目简介
                      </h4>
                      <p className="text-sm text-[oklch(0.78_0.01_250)] leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-wide mb-2">
                        负责工作
                      </h4>
                      <ul className="space-y-1.5">
                        {proj.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[oklch(0.78_0.01_250)]">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${proj.bulletColor}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-sm bg-[oklch(0.3_0.04_250/0.5)] text-[oklch(0.7_0.02_250)] border border-[oklch(1_0_0/0.08)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Toggle button */}
                  <div className="mt-6 pt-5 border-t border-[oklch(1_0_0/0.1)]">
                    <button
                      onClick={() => toggle(proj.id)}
                      className="flex items-center gap-2 text-sm font-medium text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.85_0.10_75)] transition-colors group"
                    >
                      <span className="w-5 h-5 rounded-full border border-[oklch(0.72_0.12_75/0.5)] flex items-center justify-center group-hover:border-[oklch(0.85_0.10_75/0.7)] transition-colors">
                        <svg
                          className="w-3 h-3 transition-transform duration-300"
                          style={{ transform: expandedId === proj.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      {expandedId === proj.id ? "收起项目详情" : "查看项目详情"}
                    </button>
                  </div>
                </div>

                {/* Expandable detail panel */}
                <AnimatePresence initial={false}>
                  {expandedId === proj.id && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 border-t border-[oklch(1_0_0/0.1)]">
                        <div className="pt-6 space-y-8">

                          {/* Background */}
                          <div>
                            <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-4 h-px bg-[oklch(0.6_0.02_250)]" />
                              研究背景
                            </h4>
                            <p className="text-sm text-[oklch(0.75_0.01_250)] leading-relaxed pl-6 border-l border-[oklch(0.48_0.18_25/0.4)]">
                              {proj.details.background}
                            </p>
                          </div>

                          {/* Innovations */}
                          <div>
                            <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-4 h-px bg-[oklch(0.6_0.02_250)]" />
                              核心创新点
                            </h4>
                            <div className="space-y-3 pl-2">
                              {proj.details.innovation.map((item, idx) => (
                                <div key={idx} className="flex gap-3">
                                  <span
                                    className="flex-shrink-0 w-5 h-5 rounded-full bg-[oklch(0.48_0.18_25/0.15)] text-[oklch(0.72_0.12_75)] text-xs flex items-center justify-center font-bold mt-0.5"
                                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                                  >
                                    {idx + 1}
                                  </span>
                                  <p className="text-sm text-[oklch(0.78_0.01_250)] leading-relaxed">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Metrics */}
                          <div>
                            <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-4 h-px bg-[oklch(0.6_0.02_250)]" />
                              关键成果 & 数据
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {proj.details.metrics.map((m) => (
                                <div
                                  key={m.label}
                                  className="bg-[oklch(1_0.005_80/0.05)] border border-[oklch(1_0_0/0.1)] rounded-sm p-3 text-center"
                                >
                                  <p
                                    className="text-base font-bold text-[oklch(0.85_0.08_75)] leading-tight mb-1"
                                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                                  >
                                    {m.value}
                                  </p>
                                  <p className="text-xs text-[oklch(0.55_0.01_250)] font-medium">{m.label}</p>
                                  <p className="text-xs text-[oklch(0.48_0.01_250)] mt-0.5 leading-snug">{m.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h4 className="text-xs font-semibold text-[oklch(0.6_0.02_250)] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-4 h-px bg-[oklch(0.6_0.02_250)]" />
                              技术栈
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {proj.details.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-3 py-1 rounded-sm bg-[oklch(0.25_0.04_250/0.6)] text-[oklch(0.8_0.02_250)] border border-[oklch(1_0_0/0.12)] font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Courses data (from official transcript) ----
// Core CS/Finance courses only, sorted by score descending
const courses = [
  { name: "数据库课程设计", score: 100, tag: "CS" },
  { name: "Python数据分析", score: 98, tag: "CS" },
  { name: "高级语言程序设计(C++)", score: 97, tag: "CS" },
  { name: "数字逻辑", score: 97, tag: "CS" },
  { name: "Econometrics", score: 97, tag: "金融" },
  { name: "金融学原理", score: 95, tag: "金融" },
  { name: "数据结构", score: 95, tag: "CS" },
  { name: "离散数学", score: 91, tag: "CS" },
  { name: "计算机组成与体系结构", score: 90, tag: "CS" },
  { name: "操作系统", score: 90, tag: "CS" },
  { name: "计算机网络", score: 89, tag: "CS" },
];

// ---- Awards data ----
const competitions = [
  { name: "美国大学生数学建模竞赛（MCM/ICM）", level: "国家级", award: "Honorable Mention", color: "crimson" },
  { name: "全国大学生数学建模竞赛", level: "省级", award: "一等奖", color: "crimson" },
  { name: "深圳杯数学建模挑战赛", level: "省级", award: "一等奖", color: "crimson" },
  { name: "亚太地区大学生数学建模竞赛（APMCM）", level: "省级", award: "二等奖", color: "gold" },
  { name: "MathorCup高校数学建模挑战赛", level: "省级", award: "二等奖", color: "gold" },
  { name: "\"大湾区杯\"粤港澳金融数学建模竞赛", level: "省级", award: "一等奖", color: "crimson" },
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
      { name: "高级语言程序设计(C++)（一）", type: "必修", credit: 3.5, score: 97 },
      { name: "金融科技概论", type: "必修", credit: 1.0, score: 89 },
      { name: "计算机科学概论", type: "必修", credit: 1.0, score: 85 },
      { name: "习近平新时代中国特色社会主义思想概论", type: "必修", credit: 3.0, score: 80 },
      { name: "线性代数与解析几何", type: "必修", credit: 3.0, score: 90 },
      { name: "信息安全导论", type: "必修", credit: 1.0, score: 91 },
      { name: "学术英语（一）", type: "必修", credit: 3.0, score: 85 },
      { name: "IT前沿技术", type: "必修", credit: 1.0, score: 85 },
      { name: "ACM程序设计竞赛实验", type: "选修", credit: 1.0, score: 98 },
      { name: "Corporate Finance", type: "必修", credit: 3.0, score: 93 },
      { name: "计量经济学实验", type: "必修", credit: 1.0, score: 93 },
      { name: "公募基金高质量发展与创新", type: "选修", credit: 2.0, score: 90 },
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
      { name: "高级语言程序设计(C++)（二）", type: "必修", credit: 1.5, score: 87 },
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
      { name: "毛泽东思想和中国特色社会主义理论体系概论", type: "必修", credit: 2.5, score: 88 },
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
function TranscriptModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"table" | "image">("table");

  // Close on backdrop click or Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
            className="absolute inset-0 bg-[oklch(0.1_0.02_55/0.85)] backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal panel */}
          <motion.div
            className="relative z-10 bg-[oklch(0.99_0.005_80)] rounded-sm shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.9_0.01_80)]">
              <div>
                <h3 className="text-base font-bold text-[oklch(0.18_0.02_55)]"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  华南理工大学 · 主修成绩单
                </h3>
                <p className="text-xs text-[oklch(0.52_0.025_60)] mt-0.5">South China University of Technology · Official Transcript</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Tab switcher */}
                <div className="flex bg-[oklch(0.93_0.01_80)] rounded-sm p-0.5 text-xs">
                  <button
                    onClick={() => setActiveTab("table")}
                    className={`px-3 py-1 rounded-sm transition-all ${
                      activeTab === "table"
                        ? "bg-white text-[oklch(0.18_0.02_55)] shadow-sm font-medium"
                        : "text-[oklch(0.52_0.025_60)] hover:text-[oklch(0.28_0.04_55)]"
                    }`}
                  >
                    成绩表格
                  </button>
                  <button
                    onClick={() => setActiveTab("image")}
                    className={`px-3 py-1 rounded-sm transition-all ${
                      activeTab === "image"
                        ? "bg-white text-[oklch(0.18_0.02_55)] shadow-sm font-medium"
                        : "text-[oklch(0.52_0.025_60)] hover:text-[oklch(0.28_0.04_55)]"
                    }`}
                  >
                    原始成绩单
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[oklch(0.93_0.01_80)] transition-colors text-[oklch(0.52_0.025_60)] hover:text-[oklch(0.18_0.02_55)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="overflow-auto flex-1">
              {activeTab === "table" ? (
                <div className="p-5 space-y-6">
                  {transcriptSemesters.map((sem) => (
                    <div key={sem.term}>
                      {/* Semester heading */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-4 bg-[oklch(0.48_0.18_25)] rounded-full" />
                        <h4 className="text-sm font-semibold text-[oklch(0.18_0.02_55)]"
                            style={{ fontFamily: "'Noto Serif SC', serif" }}>
                          {sem.term}
                        </h4>
                        <div className="flex-1 h-px bg-[oklch(0.9_0.01_80)]" />
                        <span className="text-xs text-[oklch(0.6_0.02_60)]">
                          {sem.courses.length} 门课程
                        </span>
                      </div>
                      {/* Table */}
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-[oklch(0.96_0.008_80)]">
                            <th className="text-left py-1.5 px-3 text-[oklch(0.52_0.025_60)] font-medium border border-[oklch(0.9_0.01_80)] w-[45%]">课程名称</th>
                            <th className="text-center py-1.5 px-2 text-[oklch(0.52_0.025_60)] font-medium border border-[oklch(0.9_0.01_80)] w-[15%]">性质</th>
                            <th className="text-center py-1.5 px-2 text-[oklch(0.52_0.025_60)] font-medium border border-[oklch(0.9_0.01_80)] w-[15%]">学分</th>
                            <th className="text-center py-1.5 px-2 text-[oklch(0.52_0.025_60)] font-medium border border-[oklch(0.9_0.01_80)] w-[25%]">总评</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map((c, i) => {
                            const isNum = typeof c.score === "number";
                            const score = isNum ? (c.score as number) : null;
                            const isHigh = score !== null && score >= 95;
                            const isMid = score !== null && score >= 90 && score < 95;
                            return (
                              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[oklch(0.985_0.005_80)]"}
                              >
                                <td className="py-1.5 px-3 text-[oklch(0.28_0.04_55)] border border-[oklch(0.9_0.01_80)]">{c.name}</td>
                                <td className="py-1.5 px-2 text-center text-[oklch(0.52_0.025_60)] border border-[oklch(0.9_0.01_80)]">{c.type}</td>
                                <td className="py-1.5 px-2 text-center text-[oklch(0.52_0.025_60)] border border-[oklch(0.9_0.01_80)]">{c.credit}</td>
                                <td className="py-1.5 px-2 text-center border border-[oklch(0.9_0.01_80)]">
                                  <span
                                    className="inline-block px-2 py-0.5 rounded-sm font-semibold"
                                    style={{
                                      fontFamily: "'Crimson Pro', Georgia, serif",
                                      fontSize: "13px",
                                      background: isHigh
                                        ? "oklch(0.48 0.18 25 / 0.1)"
                                        : isMid
                                        ? "oklch(0.62 0.12 45 / 0.1)"
                                        : "transparent",
                                      color: isHigh
                                        ? "oklch(0.42 0.18 25)"
                                        : isMid
                                        ? "oklch(0.45 0.12 45)"
                                        : "oklch(0.52 0.025 60)",
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
                    className="w-full h-auto rounded-sm border border-[oklch(0.9_0.01_80)]"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[oklch(0.9_0.01_80)] flex items-center justify-between">
              <p className="text-xs text-[oklch(0.6_0.02_60)]">打印日期：2026-03-19 · 证明专用章 · 学号：202330372351</p>
              <button
                onClick={onClose}
                className="text-xs px-4 py-1.5 bg-[oklch(0.48_0.18_25)] text-white rounded-sm hover:bg-[oklch(0.42_0.18_25)] transition-colors"
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
  const educationRef = useScrollAnimation();
  const researchRef = useScrollAnimation();
  const awardsRef = useScrollAnimation();
  const honorsRef = useScrollAnimation();
  const [transcriptOpen, setTranscriptOpen] = useState(false);

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

      {/* ===== TRANSCRIPT MODAL ===== */}
      <TranscriptModal open={transcriptOpen} onClose={() => setTranscriptOpen(false)} />

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
                <div className="flex items-center gap-4 mb-6">
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

                {/* View transcript button */}
                <button
                  onClick={() => setTranscriptOpen(true)}
                  className="flex items-center gap-2 text-sm font-medium text-[oklch(0.48_0.18_25)] hover:text-[oklch(0.38_0.18_25)] transition-colors group border border-[oklch(0.48_0.18_25/0.3)] hover:border-[oklch(0.48_0.18_25/0.6)] px-4 py-2 rounded-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  查看完整成绩单
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Core courses */}
            <div className="lg:col-span-2 fade-in-up" style={{ transitionDelay: "0.15s" }}>
              <div className="paper-card rounded-sm p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-[oklch(0.28_0.04_55)] tracking-wide uppercase"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>
                    核心课程成绩
                  </h4>
                  <div className="flex gap-1.5 text-xs">
                    <span className="px-1.5 py-0.5 rounded-sm bg-[oklch(0.48_0.18_25/0.1)] text-[oklch(0.48_0.18_25)] border border-[oklch(0.48_0.18_25/0.2)]">CS</span>
                    <span className="px-1.5 py-0.5 rounded-sm bg-[oklch(0.72_0.12_75/0.1)] text-[oklch(0.55_0.12_75)] border border-[oklch(0.72_0.12_75/0.2)]">金融</span>
                  </div>
                </div>
                <div className="space-y-2.5 flex-1">
                  {courses.map((course) => (
                    <div key={course.name}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className="flex-shrink-0 text-[10px] px-1 py-0.5 rounded-sm font-medium"
                            style={{
                              background: course.tag === "CS" ? "oklch(0.48 0.18 25 / 0.1)" : course.tag === "金融" ? "oklch(0.72 0.12 75 / 0.1)" : "oklch(0.85 0.01 80 / 0.5)",
                              color: course.tag === "CS" ? "oklch(0.48 0.18 25)" : course.tag === "金融" ? "oklch(0.5 0.12 75)" : "oklch(0.52 0.025 60)",
                              border: course.tag === "CS" ? "1px solid oklch(0.48 0.18 25 / 0.2)" : course.tag === "金融" ? "1px solid oklch(0.72 0.12 75 / 0.2)" : "1px solid oklch(0.85 0.01 80)",
                            }}
                          >
                            {course.tag}
                          </span>
                          <span className="text-xs text-[oklch(0.28_0.04_55)] truncate">{course.name}</span>
                        </div>
                        <span className="flex-shrink-0 text-sm font-bold text-[oklch(0.48_0.18_25)] ml-2"
                              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                          {course.score}
                        </span>
                      </div>
                      <div className="h-1 bg-[oklch(0.93_0.018_80)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${course.score}%`,
                            background: course.score >= 99
                              ? "oklch(0.48 0.18 25)"
                              : course.score >= 96
                              ? "oklch(0.55 0.15 25)"
                              : course.score >= 93
                              ? "oklch(0.62 0.12 45)"
                              : "oklch(0.72 0.12 75)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* View all link */}
                <button
                  onClick={() => setTranscriptOpen(true)}
                  className="mt-4 pt-4 border-t border-[oklch(0.9_0.01_80)] flex items-center justify-center gap-1.5 text-xs text-[oklch(0.52_0.025_60)] hover:text-[oklch(0.48_0.18_25)] transition-colors w-full"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10" />
                  </svg>
                  查看全部课程成绩
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH SECTION ===== */}
      <ResearchSection researchRef={researchRef} />

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
