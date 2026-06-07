export const researchProjects = [
  {
    id: "R-01",
    title: "From Faces to Ages: Fair Recognition on Historical Portraits",
    titleZh: "从面孔到年龄：历史人像中的公平识别",
    label: "Master Thesis · Completed",
    labelZh: "硕士论文 · 已完成",
    status: "Completed MSc thesis",
    statusZh: "已完成的硕士论文",
    question:
      "How can transfer learning estimate age and gender from historical portraits while making subgroup failures visible instead of hiding them behind global scores?",
    questionZh:
      "迁移学习如何用于历史人像的年龄与性别估计，同时让分组失效可见，而不是被整体指标掩盖？",
    method:
      "I compared five ConvNeXtV2-based models, including single-task regression, multi-task learning, grouped age classification, and a cascaded gender-conditioned model. The evaluation layer used demographic rebalancing, subgroup MAE, residual distributions, scatter plots, and calibration-style diagnostics.",
    methodZh:
      "我比较了五种基于 ConvNeXtV2 的模型，包括单任务年龄回归、多任务学习、年龄组分类，以及基于性别条件的级联模型。评估层使用人口分布再平衡、分组 MAE、残差分布、散点图和校准式诊断。",
    material:
      "Historical portrait and face-attribute data, including a skewed CityFace distribution and additional Swedish celebrity portraits used to enrich demographic coverage.",
    materialZh:
      "历史人像与面部属性数据，包括性别和年龄分布偏斜的 CityFace 数据，以及用于补充人口覆盖度的瑞典名人肖像。",
    result:
      "Balanced training improved some stability and group-wise metrics, but it did not automatically remove bias. Elderly samples still showed systematic underestimation and higher variance, especially in the regression and cascaded settings.",
    resultZh:
      "平衡训练提升了部分稳定性和分组指标，但并不会自动消除偏差。老年样本仍出现系统性低估和更高方差，尤其在回归模型和级联模型中更明显。",
    reflection:
      "This became the anchor of my research direction: trustworthy models require subgroup diagnostics, not only a better average MAE.",
    reflectionZh:
      "这个项目成为我研究方向的核心：可信模型不只需要更好的平均 MAE，还需要能暴露具体人群失效的分组诊断。",
    learned:
      "Transfer learning, multi-task model design, fairness-aware evaluation, residual analysis, calibration thinking, and reproducible model-reporting workflow design.",
    learnedZh:
      "能力沉淀包括迁移学习、多任务模型设计、公平性评估、残差分析、校准思维，以及可复现模型报告流程设计。",
    tags: ["Computer Vision", "Transfer Learning", "Fairness", "Subgroup MAE", "Residual Diagnostics"],
    tagsZh: ["计算机视觉", "迁移学习", "公平性", "分组 MAE", "残差诊断"],
    image: "images/research/thesis-mae-heatmap.png",
    imageAlt:
      "Heatmap from the thesis showing the change in MAE after balancing across five models and five age groups.",
    keyVisuals: [
      {
        src: "images/research/evidence/thesis-residual-distributions.png",
        alt: "Residual distribution plots from the thesis comparing unbalanced and balanced training for Models 1, 2, and 5.",
        caption: "Residual diagnostics: how prediction error shifts before and after balancing.",
        captionZh: "残差诊断：比较平衡前后预测误差分布如何变化。",
      },
    ],
    links: [
      {
        label: "GitHub",
        labelZh: "GitHub 仓库",
        href: "https://github.com/Leeli911/age-gender-estimation-thesis",
      },
    ],
  },
  {
    id: "R-02",
    title: "A Multi-Stage Deep Learning Framework for Kinship Recognition",
    titleZh: "基于面部图像的多阶段亲属关系识别",
    label: "Course Research Project · Completed",
    labelZh: "课程研究项目 · 已完成",
    status: "Completed project",
    statusZh: "已完成项目",
    question:
      "Can a model decide whether two face images belong to related people, and if so, classify the relationship type?",
    questionZh:
      "模型能否判断两张人脸图像是否存在亲属关系，并进一步分类具体关系类型？",
    method:
      "The project used a three-stage framework: face detection and alignment, a Siamese network with contrastive loss for similarity learning, a kinship existence classifier, and a relationship type classifier with class-imbalance-aware evaluation.",
    methodZh:
      "项目使用三阶段框架：人脸检测与对齐、基于 contrastive loss 的 Siamese Network 相似度学习、亲属关系存在性分类器，以及考虑类别不平衡的关系类型分类器。",
    material:
      "Families in the Wild style face-pair data and paired inference examples, with outputs reported by relationship class.",
    materialZh:
      "Families in the Wild 类型的人脸配对数据和配对推理样例，并按亲属关系类别汇报结果。",
    result:
      "The model pipeline could verify kinship and classify multiple relationship types, but the results also showed that visually similar categories and imbalanced classes are difficult to separate reliably.",
    resultZh:
      "模型流程能够进行亲属验证并分类多种关系类型，但结果也显示，视觉相似类别和类别不平衡会让某些关系难以稳定区分。",
    reflection:
      "This project strengthened my understanding of metric learning and made me more careful about threshold choice, confusion matrices, and class-level performance.",
    reflectionZh:
      "这个项目加强了我对度量学习的理解，也让我更重视阈值选择、混淆矩阵和类别层面的表现。",
    learned:
      "Siamese networks, contrastive loss, binary verification, multi-class classification, threshold tuning, focal loss, and evaluation under imbalanced relationship labels.",
    learnedZh:
      "能力沉淀包括 Siamese Network、contrastive loss、二分类验证、多分类关系识别、阈值调优、focal loss，以及类别不平衡下的评估。",
    tags: ["Metric Learning", "Siamese Network", "Contrastive Loss", "Class Imbalance"],
    tagsZh: ["度量学习", "Siamese 网络", "对比损失", "类别不平衡"],
    image: "images/research/kinship-recognition-framework.svg",
    imageZh: "images/research/kinship-recognition-framework-zh.svg",
    imageAlt:
      "Structured diagram of a three-stage kinship recognition framework from paired face inputs to relationship type classification.",
    imageAltZh:
      "展示从人脸配对输入到亲属关系判断和关系类型分类的三阶段亲属识别流程图。",
    keyVisuals: [
      {
        src: "images/research/evidence/kinship-performance-metrics.png",
        alt: "Performance metrics table for kinship classification by relationship class.",
        caption: "Class-level metrics: which family relationships were easier or harder to classify.",
        captionZh: "类别层面指标：不同亲属关系的识别难度差异。",
      },
      {
        src: "images/research/evidence/kinship-type-confusion-matrix.png",
        alt: "Confusion matrix for kinship type classification.",
        caption: "Confusion matrix: where relationship categories were mixed up.",
        captionZh: "混淆矩阵：哪些亲属关系类别容易被混淆。",
      },
    ],
  },
  {
    id: "R-03",
    title: "Computational Analysis of Immigration Discourse in UK Parliament",
    titleZh: "英国议会移民话语的计算分析",
    label: "Computational Social Science · Completed",
    labelZh: "计算社会科学 · 已完成",
    status: "Completed course research design and analysis",
    statusZh: "已完成课程研究设计与分析",
    question:
      "How did immigration framing, political tone, and party-level polarization change across decades of parliamentary debate?",
    questionZh:
      "几十年的议会辩论中，移民框架、政治语调和党派极化如何随时间变化？",
    method:
      "The project combined political text analysis with long-term trend visualization: speech-level coding, party and era grouping, pro-immigration ratio, net tone, and comparative plots across prime-minister periods and parties.",
    methodZh:
      "项目将政治文本分析与长期趋势可视化结合：发言层面的编码、政党与时期分组、亲移民比例、净语调，以及按首相时期和党派的对比图。",
    material:
      "UK parliamentary debate material and a public immigration-speech analysis workflow adapted for course research.",
    materialZh:
      "英国议会辩论材料，以及用于课程研究的公开移民发言分析流程。",
    result:
      "The outputs show visible shifts in pro-immigration speech share and net tone over time, with party and political-era differences made readable through time-series plots.",
    resultZh:
      "输出图显示亲移民发言比例和净语调随时间发生明显变化，并通过时间序列图呈现党派和政治时期差异。",
    reflection:
      "This project shows the social-science side of my graduate work: using computational methods to make historical political language measurable and interpretable.",
    reflectionZh:
      "这个项目展示了我研究生阶段偏社会科学的一面：用计算方法让历史政治语言变得可测量、可解释。",
    learned:
      "Political text analysis, longitudinal visualization, party-level comparison, research design, and communication of social data patterns to non-technical readers.",
    learnedZh:
      "能力沉淀包括政治文本分析、长期趋势可视化、党派对比、研究设计，以及面向非技术读者解释社会数据模式。",
    tags: ["NLP", "Political Text", "Trend Analysis", "Polarization"],
    tagsZh: ["自然语言处理", "政治文本", "趋势分析", "极化"],
    image: "images/research/immigration-party-trends.png",
    imageAlt:
      "Line chart showing pro-immigration speech trends by party and overall trend over time.",
    keyVisuals: [
      {
        src: "images/research/evidence/immigration-net-tone-over-time.png",
        alt: "Net tone of immigration speeches in UK Parliament over time.",
        caption: "Net tone over time: pro- and anti-immigration framing across political periods.",
        captionZh: "长期净语调：不同政治时期中的亲移民与反移民框架。",
      },
    ],
  },
  {
    id: "R-04",
    title: "Causal Uplift Framework for E-commerce Coupon Targeting",
    titleZh: "面向电商优惠券触达的因果 Uplift 框架",
    label: "MSc Technical Project · Completed",
    labelZh: "硕士技术项目 · 已完成",
    status: "Completed technical project",
    statusZh: "已完成技术项目",
    question:
      "How can coupon targeting identify customers whose purchase behavior is truly changed by a coupon, instead of spending budget on customers who would buy anyway?",
    questionZh:
      "优惠券触达如何识别真正会被优惠券改变购买行为的用户，而不是把预算花在本来就会购买的人身上？",
    method:
      "I frame the project as a causal uplift decision pipeline: define treatment and outcome, estimate heterogeneous treatment effects with a T-Learner-style two-model setup, rank customers by predicted incremental lift, validate targeting quality with Qini / AUUC curves and Bootstrap confidence intervals, and simulate budget-aware policies such as targeting the top uplift segments. Regression and clustering support behavioral profiling; uplift modeling turns the profile into a coupon allocation decision.",
    methodZh:
      "我将项目表述为因果 uplift 决策链路：先定义 treatment 与 outcome，再用 T-Learner 式双模型估计异质性处理效应，按预测增量收益对用户排序，用 Qini / AUUC 曲线与 Bootstrap 置信区间验证触达质量，并模拟 Top uplift 客群等预算约束策略。回归与聚类用于刻画用户行为，uplift modeling 则把画像进一步转化为优惠券分配决策。",
    material:
      "E-commerce transaction data used in the Computer Intensive Statistics and Applications technical project.",
    materialZh:
      "Computer Intensive Statistics and Applications 技术项目中的电商交易数据。",
    result:
      "The output is a decision framework for separating likely persuadable customers from sure things, lost causes, and potentially negative-response users, then comparing coupon policies by expected incremental gain rather than raw post-campaign revenue.",
    resultZh:
      "项目输出的是一个决策框架：区分可能被优惠券说服的用户、原本就会购买的用户、低响应用户与可能负向响应用户，并用预期增量收益而不是活动后原始收入来比较优惠券策略。",
    reflection:
      "This project is best presented as the bridge between my e-commerce marketing analytics background and AI data product direction: the product question is coupon allocation, the modeling question is treatment-effect ranking, and the product-risk question is whether a recommendation wastes budget or creates measurable incremental value.",
    reflectionZh:
      "这个项目最适合作为我从电商营销分析走向 AI 数据产品的连接点：产品问题是优惠券怎么分配，建模问题是如何排序处理效应，产品风险问题是推荐是否浪费预算、是否真正创造可度量的增量价值。",
    learned:
      "CATE / uplift framing, T-Learner-style modeling, Qini and AUUC evaluation, Bootstrap confidence intervals, response-type segmentation, budget-aware policy simulation, and translation of model rankings into marketing product decisions.",
    learnedZh:
      "能力沉淀包括 CATE / uplift 问题定义、T-Learner 式建模、Qini 与 AUUC 评估、Bootstrap 置信区间、响应类型分群、预算约束策略仿真，以及将模型排序转化为营销产品决策。",
    tags: ["CATE", "Uplift Modeling", "Qini / AUUC", "Bootstrap", "Budget-Aware Targeting"],
    tagsZh: ["CATE", "Uplift Modeling", "Qini / AUUC", "Bootstrap", "预算约束触达"],
    image: "images/research/coupon-uplift-strategy.svg",
    imageZh: "images/research/coupon-uplift-strategy-zh.svg",
    imageAlt:
      "Causal uplift decision pipeline for e-commerce coupon targeting.",
    imageAltZh:
      "面向电商优惠券触达的因果 uplift 决策流程图。",
  },
  {
    id: "R-05",
    title: "Data-Centric Reliability Diagnostics for Trustworthy Machine Learning",
    titleZh: "从数据偏差到可信模型：数据中心可靠性诊断",
    label: "Research Direction · Ongoing",
    labelZh: "研究方向 · 持续跟进",
    status: "Ongoing research interest",
    statusZh: "持续关注的研究方向",
    question:
      "When a model works well on average but fails for certain groups, time periods, or data conditions, how can we diagnose whether the problem comes from the data before the model is trusted in use?",
    questionZh:
      "当一个模型整体指标看起来不错，却在某些人群、时间段或数据条件下失效时，能不能在信任它之前先诊断：问题是不是已经藏在数据里？",
    method:
      "I want to follow a diagnostic pipeline rather than a single fairness score: first profile the dataset, then define meaningful subgroups, check worst-group and residual errors, test distribution shift and missingness, compare data-level and model-level interventions, and finally turn the findings into an auditable model report that a product or research team can read.",
    methodZh:
      "我希望跟进的是一条诊断链路，而不是单一公平性分数：先做数据画像，再定义有意义的子群体，检查 worst-group 表现与残差错误，测试分布漂移和缺失问题，比较数据层与模型层干预，最后把结论整理成产品团队或研究团队能读懂的可审计模型报告。",
    material:
      "The direction can start from public and auditable tabular or vision datasets, then connect back to my own completed work: historical portrait age estimation, kinship recognition under class imbalance, longitudinal political text analysis, and uplift modeling for heterogeneous customer response.",
    materialZh:
      "这个方向可以先从公开、可审计的表格或视觉数据集做起，再和我已经做过的项目连接：历史人像年龄估计、类别不平衡下的亲属识别、长期政治文本趋势分析，以及用户响应异质性的 uplift 建模。",
    result:
      "The near-term output I want is not a new slogan, but a practical diagnostic template: given a dataset and model, it should explain which groups are unreliable, which data conditions may cause the failure, which intervention is worth trying first, and how uncertainty should be reported.",
    resultZh:
      "近期我想形成的不是一个新的口号，而是一套可操作的诊断模板：给定一个数据集和模型，它应该能说明哪些群体不可靠、哪些数据条件可能导致失效、应该优先尝试哪类干预，以及不确定性该如何报告。",
    reflection:
      "This direction grows out of a simple observation from my thesis: balancing the training data improved some metrics, but it did not automatically fix elderly underestimation. Recent trustworthy-ML work also increasingly treats datasets, subgroup definitions, distribution shifts, and evaluation protocols as part of the model's risk surface. The gap I care about is the bridge between academic fairness diagnostics and a readable workflow that helps people decide what to check, repair, and monitor.",
    reflectionZh:
      "这个方向来自我硕士论文里的一个朴素发现：平衡训练数据能改善一部分指标，但不会自动修复老年样本被系统性低估的问题。近年的可信机器学习研究也越来越把数据集、子群体定义、分布漂移和评估协议看成模型风险的一部分。我真正关心的缺口，是把学术上的公平性诊断，转化成一套别人能读懂、能决定检查什么、修复什么、持续监控什么的工作流。",
    learned:
      "Directions to keep following: data-centric AI, dataset auditing, subgroup reliability, worst-group robustness, distribution-shift evaluation, measurement bias, and readable audit reports for model and data products.",
    learnedZh:
      "后续会持续跟进：data-centric AI、数据集审计、子群体可靠性、worst-group robustness、分布漂移评估、测量偏差，以及面向模型和数据产品的可读审计报告。",
    teachingPath: [
      {
        title: "Start from the average",
        text:
          "A model can have a good average score while still failing badly for a smaller group. That is why I do not want to stop at one global accuracy or MAE number.",
      },
      {
        title: "Look inside the data",
        text:
          "The next question is whether the data itself is uneven: some groups may be rare, labels may be noisy, features may be missing, or the test data may not match the training setting.",
      },
      {
        title: "Connect to my past work",
        text:
          "My thesis showed age underestimation for elderly portraits; kinship recognition showed class-level confusion; uplift modeling focused on heterogeneous response. These projects all point to the same concern: average behavior hides local failure.",
      },
      {
        title: "Read the current research gap",
        text:
          "Recent work discusses dataset curation, subgroup robustness, and fairness under shift, but practical diagnostics are still often fragmented. I want to study how to connect data profiling, subgroup errors, and repair choices into one workflow.",
      },
      {
        title: "Follow up concretely",
        text:
          "I will keep a paper map, reproduce small experiments on public datasets, compare data rebalancing and model-level fixes, and summarize each run as an audit-style report rather than only a metric table.",
      },
    ],
    teachingPathZh: [
      {
        title: "先从平均值讲起",
        text:
          "一个模型可以整体分数很好，但对某个小群体表现很差。所以我不想只看一个全局 accuracy 或 MAE，而是要问：谁被平均值掩盖了？",
      },
      {
        title: "再往数据里面看",
        text:
          "下一步要看问题是不是来自数据：某些群体样本太少、标签有噪声、特征缺失、训练集和测试集分布不一致，都可能让模型看起来会做题，实际上不可靠。",
      },
      {
        title: "连接我已经做过的项目",
        text:
          "硕士论文里，老年人像被系统性低估；亲属识别里，不同关系类别容易混淆；uplift 项目里，不同用户对优惠券反应不同。这些经验都指向同一个问题：平均表现会遮住局部失效。",
      },
      {
        title: "看当前研究缺口",
        text:
          "近年的研究越来越重视数据集整理、子群体稳健性、分布漂移下的公平性，但很多方法仍是分散的。我的兴趣是把数据画像、子群体误差和修复选择连成一条可执行的诊断流程。",
      },
      {
        title: "具体怎么持续跟进",
        text:
          "我会持续维护论文地图，用公开数据集复现实验，比较数据重采样、标签/特征清理、模型约束等干预，并把每次结果写成审计式报告，而不只是一张指标表。",
      },
    ],
    tags: ["Trustworthy AI", "Data-Centric AI", "Subgroup Reliability", "Distribution Shift", "Audit Reports"],
    tagsZh: ["可信 AI", "数据中心 AI", "子群体可靠性", "分布漂移", "审计报告"],
    image: "images/research/trustworthy-ml-audit-map.svg",
    imageAlt:
      "Structured research map connecting dataset profiling, subgroup reliability, shift checks, repair choices, and an auditable model report.",
    keyVisuals: [
      {
        src: "images/research/data-centric-bias-audit.svg",
        alt: "Earlier conceptual diagram of a data-centric bias audit pipeline.",
        caption: "Concept diagram: data risks can propagate into subgroup reliability, robustness, and model-reporting decisions.",
        captionZh: "概念图：数据风险如何传导到子群体可靠性、稳健性和模型报告决策。",
      },
    ],
  },
];
