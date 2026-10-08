/**
 * AI Atlas curated public-source dataset.
 * Verification date is not a claim that every event or role is exhaustive/current.
 * Relationship periods deliberately distinguish historical snapshots from latest checks.
 */
export interface Source {
  id: string;
  title: string;
  url: string;
  published?: string;
  verified: string;
}
export interface Company {
  id: string;
  name: string;
  cnName?: string;
  initial: string;
  category: string;
  tagline: string;
  description: string[];
  founded: string;
  location: string;
  coverage: "dossier" | "preview";
  sourceIds: string[];
  topics: string[];
}
export interface Milestone {
  date: string;
  text: string;
  sourceIds: string[];
}
export interface Person {
  id: string;
  name: string;
  aliases?: string[];
  cnName: string;
  initial: string;
  role: string;
  companyId: string;
  summary: string;
  paragraphs: string[];
  paragraphSourceIds?: string[][];
  milestones: Milestone[];
  sourceIds: string[];
}
export type RelationshipType =
  | "governance"
  | "employment"
  | "investment"
  | "product";
/**
 * Curated evidence status, independent of relationship type and period wording.
 * A snapshot records dated evidence; it does not imply that a relationship ended.
 */
export type RelationshipStatus =
  | "current"
  | "historical"
  | "snapshot"
  | "event"
  | "navigation";
export interface Relationship {
  id: string;
  from: string;
  to: string;
  type: RelationshipType;
  status: RelationshipStatus;
  label: string;
  detail: string;
  period: string;
  sourceIds: string[];
  navigationOnly?: boolean;
}
export interface AdditionalEntity {
  id: string;
  name: string;
  cnName?: string;
  initial: string;
  type: "organization" | "product";
  summary: string;
  sourceIds: string[];
}
export interface AtlasEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  entityIds: string[];
  sourceIds: string[];
}

export const datasetDate = "2026-10-08";

/** Foundation membership is separate from the Group board and management. */
export const foundationBoard: {
  verified: string;
  sourceIds: string[];
  members: { name: string; role: string; personId?: string }[];
} = {
  verified: "2026-10-07",
  sourceIds: ["openai-structure"],
  members: [
    { name: "Bret Taylor", role: "主席 · 独立董事", personId: "bret-taylor" },
    { name: "Adam D’Angelo", role: "独立董事" },
    { name: "Paul Christiano", role: "独立董事", personId: "paul-christiano" },
    { name: "Sue Desmond-Hellmann", role: "独立董事" },
    { name: "Zico Kolter", role: "独立董事" },
    { name: "Paul M. Nakasone", role: "独立董事" },
    { name: "Adebayo Ogunlesi", role: "独立董事" },
    { name: "Nicole Seligman", role: "独立董事" },
    { name: "David Vélez", role: "独立董事" },
    { name: "Robin Vince", role: "独立董事" },
    { name: "Sam Altman", role: "董事 · CEO", personId: "sam-altman" },
  ],
};

