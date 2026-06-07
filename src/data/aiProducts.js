export const aiProducts = [
  {
    id: "AI-01",
    featured: true,
    title: "InsightFlow",
    titleZh: "InsightFlow 智能问数 Copilot",
    eyebrow: "AI data product demo",
    eyebrowZh: "AI 数据产品 Demo",
    purpose:
      "A runnable analytics copilot that turns Chinese business questions into structured intent, SQL, deterministic pandas analysis, and an explainable diagnosis.",
    purposeZh:
      "一个可运行的智能问数原型：把中文业务问题转成结构化意图、SQL、确定性 pandas 计算和可解释诊断。",
    problem:
      "Operations teams ask natural-language questions, but data systems need verified metrics, regions, time ranges, and SQL logic.",
    problemZh:
      "业务团队用自然语言提问，但数据系统需要可核验的指标、地区、时间范围和 SQL 逻辑。",
    system:
      "Intent parser -> SQL generator -> pandas calculation -> diagnosis -> benchmark evaluation. AI handles understanding; deterministic modules handle calculation and checks.",
    systemZh:
      "意图解析 -> SQL 生成 -> pandas 计算 -> 诊断输出 -> benchmark 评测。AI 负责理解与组织，确定性模块负责计算和校验。",
    evidence:
      "Completed v1 with Streamlit demo, pytest coverage, PRD/evaluation/rollout/guardrail docs, and a controlled 22-query prompt benchmark.",
    evidenceZh:
      "已完成 v1：包含 Streamlit demo、pytest 覆盖、PRD/评测/灰度/guardrail 文档，以及 22 条受控 query 的 prompt benchmark。",
    role: "Product design, AI workflow, NL2SQL prototype, evaluation plan",
    roleZh: "产品设计、AI 工作流、NL2SQL 原型、评测方案",
    methods: ["Python", "pandas", "Streamlit", "pytest", "NL2SQL", "Guardrails"],
    methodsZh: ["Python", "pandas", "Streamlit", "pytest", "NL2SQL", "Guardrails"],
    metrics: [
      { value: "4-step", label: "analytics chain", labelZh: "分析链路" },
      { value: "22", label: "benchmark queries", labelZh: "评测 query" },
      { value: "0.000", label: "V3 hallucination", labelZh: "V3 幻觉率" },
    ],
    status:
      "Best shown as the anchor product: it proves workflow design, data-product judgment, evaluation thinking, and risk boundaries in one case.",
    statusZh:
      "适合作为主打产品：一个案例同时证明工作流设计、数据产品判断、评测思维和风险边界。",
    image: "/images/projects/insightflow-system.svg",
    imageAlt: "InsightFlow system diagram showing natural language question, intent parsing, SQL, analysis, diagnosis, and evaluation",
    accent: "terracotta",
    links: [
      { label: "Demo Flow", labelZh: "演示链路", href: "#" },
      { label: "Evaluation", labelZh: "评测方案", href: "#" },
      { label: "Guardrails", labelZh: "风险边界", href: "#" },
    ],
  },
  {
    id: "AI-02",
    title: "Prompt Eval Benchmark",
    titleZh: "Prompt Eval 评测基准",
    eyebrow: "Prompt evaluation system",
    eyebrowZh: "Prompt 评测系统",
    purpose:
      "A controlled benchmark for comparing prompt versions in intelligent analytics, with accuracy and hallucination metrics treated as product release gates.",
    purposeZh:
      "面向智能问数场景的受控评测基准，用 accuracy 与 hallucination 指标比较 prompt 版本，并作为产品上线门槛。",
    problem:
      "Prompt quality cannot be judged by fluent answers. A data product needs to know whether the model stays inside metric, district, task, and schema boundaries.",
    problemZh:
      "Prompt 不能只凭回答流畅度判断。数据产品必须知道模型是否守住指标、地区、任务类型和 schema 边界。",
    system:
      "V1 baseline exposes failure, V2 adds schema grounding, and V3 adds few-shot mapping for Chinese business queries and complex task intent.",
    systemZh:
      "V1 baseline 暴露问题，V2 加入 schema grounding，V3 加入 few-shot 规则来处理中文业务表达和复杂任务意图。",
    evidence:
      "The documented benchmark covers 22 Chinese business queries across GMV, orders, users, AOV, peak orders, coupon cost, and four task types.",
    evidenceZh:
      "文档化 benchmark 覆盖 22 条中文业务 query，包含 GMV、订单、用户数、客单价、高峰期订单、优惠券成本与四类任务。",
    role: "Prompt design, benchmark design, schema grounding, release criteria",
    roleZh: "Prompt 设计、benchmark 设计、schema grounding、上线门槛",
    methods: ["Schema grounding", "Few-shot", "Error analysis", "Release gates"],
    methodsZh: ["Schema grounding", "Few-shot", "错误分析", "上线门槛"],
    metrics: [
      { value: "0.182", label: "V1 overall", labelZh: "V1 整体准确率" },
      { value: "0.636", label: "V2 overall", labelZh: "V2 整体准确率" },
      { value: "1.000", label: "V3 controlled set", labelZh: "V3 受控集" },
    ],
    status:
      "Best shown as the technical proof layer behind InsightFlow: it demonstrates how AI product quality can be evaluated, not guessed.",
    statusZh:
      "适合作为 InsightFlow 背后的技术证明层：展示 AI 产品质量如何被评测，而不是凭感觉判断。",
    image: "/images/projects/prompt-eval-benchmark.svg",
    imageAlt: "Prompt evaluation benchmark diagram comparing V1, V2, and V3 accuracy and hallucination rate",
    accent: "powder",
    links: [
      { label: "Results", labelZh: "评测结果", href: "#" },
      { label: "Error Analysis", labelZh: "错误分析", href: "#" },
      { label: "Release Gate", labelZh: "上线门槛", href: "#" },
    ],
  },
  {
    id: "AI-03",
    title: "Research Radar",
    titleZh: "Research Radar 研究雷达",
    eyebrow: "AI research workflow",
    eyebrowZh: "AI 研究工作流",
    purpose:
      "A Markdown-based academic research scout that turns recent trustworthy-AI papers into focused daily notes, paper cards, weekly synthesis, and proposal directions.",
    purposeZh:
      "一个 Markdown 研究侦察工作流：把可信 AI 论文转成每日筛选、论文卡片、周总结和博士 proposal 方向。",
    problem:
      "Research exploration can easily become quantity-driven. The radar keeps papers anchored to one research identity and rejects generic AI hype.",
    problemZh:
      "研究探索很容易变成追数量。Research Radar 把论文筛选锚定到一个研究身份，并主动排除泛泛 AI 热点。",
    system:
      "Paper feeds -> daily screening -> research-function labels -> thesis connection -> paper cards -> weekly direction convergence.",
    systemZh:
      "论文收集 -> 每日筛选 -> 研究功能标签 -> thesis 连接 -> 论文卡片 -> 每周方向收敛。",
    evidence:
      "The workflow maintains daily notes, topic maps, paper cards, and weekly reports around subgroup-aware reliability diagnosis under distribution shift.",
    evidenceZh:
      "工作流围绕 distribution shift 下的 subgroup-aware reliability diagnosis，维护 daily notes、topic maps、paper cards 和 weekly reports。",
    role: "Research workflow design, knowledge architecture, synthesis protocol",
    roleZh: "研究工作流设计、知识架构、综合协议",
    methods: ["Research scouting", "Topic maps", "Paper cards", "Weekly synthesis"],
    methodsZh: ["研究侦察", "Topic maps", "论文卡片", "周总结"],
    metrics: [
      { value: "3", label: "papers per day", labelZh: "每日论文" },
      { value: "5", label: "research functions", labelZh: "研究功能" },
      { value: "Top 3", label: "weekly directions", labelZh: "周方向排序" },
    ],
    status:
      "Best shown as an AI-enabled research product: it proves information architecture, screening discipline, and long-term synthesis.",
    statusZh:
      "适合作为 AI 研究产品展示：证明信息架构、筛选纪律和长期综合能力。",
    image: "/images/projects/research-radar-workflow.svg",
    imageAlt: "Research Radar workflow diagram showing paper feeds, screening, paper cards, synthesis, and direction seeds",
    accent: "moss",
    links: [
      { label: "Daily Notes", labelZh: "每日笔记", href: "#" },
      { label: "Paper Cards", labelZh: "论文卡片", href: "#" },
      { label: "Weekly Synthesis", labelZh: "周总结", href: "#" },
    ],
  },
];
