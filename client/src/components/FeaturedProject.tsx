import {
  ArrowUpRight,
  AudioLines,
  Braces,
  BrainCircuit,
  ArrowLeftRight,
  MessagesSquare,
  Database,
  FileCheck2,
  GitBranch,
  Github,
  Layers3,
  PanelsTopLeft,
  Server,
  ShieldCheck,
  X,
  ZoomIn,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const repository = "https://github.com/Ringphone666/talentflow";

const engineering = [
  {
    icon: Braces,
    number: "01",
    title: "结构化反幻觉与细粒度证据溯源",
    stack: "LLM · Embedding · Rerank · JSON Schema",
    description:
      "构建“多源文档解析 -> 混合语义检索 -> Cross-Encoder 重排”的多阶段 RAG 链路；通过强类型 Schema 约束模型输出，强制将每项评估结论绑定至候选人简历与对话原文的时间戳及段落索引，实现 AI 结论 100% 有据可查。",
  },
  {
    icon: AudioLines,
    number: "02",
    title: "流式语音高可用容错与降级回退机制",
    stack: "WebSocket · Streaming ASR · 容灾降级",
    description:
      "基于全双工 WebSocket 接入实时流式语音识别（ASR），支持多说话人角色分离与毫秒级字幕上屏；设计断线重连与音频切片持久化机制，当实时流转写异常时自动触发异步切片补偿转写，保障面试现场零数据丢失。",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "细粒度 RBAC 权限与人机协同（HITL）审计流",
    stack: "RBAC · 状态机 · Audit Trail · 版本控制",
    description:
      "设计严谨的评估报告生命周期状态机，强制执行“AI 生成初稿 -> 面试官人工复核确认 -> 锁定导出”的合规闭环；内置快照版本控制与 Diff 审计日志，完整追踪人工修正轨迹，杜绝未经确认的 AI 结论直接流向业务端。",
  },
  {
    icon: GitBranch,
    number: "04",
    title: "异步长任务调度、断点恢复与幂等保障",
    stack: "Background Tasks · 线程池调度 · 断点续传",
    description:
      "针对大批量人岗匹配与长音频分析等高耗时任务，设计分层超时控制、指数退避重试与异常隔离机制；结合本地磁盘持久化载荷实现服务重启后的任务状态自愈与断点恢复，确保高负载下的系统交付稳定性。",
  },
];

const layers = [
  {
    icon: PanelsTopLeft,
    name: "交互工作台",
    stack: ["React 19", "TypeScript", "Ant Design"],
  },
  {
    icon: Server,
    name: "业务与协同",
    stack: ["FastAPI", "WebSocket", "角色权限"],
  },
  {
    icon: BrainCircuit,
    name: "模型与证据",
    stack: ["LLM", "Embedding", "Rerank", "引用校验"],
  },
  {
    icon: Database,
    name: "数据与交付",
    stack: ["SQLAlchemy", "SQLite", "版本与导出"],
  },
];

const previews = [
  {
    image: "workspace.jpg",
    route: "talentflow / workspace",
    alt: "TalentFlow 面试报告工作台，展示报告状态、复核与导出入口",
    caption: "01 / 面试报告工作台",
    text: "统一管理报告、复核状态与交付入口",
  },
  {
    image: "evidence-report.jpg",
    route: "talentflow / evidence",
    alt: "TalentFlow 证据报告，展示评估维度、回答引用与人工复核",
    caption: "02 / 证据驱动的评估报告",
    text: "将评价关联到回答证据，支持人工修改与版本回溯",
  },
];

function ProjectPreview({ preview }: { preview: (typeof previews)[number] }) {
  const image = `${import.meta.env.BASE_URL}projects/talentflow/${preview.image}`;
  return (
    <figure className="min-w-0">
      <Dialog>
        <div className="browser-window">
          <div className="browser-toolbar" aria-hidden="true">
            <span className="browser-dot bg-[#FF5F57]" />
            <span className="browser-dot bg-[#FEBC2E]" />
            <span className="browser-dot bg-[#28C840]" />
            <span className="mx-auto truncate pr-8 font-mono text-[10px] text-slate-500">
              {preview.route}
            </span>
          </div>
          <DialogTrigger asChild>
            <button
              type="button"
              className="preview-trigger"
              aria-label={`放大预览：${preview.caption}`}
            >
              <img
                src={image}
                alt={preview.alt}
                loading="lazy"
                decoding="async"
                width={1440}
                height={960}
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <span className="preview-zoom">
                <ZoomIn size={14} aria-hidden="true" />
                点击放大
              </span>
            </button>
          </DialogTrigger>
        </div>
        <DialogContent
          showCloseButton={false}
          className="z-[60] max-h-[92dvh] w-[calc(100%-2rem)] max-w-6xl gap-0 overflow-auto rounded-2xl bg-white p-0 sm:max-w-6xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-white/95 px-5 py-4 backdrop-blur-md">
            <div className="min-w-0">
              <DialogTitle className="text-sm leading-relaxed">
                {preview.caption}
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                {preview.text}
              </DialogDescription>
            </div>
            <DialogClose
              className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100"
              aria-label="关闭图片预览"
            >
              <X size={19} aria-hidden="true" />
            </DialogClose>
          </div>
          <img
            src={image}
            alt={preview.alt}
            width={1440}
            height={960}
            className="block h-auto w-full"
          />
        </DialogContent>
      </Dialog>
      <figcaption className="px-1 pt-3">
        <p className="text-xs font-semibold text-slate-700">
          {preview.caption}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {preview.text}
        </p>
      </figcaption>
    </figure>
  );
}

export default function FeaturedProject() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-space"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Selected engineering</p>
            <h2
              id="projects-heading"
              className="section-heading text-2xl md:text-3xl"
            >
              工程作品
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            探索大模型在垂直业务中的工程化落地，构建高可靠、可溯源、人机协同的
            AI Native 应用架构。
          </p>
        </div>
        <article
          className="project-shell surface-card"
          aria-labelledby="talentflow-heading"
        >
          <div className="project-overview">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="subject-tag subject-tag-cs">
                  企业级实习项目 · 全栈 AI Agent 系统
                </span>
                <span className="neutral-tag">开源架构演示</span>
              </div>
              <h3
                id="talentflow-heading"
                className="font-display text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl"
              >
                TalentFlow
              </h3>
              <p className="mt-3 text-base font-semibold leading-relaxed text-slate-700">
                基于 RAG 与证据链溯源的智能人才评估与面试 Copilot
              </p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                面向招聘评估全流程打造的 AI
                协同工作台。深度融合双向人岗语义匹配、实时语音面试 Copilot
                与结构化评估报告生成，通过细粒度证据绑定与
                Human-in-the-loop（人机协同）复核机制，解决大模型在严肃商业决策中的“幻觉”与不可控痛点。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                >
                  <Github size={16} aria-hidden="true" />
                  查看源码
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={`${repository}/blob/main/docs/architecture.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  <Layers3 size={16} aria-hidden="true" />
                  架构设计
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div
              className="architecture"
              aria-labelledby="architecture-heading"
            >
              <h4
                id="architecture-heading"
                className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary"
              >
                <Layers3 size={14} aria-hidden="true" />
                System Architecture
              </h4>
              <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
                模块化单体 · 共享材料库 · 模型服务适配
              </p>
              <ol className="architecture-flow">
                {layers.map(({ icon: Icon, name, stack }) => (
                  <li key={name} className="architecture-layer">
                    <Icon
                      className="shrink-0 text-primary"
                      size={20}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold">{name}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {stack.map(technology => (
                          <span key={technology} className="architecture-tag">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <ul
            className="project-capabilities"
            aria-label="TalentFlow 核心业务能力"
          >
            {[
              {
                icon: ArrowLeftRight,
                title: "双向人岗匹配",
                label: "岗位选才 · 人才适岗",
                description:
                  "围绕岗位比较候选人，也为人才匹配多个岗位；复用已确认材料，以分维度评价与匹配矩阵辅助筛选。",
              },
              {
                icon: MessagesSquare,
                title: "AI 面试协同",
                label: "结构化面试 · 人工面试 Copilot",
                description:
                  "串联题目准备、语音回答、现场转写与补充提问，将已有材料和面试记录连接到同一工作台。",
              },
              {
                icon: FileCheck2,
                title: "证据驱动交付",
                label: "原文引用 · 人工复核",
                description:
                  "评估关联材料片段与回答记录，保留人工修改和报告版本；复核确认后导出报告与佐证材料。",
              },
            ].map(({ icon: Icon, title, label, description }) => (
              <li key={title} className="min-w-0">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h4 className="text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h4>
                </div>
                <p className="text-[11px] font-medium text-primary">{label}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
          <div className="engineering-grid">
            {engineering.map(
              ({ icon: Icon, number, title, stack, description }) => (
                <div key={number} className="engineering-card">
                  <span className="engineering-number" aria-hidden="true">
                    {number}
                  </span>
                  <div className="relative flex items-center gap-2.5 pr-8">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h4 className="text-sm font-semibold">{title}</h4>
                  </div>
                  <div className="relative mt-3 flex flex-wrap gap-1.5">
                    {stack.split(" · ").map(technology => (
                      <span key={technology} className="neutral-tag">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-[1.85] text-muted-foreground">
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
          <div className="mt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <FileCheck2
                  size={16}
                  className="text-primary"
                  aria-hidden="true"
                />
                从评估工作台到证据复核
              </h4>
              <span className="text-[11px] text-muted-foreground">
                数据脱敏演示环境 · 端到端业务流实录
              </span>
            </div>
            <div className="grid items-start gap-5 md:grid-cols-2">
              {previews.map(preview => (
                <ProjectPreview key={preview.image} preview={preview} />
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-5">
            {[
              "Python",
              "FastAPI",
              "SQLAlchemy",
              "React 19",
              "TypeScript",
              "Ant Design",
              "WebSocket",
              "Embedding / Rerank",
              "pytest / Vitest",
              "GitHub Actions",
            ].map(technology => (
              <span key={technology} className="neutral-tag">
                {technology}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
