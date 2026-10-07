# AI Atlas source register

版本更新：2026-10-07（UTC）。各来源保留各自实际核验日；旧来源没有统一改成新版日期。

## Coverage and interpretation

- 本版是人工筛选的中文研究型种子数据：OpenAI 为专题档案，其余组织为明确标记的有限预览；不是实时新闻流，也不是全行业的完整数据库。
- 已核验 9 个组织条目、12 位人物、32 条关系和 13 个精选事件。发布日期与访问核验日分开记录。
- 优先使用公司公告、本人简介、论文作者原文与诺贝尔奖官方公告。SSI 和 Thinking Machines 的创立年份由投资方自己的投资组合档案支持；DeepSeek 与 Thinking Machines 的地点等基本资料另参考公开公司社交档案。
- `sourceIds` 连接到本文件列出的公开来源，页面应提供可打开的来源列表。对外显示“已核验”仅表示本次阅读过所引来源，不代表所有资料都独立审计过。
- 公司自述的使命是其公开目标，不能改写为已实现成果。研究者贡献不等于个人独占成果。没有使用员工总数、实时估值、模型榜单或无来源的影响力评分。
- 2023 年 OpenAI 治理事件只描述公开任免与审查公告，不推断个人动机。2025 年后的治理结构使用 OpenAI Foundation 控制 OpenAI Group PBC 的表述；2019 年收益上限结构只作历史说明。
- 微软投资关系与产品合作分别建边。2026-04-27 协议更新后不可再笼统写成“独家云合作”或“独家模型许可”。本版不显示最新持股比例，避免把重组完成时比例误写为实时比例。
- 所有关系端点都属于已收录的人物、组织或补充产品/组织实体，无悬空节点。OpenAI → Foundation 边明确标为导航，不表示法律上的控制方向；Foundation → Group PBC 则表示公开资料中的控制关系。`employment` 包括有来源的任职/创办角色，但不表示可推断完整劳动合同状态；`governance` 表示有来源的董事会角色；`investment` 与 `product` 独立于组织控制。
- 人物 `companyId` 仅供展示归属，不是完整历史。Ilya 和 Mira 的当前展示归属分别为 SSI 与 Thinking Machines；与 OpenAI 的边均明确标为历史。Mira 的 OpenAI 任职快照未臆造完整起止日期。
- Google DeepMind 是 Google 研究组织；Meta AI 条目涵盖 Meta 的研究和 AI 产品活动，不能渲染成独立法人。Meta 的 2013 年字段特指 FAIR 起点。
- xAI 保留常用检索名，正文明确 2026-02-02 被 SpaceX 收购与核验时 SpaceXAI 品牌，不能呈现为仍独立的组织。
- 中文人名是常用译写；英文名称为主键识别参考。短标题和概括为原创编写，没有转载完整原文。

## Image and asset notes

Sam Altman、Greg Brockman、Mira Murati、Dario Amodei 和 Demis Hassabis 使用已核验出处和 Creative Commons 许可的真实照片，其余人物使用字母排版。具体出处、许可与显示裁切记录在 assets.md 及站内「关于」页。公司品牌图形来自 Simple Icons 与 Lobe Icons，使用范围与许可见 assets.md；仍无图形的组织以文字标签表示。

## Claim-to-source map

- OpenAI 起点 / 早期任职：openai-founding；2019 结构 / 当时职务：openai-lp
- API、ChatGPT、GPT-4：openai-api、openai-chatgpt、openai-gpt4
- 2022 职位：openai-roles-2022；2023 任免：openai-transition、openai-return
- 2024 董事会回归：openai-review；首席科学家交接：openai-ilya-departure
- Foundation / PBC 及控制权：openai-structure；微软关系：openai-microsoft-2019、openai-microsoft-2026
- Sam 的 YC 背景：yc-sam；Greg 2026 职称：openai-greg-2026
- Ilya 论文：seq2seq；SSI：ssi-about、ssi-updates、ssi-investor、ssi-founder
- Mira 后续角色与合作：tml-nvidia；Thinking Machines：tml-about、tml-tinker、tml-investor、tml-location
- Anthropic 与 Dario：anthropic-about、anthropic-founding、anthropic-leadership、anthropic-claude、dario-bio
- DeepMind 与 Demis：deepmind-about、deepmind-formation、nobel-2024
- Meta：meta-fair、meta-llama3、meta-location
- xAI：xai-about、xai-grok、xai-spacex
- DeepSeek：deepseek-about、deepseek-r1；微软基本信息：microsoft-facts


