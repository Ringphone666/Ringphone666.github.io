import { useState } from "react";
import {
  AudioLines,
  ChartLine,
  ChevronDown,
  FlaskConical,
  Lightbulb,
} from "lucide-react";

// ---- Research project detailed data ----
const researchProjects = [
  {
    id: "foley",
    name: "FoleyImmersive",
    icon: AudioLines,
    highlight: {
      value: "102k",
      unit: "clips",
      label: "语义增强数据集",
      note: "YT-AMBISEM",
    },
    badge: "论文 · Interspeech 已录用",
    role: "第二作者",
    title: "Decoupling What and Where for Video-to-First-Order Ambisonics",
    summary:
      "研究沉浸式视频到一阶 Ambisonics（FOA）音频生成问题，针对现有 V2A 系统中语义信息稀疏与空间-内容耦合严重的问题，构建语义增强数据集，提出解耦式两阶段生成框架，实现语义一致且空间感知的沉浸式音频生成。",
    responsibilities: [
      "构建语义增强数据集 YT-AMBISEM（102k clips）",
      "基于 Qwen2.5-VL 设计自动化多模态标注流程",
      "复现并对比 ViSAGe、Diff-Foley 等 baseline",
      "实现 FAD、KLD、CC、AUC 等语义与空间指标评估",
    ],
    tags: [
      "Audio Generation",
      "Ambisonics",
      "Spatial Audio",
      "Multimodal",
      "Qwen2.5-VL",
      "V2A",
    ],
    details: {
      background:
        "沉浸式音频（Ambisonics）能够为用户提供 360° 空间声场体验，是 VR/AR 内容制作的核心技术之一。然而现有的 Video-to-Audio（V2A）系统主要针对单声道或立体声输出，无法直接生成具有空间感知能力的 FOA 音频。本研究填补了这一领域的空白。",
      innovation: [
        "提出 What-Where 解耦框架：将音频生成任务分解为语义内容生成（What）与空间位置建模（Where）两个独立子任务，有效缓解了传统端到端方法中空间-内容耦合导致的质量下降问题",
        "构建 YT-AMBISEM 数据集：包含 102k 个高质量视频-FOA 音频对，并利用 Qwen2.5-VL 多模态大模型自动生成细粒度语义标注，显著提升了训练数据的语义密度",
        "两阶段生成流程：第一阶段基于视频语义生成单声道音频内容，第二阶段利用视觉空间线索预测声源方位并完成 FOA 编码，两阶段均可独立优化",
      ],
      metrics: [
        {
          label: "数据集规模",
          value: "102k clips",
          desc: "YT-AMBISEM 语义增强数据集",
        },
        {
          label: "评估指标",
          value: "FAD / KLD / CC / AUC",
          desc: "语义一致性 + 空间感知双维度评估",
        },
        {
          label: "对比基线",
          value: "ViSAGe / Diff-Foley",
          desc: "与现有 SOTA 方法全面对比",
        },
        {
          label: "录用会议",
          value: "Interspeech 2025",
          desc: "已录用 · 语音与音频领域顶级国际会议",
        },
      ],
      techStack: [
        "Python",
        "PyTorch",
        "Qwen2.5-VL",
        "Diffusion Models",
        "Ambisonics B-Format",
        "FFMPEG",
      ],
    },
  },
  {
    id: "core",
    name: "CORE",
    icon: ChartLine,
    highlight: {
      value: "+2.84%",
      unit: "",
      label: "最高 F1 提升",
      note: "最优数据集 · 相比基线",
    },
    badge: "学生创新创业项目",
    role: "核心成员",
    title: "基于深度学习的多变量时间序列异常检测算法设计",
    summary:
      "针对多变量时间序列异常检测中未显式建模异方差不确定性以及重构模型存在 shortcut learning 导致判别能力不足的问题，提出 CORE 框架，将重构任务分解为异方差不确定性建模与核心结构信息保持两个子任务，在多个数据集上提升 F1（最高达 2.84%）。",
    responsibilities: [
      "参与问题建模与方法设计，实现重构目标分解",
      "负责模型复现与训练流程搭建",
      "对 SFR 编码器与 Transformer 解码器结构进行实验验证",
      "进行超参数调优与性能优化，参与实验分析",
    ],
    tags: [
      "Time Series",
      "Anomaly Detection",
      "Deep Learning",
      "Transformer",
      "CORE Framework",
      "F1 +2.84%",
    ],
    details: {
      background:
        "工业传感器、金融交易、IT 系统监控等场景中，多变量时间序列的异常检测至关重要。现有基于重构的方法（如 Transformer-AE）存在两大缺陷：① 忽略了不同时间步、不同变量间的异方差不确定性；② 模型倾向于学习捷径（shortcut），即对异常样本也能重构良好，导致判别能力下降。",
      innovation: [
        "CORE 框架设计：将重构目标分解为异方差不确定性建模（Covariance-aware Reconstruction）与核心结构信息保持（Core Structure Preservation）两个子任务，通过多任务学习联合优化",
        "SFR 编码器：设计了 Structure-aware Feature Representation 编码器，能够在特征提取阶段显式捕捉变量间的相关性结构，为后续解码提供更丰富的结构先验",
        "异方差损失函数：引入基于高斯负对数似然的异方差损失，使模型对不同位置的重构误差赋予自适应权重，从而提升对真实异常的敏感性",
      ],
      metrics: [
        {
          label: "F1 提升",
          value: "+2.84%",
          desc: "在最优数据集上相比基线的最大提升",
        },
        {
          label: "验证数据集",
          value: "多个公开数据集",
          desc: "SMD、MSL、SMAP 等标准异常检测基准",
        },
        {
          label: "核心模块",
          value: "SFR + Transformer",
          desc: "编码器-解码器架构",
        },
        {
          label: "优化目标",
          value: "F1 / Precision / Recall",
          desc: "异常检测标准评估指标",
        },
      ],
      techStack: [
        "Python",
        "PyTorch",
        "Transformer",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
      ],
    },
  },
];

