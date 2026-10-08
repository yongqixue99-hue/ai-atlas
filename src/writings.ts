import { sources } from "./data.ts";

/** A curated reading list, not a bibliography or a claim of sole authorship.
 * Only signed original writing belongs here; reporting and unsigned company
 * announcements stay in the evidence index. Dates come from the source record.
 */
export interface Writing {
  sourceId: string;
  title: string;
  personIds: string[];
  authors: string;
  authorship: "individual" | "coauthored";
  kind: "essay" | "article" | "technical";
  summary: string;
  // Exact titles in the existing prose. No fuzzy or HTML replacement.
  mentions: string[];
  // The compact reading section displays at most three selected items/person.
  featuredFor: string[];
  dateNote?: string;
  dateLabel?: string;
}

export const writings: Writing[] = [
  {
    "sourceId": "sam-intelligence-age",
    "title": "The Intelligence Age",
    "personIds": [
      "sam-altman"
    ],
    "authors": "Sam Altman",
    "authorship": "individual",
    "kind": "essay",
    "summary": "从深度学习的规模效应出发，展望个人 AI 团队与科学进步，并强调算力、能源和普惠基础设施的重要性。",
    "mentions": [],
    "featuredFor": [
      "sam-altman"
    ]
  },
  {
    "sourceId": "sam-moores-law",
    "title": "Moore's Law for Everything",
    "personIds": [
      "sam-altman"
    ],
    "authors": "Sam Altman",
    "authorship": "individual",
    "kind": "essay",
    "summary": "讨论 AI 降低劳动成本后财富与权力向资本转移的可能性，提出通过公司与土地税收分享技术红利的政策设想。",
    "mentions": [],
    "featuredFor": [
      "sam-altman"
    ]
  },
  {
    "sourceId": "sam-reflections",
    "title": "Reflections",
    "personIds": [
      "sam-altman"
    ],
    "authors": "Sam Altman",
    "authorship": "individual",
    "kind": "essay",
    "summary": "回顾 ChatGPT 发布、组织高速增长与 2023 年治理危机，并阐述迭代部署和迈向超级智能的个人判断。",
    "mentions": [],
    "featuredFor": [
      "sam-altman"
    ]
  },
  {
    "sourceId": "brockman-path",
    "title": "My path to OpenAI",
    "personIds": [
      "greg-brockman"
    ],
    "authors": "Greg Brockman",
    "authorship": "individual",
    "kind": "essay",
    "summary": "自述从大学、Stripe 到筹建 OpenAI 的经历，以及为何将安全的人类水平 AI 视为长期目标。",
    "mentions": [
      "《My path to OpenAI》"
    ],
    "featuredFor": [
      "greg-brockman"
    ]
  },
  {
    "sourceId": "brockman-stripe-cto",
    "title": "#define CTO",
    "personIds": [
      "greg-brockman"
    ],
    "authors": "Greg Brockman",
    "authorship": "individual",
    "kind": "essay",
    "summary": "回顾 Stripe 扩张时 CTO 职责的变化，讨论技术领导、招聘和工程管理的分工。",
    "mentions": [],
    "featuredFor": [
      "greg-brockman"
    ]
  },
  {
    "sourceId": "openai-five-2018",
    "title": "OpenAI Five",
    "personIds": [
      "greg-brockman"
    ],
    "authors": "Greg Brockman 等 13 位作者",
    "authorship": "coauthored",
    "kind": "article",
    "summary": "介绍五个神经网络在 Dota 2 中通过大规模自我对弈学习协作的训练方法，并说明当时的测试限制。",
    "mentions": [
      "《OpenAI Five》"
    ],
    "featuredFor": [
      "greg-brockman"
    ]
  },
  {
    "sourceId": "murati-language-creativity",
    "title": "Language & Coding Creativity",
    "personIds": [
      "mira-murati"
    ],
    "authors": "Ermira Murati（Mira Murati）· 独立署名",
    "authorship": "individual",
    "kind": "essay",
    "summary": "以语言模型的写作和编程能力讨论人机共同创作，同时指出幻觉、偏见及与人类意图对齐的问题。",
    "mentions": [
      "《Language & Coding Creativity》"
    ],
    "featuredFor": [
      "mira-murati"
    ],
    "dateLabel": "2022 年春"
  },
  {
    "sourceId": "dario-loving-grace",
    "title": "Machines of Loving Grace",
    "personIds": [
      "dario-amodei"
    ],
    "authors": "Dario Amodei",
    "authorship": "individual",
    "kind": "essay",
    "summary": "描绘强大 AI 在健康、科学、经济与治理上的潜在益处，并明确这些未来情景依赖假设且存在不确定性。",
    "mentions": [
      "《Machines of Loving Grace》"
    ],
    "featuredFor": [
      "dario-amodei"
    ]
  },
  {
    "sourceId": "dario-adolescence",
    "title": "The Adolescence of Technology",
    "personIds": [
      "dario-amodei"
    ],
    "authors": "Dario Amodei",
    "authorship": "individual",
    "kind": "essay",
    "summary": "梳理强大 AI 的自主失控、滥用、权力集中与经济冲击等风险，讨论技术措施及审慎、针对性的治理回应。",
    "mentions": [
      "《The Adolescence of Technology》"
    ],
    "featuredFor": [
      "dario-amodei"
    ]
  },
  {
    "sourceId": "openai-superalignment",
    "title": "Introducing Superalignment",
    "personIds": [
      "ilya-sutskever"
    ],
    "authors": "Jan Leike、Ilya Sutskever",
    "authorship": "coauthored",
    "kind": "article",
    "summary": "说明为何现有的人类监督难以约束更强 AI，并介绍可扩展监督、验证及压力测试的研究计划。",
    "mentions": [],
    "featuredFor": [
      "ilya-sutskever"
    ]
  },
  {
    "sourceId": "sierra-launch",
    "title": "Meet Sierra, the conversational AI platform for businesses",
    "personIds": [
      "bret-taylor"
    ],
    "authors": "Bret Taylor、Clay Bavor",
    "authorship": "coauthored",
    "kind": "article",
    "summary": "介绍面向企业的对话式 AI agent，强调与业务系统连接、完成具体任务，以及可靠性和数据治理。",
    "mentions": [],
    "featuredFor": [
      "bret-taylor"
    ]
  },
  {
    "sourceId": "google-taylor-maps-api",
    "title": "The world is your JavaScript-enabled oyster",
    "personIds": [
      "bret-taylor"
    ],
    "authors": "Bret Taylor",
    "authorship": "individual",
    "kind": "article",
    "summary": "以 Google Maps 产品经理身份介绍地图 API，让开发者把地图嵌入自己的网站。",
    "mentions": [],
    "featuredFor": [
      "bret-taylor"
    ]
  },
  {
    "sourceId": "simo-empowerment-essay",
    "title": "AI as the greatest source of empowerment for all",
    "personIds": [
      "fidji-simo"
    ],
    "authors": "Fidji Simo",
    "authorship": "individual",
    "kind": "essay",
    "summary": "从知识、健康、创作、经济自主、时间和支持六个方面，说明 AI 产品如何扩大个人能力与机会。",
    "mentions": [
      "《AI as the greatest source of empowerment for all》"
    ],
    "featuredFor": [
      "fidji-simo"
    ]
  },
  {
    "sourceId": "deepmind-alphafold-database-2022",
    "title": "AlphaFold reveals the structure of the protein universe",
    "personIds": [
      "demis-hassabis"
    ],
    "authors": "Demis Hassabis",
    "authorship": "individual",
    "kind": "article",
    "summary": "宣布 AlphaFold 数据库扩展至超过两亿个蛋白质预测结构，并讨论开放资源如何帮助生命科学研究。",
    "mentions": [],
    "featuredFor": [
      "demis-hassabis"
    ]
  }
,
  {
    sourceId: "openai-gym-paper", title: "OpenAI Gym",
    personIds: ["greg-brockman"], authors: "Greg Brockman 等 7 位作者",
    authorship: "coauthored", kind: "technical",
    summary: "介绍强化学习工具集的组件与设计取舍。",
    mentions: ["《OpenAI Gym》"], featuredFor: [], dateNote: "首次提交",
  },
  {
    sourceId: "seq2seq", title: "Sequence to Sequence Learning with Neural Networks",
    personIds: ["ilya-sutskever"], authors: "Ilya Sutskever、Oriol Vinyals、Quoc V. Le",
    authorship: "coauthored", kind: "technical",
    summary: "提出以神经网络完成序列到序列学习的方法，并在机器翻译任务中验证。",
    mentions: ["《Sequence to Sequence Learning with Neural Networks》"],
    featuredFor: ["ilya-sutskever"], dateNote: "首次提交",
  },
  {
    sourceId: "rlhf-human-preferences", title: "Deep reinforcement learning from human preferences",
    personIds: ["paul-christiano", "dario-amodei"], authors: "Paul Christiano、Jan Leike、Tom B. Brown、Miljan Martic、Shane Legg、Dario Amodei",
    authorship: "coauthored", kind: "technical",
    summary: "研究如何用人类对行为片段的比较反馈训练强化学习系统。",
    mentions: ["《Deep reinforcement learning from human preferences》"],
    featuredFor: ["paul-christiano"], dateNote: "首次提交",
  },
  {
    sourceId: "ai-safety-debate-2018", title: "AI safety via debate",
    personIds: ["paul-christiano", "dario-amodei"], authors: "Geoffrey Irving、Paul Christiano、Dario Amodei",
    authorship: "coauthored", kind: "technical",
    summary: "探索让 AI 系统互相辩论、由人类评判的监督方法。",
    mentions: ["《AI safety via debate》"], featuredFor: ["paul-christiano"], dateNote: "首次提交",
  },
  {
    sourceId: "amplification-2018", title: "Supervising strong learners by amplifying weak experts",
    personIds: ["paul-christiano", "dario-amodei"], authors: "Paul Christiano、Buck Shlegeris、Dario Amodei",
    authorship: "coauthored", kind: "technical",
    summary: "研究通过分解任务，逐步建立复杂问题的训练信号。",
    mentions: ["《Supervising strong learners by amplifying weak experts》"], featuredFor: [], dateNote: "首次提交",
  },
  {
    sourceId: "book-summarization-2021", title: "Recursively Summarizing Books with Human Feedback",
    personIds: ["paul-christiano"], authors: "Jeff Wu、Long Ouyang、Daniel M. Ziegler、Nisan Stiennon、Ryan Lowe、Jan Leike、Paul Christiano",
    authorship: "coauthored", kind: "technical",
    summary: "将人类反馈与递归任务分解用于整本书的摘要。",
    mentions: ["《Recursively Summarizing Books with Human Feedback》"], featuredFor: [], dateNote: "首次提交",
  },
  {
    sourceId: "paul-announces-arc", title: "Announcing the Alignment Research Center",
    personIds: ["paul-christiano"], authors: "Paul Christiano",
    authorship: "individual", kind: "article",
    summary: "说明创立 ARC 的背景，以及最初聚焦意图对齐理论研究的计划。",
    mentions: [], featuredFor: ["paul-christiano"],
  },
];

