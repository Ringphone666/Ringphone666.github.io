import { ArrowUpRight, AudioLines, Braces, FileCheck2, GitBranch, Github, Layers3, ShieldCheck } from "lucide-react";

const repository = "https://github.com/Ringphone666/talentflow";

const engineering = [
  {
    icon: Braces,
    number: "01",
    title: "让模型输出有据可查",
    stack: "LLM · Embedding · Rerank",
    description: "将材料解析、语义检索与重排串成评估链路，以 Schema 约束输出，校验证据编号与原文引用，让判断回到具体材料和回答。",
  },
  {
    icon: AudioLines,
    number: "02",
    title: "让语音链路能够回退",
    stack: "WebSocket · Streaming ASR",
    description: "接入流式语音识别，分段保留录音与时间信息；实时转写失败时尝试录音补转写，支持发言角色推断、人工更正与受约束追问。",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "让业务流程可控可追溯",
    stack: "RBAC · Review · Audit Trail",
    description: "用角色权限、审核状态与报告版本连接人机协同流程，在关键导出入口校验权限和复核状态，保留人工修改原因与审计记录。",
  },
  {
    icon: GitBranch,
    number: "04",
    title: "让长任务与交付更可靠",
    stack: "Background Tasks · pytest · CI",
    description: "分层处理模型超时、有限重试与失败原因；匹配任务结合线程池和磁盘载荷支持重启恢复，以前后端回归与自动构建验证交付。",
  },
];

const layers = [
  { name: "交互工作台", detail: "React 19 / TypeScript / Ant Design" },
  { name: "业务与协同", detail: "FastAPI / WebSocket / 角色权限" },
  { name: "模型与证据", detail: "LLM / Embedding / Rerank / 引用校验" },
  { name: "数据与交付", detail: "SQLAlchemy / SQLite / 报告版本与导出" },
];

