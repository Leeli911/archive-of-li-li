export const aiProducts = [
  {
    id: "AI-01",
    featured: true,
    title: "Text2Analytics V2",
    titleZh: "Text2Analytics V2 证据分析引擎",
    eyebrow: "Flagship research prototype",
    eyebrowZh: "主打研究原型",
    subtitle: "Deterministic Evidence-backed Analytics Engine",
    subtitleZh: "确定性、证据支撑的分析引擎",
    purpose:
      "A research prototype that transforms supported business questions into an inspectable analytics pipeline with explicit evidence boundaries.",
    purposeZh:
      "一个研究原型：把受支持的业务问题转成可检查的分析链路，并明确展示证据边界。",
    problem:
      "Text2SQL can produce a query, but analytical decision support also needs intent, planning, execution evidence, observed facts, interpretations, limitations, and structural checks.",
    problemZh:
      "Text2SQL 可以生成查询，但面向决策的分析还需要意图、规划、执行证据、事实、解释、限制和结构完整性检查。",
    system:
      "AnalyticsRequest -> Intent -> Planning -> SQL -> Execution -> Evidence -> Facts -> Interpretation -> Limitation -> Insight -> Structural Completeness.",
    systemZh:
      "AnalyticsRequest -> Intent -> Planning -> SQL -> Execution -> Evidence -> Facts -> Interpretation -> Limitation -> Insight -> Structural Completeness。",
    evidence:
      "The public case study is a static replay of one verified V2 engine run. It does not connect to Python Engine, DuckDB, API, or LLM in the browser.",
    evidenceZh:
      "公开详情页回放一次已验证的 V2 Engine 结果。浏览器页面不连接 Python Engine、DuckDB、API 或 LLM。",
    role: "Product design, AI workflow, NL2SQL prototype, evaluation plan",
    roleZh: "产品设计、AI 工作流、NL2SQL 原型、评测方案",
    methods: ["Python", "DuckDB", "Pydantic", "React", "pytest", "Research Prototype"],
    methodsZh: ["Python", "DuckDB", "Pydantic", "React", "pytest", "研究原型"],
    metrics: [
      { value: "V2", label: "verified replay", labelZh: "已验证回放" },
      { value: "11", label: "pipeline stages", labelZh: "链路阶段" },
      { value: "1.0", label: "structural completeness", labelZh: "结构完整性" },
    ],
    status:
      "Positioned as a research prototype, not a production system. Best shown as the flagship AI Products case for evidence-backed analytics and capability boundaries.",
    statusZh:
      "定位为研究原型，而不是生产系统。适合作为 AI Products 的主打案例，展示证据支撑的分析链路和能力边界。",
    image: "/images/projects/text2analytics-v2/github_banner_v2.svg",
    imageAlt: "Text2Analytics V2 banner showing a deterministic evidence-backed analytics engine",
    accent: "terracotta",
    links: [
      { label: "Case Study", labelZh: "项目详情", href: "projects/text2analytics-v2/" },
      { label: "GitHub", labelZh: "GitHub 仓库", href: "https://github.com/Leeli911/ai-data-product-portfolio" },
      {
        label: "Source Path",
        labelZh: "项目路径",
        href: "https://github.com/Leeli911/ai-data-product-portfolio/tree/main/projects/01_insightflow_nl2sql",
      },
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
      "Best shown as the technical proof layer for controlled analytics prompts: it demonstrates how AI product quality can be evaluated, not guessed.",
    statusZh:
      "适合作为受控分析 Prompt 的技术证明层：展示 AI 产品质量如何被评测，而不是凭感觉判断。",
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
  {
    id: "AI-04",
    title: "Structured Thinking Gym",
    titleZh: "Structured Thinking Gym 结构化表达训练系统",
    eyebrow: "AI communication training system",
    eyebrowZh: "AI 沟通训练系统",
    subtitle:
      "AI communication training system with explainable feedback, Human-AI revision, and deterministic demo architecture.",
    subtitleZh:
      "一个结合可解释反馈、人机协作修改与确定性 Demo 架构的 AI 沟通训练系统。",
    purpose:
      "An AI-powered communication training system that turns interview answers into a loop of scoring, diagnosis, revision, and re-score.",
    purposeZh:
      "一个 AI 驱动的沟通训练系统，把面试回答转成评分、诊断、修改和重新评分的闭环。",
    problem:
      "Generic AI writing tools can produce fluent rewrites, but they rarely explain why feedback was given or keep the learner responsible for the final revision.",
    problemZh:
      "普通 AI 写作工具可以生成流畅改写，但通常不会解释反馈依据，也容易让用户被动接受 AI 输出。",
    system:
      "Draft -> explainable feedback -> AI suggestion -> accept, reject, or edit -> final answer -> re-score, with Demo and Live modes sharing the same UI contract.",
    systemZh:
      "Draft -> 可解释反馈 -> AI 建议 -> 接受、拒绝或编辑 -> Final Answer -> 重新评分；Demo 与 Live 共用同一套 UI 契约。",
    evidence:
      "Completed STG v2.0 with explainable rubric, Human-AI revision loop, deterministic demo route, layered controller/gateway architecture, tests, and portfolio documentation.",
    evidenceZh:
      "已完成 STG v2.0：包含可解释评分、人机协作修改闭环、确定性 demo route、Controller/Gateway 分层架构、测试和作品集文档。",
    role: "Product design, AI workflow, frontend architecture, demo strategy",
    roleZh: "产品设计、AI 工作流、前端架构、Demo 策略",
    methods: [
      "AI Product",
      "Human-AI Collaboration",
      "Explainable Feedback",
      "System Architecture",
      "Deterministic Demo",
    ],
    methodsZh: [
      "AI 产品",
      "人机协作",
      "可解释反馈",
      "系统架构",
      "确定性 Demo",
    ],
    metrics: [
      { value: "v2.0", label: "portfolio-ready", labelZh: "作品集版本" },
      { value: "3-way", label: "revision decision", labelZh: "修改决策" },
      { value: "0-cost", label: "public demo", labelZh: "公开 Demo" },
    ],
    status:
      "Best shown as a complete AI product case: it demonstrates explainability, Human-AI collaboration, and engineering boundaries without becoming a research platform.",
    statusZh:
      "适合作为完整 AI 产品案例展示：它体现可解释性、人机协作和工程边界，但不把产品包装成研究平台。",
    image: "/images/projects/stg-training-demo-route.png",
    imageAlt: "Structured Thinking Gym demo route showing explainable feedback and Human-AI revision UI",
    accent: "powder",
    links: [
      {
        label: "Case Study",
        labelZh: "项目详情",
        href: "projects/structured-thinking-gym/",
      },
    ],
  },
];
