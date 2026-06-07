export const professionalOverview = {
  title: "E-commerce Data Product Operating System",
  titleZh: "电商数据产品操作系统",
  image: "/images/professional/data-work-operating-system.svg",
  imageAlt: "Structured diagram of an e-commerce data product operating system",
  summary:
    "A public-safe reconstruction of my financial e-commerce analytics work: user tags, BI reporting, traffic diagnosis, category intelligence, and data governance.",
  summaryZh:
    "这是对我金融电商数据工作的公开安全重构：用户标签、BI 报表、流量诊断、品类经营与数据治理。",
  narrative:
    "My core contribution was turning repeated business questions into reusable data products. Instead of only pulling one-off numbers, I translated mall-side questions into metric definitions, dashboard requirements, user segmentation logic, data dictionaries, and decision workflows.",
  narrativeZh:
    "我的核心贡献不是只做一次性取数，而是把反复出现的业务问题转化为可复用的数据产品：指标定义、看板需求、用户分群逻辑、数据字典与决策流程。",
  metrics: [
    {
      value: "15",
      label: "core tags launched",
      labelZh: "核心标签上线",
    },
    {
      value: "16",
      label: "RFMP value groups",
      labelZh: "RFMP 价值用户分层",
    },
    {
      value: "119+",
      label: "tables synchronized",
      labelZh: "地标/底表同步",
    },
    {
      value: "6",
      label: "dashboards launched",
      labelZh: "报表看板上线",
    },
  ],
  framework: [
    {
      label: "What",
      labelZh: "做什么",
      text:
        "Data products for segmentation, dashboards, metric governance, category decisions, and campaign analysis.",
      textZh:
        "围绕用户分群、看板、指标治理、品类决策与活动分析搭建数据产品。",
    },
    {
      label: "Why",
      labelZh: "为什么",
      text:
        "Business teams needed reliable, reusable answers for targeting, selection, revenue, ROI, and traffic conversion.",
      textZh:
        "业务团队需要稳定复用地回答投放、选品、收入、ROI 与流量转化问题。",
    },
    {
      label: "Who",
      labelZh: "给谁用",
      text:
        "Marketing, merchant operations, business development, category teams, product managers, and executives.",
      textZh:
        "服务营销、商户运营、商拓、品类、产品经理与经营管理层。",
    },
    {
      label: "How",
      labelZh: "怎么做",
      text:
        "Defined metrics, mapped data logic, designed BI modules, maintained dictionaries, and translated business needs into data requirements.",
      textZh:
        "定义指标、梳理底层逻辑、设计 BI 模块、维护数据字典，并把业务需求翻译成数据需求。",
    },
  ],
};

