import { ArrowUpRight, BookOpen, GraduationCap, FileText } from "lucide-react";

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

export default function EducationSection({
  onOpenTranscript,
}: {
  onOpenTranscript: () => void;
}) {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-space"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Education & foundations</p>
            <h2
              id="education-heading"
              className="section-heading text-2xl md:text-3xl"
            >
              教育背景
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            计算机的工程思维，金融的分析视角。
          </p>
        </div>
        <div className="education-grid">
          <article className="education-profile surface-card">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="icon-tile">
                  <GraduationCap size={23} aria-hidden="true" />
                </span>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  2023.09 — 至今
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                  华南理工大学
                </h3>
                <span className="subject-tag subject-tag-cs">985 / 双一流</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                计算机科学与工程学院
              </p>
              <p className="mt-5 text-sm font-medium leading-7 text-slate-700">
                金融学 + 计算机科学与技术
                <br />
                <span className="font-normal text-muted-foreground">
                  双学位试点项目 · 本科大四在读
                </span>
              </p>
            </div>
            <dl className="academic-metrics">
              {[
                { label: "加权平均分", value: "90.22", suffix: "" },
                { label: "专业排名", value: "1", suffix: "/15" },
                { label: "GPA", value: "3.84", suffix: "/4.0" },
              ].map(metric => (
                <div key={metric.label} className="academic-metric">
                  <dt>{metric.label}</dt>
                  <dd>
                    {metric.value}
                    <span>{metric.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="education-footer">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="mr-1">英语能力</span>
                <span className="neutral-tag">
                  CET-4 <strong className="ml-1 text-foreground">576</strong>
                </span>
                <span className="neutral-tag">
                  CET-6 <strong className="ml-1 text-foreground">450</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenTranscript}
                className="text-link mt-5"
              >
                <FileText size={16} aria-hidden="true" /> 查看完整成绩单{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </article>
          <article
            className="education-courses surface-card"
            aria-labelledby="courses-heading"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3
                id="courses-heading"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <BookOpen
                  size={17}
                  className="text-primary"
                  aria-hidden="true"
                />
                核心课程成绩
              </h3>
              <span className="text-xs text-muted-foreground">
                精选 {courses.length} 门 · 百分制
              </span>
            </div>
            <ul className="course-grid">
              {courses.map(course => (
                <li key={course.name} className="course-card">
                  <div className="min-w-0">
                    <span
                      className={`subject-tag ${course.tag === "CS" ? "subject-tag-cs" : "subject-tag-finance"}`}
                    >
                      {course.tag}
                    </span>
                    <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-700">
                      {course.name}
                    </p>
                  </div>
                  <strong className="course-score">{course.score}</strong>
                </li>
              ))}
              <li className="course-more">
                <button
                  type="button"
                  onClick={onOpenTranscript}
                  className="flex h-full w-full items-center justify-center gap-2 rounded-xl p-3 text-xs font-medium text-primary transition-colors hover:bg-blue-50"
                >
                  全部课程 <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