export const sources: Source[] = [
  {
    "id": "openai-tibo-forum",
    "title": "OpenAI Forum · Codex is for Everyone（2026-05-13 活动与讲者简介）",
    "url": "https://forum.openai.com/public/events/codex-is-for-everyone-why-codex-matters-beyond-code-fa40puy7wi",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-tibo-astral",
    "title": "OpenAI · OpenAI to acquire Astral（Tibo 职称与 Codex 方向）",
    "url": "https://openai.com/index/openai-to-acquire-astral/",
    "published": "2026-03-19",
    "verified": "2026-10-07"
  },
  {
    "id": "vivatech-tibo-2026",
    "title": "VivaTech · Thibault Sottiaux 与 Peter Steinberger 讲者公告",
    "url": "https://vivatech.com/media/press-releases/breaking-news-peter-steinberger-creator-of-openclaw-and-thibault-sottiaux-openai-two-ai-experts-for-an-exceptional-session-at-vivatech",
    "published": "2026-05-28",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-tibo-ona",
    "title": "OpenAI · OpenAI to acquire Ona（Core Products Lead）",
    "url": "https://openai.com/index/openai-to-acquire-ona/",
    "published": "2026-06-11",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-tibo-platform",
    "title": "OpenAI · Defense Factory（Head of Core Products & Platform）",
    "url": "https://openai.com/the-defense-factory/",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-jakub-2026",
    "title": "Jakub Pachocki / OpenAI · An Alien Mind",
    "url": "https://openai.com/index/an-alien-mind/",
    "published": "2026-09-06",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-fidji-appointment",
    "title": "OpenAI · Leadership expansion with Fidji Simo",
    "url": "https://openai.com/index/leadership-expansion-with-fidji-simo/",
    "published": "2025-05-07",
    "verified": "2026-10-08"
  },
  {
    "id": "fidji-adviser-statement",
    "title": "Fidji Simo · 本人公开说明转任兼职顾问",
    "url": "https://www.linkedin.com/posts/fidjisimo_today-i-shared-with-the-openai-team-that-activity-7481120077711425536-e03r",
    "verified": "2026-10-08"
  },
  {
    "id": "nscale-fidji-board",
    "title": "Nscale · Fidji Simo joins Board（并确认 OpenAI 顾问身份）",
    "url": "https://www.nscale.com/press-releases/fidji-simo-joins-nscale-board-of-directors",
    "published": "2026-09-11",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-leadership-2025",
    "title": "OpenAI · Leadership updates（Brad Lightcap 的历史职责）",
    "url": "https://openai.com/index/leadership-updates-march-2025/",
    "published": "2025-03-24",
    "verified": "2026-10-07"
  },
  {
    "id": "brad-departure-reuters",
    "title": "Reuters / Investing.com · Brad Lightcap announces departure（媒体交叉核验）",
    "url": "https://www.investing.com/news/stock-market-news/senior-openai-executive-brad-lightcap-to-leave-for-new-venture-4852370",
    "published": "2026-08-11",
    "verified": "2026-10-07"
  },
  {
    "id": "sierra-bret-bio",
    "title": "Sierra · Bret Taylor 官方简介",
    "url": "https://sierra.ai/author/bret-taylor",
    "verified": "2026-10-08"
  },
  {
    "id": "sierra-launch",
    "title": "Bret Taylor、Clay Bavor / Sierra · Meet Sierra, the conversational AI platform for businesses",
    "url": "https://sierra.ai/blog/introducing-sierra",
    "published": "2024-02-13",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-paul-board-2026",
    "title": "OpenAI · Paul Christiano joins OpenAI Foundation Board",
    "url": "https://openai.com/index/paul-christiano-joins-openai-foundation-board/",
    "published": "2026-09-09",
    "verified": "2026-10-08"
  },
  {
    "id": "rlhf-human-preferences",
    "title": "Christiano 等 · Deep reinforcement learning from human preferences",
    "url": "https://arxiv.org/abs/1706.03741",
    "published": "2017-06-12",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-codex-agent",
    "title": "OpenAI · Introducing Codex（2025 年研究预览）",
    "url": "https://openai.com/index/introducing-codex/",
    "published": "2025-05-16",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-founding",
    "title": "OpenAI · Introducing OpenAI",
    "url": "https://openai.com/index/introducing-openai/",
    "verified": "2026-10-08",
    "published": "2015-12-11"
  },
  {
    "id": "openai-lp",
    "title": "OpenAI · OpenAI LP",
    "url": "https://openai.com/index/openai-lp/",
    "verified": "2026-10-08",
    "published": "2019-03-11"
  },
  {
    "id": "openai-api",
    "title": "OpenAI · OpenAI API",
    "url": "https://openai.com/index/openai-api/",
    "verified": "2026-10-03",
    "published": "2020-06-11"
  },
  {
    "id": "openai-chatgpt",
    "title": "OpenAI · Introducing ChatGPT",
    "url": "https://openai.com/index/chatgpt/",
    "verified": "2026-10-03",
    "published": "2022-11-30"
  },
  {
    "id": "openai-gpt4",
    "title": "OpenAI · GPT-4",
    "url": "https://openai.com/index/gpt-4/",
    "verified": "2026-10-03",
    "published": "2023-03-14"
  },
  {
    "id": "openai-roles-2022",
    "title": "OpenAI · Leadership team update",
    "url": "https://openai.com/index/leadership-team-update/",
    "published": "2022-05-05",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-transition",
    "title": "OpenAI · Leadership transition",
    "url": "https://openai.com/index/openai-announces-leadership-transition/",
    "published": "2023-11-17",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-return",
    "title": "OpenAI · Sam Altman returns as CEO",
    "url": "https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board/",
    "published": "2023-11-29",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-review",
    "title": "OpenAI · Board review and governance update",
    "url": "https://openai.com/index/review-completed-altman-brockman-to-continue-to-lead-openai/",
    "verified": "2026-10-07",
    "published": "2024-03-08"
  },
  {
    "id": "openai-ilya-departure",
    "title": "OpenAI · Ilya Sutskever leaves; Jakub Pachocki named Chief Scientist",
    "url": "https://openai.com/index/jakub-pachocki-announced-as-chief-scientist/",
    "verified": "2026-10-08",
    "published": "2024-05-14"
  },
  {
    "id": "openai-structure",
    "title": "OpenAI · Our structure（含 2025-10-28 重组说明）",
    "url": "https://openai.com/our-structure/",
    "verified": "2026-10-07"
  },
  {
    "id": "openai-microsoft-2019",
    "title": "OpenAI · Microsoft investment and partnership",
    "url": "https://openai.com/index/microsoft-invests-in-and-partners-with-openai/",
    "verified": "2026-10-03",
    "published": "2019-07-22"
  },
  {
    "id": "openai-microsoft-2026",
    "title": "OpenAI · The next phase of the Microsoft partnership",
    "url": "https://openai.com/index/next-phase-of-microsoft-partnership/",
    "verified": "2026-10-03",
    "published": "2026-04-27"
  },
  {
    "id": "openai-greg-2026",
    "title": "OpenAI · Views on AI policy（文中确认总裁身份）",
    "url": "https://openai.com/index/our-views-on-ai-policy-and-political-advocacy/",
    "verified": "2026-10-03",
    "published": "2026-06-01"
  },
  {
    "id": "openai-hq",
    "title": "OpenAI · 官方招聘页面（旧金山总部信息）",
    "url": "https://openai.com/careers/technical-threat-investigator-threat-intel-engineering-san-francisco/",
    "verified": "2026-10-03"
  },
  {
    "id": "yc-sam",
    "title": "Y Combinator · Sam Altman for President",
    "url": "https://www.ycombinator.com/blog/sam-altman-for-president",
    "verified": "2026-10-08",
    "published": "2014-02-21"
  },
  {
    "id": "seq2seq",
    "title": "Sutskever, Vinyals & Le · Sequence to Sequence Learning with Neural Networks",
    "url": "https://arxiv.org/abs/1409.3215",
    "verified": "2026-10-08",
    "published": "2014-09-10"
  },
  {
    "id": "ssi-about",
    "title": "Safe Superintelligence · 公司使命与办公地点",
    "url": "https://ssi.inc/",
    "verified": "2026-10-08"
  },
  {
    "id": "ssi-updates",
    "title": "Safe Superintelligence · Updates（含 2025-07-03 人事公告）",
    "url": "https://ssi.inc/updates",
    "verified": "2026-10-08"
  },
  {
    "id": "ssi-founder",
    "title": "Sequoia Capital · Ilya Sutskever 创始人档案",
    "url": "https://sequoiacap.com/founder/ilya-sutskever",
    "verified": "2026-10-08"
  },
  {
    "id": "ssi-investor",
    "title": "Sequoia Capital · Safe Superintelligence 投资组合档案",
    "url": "https://sequoiacap.com/companies/safe-superintelligence",
    "verified": "2026-10-08"
  },
  {
    "id": "tml-about",
    "title": "Thinking Machines Lab · 公司介绍",
    "url": "https://thinkingmachines.ai/",
    "verified": "2026-10-08"
  },
  {
    "id": "tml-nvidia",
    "title": "Thinking Machines Lab · NVIDIA strategic partnership",
    "url": "https://thinkingmachines.ai/news/nvidia-partnership/",
    "verified": "2026-10-03",
    "published": "2026-03-10"
  },
  {
    "id": "tml-tinker",
    "title": "Thinking Machines Lab · Announcing Tinker",
    "url": "https://thinkingmachines.ai/news/announcing-tinker/",
    "published": "2025-10-01",
    "verified": "2026-10-08"
  },
  {
    "id": "tml-investor",
    "title": "Lightspeed · Thinking Machines 投资组合档案",
    "url": "https://lsvp.com/company/thinking-machines/",
    "verified": "2026-10-03"
  },
  {
    "id": "tml-location",
    "title": "Thinking Machines Lab · LinkedIn 公司页",
    "url": "https://www.linkedin.com/company/thinkingmachinesai",
    "verified": "2026-10-03"
  },
  {
    "id": "anthropic-about",
    "title": "Anthropic · Company",
    "url": "https://www.anthropic.com/company",
    "verified": "2026-10-03"
  },
  {
    "id": "anthropic-founding",
    "title": "Anthropic · Series B 公告与创立时间回顾",
    "url": "https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai",
    "published": "2022-04-29",
    "verified": "2026-10-08"
  },
  {
    "id": "anthropic-leadership",
    "title": "Anthropic · Leadership",
    "url": "https://www.anthropic.com/company/leadership",
    "verified": "2026-10-08"
  },
  {
    "id": "anthropic-claude",
    "title": "Anthropic · Introducing Claude",
    "url": "https://www.anthropic.com/news/introducing-claude",
    "published": "2023-03-14",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-bio",
    "title": "Dario Amodei · 本人官网简介",
    "url": "https://darioamodei.com/",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-about",
    "title": "Google DeepMind · About（现职措辞与较新公告冲突）",
    "url": "https://deepmind.google/about/",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-formation",
    "title": "Google · Bringing together two world-class AI teams",
    "url": "https://blog.google/innovation-and-ai/technology/ai/april-ai-update/",
    "verified": "2026-10-03",
    "published": "2023-04-20"
  },
  {
    "id": "nobel-2024",
    "title": "诺贝尔奖官方 · 2024 年化学奖新闻稿",
    "url": "https://www.nobelprize.org/uploads/2024/10/press-chemistryprize2024-3.pdf",
    "verified": "2026-10-03",
    "published": "2024-10-09"
  },
  {
    "id": "meta-fair",
    "title": "Meta · Celebrating 10 years of FAIR",
    "url": "https://ai.meta.com/blog/fair-10-year-anniversary-open-science-meta/",
    "verified": "2026-10-03",
    "published": "2023-11-30"
  },
  {
    "id": "meta-llama3",
    "title": "Meta · Introducing Meta Llama 3",
    "url": "https://ai.meta.com/blog/meta-llama-3",
    "verified": "2026-10-03",
    "published": "2024-04-18"
  },
  {
    "id": "meta-location",
    "title": "Meta · Expanding our home in Menlo Park",
    "url": "https://about.fb.com/news/2018/09/expanding-our-home-in-menlo-park/",
    "verified": "2026-10-03",
    "published": "2018-09-04"
  },
  {
    "id": "xai-about",
    "title": "xAI / SpaceXAI · Company and historical milestones",
    "url": "https://x.ai/company",
    "verified": "2026-10-03"
  },
  {
    "id": "xai-grok",
    "title": "xAI · Announcing Grok",
    "url": "https://x.ai/news/grok",
    "verified": "2026-10-03",
    "published": "2023-11-03"
  },
  {
    "id": "xai-spacex",
    "title": "xAI · xAI joins SpaceX",
    "url": "https://x.ai/news/xai-joins-spacex",
    "verified": "2026-10-03",
    "published": "2026-02-02"
  },
  {
    "id": "deepseek-about",
    "title": "DeepSeek AI · LinkedIn 公司页",
    "url": "https://www.linkedin.com/company/deepseek-ai",
    "verified": "2026-10-03"
  },
  {
    "id": "deepseek-r1",
    "title": "DeepSeek · DeepSeek-R1 发布",
    "url": "https://deepseek.com/news/deepseek-r1/",
    "verified": "2026-10-03",
    "published": "2025-01-20"
  },
  {
    "id": "microsoft-facts",
    "title": "Microsoft · Facts about Microsoft",
    "url": "https://news.microsoft.com/facts-about-microsoft/",
    "verified": "2026-10-03"
  },
  {
    "id": "wiki-sam-altman",
    "title": "Wikipedia · Sam Altman（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Sam_Altman",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-greg-brockman",
    "title": "Wikipedia · Greg Brockman（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Greg_Brockman",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-ilya-sutskever",
    "title": "Wikipedia · Ilya Sutskever（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Ilya_Sutskever",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-mira-murati",
    "title": "Wikipedia · Mira Murati（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Mira_Murati",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-dario-amodei",
    "title": "Wikipedia · Dario Amodei（二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Dario_Amodei",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-demis-hassabis",
    "title": "Wikipedia · Demis Hassabis（二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Demis_Hassabis",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-bret-taylor",
    "title": "Wikipedia · Bret Taylor（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Bret_Taylor",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-fidji-simo",
    "title": "Wikipedia · Fidji Simo（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Fidji_Simo",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-paul-christiano",
    "title": "Wikipedia · Paul Christiano（二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Paul_Christiano_(researcher)",
    "verified": "2026-10-08"
  },
  {
    "id": "wiki-jakub-pachocki",
    "title": "Wikipedia · Jakub Pachocki（生平背景；二手汇编，非原始资料）",
    "url": "https://en.wikipedia.org/wiki/Jakub_Pachocki",
    "verified": "2026-10-08"
  },
  {
    "id": "sam-stanford-transcript",
    "title": "Stanford STVP · The Possibilities of AI（现场对谈文字稿）",
    "url": "https://stvp.stanford.edu/node/10731/printable/print",
    "verified": "2026-10-08",
    "published": "2024-05-01"
  },
  {
    "id": "yc-loopt",
    "title": "Y Combinator · Loopt 公司与创始人档案",
    "url": "https://www.ycombinator.com/companies/loopt",
    "verified": "2026-10-08"
  },
  {
    "id": "greendot-loopt-completed",
    "title": "Green Dot · Completes Acquisition of Loopt",
    "url": "https://ir.greendot.com/news-releases/news-release-details/green-dot-completes-acquisition-loopt/",
    "verified": "2026-10-08",
    "published": "2012-04-04"
  },
  {
    "id": "yc-group-2016",
    "title": "Sam Altman / Y Combinator · YC Changes",
    "url": "https://www.ycombinator.com/blog/yc-changes/",
    "verified": "2026-10-08",
    "published": "2016-09-13"
  },
  {
    "id": "senate-altman-2023",
    "title": "美国参议院司法委员会 · Oversight of A.I.: Rules for Artificial Intelligence",
    "url": "https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-rules-for-artificial-intelligence",
    "verified": "2026-10-08",
    "published": "2023-05-16"
  },
  {
    "id": "time-sam-2023",
    "title": "TIME · Sam Altman: The 100 Most Influential People of 2023",
    "url": "https://time.com/collections/100-most-influential-people-2023/6270015/sam-altman/",
    "verified": "2026-10-08"
  },
  {
    "id": "acs-brockman-2006",
    "title": "美国化学会 / EurekAlert! · 2006 年国际化学奥林匹克美国队获奖公告",
    "url": "https://www.eurekalert.org/news-releases/557270",
    "verified": "2026-10-08",
    "published": "2006-07-13"
  },
  {
    "id": "sts-brockman-2007",
    "title": "Society for Science · Intel Science Talent Search 2007 官方结果",
    "url": "https://www.societyforscience.org/regeneron-sts/intel-sts-2007/",
    "verified": "2026-10-08"
  },
  {
    "id": "brockman-path",
    "title": "Greg Brockman · My path to OpenAI",
    "url": "https://blog.gregbrockman.com/my-path-to-openai",
    "verified": "2026-10-08",
    "published": "2016-05-03"
  },
  {
    "id": "brockman-stripe-cto",
    "title": "Greg Brockman · #define CTO",
    "url": "https://blog.gregbrockman.com/figuring-out-the-cto-role-at-stripe",
    "verified": "2026-10-08",
    "published": "2014-10-27"
  },
  {
    "id": "openai-gym-paper",
    "title": "Brockman 等 · OpenAI Gym",
    "url": "https://arxiv.org/abs/1606.01540",
    "verified": "2026-10-08",
    "published": "2016-06-05"
  },
  {
    "id": "openai-five-2018",
    "title": "OpenAI · OpenAI Five（团队署名与技术介绍）",
    "url": "https://openai.com/index/openai-five/",
    "verified": "2026-10-08",
    "published": "2018-06-25"
  },
  {
    "id": "ted-brockman-2023",
    "title": "TED · The astounding new era of AI: Notes on Session 2 of TED2023",
    "url": "https://blog.ted.com/the-astounding-new-era-of-ai-notes-on-session-2-of-ted2023/",
    "verified": "2026-10-08",
    "published": "2023-04-18"
  },
  {
    "id": "utoronto-ilya-honorary",
    "title": "多伦多大学 · Ilya Sutskever receives U of T honorary degree",
    "url": "https://www.utoronto.ca/news/ilya-sutskever-leader-ai-and-its-responsible-development-receives-u-t-honorary-degree",
    "verified": "2026-10-08",
    "published": "2025-06-06"
  },
  {
    "id": "utoronto-ilya-degrees",
    "title": "多伦多大学校友事务 · Hinton honorary degree（列出 Sutskever 三个学位年份）",
    "url": "https://alumni.utoronto.ca/news/u-t-deep-learning-pioneer-geoffrey-hinton-receives-honorary-degree",
    "verified": "2026-10-08",
    "published": "2021-06-11"
  },
  {
    "id": "ilya-thesis",
    "title": "Ilya Sutskever / 多伦多大学 · Training Recurrent Neural Networks（博士论文）",
    "url": "https://www.cs.toronto.edu/~ilya/pubs/ilya_sutskever_phd_thesis.pdf",
    "verified": "2026-10-08",
    "published": "2013"
  },
  {
    "id": "utoronto-dnnresearch",
    "title": "多伦多大学 · Google acquires U of T neural networks company",
    "url": "https://www.utoronto.ca/news/google-acquires-u-t-neural-networks-company",
    "verified": "2026-10-08",
    "published": "2013-03-12"
  },
  {
    "id": "ilya-homepage",
    "title": "Ilya Sutskever / 多伦多大学 · 个人学术主页（历史经历，现职未更新）",
    "url": "https://www.cs.toronto.edu/~ilya/",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-superalignment",
    "title": "Jan Leike、Ilya Sutskever / OpenAI · Introducing Superalignment",
    "url": "https://openai.com/index/introducing-superalignment/",
    "verified": "2026-10-08",
    "published": "2023-07-05"
  },
  {
    "id": "time-ilya-regret",
    "title": "TIME · Who Is Emmett Shear, OpenAI’s New CEO?（转引 Sutskever 公开声明）",
    "url": "https://time.com/6337608/emmett-shear-openai-ceo/",
    "verified": "2026-10-08",
    "published": "2023-11-20"
  },
  {
    "id": "royalsociety-ilya",
    "title": "Royal Society · Dr Ilya Sutskever FRS（2022 年当选）",
    "url": "https://royalsociety.org/people/ilya-sutskever-35834/",
    "verified": "2026-10-08"
  },
  {
    "id": "ioi-jakub",
    "title": "国际信息学奥林匹克 · Jakub Pachocki 成绩记录",
    "url": "https://stats.ioinformatics.org/people/1051",
    "verified": "2026-10-08"
  },
  {
    "id": "uw-jakub-codejam",
    "title": "华沙大学数学、信息学与力学学院 · Google Code Jam 成绩",
    "url": "https://www.mimuw.edu.pl/en/achievements/google-code-jam/",
    "verified": "2026-10-08"
  },
  {
    "id": "uw-jakub-icpc",
    "title": "华沙大学 · Medal dla programistów z UW（回顾 2012 年亚军队成员）",
    "url": "https://www.uw.edu.pl/medal-dla-programistow-z-uw/",
    "verified": "2026-10-08",
    "published": "2024-04-22"
  },
  {
    "id": "simons-jakub",
    "title": "Simons 计算理论研究所 · Jakub Pachocki 历史简介与访问记录",
    "url": "https://simons.berkeley.edu/people/jakub-pachocki",
    "verified": "2026-10-08"
  },
  {
    "id": "cmu-jakub-phd",
    "title": "卡内基梅隆大学 · Jakub Pachocki 博士学位与论文记录",
    "url": "https://csd-web-01.andrew.cmu.edu/academics/doctoral/degrees-conferred/jakub-pachocki",
    "verified": "2026-10-08"
  },
  {
    "id": "ssi-founder-levy",
    "title": "Sequoia Capital · Daniel Levy 创始人档案",
    "url": "https://sequoiacap.com/founder/daniel-levy",
    "verified": "2026-10-08"
  },
  {
    "id": "ssi-founder-gross",
    "title": "Sequoia Capital · Daniel Gross 创始人档案",
    "url": "https://sequoiacap.com/founder/daniel-gross",
    "verified": "2026-10-08"
  },
  {
    "id": "dartmouth-mira-honorary-bio",
    "title": "Dartmouth · 2024 honorary degree recipients（Murati 官方履历）",
    "url": "https://home.dartmouth.edu/news/2024/04/announcing-2024-honorary-degree-recipients",
    "published": "2024-04-11",
    "verified": "2026-10-08"
  },
  {
    "id": "dartmouth-mira-honorary-award",
    "title": "Dartmouth · Dartmouth Awards Honorary Degrees",
    "url": "https://home.dartmouth.edu/news/2024/06/dartmouth-commencement-honorands",
    "published": "2024-06-09",
    "verified": "2026-10-08"
  },
  {
    "id": "pearson-mira-alumni",
    "title": "Pearson College UWC · Alumni（Murati 2007 届）",
    "url": "https://www.pearsoncollege.ca/alumni/",
    "verified": "2026-10-08"
  },
  {
    "id": "murati-language-creativity",
    "title": "Ermira Murati / Daedalus · Language & Coding Creativity",
    "url": "https://www.amacad.org/publication/daedalus/language-coding-creativity",
    "verified": "2026-10-08",
    "published": "2022"
  },
  {
    "id": "ap-murati-departure",
    "title": "Associated Press · Mira Murati and two other OpenAI executives announce departure（报道）",
    "url": "https://apnews.com/article/openai-mira-murati-quits-df75217584696b442935dbccc9b0347d",
    "published": "2024-09-25",
    "verified": "2026-10-08"
  },
  {
    "id": "dartmouth-mira-ai-discussion",
    "title": "Dartmouth Engineering · Mira Murati Shares Optimism for AI’s Future",
    "url": "https://engineering.dartmouth.edu/news/openai-cto-mira-murati-th12-shares-optimism-for-ais-future",
    "published": "2024-06-10",
    "verified": "2026-10-08"
  },
  {
    "id": "dartmouth-elliott-murati",
    "title": "Will Elliott / The Dartmouth · OpenAI’s Mira Murati has it all wrong（署名评论）",
    "url": "https://www.thedartmouth.com/article/2024/07/elliott-murati-openai",
    "published": "2024-07-12",
    "verified": "2026-10-08"
  },
  {
    "id": "stanford-taylor-friendfeed",
    "title": "Stanford Engineering · Stanford friendships fed success of FriendFeed",
    "url": "https://engineering.stanford.edu/news/stanford-friendships-fed-success-social-networking-innovator-friendfeed",
    "verified": "2026-10-08"
  },
  {
    "id": "google-taylor-maps-api",
    "title": "Bret Taylor / Google · The world is your JavaScript-enabled oyster",
    "url": "https://googleblog.blogspot.com/2005/06/world-is-your-javascript-enabled_29.html",
    "published": "2005-06-29",
    "verified": "2026-10-08"
  },
  {
    "id": "facebook-friendfeed-acquisition",
    "title": "Facebook · Agreement to acquire FriendFeed",
    "url": "https://about.fb.com/news/2009/08/facebook-agrees-to-acquire-sharing-service-friendfeed/",
    "published": "2009-08-10",
    "verified": "2026-10-08"
  },
  {
    "id": "salesforce-taylor-coo",
    "title": "Salesforce · Bret Taylor named President & COO",
    "url": "https://www.salesforce.com/news/press-releases/2019/12/12/salesforce-names-bret-taylor-president-chief-operating-officer/",
    "published": "2019-12-12",
    "verified": "2026-10-08"
  },
  {
    "id": "salesforce-taylor-coceo",
    "title": "Salesforce · Bret Taylor promoted to Vice Chair and Co-CEO",
    "url": "https://www.salesforce.com/news/press-releases/2021/11/30/bret-taylor-promoted-to-vice-chair-and-co-ceo-of-salesforce/?bc=OTH",
    "published": "2021-11-30",
    "verified": "2026-10-08"
  },
  {
    "id": "salesforce-taylor-departure",
    "title": "Salesforce · Bret Taylor to step down as Vice Chair and Co-CEO",
    "url": "https://www.salesforce.com/au/news/press-releases/2022/11/30/bret-taylor-to-step-down-as-salesforce-vice-chair-and-co-ceo/?bc=OTH",
    "published": "2022-11-30",
    "verified": "2026-10-08"
  },
  {
    "id": "shopify-taylor-board",
    "title": "Shopify · A board member Taylor-made for Shopify",
    "url": "https://www.shopify.com/news/a-board-member-taylor-made-for-shopify",
    "published": "2023-06-27",
    "verified": "2026-10-08"
  },
  {
    "id": "hec-simo-commencement",
    "title": "HEC Paris · Fidji Simo to deliver 2025 commencement address",
    "url": "https://www.hec.edu/en/school/news/fidji-simo-deliver-2025-commencement-address-hec-paris",
    "published": "2025-06-05",
    "verified": "2026-10-08"
  },
  {
    "id": "hec-simo-profile",
    "title": "Fidji Simo / HEC Paris · Fidji H.08（本人求学回顾）",
    "url": "https://www.hec.edu/en/hec-foundation/profiles/fidji-h08",
    "verified": "2026-10-08"
  },
  {
    "id": "instacart-simo-ceo",
    "title": "Instacart · Fidji Simo appointed CEO",
    "url": "https://company.instacart.com/pressreleases/instacart-appoints-board-member-fidji-simo-to-chief-executive-officer-and-announces-founder-and-current-ceo-apoorva-mehta-will-serve-as-executive-chairman-of-the-board",
    "published": "2021-07-08",
    "verified": "2026-10-08"
  },
  {
    "id": "shopify-simo-board",
    "title": "Shopify · Fidji Simo joins Board of Directors",
    "url": "https://www.shopify.com/news/shopify-s-board-just-got-insta-ntly-better-instacart-ceo-fidji-simo-joins-shopify-s-board-of-directors",
    "published": "2021-12-16",
    "verified": "2026-10-08"
  },
  {
    "id": "instacart-simo-chair",
    "title": "Instacart · Fidji Simo appointed Chair, effective upon public listing",
    "url": "https://company.instacart.com/pressreleases/instacart-appoints-ceo-fidji-simo-to-chair-of-the-board-founder-executive-chairman-apoorva-mehta-to-transition-off-the-board-when-instacart-becomes-a-public-company",
    "published": "2022-07-22",
    "verified": "2026-10-08"
  },
  {
    "id": "instacart-ipo-faq",
    "title": "Instacart · Investor FAQs（上市日期与股票代码）",
    "url": "https://investors.instacart.com/ir-resources/faqs",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-new-directors-2024",
    "title": "OpenAI · New members of the board of directors",
    "url": "https://openai.com/index/openai-announces-new-members-to-board-of-directors/",
    "published": "2024-03-08",
    "verified": "2026-10-08"
  },
  {
    "id": "simo-empowerment-essay",
    "title": "Fidji Simo / OpenAI · AI as the greatest source of empowerment for all",
    "url": "https://openai.com/index/ai-as-the-greatest-source-of-empowerment-for-all/",
    "published": "2025-07-21",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-princeton-bio",
    "title": "普林斯顿大学 · Dario Amodei 的学位与研究经历",
    "url": "https://www.princeton.edu/news/2023/09/12/time-magazines-time100-artificial-intelligence-list-honors-six-princetonians",
    "published": "2023-09-12",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-hertz-bio",
    "title": "Hertz Foundation · Dario Amodei 简介",
    "url": "https://www.hertzfoundation.org/people/dario-amodei/",
    "verified": "2026-10-08"
  },
  {
    "id": "hertz-thesis-awards",
    "title": "Hertz Foundation · 历届论文奖名单",
    "url": "https://www.hertzfoundation.org/hertz-community/awards-recognition/hertz-thesis-prize/",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-physics-team-2000",
    "title": "美国物理教师协会 · 2000 年美国物理队名单",
    "url": "https://www.aapt.org/olympiad2000/team2000.html",
    "verified": "2026-10-08"
  },
  {
    "id": "anthropic-series-a-2021",
    "title": "Anthropic · 2021 年 Series A 公告",
    "url": "https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems",
    "published": "2021-05-28",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-loving-grace",
    "title": "Dario Amodei · Machines of Loving Grace",
    "url": "https://darioamodei.com/essay/machines-of-loving-grace",
    "verified": "2026-10-08",
    "published": "2024-10"
  },
  {
    "id": "dario-adolescence",
    "title": "Dario Amodei · The Adolescence of Technology",
    "url": "https://darioamodei.com/essay/the-adolescence-of-technology",
    "verified": "2026-10-08",
    "published": "2026-01"
  },
  {
    "id": "time-dario-2025",
    "title": "TIME · 2025 年百大人物：Dario Amodei",
    "url": "https://time.com/collections/100-most-influential-people-2025/7273747/dario-amodei/",
    "published": "2025-04-16",
    "verified": "2026-10-08"
  },
  {
    "id": "time-dario-daniela-2026",
    "title": "TIME · 2026 年百大人物：Dario Amodei 与 Daniela Amodei",
    "url": "https://time.com/collection/100-most-influential-people/2026/dario-daniela-amodei/",
    "published": "2026-04-15",
    "verified": "2026-10-08"
  },
  {
    "id": "demis-nobel-facts",
    "title": "诺贝尔奖官方 · Demis Hassabis 获奖者资料",
    "url": "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/facts/",
    "verified": "2026-10-08"
  },
  {
    "id": "demis-cv-2023",
    "title": "宗座科学院收录 · Demis Hassabis 2023 年简历",
    "url": "https://www.pas.va/content/dam/casinapioiv/pas/pdf-vari/cv_accademici/Demis-Hassabis-CV-2023.pdf",
    "verified": "2026-10-08"
  },
  {
    "id": "demis-ucl-nobel",
    "title": "伦敦大学学院 · 校友 Demis Hassabis 获诺贝尔化学奖",
    "url": "https://www.ucl.ac.uk/news/2024/oct/ucl-alumnus-and-ai-innovator-awarded-nobel-prize-chemistry",
    "published": "2024-10-09",
    "verified": "2026-10-08"
  },
  {
    "id": "demis-imagination-2007",
    "title": "Hassabis 等 · Patients with hippocampal amnesia cannot imagine new experiences",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17229836/",
    "published": "2007-01-30",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-alphago-history",
    "title": "Google DeepMind · AlphaGo 比赛记录",
    "url": "https://deepmind.google/research/alphago/",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-alphafold-casp14",
    "title": "Google DeepMind · AlphaFold 的 CASP14 结果",
    "url": "https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/",
    "published": "2020-11-30",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-alphafold-database-2022",
    "title": "Demis Hassabis / Google DeepMind · AlphaFold 数据库扩展",
    "url": "https://deepmind.google/blog/alphafold-reveals-the-structure-of-the-protein-universe/",
    "published": "2022-07-28",
    "verified": "2026-10-08"
  },
  {
    "id": "nobel-chemistry-2024-html",
    "title": "诺贝尔奖官方 · 2024 年化学奖新闻稿（网页）",
    "url": "https://www.nobelprize.org/prizes/chemistry/2024/press-release/",
    "published": "2024-10-09",
    "verified": "2026-10-08"
  },
  {
    "id": "isomorphic-leadership-2022",
    "title": "Isomorphic Labs · 首批管理团队公告",
    "url": "https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-first-phase-of-management-team",
    "published": "2022-05-01",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-mit-author-bio",
    "title": "Theory of Computing · Paul Christiano 作者简介",
    "url": "https://theoryofcomputing.org/articles/v009a009/about.html",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-berkeley-thesis",
    "title": "加州大学伯克利分校 · Manipulation-resistant online learning",
    "url": "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2017/EECS-2017-107.html",
    "published": "2017-05-15",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-imo-results",
    "title": "国际数学奥林匹克官方 · 美国历届选手成绩",
    "url": "https://www.imo-official.org/results/individual/country/USA/",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-bio",
    "title": "Paul Christiano · 本人官网简介",
    "url": "https://paulfchristiano.com/",
    "verified": "2026-10-08"
  },
  {
    "id": "ai-safety-debate-2018",
    "title": "Irving、Christiano、Amodei · AI safety via debate",
    "url": "https://arxiv.org/abs/1805.00899",
    "published": "2018-05-02",
    "verified": "2026-10-08"
  },
  {
    "id": "amplification-2018",
    "title": "Christiano、Shlegeris、Amodei · Supervising strong learners by amplifying weak experts",
    "url": "https://arxiv.org/abs/1810.08575",
    "published": "2018-10-19",
    "verified": "2026-10-08"
  },
  {
    "id": "book-summarization-2021",
    "title": "Wu 等 · Recursively Summarizing Books with Human Feedback",
    "url": "https://arxiv.org/abs/2109.10862",
    "published": "2021-09-22",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-announces-arc",
    "title": "Paul Christiano · Announcing the Alignment Research Center",
    "url": "https://www.alignmentforum.org/posts/3ejHFgQihLG4L6WQf/announcing-the-alignment-research-center",
    "published": "2021-04-26",
    "verified": "2026-10-08"
  },
  {
    "id": "arc-elk-report-2021",
    "title": "Alignment Research Center · 首份技术报告 Eliciting Latent Knowledge",
    "url": "https://www.alignment.org/blog/arcs-first-technical-report-eliciting-latent-knowledge/",
    "published": "2021-12-14",
    "verified": "2026-10-08"
  },
  {
    "id": "metr-spinout-2023",
    "title": "METR · ARC Evals is now METR",
    "url": "https://metr.org/blog/2023-12-04-metr-announcement/",
    "published": "2023-12-04",
    "verified": "2026-10-08"
  },
  {
    "id": "uk-frontier-taskforce-2023",
    "title": "英国政府 · Frontier AI Taskforce 首份进展报告",
    "url": "https://www.gov.uk/government/publications/frontier-ai-taskforce-first-progress-report/frontier-ai-taskforce-first-progress-report",
    "published": "2023-09-07",
    "verified": "2026-10-08"
  },
  {
    "id": "anthropic-ltbt-2023",
    "title": "Anthropic · Long-Term Benefit Trust 及后续成员变更脚注",
    "url": "https://www.anthropic.com/news/the-long-term-benefit-trust",
    "published": "2023-09-19",
    "verified": "2026-10-08"
  },
  {
    "id": "nist-paul-appointment-2024",
    "title": "NIST · 美国 AI 安全研究所管理团队任命公告",
    "url": "https://www.nist.gov/news-events/news/2024/04/us-commerce-secretary-gina-raimondo-announces-expansion-us-ai-safety",
    "published": "2024-04-16",
    "verified": "2026-10-08"
  },
  {
    "id": "venturebeat-nist-appointment-2024",
    "title": "VentureBeat · Christiano 拟议任命的内部反对报道（二手，含匿名消息）",
    "url": "https://venturebeat.com/ai/nist-staffers-revolt-against-potential-appointment-of-effective-altruist-ai-researcher-to-us-ai-safety-institute",
    "published": "2024-03-07",
    "verified": "2026-10-08"
  },
  {
    "id": "google-ai-leadership-2026",
    "title": "Google · The next chapter of our AI momentum",
    "url": "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-institute-2026",
    "title": "DeepMind Institute · 成立公告与创办者职衔",
    "url": "https://institute.deepmind.com/essays/introducing-the-deepmind-institute/",
    "published": "2026-09-16",
    "verified": "2026-10-08"
  },
  {
    "id": "google-demis-author",
    "title": "Google · Demis Hassabis 作者资料",
    "url": "https://blog.google/authors/demis-hassabis/",
    "verified": "2026-10-08"
  },
  {
    "id": "sam-intelligence-age",
    "title": "Sam Altman · The Intelligence Age",
    "url": "https://ia.samaltman.com/",
    "published": "2024-09-23",
    "verified": "2026-10-08"
  },
  {
    "id": "sam-moores-law",
    "title": "Sam Altman · Moore's Law for Everything",
    "url": "https://moores.samaltman.com/",
    "published": "2021-03-16",
    "verified": "2026-10-08"
  },
  {
    "id": "sam-reflections",
    "title": "Sam Altman · Reflections",
    "url": "https://blog.samaltman.com/reflections",
    "published": "2025-01",
    "verified": "2026-10-08"
  },
  {
    "id": "senate-altman-testimony-2023",
    "title": "Sam Altman / 美国参议院司法委员会 · 2023 年 5 月 16 日书面证词",
    "url": "https://www.judiciary.senate.gov/download/2023-05-16-testimony-altman",
    "published": "2023-05-16",
    "verified": "2026-10-08"
  },
  {
    "id": "brockman-leaving-stripe",
    "title": "Greg Brockman · Leaving Stripe",
    "url": "https://blog.gregbrockman.com/leaving-stripe",
    "published": "2015-05-06",
    "verified": "2026-10-08"
  },
  {
    "id": "quip-launch-2013",
    "title": "Bret Taylor、Kevin Gibbs / Quip · Introducing Quip",
    "url": "https://quip.com/blog/introducing-quip",
    "published": "2013-07-31",
    "verified": "2026-10-08"
  },
  {
    "id": "quip-salesforce-2016",
    "title": "Bret Taylor、Kevin Gibbs / Quip · Quip + Salesforce = Big News（含 8 月 26 日交易完成更新）",
    "url": "https://quip.com/blog/salesforce",
    "published": "2016-08-01",
    "verified": "2026-10-08"
  },
  {
    "id": "twitter-taylor-board-2016",
    "title": "Twitter / SEC · 2016 年 7 月董事任命 Form 8-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1418091/000156459016021048/twtr-8k_20160705.htm",
    "published": "2016-07-05",
    "verified": "2026-10-08"
  },
  {
    "id": "twitter-taylor-chair-2021",
    "title": "Twitter / SEC · Jack Dorsey steps down; Bret Taylor to Become Independent Chair",
    "url": "https://www.sec.gov/Archives/edgar/data/1418091/000119312521342255/d401229dex991.htm",
    "published": "2021-11-29",
    "verified": "2026-10-08"
  },
  {
    "id": "twitter-board-end-2022",
    "title": "Twitter / SEC · 收购完成及董事任期结束 Form 8-K（10 月 28 日签署）",
    "url": "https://www.sec.gov/Archives/edgar/data/1418091/000119312522272772/d411753d8k.htm",
    "published": "2022-10",
    "verified": "2026-10-08"
  },
  {
    "id": "marquette-taylor-cto-2010",
    "title": "Marquette University · Bret Taylor Becomes Facebook’s CTO（2010 年任命邮件的馆藏条目）",
    "url": "https://epublications.marquette.edu/zuckerberg_files_transcripts/29/",
    "published": "2010-06-02",
    "verified": "2026-10-08"
  },
  {
    "id": "ilya-alexnet-2012",
    "title": "Krizhevsky、Sutskever、Hinton · ImageNet Classification with Deep Convolutional Neural Networks",
    "url": "https://www.cs.toronto.edu/~hinton/absps/imagenet.pdf",
    "published": "2012",
    "verified": "2026-10-08"
  },
  {
    "id": "ilya-gpt-pretraining-2018",
    "title": "Radford 等 · Improving Language Understanding by Generative Pre-Training",
    "url": "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf",
    "published": "2018",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-language-unsupervised-2018",
    "title": "Alec Radford / OpenAI · Improving language understanding with unsupervised learning",
    "url": "https://openai.com/index/language-unsupervised/",
    "published": "2018-06-11",
    "verified": "2026-10-08"
  },
  {
    "id": "jakub-multi-agent-2017",
    "title": "Bansal 等 · Emergent Complexity via Multi-Agent Competition",
    "url": "https://arxiv.org/abs/1710.03748",
    "published": "2017-10-10",
    "verified": "2026-10-08"
  },
  {
    "id": "openai-competitive-self-play-2017",
    "title": "OpenAI · Competitive self-play",
    "url": "https://openai.com/index/competitive-self-play/",
    "published": "2017-10-11",
    "verified": "2026-10-08"
  },
  {
    "id": "jakub-openai-five-paper-2019",
    "title": "OpenAI、Berner 等 · Dota 2 with Large Scale Deep Reinforcement Learning",
    "url": "https://arxiv.org/abs/1912.06680",
    "published": "2019-12-13",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-electrical-flows-2010",
    "title": "Christiano 等 · Electrical Flows, Laplacian Systems, and Faster Approximation of Maximum Flow in Undirected Graphs",
    "url": "https://arxiv.org/abs/1010.2921",
    "published": "2010-10-14",
    "verified": "2026-10-08"
  },
  {
    "id": "paul-human-preferences-explainer-2017",
    "title": "Amodei、Christiano、Ray / OpenAI · Learning from human preferences",
    "url": "https://openai.com/index/learning-from-human-preferences/",
    "published": "2017-06-13",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-concrete-safety-2016",
    "title": "Amodei 等 · Concrete Problems in AI Safety",
    "url": "https://arxiv.org/abs/1606.06565",
    "published": "2016-06-21",
    "verified": "2026-10-08"
  },
  {
    "id": "dario-scaling-laws-2020",
    "title": "Kaplan 等 · Scaling Laws for Neural Language Models",
    "url": "https://arxiv.org/abs/2001.08361",
    "published": "2020-01-23",
    "verified": "2026-10-08"
  },
  {
    "id": "anthropic-constitutional-ai-2022",
    "title": "Bai 等 · Constitutional AI: Harmlessness from AI Feedback",
    "url": "https://arxiv.org/abs/2212.08073",
    "published": "2022-12-15",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-atari-2013",
    "title": "Mnih 等 · Playing Atari with Deep Reinforcement Learning",
    "url": "https://arxiv.org/abs/1312.5602",
    "published": "2013-12-19",
    "verified": "2026-10-08"
  },
  {
    "id": "deepmind-alphafold3-2024",
    "title": "Abramson 等 · Accurate structure prediction of biomolecular interactions with AlphaFold 3",
    "url": "https://www.nature.com/articles/s41586-024-07487-w",
    "published": "2024-05-08",
    "verified": "2026-10-08"
  },
  {
    "id": "demis-queens-nobel-2024",
    "title": "Queens’ College · Sir Demis Hassabis wins Nobel Prize in Chemistry",
    "url": "https://www.queens.cam.ac.uk/about-us/news-events/sir-demis-hassabis-wins-nobel-prize-in-chemistry/",
    "published": "2024-10-09",
    "verified": "2026-10-08"
  },
  {
    "id": "simo-facebook-watch-2018",
    "title": "Fidji Simo · Facebook Watch Is Going Global",
    "url": "https://about.fb.com/news/2018/08/facebook-watch-global/",
    "published": "2018-08-29",
    "verified": "2026-10-08"
  },
  {
    "id": "simo-facebook-app-2019",
    "title": "Mark Zuckerberg · A Note From Mark Zuckerberg",
    "url": "https://about.fb.com/news/2019/03/a-note-from-mark-zuckerberg/",
    "published": "2019-03-14",
    "verified": "2026-10-08"
  },
  {
    "id": "instacart-platform-2022",
    "title": "Instacart · Instacart Launches Instacart Platform with New Advertising, Fulfillment and Insights Solutions for Retailers",
    "url": "https://company.instacart.com/pressreleases/instacart-launches-instacart-platform-with-new-advertising-fulfillment-and-insights-solutions-for-retailers",
    "published": "2022-03-23",
    "verified": "2026-10-08"
  },
  {
    "id": "instacart-simo-transition-2025",
    "title": "Instacart · Instacart Appoints Chris Rogers as Chief Executive Officer",
    "url": "https://company.instacart.com/pressreleases/instacart-appoints-chris-rogers-as-chief-executive-officer",
    "published": "2025-05-28",
    "verified": "2026-10-08"
  },
  {
    "id": "embl-alphafold-launch-2021",
    "title": "EMBL-EBI · DeepMind and EMBL release the most complete database of predicted 3D structures of human proteins",
    "url": "https://www.ebi.ac.uk/about/news/announcements/alphafold-database-launch/",
    "published": "2021-07-22",
    "verified": "2026-10-08"
  },
  {
    "id": "photo-bret-taylor-2024",
    "title": "Wikimedia Commons · Bret Taylor 在 TechCrunch Disrupt 2024（照片及 CC BY 2.0 许可）",
    "url": "https://commons.wikimedia.org/wiki/File:TechCrunch_Disrupt_2024_D2_Bret_Taylor-3.jpg",
    "published": "2024-10-29",
    "verified": "2026-10-08"
  },
  {
    "id": "photo-fidji-simo-2016",
    "title": "Wikimedia Commons · Loïc Le Meur 拍摄 Fidji Simo（照片及 CC BY 2.0 许可）",
    "url": "https://commons.wikimedia.org/wiki/File:Fidji_Simo_(cropped).jpg",
    "published": "2016-02-29",
    "verified": "2026-10-08"
  }
];