export const professionalCases = [
  {
    id: "DW-01",
    title: "RFMP User Segmentation",
    titleZh: "RFMP 用户价值分层",
    category: "User data product",
    categoryZh: "用户数据产品",
    problem:
      "Marketing and merchant teams needed more precise user groups than broad campaign audiences.",
    problemZh:
      "营销与商户运营团队需要比泛人群更精细、可解释、可复盘的用户客群。",
    action:
      "Built a mall-focused tag framework using user behavior, transaction history, coupon activity, preference signals, and RFMP value dimensions.",
    actionZh:
      "基于用户行为、交易历史、优惠券活动、偏好信号与 RFMP 价值维度，搭建聚焦商城业务的标签体系。",
    result:
      "Launched 15 core business tags in 2022 and used RFMP value tags to segment users into 16 value groups for precision marketing.",
    resultZh:
      "2022 年上线 15 个核心业务标签，并通过 RFMP 用户价值标签将用户划分为 16 类价值客群，赋能精细化营销。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Customer tags and value-user segmentation for targeted operation.",
        textZh: "面向精准运营的用户标签与价值用户分层。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Improve targeting, reactivation, coupon distribution, and brand expansion.",
        textZh: "提升定向投放、用户召回、券分发与品牌拓展效率。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Used Recency, Frequency, Monetary value, Profit contribution, lifecycle behavior, and preference logic.",
        textZh: "结合 Recency、Frequency、Monetary、Profit、生命周期行为与偏好逻辑。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "15 launched business tags, including 4 RFMP value tags that support 16 value-user groups.",
        textZh: "上线 15 个核心业务标签，其中 4 个 RFMP 价值标签可支持 16 类价值用户分层。",
      },
    ],
    examples: [
      "Recent category buyers",
      "High-value users without recent purchases",
      "Recent campaign participants",
      "Category / brand / points / installment preference users",
    ],
    examplesZh: [
      "近三周有品类购买的新用户",
      "近半年未购买的高价值用户",
      "近三周参与过营销活动的用户",
      "品类、品牌、积分、分期偏好用户",
    ],
    skills: ["RFMP segmentation", "Customer tags", "Lifecycle analysis", "Marketing analytics"],
    skillsZh: ["RFMP 分层", "用户标签", "生命周期分析", "营销分析"],
    image: "/images/professional/rfmp-segmentation.svg",
    imageAlt: "RFMP user segmentation diagram",
  },
  {
    id: "DW-02",
    title: "BI Reporting System",
    titleZh: "BI 报表体系与数据产品化",
    category: "BI product",
    categoryZh: "BI 数据产品",
    problem:
      "Business teams repeatedly requested manual extracts for GMV, net revenue, coupon cost, ROI, users, merchants, categories, and refunds.",
    problemZh:
      "业务团队反复提出 GMV、净收入、贴折、ROI、用户、商户、品类、退款等临时取数需求。",
    action:
      "Designed reusable reporting modules, clarified metric definitions, documented field logic, and supported migration to self-service BI platforms.",
    actionZh:
      "设计可复用报表模块，明确指标口径，沉淀字段逻辑，并支持向自助式 BI 平台迁移。",
    result:
      "Synchronized 119+ data tables and launched 6 dashboards in 2022. One 7S report reduced a manual 100MB-style data workflow into an under-1MB usable report output.",
    resultZh:
      "2022 年同步 119+ 张地标/底表，上线 6 套报表；其中 7S 报表将原本约 100MB 数据加工流程优化为 1MB 以内的可用报表输出。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Revenue, transaction, coupon, category, merchant, and user-operation dashboards.",
        textZh: "交易、收入、优惠券、品类、商户与用户经营相关报表。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Reduce repeated manual extraction and make recurring reviews self-service.",
        textZh: "减少重复临时取数，让周期性经营复盘自助化。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Mapped data sources, wrote metric rules, defined filters, and standardized T-1 reporting logic.",
        textZh: "梳理数据源、编写指标规则、定义筛选项，并标准化 T-1 报表逻辑。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "119+ tables synchronized, 6 dashboards launched, and one 7S workflow turned into a lighter recurring report.",
        textZh: "同步 119+ 张地标/底表，上线 6 套报表，并将一条 7S 重流程沉淀为更轻量的周期报表。",
      },
    ],
    examples: [
      "GMV and net revenue tracking",
      "Coupon usage and subsidy analysis",
      "Merchant / brand / SKU drill-down",
      "Refund and service-quality monitoring",
    ],
    examplesZh: [
      "GMV 与净收入追踪",
      "优惠券使用与贴折分析",
      "商户、品牌、SKU 下钻",
      "退款与服务质量监控",
    ],
    skills: ["BI product design", "Metric design", "SQL", "Dashboard automation"],
    skillsZh: ["BI 产品设计", "指标设计", "SQL", "看板自动化"],
    image: "/images/professional/bi-reporting-system.svg",
    imageAlt: "BI reporting system diagram",
  },
  {
    id: "DW-03",
    title: "Traffic & Conversion Diagnosis",
    titleZh: "商城流量与转化诊断",
    category: "Business analytics",
    categoryZh: "经营分析",
    problem:
      "Mall traffic share and homepage engagement were declining, and teams needed to know whether the cause was traffic, product layout, coupon strategy, or category attractiveness.",
    problemZh:
      "商城流量占比与首页互动下降，业务团队需要判断原因来自流量、产品布局、优惠券策略，还是品类吸引力。",
    action:
      "Analyzed MAU share, homepage modules, icon-level clicks, transaction conversion, subsidy signals, and category-level differences.",
    actionZh:
      "分析 MAU 占比、首页模块、icon 点击、交易转化、补贴信号与品类转化差异。",
    result:
      "Identified actionable signals: mall traffic share moved from about 28% to 23%, mobile-phone icon engagement declined, and several categories showed stronger conversion potential than mobile phones.",
    resultZh:
      "识别出可落地信号：商城流量占比从约 28% 降至 23%，手机 icon 点击下降，数码、家电、食品、美妆等品类表现出更高转化潜力。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Traffic, funnel, homepage module, icon, and category conversion diagnosis.",
        textZh: "流量、漏斗、首页模块、icon 与品类转化诊断。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Move from reporting a decline to finding operational levers.",
        textZh: "从“发现下降”推进到“找到可调整抓手”。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Compared time-series trends, module contributions, coupon sensitivity, and category conversion.",
        textZh: "比较趋势、模块贡献、优惠券敏感度与品类转化。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "Traffic share moved from about 28% to 23%, making homepage entry and category-conversion levers visible.",
        textZh: "识别商城流量占比从约 28% 降至 23%，并明确首页入口与品类转化的可调整抓手。",
      },
    ],
    examples: [
      "Homepage icon optimization",
      "Category entry prioritization",
      "Coupon-sensitive category targeting",
      "Marketing pattern review",
    ],
    examplesZh: [
      "首页 icon 位置优化",
      "品类入口优先级调整",
      "优惠券敏感品类投放",
      "营销活动打法复盘",
    ],
    skills: ["Funnel analysis", "User behavior analytics", "Business diagnosis", "Insight communication"],
    skillsZh: ["漏斗分析", "用户行为分析", "经营诊断", "洞察沟通"],
    image: "/images/professional/traffic-conversion-diagnosis.svg",
    imageAlt: "Traffic and conversion diagnosis chart",
  },
  {
    id: "DW-04",
    title: "Category & Merchant Intelligence",
    titleZh: "品类选品与商户经营分析",
    category: "Decision support",
    categoryZh: "经营决策支持",
    problem:
      "Selection and merchant decisions could not rely only on price or experience; teams needed a combined view of transaction, user, revenue, and service quality.",
    problemZh:
      "选品与商户经营不能只依赖价格或经验，需要同时看交易、用户、收入与服务质量。",
    action:
      "Structured product-selection and merchant-evaluation metrics across category, brand, merchant, SKU/SPU, price, installment, GMV, revenue, ROI, users, repurchase, clicks, add-to-cart, conversion, ratings, and 7S service quality.",
    actionZh:
      "围绕品类、品牌、商户、SKU/SPU、价格、分期、GMV、收入、ROI、用户、复购、点击、加购、转化、评分与 7S 服务质量，结构化选品和商户评价指标。",
    result:
      "Helped business teams compare products and merchants with a wider operating lens and supported campaign preparation, merchant review, and category planning.",
    resultZh:
      "帮助业务从更完整的经营视角比较商品与商户，支持活动提报、商户复盘与品类规划。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Product-selection scorecards and merchant/category operation analysis.",
        textZh: "商品选品评分卡与商户/品类经营分析。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Support decisions with transaction, user, revenue, and service indicators.",
        textZh: "用交易、用户、收入与服务指标支持业务决策。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Built a metric map for selection, conversion, repeat purchase, ROI, and 7S quality.",
        textZh: "建立选品、转化、复购、ROI 与 7S 服务质量的指标地图。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "A reusable metric map supported product selection, merchant review, campaign preparation, and category planning.",
        textZh: "沉淀可复用指标地图，支持选品、商户复盘、活动筹备与品类规划。",
      },
    ],
    examples: [
      "Category and brand comparison",
      "Merchant quality review",
      "Resource placement support",
      "Campaign product selection",
    ],
    examplesZh: [
      "品类与品牌对比",
      "商户质量复盘",
      "资源位配置支持",
      "活动商品选择",
    ],
    skills: ["Category analytics", "Merchant scoring", "Metric mapping", "Data storytelling"],
    skillsZh: ["品类分析", "商户评分", "指标映射", "数据叙事"],
    image: "/images/professional/category-merchant-intelligence.svg",
    imageAlt: "Category and merchant intelligence diagram",
  },
  {
    id: "DW-05",
    title: "Data Governance & Quality",
    titleZh: "数据治理与质量规范",
    category: "Governance",
    categoryZh: "数据治理",
    problem:
      "Frequent data requests, inconsistent definitions, permission constraints, and manual checks made reporting slower and less reliable.",
    problemZh:
      "频繁取数、不一致口径、权限限制与人工核对，让报表产出慢且不够稳定。",
    action:
      "Maintained table dictionaries, clarified demand intake rules, supported desensitized wide-table development, and helped migrate key reports to governed data platforms.",
    actionZh:
      "维护底表字典，明确需求准入准出规范，支持脱敏宽表开发，并推动重点报表迁移到治理后的数据平台。",
    result:
      "Improved consistency in recurring analysis and made data products easier for business teams to trust, reuse, and audit.",
    resultZh:
      "提升周期性分析的一致性，让业务团队更容易信任、复用与审计数据产品。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Data dictionaries, demand workflow, desensitized tables, and platform migration.",
        textZh: "数据字典、需求流程、脱敏宽表与平台迁移。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Make analysis reliable enough for financial e-commerce decisions.",
        textZh: "让分析结果足以支撑金融电商业务决策。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Standardized definitions, documented data logic, and clarified review / delivery rules.",
        textZh: "标准化定义，沉淀数据逻辑，并明确复核与交付规则。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "Standardized dictionaries, demand workflows, desensitized table planning, and BI platform migration made recurring reports easier to reuse.",
        textZh: "通过数据字典、需求流程、脱敏宽表规划与 BI 平台迁移，让周期报表更易复用和复核。",
      },
    ],
    examples: [
      "Core mall table dictionary",
      "Demand intake and output standards",
      "Desensitized wide-table planning",
      "BI platform migration",
    ],
    examplesZh: [
      "核心商城底表字典",
      "需求准入与交付标准",
      "脱敏宽表规划",
      "BI 平台迁移",
    ],
    skills: ["Data governance", "Data quality", "Documentation", "Stakeholder process"],
    skillsZh: ["数据治理", "数据质量", "文档沉淀", "跨团队流程"],
    image: "/images/professional/data-governance-platform.svg",
    imageAlt: "Data governance platform diagram",
  },
  {
    id: "DW-06",
    title: "Growth & Campaign Analytics",
    titleZh: "增长与广告活动分析",
    category: "Early analytics experience",
    categoryZh: "早期增长分析经验",
    problem:
      "Growth teams needed daily channel monitoring, advertising performance analysis, and SMS reactivation optimization.",
    problemZh:
      "增长团队需要日常渠道监控、广告效果分析与短信唤醒优化。",
    action:
      "Analyzed channel acquisition cost, retention, ROI, ARPU, ad revenue, SMS copy performance, and daily / weekly / monthly campaign reports.",
    actionZh:
      "分析渠道新增成本、留存、ROI、ARPU、广告收入、短信文案效果，并搭建日周月活动报表。",
    result:
      "Contributed to a 37% increase in advertising revenue and improved SMS click-through rate from 10% to 28% for 100K+ users.",
    resultZh:
      "推动广告收入提升 37%，并将 10w+ 用户短信唤醒点击率从 10% 提升至 28%。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "Channel, advertising, and SMS reactivation analytics.",
        textZh: "渠道、广告与短信唤醒分析。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Improve acquisition efficiency and revenue monitoring.",
        textZh: "提升拉新效率与商业化收入监控能力。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Tracked cost, activation, retention, ROI, ARPU, ad revenue, and copy performance.",
        textZh: "追踪成本、激活、留存、ROI、ARPU、广告收入与文案表现。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "+37% advertising revenue contribution and SMS click-through rate improved from 10% to 28% for 100K+ users.",
        textZh: "推动广告收入提升 37%，并将 10w+ 用户短信点击率从 10% 提升至 28%。",
      },
    ],
    examples: [
      "Channel ROI reports",
      "Daily revenue monitoring",
      "SMS copy optimization",
      "Acquisition-cost analysis",
    ],
    examplesZh: [
      "渠道 ROI 报表",
      "收入日报监控",
      "短信文案优化",
      "新增成本分析",
    ],
    skills: ["Growth analytics", "Campaign analysis", "Attribution", "Reporting automation"],
    skillsZh: ["增长分析", "活动分析", "归因分析", "报表自动化"],
    image: "/images/professional/growth-campaign-analytics.svg",
    imageAlt: "Growth and campaign analytics chart",
  },
  {
    id: "DW-07",
    title: "SBC Data Product & Reporting Automation",
    titleZh: "SBC 数据产品与报表自动化",
    category: "BI and workflow automation",
    categoryZh: "BI 与流程自动化",
    problem:
      "One Wallet's e-commerce intelligent marketing team needed consistent lifecycle metrics, business-flow monitoring, and automated reporting for complex SBC transactions and reconciliation workflows.",
    problemZh:
      "壹钱包电商智能营销团队需要统一生命周期指标口径，并为复杂 SBC 交易与对账流程建立业务全流程监控和自动化报表。",
    action:
      "Led SBC data product work from demand clarification to launch: mapped business processes, designed underlying data models and lineage logic, built SQL / Tableau / Power BI monitoring reports, and supported A/B test evaluation for user growth strategies.",
    actionZh:
      "负责 SBC 数据产品从需求梳理到上线落地：梳理业务流程，设计底层数据模型与数据血缘，搭建 SQL / Tableau / Power BI 监控报表，并支持用户增长策略的 A/B 测试评估。",
    result:
      "Unified monitoring definitions, improved data consistency for operations and analytics teams, and reduced repeated manual checking in key reporting and financial reconciliation workflows by about 60%.",
    resultZh:
      "统一业务监控口径，提升运营与分析团队的数据一致性，并使关键业务报表与财务对账流程中的重复人工核对工作量减少约 60%。",
    framework: [
      {
        label: "What",
        labelZh: "做什么",
        text: "SBC reporting, lifecycle metrics, data modeling, lineage, and reconciliation automation.",
        textZh: "SBC 报表、生命周期指标、数据模型、数据血缘与对账自动化。",
      },
      {
        label: "Why",
        labelZh: "为什么",
        text: "Complex transaction workflows needed shared definitions and reliable monitoring before decisions could be automated.",
        textZh: "复杂交易流程需要统一口径与可靠监控，才能进一步支持自动化决策。",
      },
      {
        label: "How",
        labelZh: "怎么做",
        text: "Translated workflow requirements into metrics, source logic, dashboards, and effect-evaluation routines.",
        textZh: "将业务流程需求翻译为指标、源数据逻辑、看板和效果评估流程。",
      },
      {
        label: "Outcome",
        labelZh: "成果信号",
        text: "SBC monitoring and reconciliation workflows launched with shared definitions and about 60% less repeated manual checking.",
        textZh: "上线 SBC 监控与对账相关流程，统一业务口径，并减少约 60% 重复人工核对工作。",
      },
    ],
    examples: [
      "SBC transaction monitoring",
      "Financial reconciliation automation",
      "Lifecycle metric definitions",
      "A/B testing support for growth strategies",
    ],
    examplesZh: [
      "SBC 交易监控",
      "财务对账自动化",
      "生命周期指标定义",
      "增长策略 A/B 测试支持",
    ],
    skills: ["BI platform design", "Data modeling", "Data lineage", "Workflow automation", "A/B testing"],
    skillsZh: ["BI 平台设计", "数据建模", "数据血缘", "流程自动化", "A/B 测试"],
    image: "/images/professional/sbc-data-product-automation.svg",
    imageAlt: "SBC data product diagram showing workflow mapping, data lineage, BI monitoring, reconciliation, and A/B testing support",
  },
];