## 2026-10-07 补充范围与证据边界

- Tibo 的旧 Codex Lead 与较新 Core Products & Platform 职称按来源日期分别保留；没有推定晋升日、入职日、国籍或汇报关系。Astral、Ona 资料均是拟收购公告，不宣称交易已完成。
- Fidji Simo 按本人公开说明及 Nscale 2026-09-11 公告列为顾问；CEO of Applications 与董事经历标作历史。任命公告日不当作实际入职日。
- Brad Lightcap 的 2022、2025 职责有 OpenAI 公告。2026-08-11 离任公告采用 Reuters 报道（经 Investing.com 发布），正文明确归因。原始 X 帖子未能直接读取，因此不把其列作已核验来源；公告日也不是推定最后工作日。
- Foundation 董事名单是 2026-10-07 官方页面快照，不是完整经营管理层名单。Paul Christiano 的 Group PBC 身份按更具体的 2026-09-09 公告列为无投票权观察员，不能从结构页的通用双董事会过渡段落推断为有表决权董事。
- 新六位人物的叙事段落通过 paragraphSourceIds 逐段连接证据。Tibo 可通过别名搜索；中文译名仅供检索。
- Thibault Sottiaux：openai-tibo-forum、openai-tibo-astral、vivatech-tibo-2026、openai-tibo-ona、openai-tibo-platform
- Jakub Pachocki：openai-ilya-departure、openai-jakub-2026
- Fidji Simo：openai-review、openai-fidji-appointment、fidji-adviser-statement、nscale-fidji-board
- Brad Lightcap：openai-roles-2022、openai-leadership-2025、brad-departure-reuters
- Bret Taylor：sierra-bret-bio、openai-return、sierra-launch、openai-paul-board-2026、openai-structure
- Paul Christiano：rlhf-human-preferences、openai-paul-board-2026、openai-structure

## 图谱表达与资料状态

本轮视觉重构保留 32 条事实记录、全部证据与来源核验日。新加入的 `status` 是人工审阅后的表达元数据：明确的过去关系用 historical，日期限定记录用 snapshot，核验时仍成立用 current，发布用 event，纯条目连接用 navigation。不会从缺少结束日期推定现任。

图谱只对当前中心实体的直接端点绘边；公司专题仍可汇总 Foundation / Group 相关内容，但汇总范围不充当图的法律方向。一个视觉节点可包含多条事实，选择后分别展示；人物创始身份须指明其组织归属。

## Public sources

### openai-tibo-forum

- 标题：OpenAI Forum · Codex is for Everyone（2026-05-13 活动与讲者简介）
- 链接：https://forum.openai.com/public/events/codex-is-for-everyone-why-codex-matters-beyond-code-fa40puy7wi
- 核验日期：2026-10-07

### openai-tibo-astral

- 标题：OpenAI · OpenAI to acquire Astral（Tibo 职称与 Codex 方向）
- 链接：https://openai.com/index/openai-to-acquire-astral/
- 发布日期：2026-03-19
- 核验日期：2026-10-07

### vivatech-tibo-2026

- 标题：VivaTech · Thibault Sottiaux 与 Peter Steinberger 讲者公告
- 链接：https://vivatech.com/media/press-releases/breaking-news-peter-steinberger-creator-of-openclaw-and-thibault-sottiaux-openai-two-ai-experts-for-an-exceptional-session-at-vivatech
- 发布日期：2026-05-28
- 核验日期：2026-10-07