export default function ResearchSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="section-space"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Research experience</p>
            <h2
              id="research-heading"
              className="section-heading text-2xl md:text-3xl"
            >
              科研经历
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            从多模态音频生成，到时间序列建模。
          </p>
        </div>

        <div className="space-y-5">
          {researchProjects.map(project => {
            const Icon = project.icon;
            const expanded = expandedId === project.id;
            const headingId = `research-${project.id}-heading`;
            const detailsId = `research-${project.id}-details`;
            return (
              <article
                key={project.id}
                className="research-card surface-card"
                aria-labelledby={headingId}
              >
                <div className="p-5 sm:p-7">
                  <div className="research-header">
                    <div className="min-w-0">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="subject-tag subject-tag-cs">
                          {project.badge}
                        </span>
                        <span className="neutral-tag">{project.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="icon-tile">
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <h3
                          id={headingId}
                          className="font-display text-2xl font-extrabold tracking-tight"
                        >
                          {project.name}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-700">
                        {project.title}
                      </p>
                    </div>
                    <div className="research-highlight">
                      <p className="text-[11px] font-medium text-slate-600">
                        {project.highlight.label}
                      </p>
                      <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary tabular-nums">
                        {project.highlight.value}
                        <span className="ml-1.5 text-xs font-semibold tracking-normal text-slate-500">
                          {project.highlight.unit}
                        </span>
                      </p>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        {project.highlight.note}
                      </p>
                    </div>
                  </div>

                  <div className="research-summary">
                    <div>
                      <h4 className="mb-2 text-xs font-semibold text-slate-700">
                        研究概述
                      </h4>
                      <p className="text-[13px] leading-7 text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50/70 p-4">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <FlaskConical
                          size={15}
                          className="text-primary"
                          aria-hidden="true"
                        />
                        我的贡献
                      </h4>
                      <ul className="space-y-2">
                        {project.responsibilities.map(item => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-xs leading-relaxed text-slate-600"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 size-1 shrink-0 rounded-full bg-blue-400"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="neutral-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="text-link shrink-0 rounded-lg px-1"
                      aria-expanded={expanded}
                      aria-controls={detailsId}
                      aria-label={`${expanded ? "收起" : "查看"} ${project.name} 项目详情`}
                      onClick={() =>
                        setExpandedId(expanded ? null : project.id)
                      }
                    >
                      {expanded ? "收起项目详情" : "查看项目详情"}
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                <div
                  id={detailsId}
                  role="region"
                  aria-label={`${project.name} 项目详情`}
                  hidden={!expanded}
                  className="border-t bg-slate-50/60 p-5 sm:p-7"
                >
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-800">
                      研究背景
                    </h4>
                    <p className="text-[13px] leading-7 text-muted-foreground">
                      {project.details.background}
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Lightbulb
                        size={16}
                        className="text-primary"
                        aria-hidden="true"
                      />
                      核心创新点
                    </h4>
                    <ol className="grid gap-3 lg:grid-cols-3">
                      {project.details.innovation.map((item, index) => (
                        <li
                          key={item}
                          className="rounded-xl border bg-white p-4"
                        >
                          <span
                            className="mb-3 flex size-7 items-center justify-center rounded-lg bg-blue-50 font-display text-xs font-bold text-primary"
                            aria-hidden="true"
                          >
                            0{index + 1}
                          </span>
                          <p className="text-xs leading-6 text-slate-600">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold text-slate-800">
                      关键成果与数据
                    </h4>
                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {project.details.metrics.map(metric => (
                        <div
                          key={metric.label}
                          className="min-w-0 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-4"
                        >
                          <dt className="text-xs text-slate-600">
                            {metric.label}
                          </dt>
                          <dd className="mt-2 font-display text-sm font-bold leading-relaxed text-primary">
                            {metric.value}
                          </dd>
                          <dd className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                            {metric.desc}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
                    <h4 className="mr-1 text-xs font-semibold text-slate-700">
                      技术栈
                    </h4>
                    {project.details.techStack.map(technology => (
                      <span key={technology} className="neutral-tag">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