export const companies: Company[] = [
  {
    id: "openai",
    name: "OpenAI",
    cnName: "OpenAI",
    initial: "O",
    category: "前沿模型实验室",
    tagline: "从研究实验室，到面向世界的 AI 平台",
    description: [
      "OpenAI 于 2015 年以非营利研究组织的形式公开成立，目标是让先进人工智能的收益惠及全人类。其早期团队同时聚集了研究、工程与创业背景的人才。",
      "2019 年，OpenAI 引入由非营利组织治理的 OpenAI LP，用当时的“收益上限”结构为计算资源和人才筹集资金。这是历史阶段的制度安排；理解今天的 OpenAI，需要继续追踪此后的重组。",
      "技术与产品是两条相连的路径：2020 年的 API 把通用语言模型能力交给开发者；2022 年发布的 ChatGPT 以对话界面面向用户；2023 年的 GPT-4 则延续了扩大深度学习系统规模的研究路线。模型名称、用户产品与公司实体不应混为一谈。",
      "2023 年 11 月的领导层变动让治理结构受到关注：董事会先宣布 Sam Altman 离任、Mira Murati 出任临时 CEO，随后公司公告确认 Altman 回任、Greg Brockman 回任总裁。2024 年 3 月的审查公告又确认 Altman 重返董事会。",
      "2024 年 5 月，OpenAI 宣布联合创始人 Ilya Sutskever 离开，Jakub Pachocki 接任首席科学家。人物档案因此分别保留历史任职与后续去向，避免把早期创始团队直接当作现任管理层。",
      "2025 年 10 月 28 日公布的重组后，非营利组织名称为 OpenAI Foundation，营利实体为 OpenAI Group PBC。Foundation 通过专属治理权控制 Group，并拥有任免其董事的权力；持股与控制权在这里是不同维度。",
      "微软是重要投资者与技术合作方。2026 年 4 月的协议更新保留其主要云合作伙伴地位，同时允许 OpenAI 跨云提供产品，并将微软对相关模型与产品知识产权的许可改为非独家。",
    ],
    founded: "2015",
    location: "美国 · 旧金山",
    coverage: "dossier",
    sourceIds: [
      "openai-founding",
      "openai-lp",
      "openai-api",
      "openai-chatgpt",
      "openai-gpt4",
      "openai-transition",
      "openai-return",
      "openai-review",
      "openai-ilya-departure",
      "openai-structure",
      "openai-microsoft-2026",
      "openai-hq",
    ],
    topics: ["GPT", "ChatGPT", "API", "公司治理", "AI 安全"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    initial: "A",
    category: "前沿模型实验室",
    tagline: "以安全、可解释性与 Claude 为观察入口",
    description: [
      "Anthropic 于 2021 年初创立，官方将其定位为 AI 安全与研究公司，重点探索可靠、可解释、可引导的系统。Dario Amodei 与 Daniela Amodei 分别在 CEO 与总裁岗位领导公司。",
      "2023 年 3 月，Anthropic 发布 Claude。其公开研究与产品之间的关系，是理解这家公司的核心线索。本条为有限预览，不构成完整组织架构或全部产品目录。",
    ],
    founded: "2021",
    location: "美国 · 旧金山",
    coverage: "preview",
    sourceIds: [
      "anthropic-about",
      "anthropic-founding",
      "anthropic-leadership",
      "anthropic-claude",
    ],
    topics: ["Claude", "可解释性", "AI 安全"],
  },
  {
    id: "google-deepmind",
    name: "Google DeepMind",
    cnName: "谷歌 DeepMind",
    initial: "G",
    category: "科技公司 AI 团队",
    tagline: "从强化学习到科学发现的研究脉络",
    description: [
      "DeepMind 的历史始于 2010 年；2023 年 4 月，Google 宣布把 DeepMind 与 Google Brain 团队合并为 Google DeepMind，由 Demis Hassabis 领导。它是 Google 内部的研究组织，不应与独立创业公司等同。",
      "研究脉络覆盖 AlphaGo、AlphaFold 与通用 AI 系统。2024 年，Hassabis 与 John Jumper 因蛋白质结构预测工作共同获得当年诺贝尔化学奖的一半。",
    ],
    founded: "2010 / 2023 合并",
    location: "英国 · 伦敦等地",
    coverage: "preview",
    sourceIds: ["deepmind-about", "deepmind-formation", "nobel-2024"],
    topics: ["Gemini", "AlphaFold", "强化学习", "AI for Science"],
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    initial: "M",
    category: "科技公司 AI 团队",
    tagline: "开放模型与大规模消费产品的交汇点",
    description: [
      "本条以 Meta 的 AI 研究和产品活动为范围，不把“Meta AI”当作独立公司。FAIR 研究团队创立于 2013 年末；Meta 的 AI 助手、研究团队和 Llama 模型系列分别对应产品、组织与模型。",
      "2024 年 4 月发布的 Llama 3 展示了 Meta 将模型权重提供给开发者、同时用于消费级助手的路径。开放权重的使用仍应以具体版本的许可证为准。",
    ],
    founded: "2013 · FAIR 起点",
    location: "美国 · 门洛帕克等地",
    coverage: "preview",
    sourceIds: ["meta-fair", "meta-llama3", "meta-location"],
    topics: ["Llama", "开放权重", "FAIR", "AI 助手"],
  },
  {
    id: "xai",
    name: "xAI",
    initial: "x",
    category: "前沿模型实验室",
    tagline: "Grok、实时信息与组织边界的变化",
    description: [
      "xAI 的官网将 2023 年 7 月列为公司公开亮相节点，同年 11 月发布 Grok。早期产品公告强调对话能力及来自 X 平台的实时信息。",
      "2026 年 2 月 2 日，xAI 官方公告确认被 SpaceX 收购；核验时官网使用 SpaceXAI 品牌。本条保留 xAI 这一常见检索名称，并明确其已发生的组织变化。",
    ],
    founded: "2023",
    location: "美国 · 帕洛阿尔托等地",
    coverage: "preview",
    sourceIds: ["xai-about", "xai-grok", "xai-spacex"],
    topics: ["Grok", "实时信息", "SpaceXAI"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    cnName: "深度求索",
    initial: "D",
    category: "前沿模型实验室",
    tagline: "以推理模型和开放权重进入全球视野",
    description: [
      "DeepSeek 的公开公司档案标注创立于 2023 年、总部位于杭州。这里聚焦其模型与技术发布，不据此推断未公开的内部汇报关系。",
      "2025 年 1 月发布的 DeepSeek-R1 将强化学习用于提升推理能力，并公开模型与技术报告。官方说明其代码和模型采用 MIT 许可；具体蒸馏模型仍需查看各自上游许可。",
    ],
    founded: "2023",
    location: "中国 · 杭州",
    coverage: "preview",
    sourceIds: ["deepseek-about", "deepseek-r1"],
    topics: ["DeepSeek-R1", "推理模型", "开放权重"],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    cnName: "微软",
    initial: "MS",
    category: "云与技术合作方",
    tagline: "连接投资、计算资源与产品分发",
    description: [
      "微软创立于 1975 年，公司地址位于华盛顿州雷德蒙德。在本图谱中，它主要作为 OpenAI 的投资与技术合作方出现。",
      "双方 2019 年公布投资和 Azure 合作。2026 年 4 月更新的协议同时涉及云服务、知识产权许可与收益分享。投资关系不等同于对 OpenAI 的治理控制。",
    ],
    founded: "1975",
    location: "美国 · 雷德蒙德",
    coverage: "preview",
    sourceIds: [
      "microsoft-facts",
      "openai-microsoft-2019",
      "openai-microsoft-2026",
      "openai-structure",
    ],
    topics: ["Azure", "云计算", "战略投资"],
  },
  {
    id: "ssi",
    name: "Safe Superintelligence",
    cnName: "安全超级智能",
    initial: "SSI",
    category: "前沿模型实验室",
    tagline: "将安全与能力作为同一项技术挑战",
    description: [
      "Safe Superintelligence（SSI）成立于 2024 年，将安全超级智能作为核心研究目标。官方介绍列出的办公地点为帕洛阿尔托与特拉维夫。",
      "2025 年 7 月 3 日的人事公告确认 Ilya Sutskever 正式担任 CEO，Daniel Levy 任总裁。研究目标是公司公开的方向，不代表该目标已经实现。",
    ],
    founded: "2024",
    location: "帕洛阿尔托 / 特拉维夫",
    coverage: "preview",
    sourceIds: ["ssi-about", "ssi-updates", "ssi-investor"],
    topics: ["超级智能", "AI 安全", "Ilya Sutskever"],
  },
  {
    id: "thinking-machines",
    name: "Thinking Machines Lab",
    initial: "TM",
    category: "前沿模型实验室",
    tagline: "让 AI 更可理解、可定制、可协作",
    description: [
      "Thinking Machines Lab 成立于 2025 年，由包括 Mira Murati 在内的团队共同创办。公司强调人机协作、多模态能力，以及让用户按自身需求调整 AI。",
      "2025 年 10 月发布的 Tinker 提供模型微调 API。2026 年 3 月的 NVIDIA 合作公告确认 Murati 的联合创始人及 CEO 身份，并公布支持模型训练与定制化平台的算力合作计划。",
    ],
    founded: "2025",
    location: "美国 · 旧金山",
    coverage: "preview",
    sourceIds: [
      "tml-about",
      "tml-tinker",
      "tml-nvidia",
      "tml-investor",
      "tml-location",
    ],
    topics: ["Tinker", "人机协作", "模型定制"],
  },
];

export const people: Person[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    cnName: "山姆·奥特曼",
    initial: "SA",
    role: "联合创始人 · CEO",
    companyId: "openai",
    summary: "从创业生态到前沿 AI，连接公司战略、资本与治理。",
    paragraphs: [
      "Altman 的公开经历跨越创业支持与 AI 组织建设。2014 年，Y Combinator 宣布由他接任总裁；2015 年 OpenAI 成立公告中，他与 Elon Musk 被列为共同主席。",
      "2019 年 OpenAI LP 公告将 Altman 列为 CEO。2023 年 11 月，他经历离任与回任；2024 年 3 月，公司宣布他重新加入董事会。这些节点同时涉及管理职务与治理席位，二者需要分开阅读。",
      "截至本次核验，OpenAI 的组织架构页将他列为 CEO 及 Foundation 董事。图谱保留与 Brockman、Sutskever、Murati 的共同工作背景，但不把公开合作经历画成未经证实的私人关系或直接汇报线。",
    ],
    milestones: [
      {
        date: "2014-02-21",
        text: "Y Combinator 宣布他将接任总裁",
        sourceIds: ["yc-sam"],
      },
      {
        date: "2015-12-11",
        text: "OpenAI 成立公告列为共同主席",
        sourceIds: ["openai-founding"],
      },
      {
        date: "2023-11-29",
        text: "OpenAI 公告确认回任 CEO",
        sourceIds: ["openai-return"],
      },
      {
        date: "2024-03-08",
        text: "宣布重新加入 OpenAI 董事会",
        sourceIds: ["openai-review"],
      },
    ],
    sourceIds: [
      "yc-sam",
      "openai-founding",
      "openai-lp",
      "openai-return",
      "openai-review",
      "openai-structure",
    ],
  },
  {
    id: "greg-brockman",
    name: "Greg Brockman",
    cnName: "格雷格·布罗克曼",
    initial: "GB",
    role: "联合创始人 · 总裁",
    companyId: "openai",
    summary: "以工程为起点，参与模型研发、组织建设与公司战略。",
    paragraphs: [
      "OpenAI 的 2015 年成立公告把 Brockman 列为 CTO，并注明他此前担任 Stripe CTO。2019 年的 OpenAI LP 公告同时记录了他的董事会主席与 CTO 身份。",
      "2022 年，公司将他的职务调整为总裁，解释这一岗位结合了关键工程贡献与公司战略，当时的重点包括旗舰 AI 系统训练。2023 年 11 月 29 日，公司公告确认他回任总裁。",
      "2026 年 6 月的 OpenAI 官方文章仍使用“总裁与联合创始人”这一称谓。本档案按已公开记录描述其角色，不据职位高低臆测具体团队的汇报结构。",
    ],
    milestones: [
      {
        date: "2015-12-11",
        text: "作为 CTO 出现在 OpenAI 成立公告中",
        sourceIds: ["openai-founding"],
      },
      {
        date: "2019-03-11",
        text: "OpenAI LP 公告记录其主席与 CTO 身份",
        sourceIds: ["openai-lp"],
      },
      {
        date: "2022-05-05",
        text: "OpenAI 宣布其担任总裁",
        sourceIds: ["openai-roles-2022"],
      },
      {
        date: "2023-11-29",
        text: "公司公告确认回任总裁",
        sourceIds: ["openai-return"],
      },
    ],
    sourceIds: [
      "openai-founding",
      "openai-lp",
      "openai-roles-2022",
      "openai-return",
      "openai-greg-2026",
    ],
  },
{
  "id": "thibault-sottiaux",
  "name": "Thibault Sottiaux",
  "aliases": [
    "Tibo",
    "Tibo Sottiaux",
    "Thibault “Tibo” Sottiaux",
    "thsottiaux",
    "蒂博",
    "Tibo 索蒂奥"
  ],
  "cnName": "蒂博·索蒂奥",
  "initial": "TS",
  "role": "OpenAI 核心产品与平台负责人",
  "companyId": "openai",
  "summary": "从研究工作流基础设施走向 Codex，再到覆盖 ChatGPT、Codex 与 API 的产品及平台工作；Tibo 是他的常用称呼。",
  "paragraphs": [
    "Thibault Sottiaux 通常被称为 Tibo。OpenAI Forum 的官方简介记载，他在加入 OpenAI 前曾在 Google DeepMind 负责 Gemini 的人类数据工作，并构建支持 DeepMind 研究的 AI 与机器学习工作流基础设施；更早曾在 Google 任软件工程师，也从事决策、预测建模和数据库系统的应用研究。他在 Université catholique de Louvain 接受计算机科学、计算数学及应用数学教育。",
    "他在 OpenAI 的公开工作重点曾是 Codex：帮助开发者理解代码库、完成工程任务，并把 AI 融入软件开发的多个环节。2026 年 3 月的 Astral 拟收购公告将他列为 Codex Lead；同年 5 月的官方活动称他为 Head of Codex。相关公告描述了从生成代码走向规划修改、运行工具、验证结果和长期维护软件的方向，这属于团队目标，不能写成他个人已完成的成果。",
    "到 2026 年 5 月，VivaTech 的讲者公告已将其职责写为 Product & Platform，范围包括 ChatGPT、Codex 和 API。6 月 OpenAI 的 Ona 拟收购公告使用 Core Products Lead；本次核验的官方 Defense Factory 页面则使用 Head of Core Products & Platform。本条据此采用“核心产品与平台负责人”，保留各来源的历史职称，不推断晋升生效日、具体组织层级或直属上级。"
  ],
  "milestones": [
    {
      "date": "2026-03-19",
      "text": "OpenAI 的 Astral 拟收购公告称其为 Codex Lead，并说明扩展软件开发全流程能力的方向。",
      "sourceIds": [
        "openai-tibo-astral"
      ]
    },
    {
      "date": "2026-05-13",
      "text": "OpenAI Forum 举办 Codex 主题对谈；活动与讲者简介称其为 Head of Codex，并确认 Tibo 别名。",
      "sourceIds": [
        "openai-tibo-forum"
      ]
    },
    {
      "date": "2026-05-28",
      "text": "VivaTech 官方讲者公告称其领导 Product & Platform，覆盖 ChatGPT、Codex 与 API。",
      "sourceIds": [
        "vivatech-tibo-2026"
      ]
    },
    {
      "date": "2026-06-11",
      "text": "OpenAI 的 Ona 拟收购公告称其为 Core Products Lead。",
      "sourceIds": [
        "openai-tibo-ona"
      ]
    }
  ],
  "sourceIds": [
    "openai-tibo-forum",
    "openai-tibo-astral",
    "vivatech-tibo-2026",
    "openai-tibo-ona",
    "openai-tibo-platform"
  ],
  "paragraphSourceIds": [
    [
      "openai-tibo-forum"
    ],
    [
      "openai-tibo-forum",
      "openai-tibo-astral"
    ],
    [
      "vivatech-tibo-2026",
      "openai-tibo-ona",
      "openai-tibo-platform"
    ]
  ]
},
{
  "id": "jakub-pachocki",
  "name": "Jakub Pachocki",
  "cnName": "雅库布·帕乔茨基",
  "initial": "JP",
  "role": "OpenAI 首席科学家",
  "companyId": "openai",
  "summary": "长期参与大型强化学习与深度学习系统研究，曾任研究总监，并于 2024 年接任首席科学家。",
  "paragraphs": [
    "Jakub Pachocki 的研究背景横跨理论计算机科学与大规模深度学习。OpenAI 的任命简介确认，他拥有卡内基梅隆大学理论计算机科学博士学位，自 2017 年起在 OpenAI 领导研究项目。",
    "在接任首席科学家之前，他曾任研究总监。OpenAI 将 GPT-4、OpenAI Five 的开发，以及大型强化学习和深度学习优化研究列为他曾领导的重要工作，并指出他参与推动公司围绕可扩展深度学习系统组织研究。这些是团队研究中的领导贡献，不意味着相关系统由他独立发明。",
    "2024 年 5 月 14 日，OpenAI 在宣布 Ilya Sutskever 离开时任命 Pachocki 为首席科学家。2026 年 9 月，他以该职称发表《An Alien Mind》，讨论对齐、监测和模型能力增长之间的关系，并主张让扩展速度受到安全信心的约束；这些表述是他的公开研究判断，而非已解决对齐问题的声明。"
  ],
  "milestones": [
    {
      "date": "2017",
      "text": "据 OpenAI 任命简介，自这一年起在公司领导研究项目。",
      "sourceIds": [
        "openai-ilya-departure"
      ]
    },
    {
      "date": "2024-05-14",
      "text": "OpenAI 宣布其接任首席科学家。",
      "sourceIds": [
        "openai-ilya-departure"
      ]
    },
    {
      "date": "2026-09-06",
      "text": "以 OpenAI 首席科学家身份发表《An Alien Mind》，讨论对齐、监测与安全扩展。",
      "sourceIds": [
        "openai-jakub-2026"
      ]
    }
  ],
  "sourceIds": [
    "openai-ilya-departure",
    "openai-jakub-2026"
  ],
  "paragraphSourceIds": [
    [
      "openai-ilya-departure"
    ],
    [
      "openai-ilya-departure"
    ],
    [
      "openai-ilya-departure",
      "openai-jakub-2026"
    ]
  ]
},
{
  "id": "fidji-simo",
  "name": "Fidji Simo",
  "cnName": "菲吉·西莫",
  "initial": "FS",
  "role": "OpenAI 顾问；前应用业务负责人",
  "companyId": "openai",
  "summary": "把大型消费产品与商业运营经验带到 OpenAI，曾任 CEO of Applications，后转任顾问；2026 年 9 月加入 Nscale 董事会。",
  "paragraphs": [
    "Fidji Simo 的职业经历贯穿电商、社交平台与 AI 产品。Nscale 的官方履历记载，她从 eBay 起步，之后在 Meta 工作约十年，曾领导 Facebook App；在 Instacart 担任 CEO 与董事长期间，她带领公司完成 2023 年上市。",
    "2024 年 3 月，Simo 当选 OpenAI 董事。2025 年 5 月 7 日，OpenAI 宣布她将担任新设的 CEO of Applications，负责把研究交付给用户的业务与运营团队。公告明确 Sam Altman 继续担任 OpenAI CEO，因此这一职称不能简化成“OpenAI 首席执行官”，也不意味着 OpenAI 另有一家独立的 Applications 公司。",
    "她后来公开说明将离开全职岗位、转任兼职顾问。2026 年 9 月 11 日，Nscale 在宣布她出任独立董事时，使用“前 OpenAI CEO of AGI Deployment”的称呼，并确认她继续担任 OpenAI 顾问。本条以这一较新的状态为准；应用业务负责人和 OpenAI 董事经历均作为历史记录。"
  ],
  "milestones": [
    {
      "date": "2024-03-08",
      "text": "OpenAI 公布其当选董事会成员。",
      "sourceIds": [
        "openai-review"
      ]
    },
    {
      "date": "2025-05-07",
      "text": "OpenAI 宣布她将担任 CEO of Applications；公告为任命计划，不将当天当作实际入职日。",
      "sourceIds": [
        "openai-fidji-appointment"
      ]
    },
    {
      "date": "2026-09-11",
      "text": "Nscale 宣布其加入董事会，并确认她已转任 OpenAI 顾问。",
      "sourceIds": [
        "nscale-fidji-board"
      ]
    }
  ],
  "sourceIds": [
    "openai-review",
    "openai-fidji-appointment",
    "fidji-adviser-statement",
    "nscale-fidji-board"
  ],
  "paragraphSourceIds": [
    [
      "nscale-fidji-board"
    ],
    [
      "openai-review",
      "openai-fidji-appointment"
    ],
    [
      "fidji-adviser-statement",
      "nscale-fidji-board"
    ]
  ]
},
{
  "id": "brad-lightcap",
  "name": "Brad Lightcap",
  "cnName": "布拉德·莱特卡普",
  "initial": "BL",
  "role": "前 OpenAI 首席运营官",
  "companyId": "openai",
  "summary": "参与搭建 OpenAI 的商业与运营体系，2022 年获任首席运营官；离任后的计划尚未在本条纳入。",
  "paragraphs": [
    "Brad Lightcap 的公开经历主要体现 OpenAI 从研究机构扩大为产品和商业组织的过程。2022 年的官方任命公告记载，他曾负责财务、法务、人事与运营工作，并继续管理 OpenAI Startup Fund；同次公告宣布他成为首席运营官，扩大与应用 AI 团队在商业策略上的合作。",
    "2025 年 3 月，OpenAI 再次宣布扩展他的职责，涵盖业务与日常运营，重点包括商业战略、重要合作关系、基础设施和全球部署。Sam Altman 在这份公告中提到，两人此前已先后在 Y Combinator 和 OpenAI 合作。以上是带日期的历史职责快照，不能直接用于还原核验时的组织图。",
    "据 Reuters 于 2026 年 8 月 11 日的报道，Lightcap 此前已由首席运营官转向特别项目，并在当天通过本人的 X 账号宣布将离开 OpenAI、开展新的事业。报道同时援引 OpenAI 的回应，称其职责此前已逐渐离开大型团队的日常管理。本条因此使用“前首席运营官”，将早期运营职责保留为历史，不推断其新事业的具体内容或离职生效日。"
  ],
  "milestones": [
    {
      "date": "2022-05-05",
      "text": "OpenAI 宣布其成为首席运营官。",
      "sourceIds": [
        "openai-roles-2022"
      ]
    },
    {
      "date": "2025-03-24",
      "text": "OpenAI 宣布扩展其业务与日常运营职责。",
      "sourceIds": [
        "openai-leadership-2025"
      ]
    },
    {
      "date": "2026-08-11",
      "text": "Reuters 报道其本人宣布将离开 OpenAI；此日期是公开离任公告日期，不代表最后工作日。",
      "sourceIds": [
        "brad-departure-reuters"
      ]
    }
  ],
  "sourceIds": [
    "openai-roles-2022",
    "openai-leadership-2025",
    "brad-departure-reuters"
  ],
  "paragraphSourceIds": [
    [
      "openai-roles-2022"
    ],
    [
      "openai-leadership-2025"
    ],
    [
      "brad-departure-reuters"
    ]
  ]
},
{
  "id": "bret-taylor",
  "name": "Bret Taylor",
  "cnName": "布雷特·泰勒",
  "initial": "BT",
  "role": "OpenAI Foundation 与 Group PBC 董事长",
  "companyId": "openai",
  "summary": "Sierra 联合创始人，长期从事软件产品与企业经营；在 OpenAI 负责董事会层面的治理。",
  "paragraphs": [
    "Bret Taylor 兼有产品工程和企业管理经历。Sierra 的官方简介记载，他在 Google 参与共同创建 Google Maps，之后曾任 Facebook 首席技术官、创办 Quip，并担任 Salesforce 联合首席执行官。这些经历构成他的企业软件与大规模产品背景。",
    "在 OpenAI 2023 年的领导层事件之后，11 月 29 日的公司公告确认由 Taylor 担任新初始董事会主席，与 Adam D’Angelo、Larry Summers 一起推进治理重建与事件审查。董事会角色与公司日常管理不同，不应把他画成产品或研究团队的直接负责人。",
    "他也是 Sierra 联合创始人，与 Clay Bavor 于 2024 年 2 月公开发布面向企业的对话式 AI 平台。OpenAI 在 2026 年 9 月的公告明确列他为 Foundation 和 Group PBC 两个董事会的主席；Sierra 创业身份和 OpenAI 治理身份应分别记录，不能据此推断两家公司的控制或投资关系。"
  ],
  "milestones": [
    {
      "date": "2023-11-29",
      "text": "OpenAI 的 CEO 回归公告确认其担任新初始董事会主席。",
      "sourceIds": [
        "openai-return"
      ]
    },
    {
      "date": "2024-02-13",
      "text": "与 Clay Bavor 联合发布 Sierra 的企业对话式 AI 平台介绍。",
      "sourceIds": [
        "sierra-launch"
      ]
    },
    {
      "date": "2026-09-09",
      "text": "OpenAI 的治理公告确认其为 Foundation 与 Group PBC 两个董事会的主席。",
      "sourceIds": [
        "openai-paul-board-2026"
      ]
    }
  ],
  "sourceIds": [
    "sierra-bret-bio",
    "openai-return",
    "sierra-launch",
    "openai-paul-board-2026",
    "openai-structure"
  ],
  "paragraphSourceIds": [
    [
      "sierra-bret-bio"
    ],
    [
      "openai-return"
    ],
    [
      "sierra-launch",
      "openai-paul-board-2026"
    ]
  ]
},
{
  "id": "paul-christiano",
  "name": "Paul Christiano",
  "cnName": "保罗·克里斯蒂亚诺",
  "initial": "PC",
  "role": "OpenAI Foundation 董事；安全与安保委员会成员",
  "companyId": "openai",
  "summary": "AI 对齐研究者，参与人类反馈强化学习的早期研究；2026 年进入 Foundation 董事会，在 Group PBC 仅任无投票权观察员。",
  "paragraphs": [
    "Paul Christiano 是 AI 对齐研究者。他与 Jan Leike、Tom Brown 等人共同撰写的《Deep reinforcement learning from human preferences》于 2017 年提交，研究如何从人对行为片段的偏好中学习奖励，使强化学习系统能够接受较少量的人类反馈。",
    "OpenAI 的官方履历记载，他在 2017 至 2021 年间领导公司的对齐研究，之后创立 Alignment Research Center，并在美国 NIST 下属的 AI 安全与标准机构参与前沿模型评估及风险缓解工作。这些经历连接了技术研究、独立研究组织和公共机构。",
    "2026 年 9 月 9 日，他获任 OpenAI Foundation 董事并加入安全与安保委员会。公告同时明确，他在 OpenAI Group PBC 董事会的身份是无投票权观察员。两种角色的权限不同，关系图必须分开表示；这次治理任命也不等于他重新担任 OpenAI 的日常研究管理者。"
  ],
  "milestones": [
    {
      "date": "2017-06-12",
      "text": "共同署名的人类偏好强化学习论文首次提交 arXiv。",
      "sourceIds": [
        "rlhf-human-preferences"
      ]
    },
    {
      "date": "2017—2021",
      "text": "据 OpenAI 官方履历，在公司领导对齐研究。",
      "sourceIds": [
        "openai-paul-board-2026"
      ]
    },
    {
      "date": "2026-09-09",
      "text": "加入 Foundation 董事会及安全与安保委员会；在 Group PBC 董事会为无投票权观察员。",
      "sourceIds": [
        "openai-paul-board-2026"
      ]
    }
  ],
  "sourceIds": [
    "rlhf-human-preferences",
    "openai-paul-board-2026",
    "openai-structure"
  ],
  "paragraphSourceIds": [
    [
      "rlhf-human-preferences"
    ],
    [
      "openai-paul-board-2026"
    ],
    [
      "openai-paul-board-2026"
    ]
  ]
},
  {
    id: "ilya-sutskever",
    name: "Ilya Sutskever",
    cnName: "伊利亚·苏茨克维",
    initial: "IS",
    role: "SSI 联合创始人 · CEO",
    companyId: "ssi",
    summary: "从序列学习与 OpenAI 研究，到安全超级智能的新方向。",
    paragraphs: [
      "Sutskever 是 2014 年序列到序列学习论文的作者之一，该研究以神经网络处理输入与输出序列。2015 年 OpenAI 成立时，他担任研究负责人；2019 年官方记录将其列为首席科学家。",
      "2024 年 5 月 14 日，OpenAI 宣布他离开公司，并由 Jakub Pachocki 接任首席科学家。离职后的去向与其在 OpenAI 的历史任职应分开呈现。",
      "他随后参与创办 Safe Superintelligence。SSI 在 2025 年 7 月 3 日发布的署名公告确认他正式任 CEO；公司把安全与能力视为需要共同推进的技术问题。这里记录的是公开研究目标，不是对技术成果的预先判断。",
    ],
    milestones: [
      {
        date: "2014-09-10",
        text: "共同发表序列到序列学习论文",
        sourceIds: ["seq2seq"],
      },
      {
        date: "2015-12-11",
        text: "OpenAI 成立公告列为研究负责人",
        sourceIds: ["openai-founding"],
      },
      {
        date: "2024-05-14",
        text: "OpenAI 宣布其离职及首席科学家继任安排",
        sourceIds: ["openai-ilya-departure"],
      },
      {
        date: "2025-07-03",
        text: "SSI 公告确认其正式担任 CEO",
        sourceIds: ["ssi-updates"],
      },
    ],
    sourceIds: [
      "seq2seq",
      "openai-founding",
      "openai-lp",
      "openai-ilya-departure",
      "ssi-investor",
      "ssi-founder",
      "ssi-updates",
      "ssi-about",
    ],
  },
  {
    id: "mira-murati",
    name: "Mira Murati",
    cnName: "米拉·穆拉蒂",
    initial: "MM",
    role: "Thinking Machines 联合创始人 · CEO",
    companyId: "thinking-machines",
    summary: "连接研究与产品，将关注点延伸到可定制的人机协作。",
    paragraphs: [
      "2022 年 5 月，OpenAI 宣布 Murati 出任 CTO，职责涉及研究、产品与合作伙伴等关键方向。2023 年 11 月 17 日的领导层变动中，她被任命为临时 CEO；同月 29 日的公告则确认她回到 CTO 岗位。",
      "这些职位是有明确日期的历史记录。她后续参与创办 Thinking Machines Lab；该公司 2026 年 3 月 10 日的官方合作公告将其列为联合创始人及 CEO。",
      "Thinking Machines 的公开方向强调人机协作与模型定制，Tinker 则把微调能力以 API 形式交给研究者和开发者。本档案用公开产品与岗位信息描述她的工作重心，不推断未公开的离职动机。",
    ],
    milestones: [
      {
        date: "2022-05-05",
        text: "OpenAI 宣布其出任 CTO",
        sourceIds: ["openai-roles-2022"],
      },
      {
        date: "2023-11-17",
        text: "被任命为 OpenAI 临时 CEO",
        sourceIds: ["openai-transition"],
      },
      {
        date: "2023-11-29",
        text: "OpenAI 公告确认回任 CTO",
        sourceIds: ["openai-return"],
      },
      {
        date: "2026-03-10",
        text: "Thinking Machines 公告确认联合创始人及 CEO 身份",
        sourceIds: ["tml-nvidia"],
      },
    ],
    sourceIds: [
      "openai-roles-2022",
      "openai-transition",
      "openai-return",
      "tml-nvidia",
      "tml-about",
      "tml-tinker",
    ],
  },
  {
    id: "dario-amodei",
    name: "Dario Amodei",
    cnName: "达里奥·阿莫代伊",
    initial: "DA",
    role: "联合创始人 · CEO",
    companyId: "anthropic",
    summary: "以模型研究为背景，将可靠性与安全纳入公司路线。",
    paragraphs: [
      "根据本人官网，Amodei 曾任 OpenAI 研究副总裁，参与领导 GPT-2 与 GPT-3 开发；更早曾在 Google Brain 从事研究。这段经历提供了理解前沿实验室人才流动的一个入口。",
      "Anthropic 于 2021 年初创立。公司官方领导页将他列为联合创始人及 CEO，负责研究方向和战略愿景，重点是可解释、可引导且可靠的 AI 系统。",
      "Claude 的 2023 年发布把这些研究方向转化为对话与 API 产品。这里把他与 OpenAI 的关系标为历史任职，而不是仍然存在的雇佣关系，也不根据共同背景推断两家公司的股权关联。",
    ],
    milestones: [
      {
        date: "2021",
        text: "参与创办 Anthropic，担任 CEO",
        sourceIds: ["anthropic-founding", "anthropic-leadership"],
      },
      {
        date: "2023-03-14",
        text: "Anthropic 发布 Claude，扩展研究的产品应用",
        sourceIds: ["anthropic-claude"],
      },
    ],
    sourceIds: [
      "dario-bio",
      "anthropic-founding",
      "anthropic-leadership",
      "anthropic-claude",
    ],
  },
  {
    id: "demis-hassabis",
    name: "Demis Hassabis",
    cnName: "德米斯·哈萨比斯",
    initial: "DH",
    role: "联合创始人 · CEO",
    companyId: "google-deepmind",
    summary: "从通用学习系统，到用 AI 推动科学发现。",
    paragraphs: [
      "DeepMind 的官方回顾将其起点放在 2010 年，强调机器学习、神经科学与工程的跨学科结合。Hassabis 作为联合创始人与领导者，参与建立了以研究突破为核心的组织路径。",
      "2023 年 4 月，Google 宣布组建 Google DeepMind，由他出任 CEO，整合 DeepMind 与 Google Brain 的研究力量。团队合并与职位变化是公开组织事件，不等同于研究成果归属发生简单转移。",
      "2024 年，他与 John Jumper 因蛋白质结构预测工作共同获得诺贝尔化学奖的一半，另一半授予 David Baker。这个节点体现了 AI 研究与生命科学的交叉，也提醒读者区分个人荣誉、团队成果和公司产品。",
    ],
    milestones: [
      {
        date: "2010",
        text: "DeepMind 创立，开启通用 AI 研究路线",
        sourceIds: ["deepmind-about"],
      },
      {
        date: "2023-04-20",
        text: "Google 宣布其领导合并后的 Google DeepMind",
        sourceIds: ["deepmind-formation"],
      },
      {
        date: "2024-10-09",
        text: "诺贝尔化学奖公告表彰其蛋白质结构预测工作",
        sourceIds: ["nobel-2024"],
      },
    ],
    sourceIds: ["deepmind-about", "deepmind-formation", "nobel-2024"],
  },
];

export const additionalEntities: AdditionalEntity[] = [
  {
    id: "codex",
    name: "Codex",
    initial: "CX",
    type: "product",
    summary: "本条记录 2025 年 5 月 16 日发布的 Codex 云端软件工程代理研究预览：在独立环境中阅读代码、修改文件、运行测试并提出代码变更。它不是对当前功能、价格或使用限制的说明，也不把同名早期模型与这一产品发布混为一谈。",
    sourceIds: ["openai-codex-agent"],
  },
  {
    id: "openai-foundation",
    name: "OpenAI Foundation",
    cnName: "OpenAI 基金会",
    initial: "OF",
    type: "organization",
    summary:
      "OpenAI 的非营利组织。2025 年 10 月公布的结构中，通过专属治理权控制 OpenAI Group PBC，并可任免其董事。",
    sourceIds: ["openai-structure"],
  },
  {
    id: "openai-group-pbc",
    name: "OpenAI Group PBC",
    cnName: "OpenAI 公益公司",
    initial: "OG",
    type: "organization",
    summary:
      "2025 年重组后的营利实体，以公益公司形式运作，由 OpenAI Foundation 控制。其使命与 Foundation 一致。",
    sourceIds: ["openai-structure"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    initial: "C",
    type: "product",
    summary:
      "OpenAI 于 2022 年 11 月 30 日推出的对话式 AI 产品，最初以研究预览形式收集用户反馈。",
    sourceIds: ["openai-chatgpt"],
  },
  {
    id: "gpt4",
    name: "GPT-4",
    initial: "4",
    type: "product",
    summary:
      "OpenAI 于 2023 年 3 月 14 日发布的模型。本节点记录该代模型的发布，不表示它是当前最新版本。",
    sourceIds: ["openai-gpt4"],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    initial: "API",
    type: "product",
    summary:
      "OpenAI 于 2020 年 6 月 11 日公布的开发者接口，将通用模型能力提供给外部应用与产品。",
    sourceIds: ["openai-api"],
  },
];

export const relationships: Relationship[] = [
  {
    id: "openai-developed-codex",
    status: "event",
    from: "openai",
    to: "codex",
    type: "product",
    label: "云端工程代理 · 研究预览",
    detail: "2025 年 5 月发布的 Codex 研究预览把代码理解、编辑和测试放入可并行执行的云端任务。此边记录团队的产品发布，不将集体成果归于单一负责人；原公告已提示读者查看最新产品资料。",
    period: "2025-05-16 发布快照",
    sourceIds: ["openai-codex-agent"],
  },
  {
    id: "sam-openai-role",
    status: "current",
    from: "sam-altman",
    to: "openai",
    type: "employment",
    label: "CEO",
    detail:
      "2019 年官方公告已列为 CEO，2023 年经历离任与回任；核验时组织架构页仍列此职。",
    period: "2019 记录 / 2023 回任 / 2026 核验",
    sourceIds: ["openai-lp", "openai-return", "openai-structure"],
  },
  {
    id: "sam-openai-board",
    status: "current",
    from: "sam-altman",
    to: "openai-foundation",
    type: "governance",
    label: "Foundation 董事",
    detail:
      "2024 年公告确认重新加入董事会；核验时为 OpenAI Foundation 董事。管理职务与治理席位分别记录。",
    period: "2024-03 回归；2026-10 核验",
    sourceIds: ["openai-review", "openai-structure"],
  },
  {
    id: "greg-openai-role",
    status: "snapshot",
    from: "greg-brockman",
    to: "openai",
    type: "employment",
    label: "总裁 · 联合创始人",
    detail: "2022 年任职更新将其岗位列为总裁；2026 年官方文章继续使用该称谓。",
    period: "2022 任命 / 2026-06 记录",
    sourceIds: ["openai-roles-2022", "openai-greg-2026"],
  },
  {
    id: "greg-openai-board",
    status: "historical",
    from: "greg-brockman",
    to: "openai",
    type: "governance",
    label: "前董事会主席",
    detail:
      "2019 年任职记录列为主席；2023 年 11 月 17 日公告说明其不再担任主席。此边仅表示历史治理关系。",
    period: "2019 记录 → 2023-11",
    sourceIds: ["openai-lp", "openai-transition"],
  },
{
  "id": "tibo-openai-role",
  "status": "current",
  "from": "thibault-sottiaux",
  "to": "openai",
  "type": "employment",
  "label": "核心产品与平台负责人",
  "detail": "当前官方页面使用 Head of Core Products & Platform；6 月公告使用 Core Products Lead。不据此推断任命生效日或汇报关系。",
  "period": "2026-06 公告 / 2026-10 核验快照",
  "sourceIds": [
    "openai-tibo-ona",
    "openai-tibo-platform"
  ]
},
{
  "id": "tibo-codex-role",
  "status": "snapshot",
  "from": "thibault-sottiaux",
  "to": "codex",
  "type": "product",
  "label": "Codex 负责人（任职快照）",
  "detail": "3 月官方公告与 5 月活动称其为 Codex Lead / Head of Codex；不是独立发明关系。",
  "period": "2026-03—05 公开资料",
  "sourceIds": [
    "openai-tibo-astral",
    "openai-tibo-forum"
  ]
},
{
  "id": "jakub-openai-role",
  "status": "snapshot",
  "from": "jakub-pachocki",
  "to": "openai",
  "type": "employment",
  "label": "首席科学家",
  "detail": "2024 年正式任命；2026 年 9 月本人官方署名文章再次确认该职称。",
  "period": "2024-05 任命 / 2026-09 确认",
  "sourceIds": [
    "openai-ilya-departure",
    "openai-jakub-2026"
  ]
},
{
  "id": "fidji-openai-adviser",
  "status": "snapshot",
  "from": "fidji-simo",
  "to": "openai",
  "type": "employment",
  "label": "顾问",
  "detail": "本人说明转为兼职顾问，Nscale 9 月公告再次确认；不推断劳动合同形式。",
  "period": "2026-09 公开确认",
  "sourceIds": [
    "fidji-adviser-statement",
    "nscale-fidji-board"
  ]
},
{
  "id": "fidji-openai-applications-history",
  "status": "historical",
  "from": "fidji-simo",
  "to": "openai",
  "type": "employment",
  "label": "应用业务负责人（历史）",
  "detail": "2025 年宣布将出任 CEO of Applications，较新来源已确认转任顾问。",
  "period": "2025 任命公告；后已转任顾问",
  "sourceIds": [
    "openai-fidji-appointment",
    "nscale-fidji-board"
  ]
},
{
  "id": "fidji-openai-board-history",
  "status": "historical",
  "from": "fidji-simo",
  "to": "openai",
  "type": "governance",
  "label": "董事（历史）",
  "detail": "2024 年 3 月确认当选；该边不表示其仍在当前 Foundation 董事名册。",
  "period": "2024-03 任命记录",
  "sourceIds": [
    "openai-review",
    "openai-structure"
  ]
},
{
  "id": "brad-openai-role-history",
  "status": "historical",
  "from": "brad-lightcap",
  "to": "openai",
  "type": "employment",
  "label": "首席运营官（历史）",
  "detail": "2022 任命与 2025 职责扩展有官方公告；离任采用 Reuters 对本人声明的交叉核验。",
  "period": "2022 / 2025 快照；2026-08 公告离任",
  "sourceIds": [
    "openai-roles-2022",
    "openai-leadership-2025",
    "brad-departure-reuters"
  ]
},
{
  "id": "bret-foundation-chair",
  "status": "snapshot",
  "from": "bret-taylor",
  "to": "openai-foundation",
  "type": "governance",
  "label": "董事长",
  "detail": "2026 年 9 月官方公告明确确认 Foundation 董事会职务。",
  "period": "2026-09 公开确认",
  "sourceIds": [
    "openai-paul-board-2026",
    "openai-structure"
  ]
},
{
  "id": "bret-group-chair",
  "status": "snapshot",
  "from": "bret-taylor",
  "to": "openai-group-pbc",
  "type": "governance",
  "label": "董事长",
  "detail": "与 Foundation 董事长身份分开记录；官方公告确认两个董事会的职务。",
  "period": "2026-09 公开确认",
  "sourceIds": [
    "openai-paul-board-2026"
  ]
},
{
  "id": "paul-foundation-board",
  "status": "snapshot",
  "from": "paul-christiano",
  "to": "openai-foundation",
  "type": "governance",
  "label": "董事；安全与安保委员会成员",
  "detail": "2026-09-09 获任，加入由 Zico Kolter 担任主席的委员会。",
  "period": "2026-09-09 任命",
  "sourceIds": [
    "openai-paul-board-2026"
  ]
},
{
  "id": "paul-group-observer",
  "status": "snapshot",
  "from": "paul-christiano",
  "to": "openai-group-pbc",
  "type": "governance",
  "label": "无投票权董事会观察员",
  "detail": "具体任命公告明确为 non-voting observer，不是有表决权的 Group PBC 董事。",
  "period": "2026-09-09 公告",
  "sourceIds": [
    "openai-paul-board-2026"
  ]
},
{
  "id": "paul-openai-research-history",
  "status": "historical",
  "from": "paul-christiano",
  "to": "openai",
  "type": "employment",
  "label": "领导对齐研究（历史）",
  "detail": "2017—2021 年的研究工作与 2026 年董事会任命是不同关系。",
  "period": "2017—2021",
  "sourceIds": [
    "openai-paul-board-2026"
  ]
},
  {
    id: "ilya-openai-role",
    status: "historical",
    from: "ilya-sutskever",
    to: "openai",
    type: "employment",
    label: "前首席科学家",
    detail:
      "2019 年记录列为首席科学家；2024 年 5 月公司公告确认其离开，岗位由 Jakub Pachocki 接任。",
    period: "2019 记录 → 2024-05",
    sourceIds: ["openai-lp", "openai-ilya-departure"],
  },
  {
    id: "ilya-openai-board",
    status: "historical",
    from: "ilya-sutskever",
    to: "openai",
    type: "governance",
    label: "前董事",
    detail:
      "2019 年公告列为董事；2023 年 11 月 29 日回任公告明确其不再进入董事会。",
    period: "2019 记录 → 2023-11",
    sourceIds: ["openai-lp", "openai-return"],
  },
  {
    id: "mira-openai-role",
    status: "historical",
    from: "mira-murati",
    to: "openai",
    type: "employment",
    label: "历史 CTO / 临时 CEO",
    detail:
      "2022 年 CTO 任命、2023 年临时 CEO 及回任 CTO 均有官方记录。这些日期是任职快照，不表示今天仍在 OpenAI 任职。",
    period: "2022—2023 任职快照",
    sourceIds: [
      "openai-roles-2022",
      "openai-transition",
      "openai-return",
      "tml-nvidia",
    ],
  },
  {
    id: "dario-openai-role",
    status: "historical",
    from: "dario-amodei",
    to: "openai",
    type: "employment",
    label: "历史研究副总裁",
    detail:
      "本人官网将 OpenAI 研究副总裁列为过往经历，并提及 GPT-2、GPT-3 研发。所选来源未提供精确任职起止日。",
    period: "创办 Anthropic 前；起止日未列",
    sourceIds: ["dario-bio"],
  },
  {
    id: "ilya-ssi-role",
    status: "snapshot",
    from: "ilya-sutskever",
    to: "ssi",
    type: "employment",
    label: "联合创始人 / CEO",
    detail:
      "投资方档案确认其创始团队身份；SSI 的 2025 年 7 月署名公告确认正式担任 CEO。",
    period: "2024 创立 / 2025-07 CEO 公告",
    sourceIds: ["ssi-investor", "ssi-founder", "ssi-updates"],
  },
  {
    id: "mira-tml-role",
    status: "snapshot",
    from: "mira-murati",
    to: "thinking-machines",
    type: "employment",
    label: "联合创始人 / CEO",
    detail: "Thinking Machines 与 NVIDIA 的官方合作公告明确列出这两个身份。",
    period: "2026-03 官方记录",
    sourceIds: ["tml-nvidia"],
  },
  {
    id: "dario-anthropic-role",
    status: "current",
    from: "dario-amodei",
    to: "anthropic",
    type: "employment",
    label: "联合创始人 / CEO",
    detail:
      "Anthropic 的创立回顾及领导页面确认其角色；不推断具体研究人员向其直接汇报。",
    period: "2021 创立 / 2026-10 核验",
    sourceIds: ["anthropic-founding", "anthropic-leadership"],
  },
  {
    id: "demis-deepmind-role",
    status: "current",
    from: "demis-hassabis",
    to: "google-deepmind",
    type: "employment",
    label: "CEO",
    detail:
      "2023 年 Google 公告任命其领导合并后的团队，现有公司介绍页亦确认该身份。",
    period: "2023-04 任命 / 2026-10 核验",
    sourceIds: ["deepmind-formation", "deepmind-about"],
  },
  {
    id: "microsoft-openai-investment",
    status: "snapshot",
    from: "microsoft",
    to: "openai",
    type: "investment",
    label: "投资与股权",
    detail:
      "2019 年公开投资公告与 2025 年重组说明确认股权关联。2026 年协议仍称微软为重要股东；股权关系不等同于治理控制。",
    period: "2019 投资 / 2025 重组 / 2026 协议",
    sourceIds: [
      "openai-microsoft-2019",
      "openai-structure",
      "openai-microsoft-2026",
    ],
  },
  {
    id: "microsoft-openai-product",
    status: "snapshot",
    from: "openai",
    to: "microsoft",
    type: "product",
    label: "Azure 与模型许可",
    detail:
      "2026 年协议保留微软为主要云合作方；模型和产品知识产权许可延续至 2032 年，并改为非独家。",
    period: "2026-04-27 协议快照",
    sourceIds: ["openai-microsoft-2026"],
  },
  {
    id: "openai-foundation-navigation",
    status: "navigation",
    from: "openai",
    to: "openai-foundation",
    type: "governance",
    label: "组织总览 → 基金会",
    detail:
      "这是从 OpenAI 总览到其非营利组织实体的导航连接，不是法律控制边。“OpenAI”在本图谱是总览入口；实际控制关系请查看 Foundation → Group PBC。",
    period: "2025-10-28 结构说明 / 导航连接",
    sourceIds: ["openai-structure"],
    navigationOnly: true,
  },
  {
    id: "foundation-controls-group",
    status: "snapshot",
    from: "openai-foundation",
    to: "openai-group-pbc",
    type: "governance",
    label: "控制 · 任免董事",
    detail:
      "2025 年重组说明明确：Foundation 凭专属投票及治理权任命 Group PBC 的全部董事，并可随时更换董事。此边表示治理控制，不等同于全资持有。",
    period: "2025-10-28 公布；2026-10-03 核验",
    sourceIds: ["openai-structure"],
  },
  {
    id: "openai-developed-chatgpt",
    status: "event",
    from: "openai",
    to: "chatgpt",
    type: "product",
    label: "开发与发布",
    detail:
      "OpenAI 发布 ChatGPT 研究预览，以对话形式向用户开放体验并收集反馈。这里记录首发事件，不表示当前产品功能仍与当时相同。",
    period: "2022-11-30 首次公开发布",
    sourceIds: ["openai-chatgpt"],
  },
  {
    id: "openai-developed-gpt4",
    status: "event",
    from: "openai",
    to: "gpt4",
    type: "product",
    label: "模型研发与发布",
    detail:
      "OpenAI 于 2023 年 3 月 14 日公布 GPT-4，延续 GPT 系列扩大深度学习系统规模的研究路径。",
    period: "2023-03-14 发布",
    sourceIds: ["openai-gpt4"],
  },
  {
    id: "openai-developed-api",
    status: "event",
    from: "openai",
    to: "openai-api",
    type: "product",
    label: "开发者接口",
    detail:
      "OpenAI 于 2020 年公布通用模型 API，允许开发者把模型能力集成到应用中；该日期对应最初发布记录。",
    period: "2020-06-11 公布",
    sourceIds: ["openai-api"],
  },
];

export const events: AtlasEvent[] = [
{
  "id": "fidji-applications-announced",
  "date": "2025-05-07",
  "title": "OpenAI 公布应用业务领导安排",
  "description": "Fidji Simo 将任 CEO of Applications，Sam Altman 继续任公司 CEO；这是公告日期，并非推定入职日。",
  "entityIds": [
    "openai",
    "fidji-simo",
    "sam-altman"
  ],
  "sourceIds": [
    "openai-fidji-appointment"
  ]
},
{
  "id": "paul-foundation-appointed",
  "date": "2026-09-09",
  "title": "Paul Christiano 加入 Foundation 董事会",
  "description": "同时加入安全与安保委员会；在 Group PBC 董事会担任无投票权观察员。",
  "entityIds": [
    "openai",
    "paul-christiano",
    "openai-foundation",
    "openai-group-pbc"
  ],
  "sourceIds": [
    "openai-paul-board-2026"
  ]
},
  {
    id: "codex-agent-preview",
    date: "2025-05-16",
    title: "Codex 云端工程代理研究预览",
    description: "OpenAI 发布可在隔离云端环境中处理代码任务的 Codex 研究预览。这里记录产品当时的发布形态，而非当前功能清单。",
    entityIds: ["openai", "codex"],
    sourceIds: ["openai-codex-agent"],
  },
  {
    id: "openai-start",
    date: "2015-12-11",
    title: "OpenAI 公开成立",
    description:
      "非营利 AI 研究组织亮相，成立公告列出早期研究、工程与治理团队。",
    entityIds: ["openai", "sam-altman", "greg-brockman", "ilya-sutskever"],
    sourceIds: ["openai-founding"],
  },
  {
    id: "openai-lp-created",
    date: "2019-03-11",
    title: "OpenAI LP：融资与使命的新结构",
    description:
      "公司公布当时的收益上限结构，由非营利组织治理，以支持更大规模的研究投入。",
    entityIds: ["openai"],
    sourceIds: ["openai-lp"],
  },
  {
    id: "chatgpt-preview",
    date: "2022-11-30",
    title: "ChatGPT 研究预览上线",
    description:
      "OpenAI 以对话界面向用户开放体验，并通过反馈探索模型能力与局限。",
    entityIds: ["openai"],
    sourceIds: ["openai-chatgpt"],
  },
  {
    id: "gpt4-release",
    date: "2023-03-14",
    title: "GPT-4 发布",
    description: "OpenAI 公布 GPT-4，延续 GPT 系列的规模化深度学习研究路线。",
    entityIds: ["openai"],
    sourceIds: ["openai-gpt4"],
  },
  {
    id: "deepmind-merge",
    date: "2023-04-20",
    title: "Google DeepMind 组建",
    description:
      "DeepMind 与 Google Brain 团队合并，由 Demis Hassabis 领导新的研究组织。",
    entityIds: ["google-deepmind", "demis-hassabis"],
    sourceIds: ["deepmind-formation"],
  },
  {
    id: "openai-leadership-return",
    date: "2023-11-29",
    title: "Altman 回任，初始新董事会亮相",
    description:
      "公司确认 Sam Altman 回任 CEO、Greg Brockman 回任总裁、Mira Murati 回任 CTO。此前 11 月 17 日曾公布领导层变动。",
    entityIds: ["openai", "sam-altman", "greg-brockman", "mira-murati"],
    sourceIds: ["openai-return", "openai-transition"],
  },
  {
    id: "ilya-leaves",
    date: "2024-05-14",
    title: "OpenAI 首席科学家交接",
    description: "Ilya Sutskever 离职，Jakub Pachocki 被宣布为新的首席科学家。",
    entityIds: ["openai", "ilya-sutskever", "jakub-pachocki"],
    sourceIds: ["openai-ilya-departure"],
  },
  {
    id: "r1-release",
    date: "2025-01-20",
    title: "DeepSeek-R1 发布",
    description:
      "DeepSeek 公布推理模型、技术报告与开放模型材料，为研究者提供新的探索入口。",
    entityIds: ["deepseek"],
    sourceIds: ["deepseek-r1"],
  },
  {
    id: "openai-pbc",
    date: "2025-10-28",
    title: "OpenAI 公布重组后的治理结构",
    description:
      "非营利组织更名为 OpenAI Foundation，继续控制转型为公益公司的 OpenAI Group PBC。",
    entityIds: ["openai", "microsoft"],
    sourceIds: ["openai-structure"],
  },
  {
    id: "microsoft-partnership-update",
    date: "2026-04-27",
    title: "OpenAI 与微软更新合作边界",
    description:
      "新协议允许 OpenAI 跨云提供产品，并将微软对模型与产品知识产权的许可改为非独家。",
    entityIds: ["openai", "microsoft"],
    sourceIds: ["openai-microsoft-2026"],
  },
];