### openai-tibo-ona

- 标题：OpenAI · OpenAI to acquire Ona（Core Products Lead）
- 链接：https://openai.com/index/openai-to-acquire-ona/
- 发布日期：2026-06-11
- 核验日期：2026-10-07

### openai-tibo-platform

- 标题：OpenAI · Defense Factory（Head of Core Products & Platform）
- 链接：https://openai.com/the-defense-factory/
- 核验日期：2026-10-07

### openai-jakub-2026

- 标题：Jakub Pachocki / OpenAI · An Alien Mind
- 链接：https://openai.com/index/an-alien-mind/
- 发布日期：2026-09-06
- 核验日期：2026-10-07

### openai-fidji-appointment

- 标题：OpenAI · Leadership expansion with Fidji Simo
- 链接：https://openai.com/index/leadership-expansion-with-fidji-simo/
- 发布日期：2025-05-07
- 核验日期：2026-10-07

### fidji-adviser-statement

- 标题：Fidji Simo · 本人公开说明转任兼职顾问
- 链接：https://www.linkedin.com/posts/fidjisimo_today-i-shared-with-the-openai-team-that-activity-7481120077711425536-e03r
- 核验日期：2026-10-07

### nscale-fidji-board

- 标题：Nscale · Fidji Simo joins Board（并确认 OpenAI 顾问身份）
- 链接：https://www.nscale.com/press-releases/fidji-simo-joins-nscale-board-of-directors
- 发布日期：2026-09-11
- 核验日期：2026-10-07

### openai-leadership-2025

- 标题：OpenAI · Leadership updates（Brad Lightcap 的历史职责）
- 链接：https://openai.com/index/leadership-updates-march-2025/
- 发布日期：2025-03-24
- 核验日期：2026-10-07

### brad-departure-reuters

- 标题：Reuters / Investing.com · Brad Lightcap announces departure（媒体交叉核验）
- 链接：https://www.investing.com/news/stock-market-news/senior-openai-executive-brad-lightcap-to-leave-for-new-venture-4852370
- 发布日期：2026-08-11
- 核验日期：2026-10-07

### sierra-bret-bio

- 标题：Sierra · Bret Taylor 官方简介
- 链接：https://sierra.ai/author/bret-taylor
- 核验日期：2026-10-07

### sierra-launch

- 标题：Bret Taylor、Clay Bavor / Sierra · Introducing Sierra
- 链接：https://sierra.ai/blog/introducing-sierra
- 发布日期：2024-02-13
- 核验日期：2026-10-07

### openai-paul-board-2026

- 标题：OpenAI · Paul Christiano joins OpenAI Foundation Board
- 链接：https://openai.com/index/paul-christiano-joins-openai-foundation-board/
- 发布日期：2026-09-09
- 核验日期：2026-10-07

### rlhf-human-preferences

- 标题：Christiano 等 · Deep reinforcement learning from human preferences
- 链接：https://arxiv.org/abs/1706.03741
- 发布日期：2017-06-12
- 核验日期：2026-10-07

### openai-codex-agent

- 标题：OpenAI · Introducing Codex（2025 年研究预览）
- 链接：https://openai.com/index/introducing-codex/
- 发布日期：2025-05-16
- 核验日期：2026-10-07

### openai-founding

- 标题：OpenAI · Introducing OpenAI
- 链接：https://openai.com/index/introducing-openai/
- 发布日期：2015-12-11
- 核验日期：2026-10-03

### openai-lp

- 标题：OpenAI · OpenAI LP
- 链接：https://openai.com/index/openai-lp/
- 发布日期：2019-03-11
- 核验日期：2026-10-03

### openai-api

- 标题：OpenAI · OpenAI API
- 链接：https://openai.com/index/openai-api/
- 发布日期：2020-06-11
- 核验日期：2026-10-03

### openai-chatgpt

- 标题：OpenAI · Introducing ChatGPT
- 链接：https://openai.com/index/chatgpt/
- 发布日期：2022-11-30
- 核验日期：2026-10-03