export default function FeaturedProject() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 bg-[oklch(0.96_0.012_80)] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="projects-heading" className="section-heading text-2xl text-[oklch(0.18_0.02_55)] md:text-3xl">工程作品</h2>
            <p className="ml-5 mt-1 font-serif text-xs italic uppercase tracking-[0.2em] text-[oklch(0.52_0.025_60)]">Selected Engineering</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[oklch(0.45_0.025_60)]">把模型能力接入真实业务流程，关注证据、协同与可靠交付。</p>
        </div>

        <article className="overflow-hidden rounded-sm border border-[oklch(0.85_0.02_75)] bg-[oklch(0.99_0.005_80)] shadow-sm">
          <div className="grid gap-10 bg-[oklch(0.2_0.025_250)] p-6 text-white md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <div className="mb-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-sm border border-[oklch(0.78_0.09_75/0.4)] bg-[oklch(0.78_0.09_75/0.1)] px-2.5 py-1 text-[oklch(0.85_0.08_75)]">实习项目 · 全栈 AI 应用</span>
                <span className="rounded-sm border border-white/20 px-2.5 py-1 text-white/75">公开作品集</span>
              </div>
              <h3 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">TalentFlow</h3>
              <p className="mt-3 text-lg font-medium text-[oklch(0.9_0.04_75)]">证据驱动的人才评估与面试 Copilot</p>
              <p className="mt-5 text-sm leading-7 text-white/75">在实习中开发的人才评估与面试协同平台，整合双向人岗匹配、AI 结构化面试与人工面试 Copilot，贯通材料导入、模型分析、证据核验、人工复核与报告交付。</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[oklch(0.85_0.08_75)] px-4 py-2.5 text-sm font-semibold text-[oklch(0.2_0.025_250)] transition-colors hover:bg-[oklch(0.92_0.06_75)]">
                  <Github size={16} aria-hidden="true" /> 查看源码 <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href={`${repository}/blob/main/docs/architecture.md`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10">
                  <Layers3 size={16} aria-hidden="true" /> 架构设计 <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="self-center rounded-sm border border-white/15 bg-white/5 p-5 md:p-6">
              <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[oklch(0.85_0.08_75)]"><Layers3 size={15} aria-hidden="true" /> System Architecture</div>
              <p className="mb-4 text-xs leading-relaxed text-white/60">模块化单体 · 共享材料库 · 模型服务适配</p>
              <div className="space-y-2.5">
                {layers.map((layer) => (
                  <div key={layer.name} className="grid gap-1 border-l-2 border-[oklch(0.78_0.09_75/0.6)] bg-white/5 px-4 py-3">
                    <span className="text-sm font-medium text-white/90">{layer.name}</span>
                    <span className="text-xs leading-relaxed text-white/65">{layer.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-[oklch(0.88_0.018_75)] border-b border-[oklch(0.88_0.018_75)] bg-[oklch(0.97_0.01_80)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: "617", label: "后端回归测试通过", detail: "pytest · 权限 / 解析 / 匹配 / 面试" },
              { value: "320", label: "前端交互测试通过", detail: "Vitest · 模拟服务与合成资料" },
              { value: "CI Passed", label: "自动化验证通过", detail: "GitHub Actions · 测试 / 类型检查 / 构建" },
            ].map((metric) => (
              <div key={metric.label} className="px-6 py-5 md:px-8">
                <p className="font-serif text-3xl font-semibold text-[oklch(0.48_0.18_25)]">{metric.value}</p>
                <p className="mt-1 text-sm font-medium text-[oklch(0.25_0.025_55)]">{metric.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[oklch(0.5_0.025_60)]">{metric.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {engineering.map(({ icon: Icon, number, title, stack, description }) => (
                <div key={number}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[oklch(0.48_0.18_25/0.07)] text-[oklch(0.48_0.18_25)]"><Icon size={18} aria-hidden="true" /></span>
                    <h4 className="text-base font-semibold text-[oklch(0.25_0.025_55)]">{title}</h4>
                    <span className="ml-auto font-serif text-lg text-[oklch(0.65_0.025_60)]">{number}</span>
                  </div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-[oklch(0.48_0.18_25)]">{stack}</p>
                  <p className="text-sm leading-7 text-[oklch(0.43_0.025_60)]">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-[oklch(0.88_0.018_75)] pt-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.25_0.025_55)]"><FileCheck2 size={17} aria-hidden="true" /> 从评估工作台到证据复核</h4>
                <span className="text-xs text-[oklch(0.5_0.025_60)]">虚构候选人 · 本地模拟模型演示</span>
              </div>
              <div className="grid items-start gap-5 md:grid-cols-2">
                {[
                  { image: "workspace.jpg", alt: "TalentFlow 面试报告工作台，展示报告状态、复核与导出入口", caption: "01 / 面试报告工作台", text: "统一管理报告、复核状态与交付入口" },
                  { image: "evidence-report.jpg", alt: "TalentFlow 证据报告，展示评估维度、回答引用与人工复核", caption: "02 / 证据驱动的评估报告", text: "将评价关联到回答证据，支持人工修改与版本回溯" },
                ].map((preview) => (
                  <figure key={preview.image} className="overflow-hidden rounded-sm border border-[oklch(0.88_0.018_75)]">
                    <img src={`/projects/talentflow/${preview.image}`} alt={preview.alt} loading="lazy" width={1440} height={960} className="aspect-[3/2] w-full object-cover object-top" />
                    <figcaption className="border-t border-[oklch(0.88_0.018_75)] px-4 py-3">
                      <p className="text-sm font-medium text-[oklch(0.28_0.04_55)]">{preview.caption}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[oklch(0.5_0.025_60)]">{preview.text}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Python", "FastAPI", "SQLAlchemy", "React 19", "TypeScript", "Ant Design", "WebSocket", "Embedding / Rerank", "pytest / Vitest", "GitHub Actions"].map((technology) => (
                <span key={technology} className="rounded-sm border border-[oklch(0.86_0.018_75)] bg-[oklch(0.96_0.012_80)] px-2.5 py-1 text-xs text-[oklch(0.35_0.025_60)]">{technology}</span>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[oklch(0.5_0.025_60)]">公开版采用独立品牌与虚构演示资料，面向单实例运行。测试结果来自模拟服务与合成数据；真实模型、语音及 OCR 能力通过外部服务接入。</p>
          </div>
        </article>
      </div>
    </section>
  );
}