export const writingKindLabels: Record<Writing["kind"], string> = {
  essay: "观点文章", article: "署名文章", technical: "研究论文",
};
export const personWritings = (personId: string) => writings.filter(w => w.personIds.includes(personId));
export const featuredWritings = (personId: string) => writings.filter(w => w.featuredFor.includes(personId));
export const writingSource = (writing: Writing) => sources.find(s => s.id === writing.sourceId);

export interface WritingSegment { text: string; writing?: Writing }
/** Match only this person's exact title in a paragraph citing that original.
 * Return text segments so the view escapes every string, including titles.
 */
export function writingSegments(text: string, personId: string, sourceIds: readonly string[]): WritingSegment[] {
  const candidates = personWritings(personId)
    .filter(w => sourceIds.includes(w.sourceId) && writingSource(w))
    .flatMap(writing => writing.mentions.filter(Boolean).map(mention => ({ writing, mention })))
    .sort((a, b) => b.mention.length - a.mention.length);
  const segments: WritingSegment[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    let next: { index: number; writing: Writing; mention: string } | undefined;
    for (const candidate of candidates) {
      const index = text.indexOf(candidate.mention, cursor);
      if (index >= 0 && (!next || index < next.index)) next = { ...candidate, index };
    }
    if (!next) { segments.push({ text: text.slice(cursor) }); break; }
    if (next.index > cursor) segments.push({ text: text.slice(cursor, next.index) });
    segments.push({ text: next.mention, writing: next.writing });
    cursor = next.index + next.mention.length;
  }
  return segments;
}