### openai-gpt4

- 标题：OpenAI · GPT-4
- 链接：https://openai.com/index/gpt-4/
- 发布日期：2023-03-14
- 核验日期：2026-10-03

### openai-roles-2022

- 标题：OpenAI · Leadership team update
- 链接：https://openai.com/index/leadership-team-update/
- 发布日期：2022-05-05
- 核验日期：2026-10-07

### openai-transition

- 标题：OpenAI · Leadership transition
- 链接：https://openai.com/index/openai-announces-leadership-transition/
- 发布日期：2023-11-17
- 核验日期：2026-10-03

### openai-return

- 标题：OpenAI · Sam Altman returns as CEO
- 链接：https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board/
- 发布日期：2023-11-29
- 核验日期：2026-10-07

### openai-review

- 标题：OpenAI · Board review and governance update
- 链接：https://openai.com/index/review-completed-altman-brockman-to-continue-to-lead-openai/
- 发布日期：2024-03-08
- 核验日期：2026-10-07

### openai-ilya-departure

- 标题：OpenAI · Ilya Sutskever leaves; Jakub Pachocki named Chief Scientist
- 链接：https://openai.com/index/jakub-pachocki-announced-as-chief-scientist/
- 发布日期：2024-05-14
- 核验日期：2026-10-07

### openai-structure

- 标题：OpenAI · Our structure（含 2025-10-28 重组说明）
- 链接：https://openai.com/our-structure/
- 核验日期：2026-10-07

### openai-microsoft-2019

- 标题：OpenAI · Microsoft investment and partnership
- 链接：https://openai.com/index/microsoft-invests-in-and-partners-with-openai/
- 发布日期：2019-07-22
- 核验日期：2026-10-03

### openai-microsoft-2026

- 标题：OpenAI · The next phase of the Microsoft partnership
- 链接：https://openai.com/index/next-phase-of-microsoft-partnership/
- 发布日期：2026-04-27
- 核验日期：2026-10-03

### openai-greg-2026

- 标题：OpenAI · Views on AI policy（文中确认总裁身份）
- 链接：https://openai.com/index/our-views-on-ai-policy-and-political-advocacy/
- 发布日期：2026-06-01
- 核验日期：2026-10-03

### openai-hq

- 标题：OpenAI · 官方招聘页面（旧金山总部信息）
- 链接：https://openai.com/careers/technical-threat-investigator-threat-intel-engineering-san-francisco/
- 核验日期：2026-10-03

### yc-sam

- 标题：Y Combinator · Sam Altman for President
- 链接：https://www.ycombinator.com/blog/sam-altman-for-president
- 发布日期：2014-02-21
- 核验日期：2026-10-03

### seq2seq

- 标题：Sutskever, Vinyals & Le · Sequence to Sequence Learning with Neural Networks
- 链接：https://arxiv.org/abs/1409.3215
- 发布日期：2014-09-10
- 核验日期：2026-10-03

### ssi-about

- 标题：Safe Superintelligence · 公司使命与办公地点
- 链接：https://ssi.inc/
- 核验日期：2026-10-03

### ssi-updates

- 标题：Safe Superintelligence · Updates（含 2025-07-03 人事公告）
- 链接：https://ssi.inc/updates
- 核验日期：2026-10-03

### ssi-founder

- 标题：Sequoia Capital · Ilya Sutskever 创始人档案
- 链接：https://sequoiacap.com/founder/ilya-sutskever
- 核验日期：2026-10-03

### ssi-investor

- 标题：Sequoia Capital · Safe Superintelligence 投资组合档案
- 链接：https://sequoiacap.com/companies/safe-superintelligence
- 核验日期：2026-10-03

### tml-about

- 标题：Thinking Machines Lab · 公司介绍
- 链接：https://thinkingmachines.ai/
- 核验日期：2026-10-03

### tml-nvidia

- 标题：Thinking Machines Lab · NVIDIA strategic partnership
- 链接：https://thinkingmachines.ai/news/nvidia-partnership/
- 发布日期：2026-03-10
- 核验日期：2026-10-03

### tml-tinker

- 标题：Thinking Machines Lab · Announcing Tinker
- 链接：https://thinkingmachines.ai/news/announcing-tinker/
- 发布日期：2025-10-01
- 核验日期：2026-10-03

### tml-investor

- 标题：Lightspeed · Thinking Machines 投资组合档案
- 链接：https://lsvp.com/company/thinking-machines/
- 核验日期：2026-10-03

### tml-location

- 标题：Thinking Machines Lab · LinkedIn 公司页
- 链接：https://www.linkedin.com/company/thinkingmachinesai
- 核验日期：2026-10-03

### anthropic-about

- 标题：Anthropic · Company
- 链接：https://www.anthropic.com/company
- 核验日期：2026-10-03

### anthropic-founding

- 标题：Anthropic · Series B 公告与创立时间回顾
- 链接：https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai
- 发布日期：2022-04-29
- 核验日期：2026-10-03

### anthropic-leadership

- 标题：Anthropic · Leadership
- 链接：https://www.anthropic.com/company/leadership
- 核验日期：2026-10-03

### anthropic-claude

- 标题：Anthropic · Introducing Claude
- 链接：https://www.anthropic.com/news/introducing-claude
- 发布日期：2023-03-14
- 核验日期：2026-10-03

### dario-bio

- 标题：Dario Amodei · 本人官网简介
- 链接：https://darioamodei.com/
- 核验日期：2026-10-03

### deepmind-about

- 标题：Google DeepMind · About
- 链接：https://deepmind.google/about/
- 核验日期：2026-10-03

### deepmind-formation

- 标题：Google · Bringing together two world-class AI teams
- 链接：https://blog.google/innovation-and-ai/technology/ai/april-ai-update/
- 发布日期：2023-04-20
- 核验日期：2026-10-03

### nobel-2024

- 标题：诺贝尔奖官方 · 2024 年化学奖新闻稿
- 链接：https://www.nobelprize.org/uploads/2024/10/press-chemistryprize2024-3.pdf
- 发布日期：2024-10-09
- 核验日期：2026-10-03

### meta-fair

- 标题：Meta · Celebrating 10 years of FAIR
- 链接：https://ai.meta.com/blog/fair-10-year-anniversary-open-science-meta/
- 发布日期：2023-11-30
- 核验日期：2026-10-03

### meta-llama3

- 标题：Meta · Introducing Meta Llama 3
- 链接：https://ai.meta.com/blog/meta-llama-3
- 发布日期：2024-04-18
- 核验日期：2026-10-03

### meta-location

- 标题：Meta · Expanding our home in Menlo Park
- 链接：https://about.fb.com/news/2018/09/expanding-our-home-in-menlo-park/
- 发布日期：2018-09-04
- 核验日期：2026-10-03

### xai-about

- 标题：xAI / SpaceXAI · Company and historical milestones
- 链接：https://x.ai/company
- 核验日期：2026-10-03

### xai-grok

- 标题：xAI · Announcing Grok
- 链接：https://x.ai/news/grok
- 发布日期：2023-11-03
- 核验日期：2026-10-03

### xai-spacex

- 标题：xAI · xAI joins SpaceX
- 链接：https://x.ai/news/xai-joins-spacex
- 发布日期：2026-02-02
- 核验日期：2026-10-03

### deepseek-about

- 标题：DeepSeek AI · LinkedIn 公司页
- 链接：https://www.linkedin.com/company/deepseek-ai
- 核验日期：2026-10-03

### deepseek-r1

- 标题：DeepSeek · DeepSeek-R1 发布
- 链接：https://deepseek.com/news/deepseek-r1/
- 发布日期：2025-01-20
- 核验日期：2026-10-03

### microsoft-facts

- 标题：Microsoft · Facts about Microsoft
- 链接：https://news.microsoft.com/facts-about-microsoft/
- 核验日期：2026-10-03
