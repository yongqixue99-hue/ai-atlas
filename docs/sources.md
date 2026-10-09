# AI Atlas source register

版本更新：2026-10-09（UTC）。各来源保留各自实际核验日；旧来源没有统一改成新版日期。

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

Sam Altman、Greg Brockman、Mira Murati、Dario Amodei、Demis Hassabis、Bret Taylor 和 Fidji Simo 使用已核验出处和 Creative Commons 许可的真实照片，其余人物使用字母排版。具体出处、许可与显示裁切记录在 assets.md 及站内「关于」页。公司品牌图形来自 Simple Icons 与 Lobe Icons，使用范围与许可见 assets.md；仍无图形的组织以文字标签表示。

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

## 2026-10-08 背景审校范围

2026-10-08 首轮复核 `src/profiles.ts` 当时的十篇背景正文与速览；原有公司、角色、关系和事件不是本轮全面复审对象。新增原始资料及明确归因的媒体来源，保留三篇的部分维基依赖。来源被重新阅读，不意味着所有引用它的现职都仍成立。Demis 的 About 页与新官方职衔冲突已明确提示；详见 [审校说明](editorial-audit-2026-10-08.md)。

## Public sources


2026-10-09 补齐 Brad 与 Tibo 的短传记，增加杜克论文、活动页和 OpenAI/Reddit 公告三条来源。对角色、关系和时间线做针对性一致性复核；替换两个失效的 Instacart 新闻页为官方投资者 PDF，保留原发布日期。只将本轮实际重新打开的来源更新核验日；没有把全部 189 份资料宣称为重新核验。

### brad-duke-thesis-2012

- 标题：Bradford Colton Lightcap、William Anthony Peek / Duke · The Effects of Digital Media on Advertising Markets（共同署名荣誉论文）
- 链接：https://sites.duke.edu/djepapers/files/2016/10/lightcap-peek-dje.pdf
- 发布日期：2012
- 核验日期：2026-10-09

### brad-duke-event-2020

- 标题：Duke · Fireside Chat with Brad Lightcap（2020-12-17 活动与当时 CFO 职称）
- 链接：https://calendar.duke.edu/show?fq=id%3ACAL-2c918084-764335d0-0176-4874f9cc-000019c2demobedework%40mysite.edu
- 核验日期：2026-10-09

### openai-brad-reddit-2024

- 标题：OpenAI / Reddit · OpenAI and Reddit Partnership（合作范围、牵头与审批披露）
- 链接：https://openai.com/index/openai-and-reddit-partnership/
- 发布日期：2024-05-16
- 核验日期：2026-10-09

### openai-tibo-forum

- 标题：OpenAI Forum · Codex is for Everyone（2026-05-13 活动与讲者简介）
- 链接：https://forum.openai.com/public/events/codex-is-for-everyone-why-codex-matters-beyond-code-fa40puy7wi
- 核验日期：2026-10-09

### openai-tibo-astral

- 标题：OpenAI · OpenAI to acquire Astral（Tibo 职称与 Codex 方向）
- 链接：https://openai.com/index/openai-to-acquire-astral/
- 发布日期：2026-03-19
- 核验日期：2026-10-09

### vivatech-tibo-2026

- 标题：VivaTech · Thibault Sottiaux 与 Peter Steinberger 讲者公告
- 链接：https://vivatech.com/media/press-releases/breaking-news-peter-steinberger-creator-of-openclaw-and-thibault-sottiaux-openai-two-ai-experts-for-an-exceptional-session-at-vivatech
- 发布日期：2026-05-28
- 核验日期：2026-10-09

### openai-tibo-ona

- 标题：OpenAI · OpenAI to acquire Ona（Core Products Lead）
- 链接：https://openai.com/index/openai-to-acquire-ona/
- 发布日期：2026-06-11
- 核验日期：2026-10-09

### openai-tibo-platform

- 标题：OpenAI · Defense Factory（Head of Core Products & Platform）
- 链接：https://openai.com/the-defense-factory/
- 核验日期：2026-10-09

### openai-jakub-2026

- 标题：Jakub Pachocki / OpenAI · An Alien Mind
- 链接：https://openai.com/index/an-alien-mind/
- 发布日期：2026-09-06
- 核验日期：2026-10-07

### openai-fidji-appointment

- 标题：OpenAI · Leadership expansion with Fidji Simo
- 链接：https://openai.com/index/leadership-expansion-with-fidji-simo/
- 发布日期：2025-05-07
- 核验日期：2026-10-08

### fidji-adviser-statement

- 标题：Fidji Simo · 本人公开说明转任兼职顾问
- 链接：https://www.linkedin.com/posts/fidjisimo_today-i-shared-with-the-openai-team-that-activity-7481120077711425536-e03r
- 核验日期：2026-10-08

### nscale-fidji-board

- 标题：Nscale · Fidji Simo joins Board（并确认 OpenAI 顾问身份）
- 链接：https://www.nscale.com/press-releases/fidji-simo-joins-nscale-board-of-directors
- 发布日期：2026-09-11
- 核验日期：2026-10-08

### openai-leadership-2025

- 标题：OpenAI · Leadership updates（Brad Lightcap 的历史职责）
- 链接：https://openai.com/index/leadership-updates-march-2025/
- 发布日期：2025-03-24
- 核验日期：2026-10-09

### brad-departure-reuters

- 标题：Reuters / Investing.com · Brad Lightcap announces departure（媒体交叉核验）
- 链接：https://www.investing.com/news/stock-market-news/senior-openai-executive-brad-lightcap-to-leave-for-new-venture-4852370
- 发布日期：2026-08-11
- 核验日期：2026-10-09

### sierra-bret-bio

- 标题：Sierra · Bret Taylor 官方简介
- 链接：https://sierra.ai/author/bret-taylor
- 核验日期：2026-10-08

### sierra-launch

- 标题：Bret Taylor、Clay Bavor / Sierra · Meet Sierra, the conversational AI platform for businesses
- 链接：https://sierra.ai/blog/introducing-sierra
- 发布日期：2024-02-13
- 核验日期：2026-10-08

### openai-paul-board-2026

- 标题：OpenAI · Paul Christiano joins OpenAI Foundation Board
- 链接：https://openai.com/index/paul-christiano-joins-openai-foundation-board/
- 发布日期：2026-09-09
- 核验日期：2026-10-08

### rlhf-human-preferences

- 标题：Christiano 等 · Deep reinforcement learning from human preferences
- 链接：https://arxiv.org/abs/1706.03741
- 发布日期：2017-06-12
- 核验日期：2026-10-08

### openai-codex-agent

- 标题：OpenAI · Introducing Codex（2025 年研究预览）
- 链接：https://openai.com/index/introducing-codex/
- 发布日期：2025-05-16
- 核验日期：2026-10-07

### openai-founding

- 标题：OpenAI · Introducing OpenAI
- 链接：https://openai.com/index/introducing-openai/
- 发布日期：2015-12-11
- 核验日期：2026-10-08

### openai-lp

- 标题：OpenAI · OpenAI LP
- 链接：https://openai.com/index/openai-lp/
- 发布日期：2019-03-11
- 核验日期：2026-10-08

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
- 核验日期：2026-10-09

### openai-transition

- 标题：OpenAI · Leadership transition
- 链接：https://openai.com/index/openai-announces-leadership-transition/
- 发布日期：2023-11-17
- 核验日期：2026-10-08

### openai-return

- 标题：OpenAI · Sam Altman returns as CEO
- 链接：https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board/
- 发布日期：2023-11-29
- 核验日期：2026-10-08

### openai-review

- 标题：OpenAI · Board review and governance update
- 链接：https://openai.com/index/review-completed-altman-brockman-to-continue-to-lead-openai/
- 发布日期：2024-03-08
- 核验日期：2026-10-07

### openai-ilya-departure

- 标题：OpenAI · Ilya Sutskever leaves; Jakub Pachocki named Chief Scientist
- 链接：https://openai.com/index/jakub-pachocki-announced-as-chief-scientist/
- 发布日期：2024-05-14
- 核验日期：2026-10-08

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
- 核验日期：2026-10-08

### seq2seq

- 标题：Sutskever, Vinyals & Le · Sequence to Sequence Learning with Neural Networks
- 链接：https://arxiv.org/abs/1409.3215
- 发布日期：2014-09-10
- 核验日期：2026-10-08

### ssi-about

- 标题：Safe Superintelligence · 公司使命与办公地点
- 链接：https://ssi.inc/
- 核验日期：2026-10-08

### ssi-updates

- 标题：Safe Superintelligence · Updates（含 2025-07-03 人事公告）
- 链接：https://ssi.inc/updates
- 核验日期：2026-10-08

### ssi-founder

- 标题：Sequoia Capital · Ilya Sutskever 创始人档案
- 链接：https://sequoiacap.com/founder/ilya-sutskever
- 核验日期：2026-10-08

### ssi-investor

- 标题：Sequoia Capital · Safe Superintelligence 投资组合档案
- 链接：https://sequoiacap.com/companies/safe-superintelligence
- 核验日期：2026-10-08

### tml-about

- 标题：Thinking Machines Lab · 公司介绍
- 链接：https://thinkingmachines.ai/
- 核验日期：2026-10-08

### tml-nvidia

- 标题：Thinking Machines Lab · NVIDIA strategic partnership
- 链接：https://thinkingmachines.ai/news/nvidia-partnership/
- 发布日期：2026-03-10
- 核验日期：2026-10-03

### tml-tinker

- 标题：Thinking Machines Lab · Announcing Tinker
- 链接：https://thinkingmachines.ai/news/announcing-tinker/
- 发布日期：2025-10-01
- 核验日期：2026-10-08

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
- 核验日期：2026-10-08

### anthropic-leadership

- 标题：Anthropic · Leadership
- 链接：https://www.anthropic.com/company/leadership
- 核验日期：2026-10-08

### anthropic-claude

- 标题：Anthropic · Introducing Claude
- 链接：https://www.anthropic.com/news/introducing-claude
- 发布日期：2023-03-14
- 核验日期：2026-10-08

### dario-bio

- 标题：Dario Amodei · 本人官网简介
- 链接：https://darioamodei.com/
- 核验日期：2026-10-08

### deepmind-about

- 标题：Google DeepMind · About（现职措辞与较新公告冲突）
- 链接：https://deepmind.google/about/
- 核验日期：2026-10-08

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

### wiki-sam-altman

- 标题：Wikipedia · Sam Altman（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Sam_Altman
- 核验日期：2026-10-08

### wiki-greg-brockman

- 标题：Wikipedia · Greg Brockman（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Greg_Brockman
- 核验日期：2026-10-08

### wiki-ilya-sutskever

- 标题：Wikipedia · Ilya Sutskever（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Ilya_Sutskever
- 核验日期：2026-10-08

### wiki-mira-murati

- 标题：Wikipedia · Mira Murati（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Mira_Murati
- 核验日期：2026-10-08

### wiki-dario-amodei

- 标题：Wikipedia · Dario Amodei（二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Dario_Amodei
- 核验日期：2026-10-08

### wiki-demis-hassabis

- 标题：Wikipedia · Demis Hassabis（二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Demis_Hassabis
- 核验日期：2026-10-08

### wiki-bret-taylor

- 标题：Wikipedia · Bret Taylor（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Bret_Taylor
- 核验日期：2026-10-08

### wiki-fidji-simo

- 标题：Wikipedia · Fidji Simo（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Fidji_Simo
- 核验日期：2026-10-08

### wiki-paul-christiano

- 标题：Wikipedia · Paul Christiano（二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Paul_Christiano_(researcher)
- 核验日期：2026-10-08

### wiki-jakub-pachocki

- 标题：Wikipedia · Jakub Pachocki（生平背景；二手汇编，非原始资料）
- 链接：https://en.wikipedia.org/wiki/Jakub_Pachocki
- 核验日期：2026-10-08

### sam-stanford-transcript

- 标题：Stanford STVP · The Possibilities of AI（现场对谈文字稿）
- 链接：https://stvp.stanford.edu/node/10731/printable/print
- 发布日期：2024-05-01
- 核验日期：2026-10-08

### yc-loopt

- 标题：Y Combinator · Loopt 公司与创始人档案
- 链接：https://www.ycombinator.com/companies/loopt
- 核验日期：2026-10-08

### greendot-loopt-completed

- 标题：Green Dot · Completes Acquisition of Loopt
- 链接：https://ir.greendot.com/news-releases/news-release-details/green-dot-completes-acquisition-loopt/
- 发布日期：2012-04-04
- 核验日期：2026-10-08

### yc-group-2016

- 标题：Sam Altman / Y Combinator · YC Changes
- 链接：https://www.ycombinator.com/blog/yc-changes/
- 发布日期：2016-09-13
- 核验日期：2026-10-08

### senate-altman-2023

- 标题：美国参议院司法委员会 · Oversight of A.I.: Rules for Artificial Intelligence
- 链接：https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-rules-for-artificial-intelligence
- 发布日期：2023-05-16
- 核验日期：2026-10-08

### time-sam-2023

- 标题：TIME · Sam Altman: The 100 Most Influential People of 2023
- 链接：https://time.com/collections/100-most-influential-people-2023/6270015/sam-altman/
- 核验日期：2026-10-08

### acs-brockman-2006

- 标题：美国化学会 / EurekAlert! · 2006 年国际化学奥林匹克美国队获奖公告
- 链接：https://www.eurekalert.org/news-releases/557270
- 发布日期：2006-07-13
- 核验日期：2026-10-08

### sts-brockman-2007

- 标题：Society for Science · Intel Science Talent Search 2007 官方结果
- 链接：https://www.societyforscience.org/regeneron-sts/intel-sts-2007/
- 核验日期：2026-10-08

### brockman-path

- 标题：Greg Brockman · My path to OpenAI
- 链接：https://blog.gregbrockman.com/my-path-to-openai
- 发布日期：2016-05-03
- 核验日期：2026-10-08

### brockman-stripe-cto

- 标题：Greg Brockman · #define CTO
- 链接：https://blog.gregbrockman.com/figuring-out-the-cto-role-at-stripe
- 发布日期：2014-10-27
- 核验日期：2026-10-08

### openai-gym-paper

- 标题：Brockman 等 · OpenAI Gym
- 链接：https://arxiv.org/abs/1606.01540
- 发布日期：2016-06-05
- 核验日期：2026-10-08

### openai-five-2018

- 标题：OpenAI · OpenAI Five（团队署名与技术介绍）
- 链接：https://openai.com/index/openai-five/
- 发布日期：2018-06-25
- 核验日期：2026-10-08

### ted-brockman-2023

- 标题：TED · The astounding new era of AI: Notes on Session 2 of TED2023
- 链接：https://blog.ted.com/the-astounding-new-era-of-ai-notes-on-session-2-of-ted2023/
- 发布日期：2023-04-18
- 核验日期：2026-10-08

### utoronto-ilya-honorary

- 标题：多伦多大学 · Ilya Sutskever receives U of T honorary degree
- 链接：https://www.utoronto.ca/news/ilya-sutskever-leader-ai-and-its-responsible-development-receives-u-t-honorary-degree
- 发布日期：2025-06-06
- 核验日期：2026-10-08

### utoronto-ilya-degrees

- 标题：多伦多大学校友事务 · Hinton honorary degree（列出 Sutskever 三个学位年份）
- 链接：https://alumni.utoronto.ca/news/u-t-deep-learning-pioneer-geoffrey-hinton-receives-honorary-degree
- 发布日期：2021-06-11
- 核验日期：2026-10-08

### ilya-thesis

- 标题：Ilya Sutskever / 多伦多大学 · Training Recurrent Neural Networks（博士论文）
- 链接：https://www.cs.toronto.edu/~ilya/pubs/ilya_sutskever_phd_thesis.pdf
- 发布日期：2013
- 核验日期：2026-10-08

### utoronto-dnnresearch

- 标题：多伦多大学 · Google acquires U of T neural networks company
- 链接：https://www.utoronto.ca/news/google-acquires-u-t-neural-networks-company
- 发布日期：2013-03-12
- 核验日期：2026-10-08

### ilya-homepage

- 标题：Ilya Sutskever / 多伦多大学 · 个人学术主页（历史经历，现职未更新）
- 链接：https://www.cs.toronto.edu/~ilya/
- 核验日期：2026-10-08

### openai-superalignment

- 标题：Jan Leike、Ilya Sutskever / OpenAI · Introducing Superalignment
- 链接：https://openai.com/index/introducing-superalignment/
- 发布日期：2023-07-05
- 核验日期：2026-10-08

### time-ilya-regret

- 标题：TIME · Who Is Emmett Shear, OpenAI’s New CEO?（转引 Sutskever 公开声明）
- 链接：https://time.com/6337608/emmett-shear-openai-ceo/
- 发布日期：2023-11-20
- 核验日期：2026-10-08

### royalsociety-ilya

- 标题：Royal Society · Dr Ilya Sutskever FRS（2022 年当选）
- 链接：https://royalsociety.org/people/ilya-sutskever-35834/
- 核验日期：2026-10-08

### ioi-jakub

- 标题：国际信息学奥林匹克 · Jakub Pachocki 成绩记录
- 链接：https://stats.ioinformatics.org/people/1051
- 核验日期：2026-10-08

### uw-jakub-codejam

- 标题：华沙大学数学、信息学与力学学院 · Google Code Jam 成绩
- 链接：https://www.mimuw.edu.pl/en/achievements/google-code-jam/
- 核验日期：2026-10-08

### uw-jakub-icpc

- 标题：华沙大学 · Medal dla programistów z UW（回顾 2012 年亚军队成员）
- 链接：https://www.uw.edu.pl/medal-dla-programistow-z-uw/
- 发布日期：2024-04-22
- 核验日期：2026-10-08

### simons-jakub

- 标题：Simons 计算理论研究所 · Jakub Pachocki 历史简介与访问记录
- 链接：https://simons.berkeley.edu/people/jakub-pachocki
- 核验日期：2026-10-08

### cmu-jakub-phd

- 标题：卡内基梅隆大学 · Jakub Pachocki 博士学位与论文记录
- 链接：https://csd-web-01.andrew.cmu.edu/academics/doctoral/degrees-conferred/jakub-pachocki
- 核验日期：2026-10-08

### ssi-founder-levy

- 标题：Sequoia Capital · Daniel Levy 创始人档案
- 链接：https://sequoiacap.com/founder/daniel-levy
- 核验日期：2026-10-08

### ssi-founder-gross

- 标题：Sequoia Capital · Daniel Gross 创始人档案
- 链接：https://sequoiacap.com/founder/daniel-gross
- 核验日期：2026-10-08

### dartmouth-mira-honorary-bio

- 标题：Dartmouth · 2024 honorary degree recipients（Murati 官方履历）
- 链接：https://home.dartmouth.edu/news/2024/04/announcing-2024-honorary-degree-recipients
- 发布日期：2024-04-11
- 核验日期：2026-10-08

### dartmouth-mira-honorary-award

- 标题：Dartmouth · Dartmouth Awards Honorary Degrees
- 链接：https://home.dartmouth.edu/news/2024/06/dartmouth-commencement-honorands
- 发布日期：2024-06-09
- 核验日期：2026-10-08

### pearson-mira-alumni

- 标题：Pearson College UWC · Alumni（Murati 2007 届）
- 链接：https://www.pearsoncollege.ca/alumni/
- 核验日期：2026-10-08

### murati-language-creativity

- 标题：Ermira Murati / Daedalus · Language & Coding Creativity
- 链接：https://www.amacad.org/publication/daedalus/language-coding-creativity
- 发布日期：2022
- 核验日期：2026-10-08

### ap-murati-departure

- 标题：Associated Press · Mira Murati and two other OpenAI executives announce departure（报道）
- 链接：https://apnews.com/article/openai-mira-murati-quits-df75217584696b442935dbccc9b0347d
- 发布日期：2024-09-25
- 核验日期：2026-10-08

### dartmouth-mira-ai-discussion

- 标题：Dartmouth Engineering · Mira Murati Shares Optimism for AI’s Future
- 链接：https://engineering.dartmouth.edu/news/openai-cto-mira-murati-th12-shares-optimism-for-ais-future
- 发布日期：2024-06-10
- 核验日期：2026-10-08

### dartmouth-elliott-murati

- 标题：Will Elliott / The Dartmouth · OpenAI’s Mira Murati has it all wrong（署名评论）
- 链接：https://www.thedartmouth.com/article/2024/07/elliott-murati-openai
- 发布日期：2024-07-12
- 核验日期：2026-10-08

### stanford-taylor-friendfeed

- 标题：Stanford Engineering · Stanford friendships fed success of FriendFeed
- 链接：https://engineering.stanford.edu/news/stanford-friendships-fed-success-social-networking-innovator-friendfeed
- 核验日期：2026-10-08

### google-taylor-maps-api

- 标题：Bret Taylor / Google · The world is your JavaScript-enabled oyster
- 链接：https://googleblog.blogspot.com/2005/06/world-is-your-javascript-enabled_29.html
- 发布日期：2005-06-29
- 核验日期：2026-10-08

### facebook-friendfeed-acquisition

- 标题：Facebook · Agreement to acquire FriendFeed
- 链接：https://about.fb.com/news/2009/08/facebook-agrees-to-acquire-sharing-service-friendfeed/
- 发布日期：2009-08-10
- 核验日期：2026-10-08

### salesforce-taylor-coo

- 标题：Salesforce · Bret Taylor named President & COO
- 链接：https://www.salesforce.com/news/press-releases/2019/12/12/salesforce-names-bret-taylor-president-chief-operating-officer/
- 发布日期：2019-12-12
- 核验日期：2026-10-08

### salesforce-taylor-coceo

- 标题：Salesforce · Bret Taylor promoted to Vice Chair and Co-CEO
- 链接：https://www.salesforce.com/news/press-releases/2021/11/30/bret-taylor-promoted-to-vice-chair-and-co-ceo-of-salesforce/?bc=OTH
- 发布日期：2021-11-30
- 核验日期：2026-10-08

### salesforce-taylor-departure

- 标题：Salesforce · Bret Taylor to step down as Vice Chair and Co-CEO
- 链接：https://www.salesforce.com/au/news/press-releases/2022/11/30/bret-taylor-to-step-down-as-salesforce-vice-chair-and-co-ceo/?bc=OTH
- 发布日期：2022-11-30
- 核验日期：2026-10-08

### shopify-taylor-board

- 标题：Shopify · A board member Taylor-made for Shopify
- 链接：https://www.shopify.com/news/a-board-member-taylor-made-for-shopify
- 发布日期：2023-06-27
- 核验日期：2026-10-08

### hec-simo-commencement

- 标题：HEC Paris · Fidji Simo to deliver 2025 commencement address
- 链接：https://www.hec.edu/en/school/news/fidji-simo-deliver-2025-commencement-address-hec-paris
- 发布日期：2025-06-05
- 核验日期：2026-10-08

### hec-simo-profile

- 标题：Fidji Simo / HEC Paris · Fidji H.08（本人求学回顾）
- 链接：https://www.hec.edu/en/hec-foundation/profiles/fidji-h08
- 核验日期：2026-10-08

### instacart-simo-ceo

- 标题：Instacart · Fidji Simo appointed CEO
- 链接：https://investors.instacart.com/node/6671/pdf
- 发布日期：2021-07-08
- 核验日期：2026-10-09

### shopify-simo-board

- 标题：Shopify · Fidji Simo joins Board of Directors
- 链接：https://www.shopify.com/news/shopify-s-board-just-got-insta-ntly-better-instacart-ceo-fidji-simo-joins-shopify-s-board-of-directors
- 发布日期：2021-12-16
- 核验日期：2026-10-08

### instacart-simo-chair

- 标题：Instacart · Fidji Simo appointed Chair, effective upon public listing
- 链接：https://company.instacart.com/pressreleases/instacart-appoints-ceo-fidji-simo-to-chair-of-the-board-founder-executive-chairman-apoorva-mehta-to-transition-off-the-board-when-instacart-becomes-a-public-company
- 发布日期：2022-07-22
- 核验日期：2026-10-08

### instacart-ipo-faq

- 标题：Instacart · Investor FAQs（上市日期与股票代码）
- 链接：https://investors.instacart.com/ir-resources/faqs
- 核验日期：2026-10-08

### openai-new-directors-2024

- 标题：OpenAI · New members of the board of directors
- 链接：https://openai.com/index/openai-announces-new-members-to-board-of-directors/
- 发布日期：2024-03-08
- 核验日期：2026-10-08

### simo-empowerment-essay

- 标题：Fidji Simo / OpenAI · AI as the greatest source of empowerment for all
- 链接：https://openai.com/index/ai-as-the-greatest-source-of-empowerment-for-all/
- 发布日期：2025-07-21
- 核验日期：2026-10-08

### dario-princeton-bio

- 标题：普林斯顿大学 · Dario Amodei 的学位与研究经历
- 链接：https://www.princeton.edu/news/2023/09/12/time-magazines-time100-artificial-intelligence-list-honors-six-princetonians
- 发布日期：2023-09-12
- 核验日期：2026-10-08

### dario-hertz-bio

- 标题：Hertz Foundation · Dario Amodei 简介
- 链接：https://www.hertzfoundation.org/people/dario-amodei/
- 核验日期：2026-10-08

### hertz-thesis-awards

- 标题：Hertz Foundation · 历届论文奖名单
- 链接：https://www.hertzfoundation.org/hertz-community/awards-recognition/hertz-thesis-prize/
- 核验日期：2026-10-08

### dario-physics-team-2000

- 标题：美国物理教师协会 · 2000 年美国物理队名单
- 链接：https://www.aapt.org/olympiad2000/team2000.html
- 核验日期：2026-10-08

### anthropic-series-a-2021

- 标题：Anthropic · 2021 年 Series A 公告
- 链接：https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems
- 发布日期：2021-05-28
- 核验日期：2026-10-08

### dario-loving-grace

- 标题：Dario Amodei · Machines of Loving Grace
- 链接：https://darioamodei.com/essay/machines-of-loving-grace
- 发布日期：2024-10
- 核验日期：2026-10-08

### dario-adolescence

- 标题：Dario Amodei · The Adolescence of Technology
- 链接：https://darioamodei.com/essay/the-adolescence-of-technology
- 发布日期：2026-01
- 核验日期：2026-10-08

### time-dario-2025

- 标题：TIME · 2025 年百大人物：Dario Amodei
- 链接：https://time.com/collections/100-most-influential-people-2025/7273747/dario-amodei/
- 发布日期：2025-04-16
- 核验日期：2026-10-08

### time-dario-daniela-2026

- 标题：TIME · 2026 年百大人物：Dario Amodei 与 Daniela Amodei
- 链接：https://time.com/collection/100-most-influential-people/2026/dario-daniela-amodei/
- 发布日期：2026-04-15
- 核验日期：2026-10-08

### demis-nobel-facts

- 标题：诺贝尔奖官方 · Demis Hassabis 获奖者资料
- 链接：https://www.nobelprize.org/prizes/chemistry/2024/hassabis/facts/
- 核验日期：2026-10-08

### demis-cv-2023

- 标题：宗座科学院收录 · Demis Hassabis 2023 年简历
- 链接：https://www.pas.va/content/dam/casinapioiv/pas/pdf-vari/cv_accademici/Demis-Hassabis-CV-2023.pdf
- 核验日期：2026-10-08

### demis-ucl-nobel

- 标题：伦敦大学学院 · 校友 Demis Hassabis 获诺贝尔化学奖
- 链接：https://www.ucl.ac.uk/news/2024/oct/ucl-alumnus-and-ai-innovator-awarded-nobel-prize-chemistry
- 发布日期：2024-10-09
- 核验日期：2026-10-08

### demis-imagination-2007

- 标题：Hassabis 等 · Patients with hippocampal amnesia cannot imagine new experiences
- 链接：https://pubmed.ncbi.nlm.nih.gov/17229836/
- 发布日期：2007-01-30
- 核验日期：2026-10-08

### deepmind-alphago-history

- 标题：Google DeepMind · AlphaGo 比赛记录
- 链接：https://deepmind.google/research/alphago/
- 核验日期：2026-10-08

### deepmind-alphafold-casp14

- 标题：Google DeepMind · AlphaFold 的 CASP14 结果
- 链接：https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/
- 发布日期：2020-11-30
- 核验日期：2026-10-08

### deepmind-alphafold-database-2022

- 标题：Demis Hassabis / Google DeepMind · AlphaFold 数据库扩展
- 链接：https://deepmind.google/blog/alphafold-reveals-the-structure-of-the-protein-universe/
- 发布日期：2022-07-28
- 核验日期：2026-10-08

### nobel-chemistry-2024-html

- 标题：诺贝尔奖官方 · 2024 年化学奖新闻稿（网页）
- 链接：https://www.nobelprize.org/prizes/chemistry/2024/press-release/
- 发布日期：2024-10-09
- 核验日期：2026-10-08

### isomorphic-leadership-2022

- 标题：Isomorphic Labs · 首批管理团队公告
- 链接：https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-first-phase-of-management-team
- 发布日期：2022-05-01
- 核验日期：2026-10-08

### paul-mit-author-bio

- 标题：Theory of Computing · Paul Christiano 作者简介
- 链接：https://theoryofcomputing.org/articles/v009a009/about.html
- 核验日期：2026-10-08

### paul-berkeley-thesis

- 标题：加州大学伯克利分校 · Manipulation-resistant online learning
- 链接：https://www2.eecs.berkeley.edu/Pubs/TechRpts/2017/EECS-2017-107.html
- 发布日期：2017-05-15
- 核验日期：2026-10-08

### paul-imo-results

- 标题：国际数学奥林匹克官方 · 美国历届选手成绩
- 链接：https://www.imo-official.org/results/individual/country/USA/
- 核验日期：2026-10-08

### paul-bio

- 标题：Paul Christiano · 本人官网简介
- 链接：https://paulfchristiano.com/
- 核验日期：2026-10-08

### ai-safety-debate-2018

- 标题：Irving、Christiano、Amodei · AI safety via debate
- 链接：https://arxiv.org/abs/1805.00899
- 发布日期：2018-05-02
- 核验日期：2026-10-08

### amplification-2018

- 标题：Christiano、Shlegeris、Amodei · Supervising strong learners by amplifying weak experts
- 链接：https://arxiv.org/abs/1810.08575
- 发布日期：2018-10-19
- 核验日期：2026-10-08

### book-summarization-2021

- 标题：Wu 等 · Recursively Summarizing Books with Human Feedback
- 链接：https://arxiv.org/abs/2109.10862
- 发布日期：2021-09-22
- 核验日期：2026-10-08

### paul-announces-arc

- 标题：Paul Christiano · Announcing the Alignment Research Center
- 链接：https://www.alignmentforum.org/posts/3ejHFgQihLG4L6WQf/announcing-the-alignment-research-center
- 发布日期：2021-04-26
- 核验日期：2026-10-08

### arc-elk-report-2021

- 标题：Alignment Research Center · 首份技术报告 Eliciting Latent Knowledge
- 链接：https://www.alignment.org/blog/arcs-first-technical-report-eliciting-latent-knowledge/
- 发布日期：2021-12-14
- 核验日期：2026-10-08

### metr-spinout-2023

- 标题：METR · ARC Evals is now METR
- 链接：https://metr.org/blog/2023-12-04-metr-announcement/
- 发布日期：2023-12-04
- 核验日期：2026-10-08

### uk-frontier-taskforce-2023

- 标题：英国政府 · Frontier AI Taskforce 首份进展报告
- 链接：https://www.gov.uk/government/publications/frontier-ai-taskforce-first-progress-report/frontier-ai-taskforce-first-progress-report
- 发布日期：2023-09-07
- 核验日期：2026-10-08

### anthropic-ltbt-2023

- 标题：Anthropic · Long-Term Benefit Trust 及后续成员变更脚注
- 链接：https://www.anthropic.com/news/the-long-term-benefit-trust
- 发布日期：2023-09-19
- 核验日期：2026-10-08

### nist-paul-appointment-2024

- 标题：NIST · 美国 AI 安全研究所管理团队任命公告
- 链接：https://www.nist.gov/news-events/news/2024/04/us-commerce-secretary-gina-raimondo-announces-expansion-us-ai-safety
- 发布日期：2024-04-16
- 核验日期：2026-10-08

### venturebeat-nist-appointment-2024

- 标题：VentureBeat · Christiano 拟议任命的内部反对报道（二手，含匿名消息）
- 链接：https://venturebeat.com/ai/nist-staffers-revolt-against-potential-appointment-of-effective-altruist-ai-researcher-to-us-ai-safety-institute
- 发布日期：2024-03-07
- 核验日期：2026-10-08

### google-ai-leadership-2026

- 标题：Google · The next chapter of our AI momentum
- 链接：https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/
- 核验日期：2026-10-08

### deepmind-institute-2026

- 标题：DeepMind Institute · 成立公告与创办者职衔
- 链接：https://institute.deepmind.com/essays/introducing-the-deepmind-institute/
- 发布日期：2026-09-16
- 核验日期：2026-10-08

### google-demis-author

- 标题：Google · Demis Hassabis 作者资料
- 链接：https://blog.google/authors/demis-hassabis/
- 核验日期：2026-10-08

### sam-intelligence-age

- 标题：Sam Altman · The Intelligence Age
- 链接：https://ia.samaltman.com/
- 发布日期：2024-09-23
- 核验日期：2026-10-08

### sam-moores-law

- 标题：Sam Altman · Moore's Law for Everything
- 链接：https://moores.samaltman.com/
- 发布日期：2021-03-16
- 核验日期：2026-10-08

### sam-reflections

- 标题：Sam Altman · Reflections
- 链接：https://blog.samaltman.com/reflections
- 发布日期：2025-01
- 核验日期：2026-10-08

### senate-altman-testimony-2023

- 标题：Sam Altman / 美国参议院司法委员会 · 2023 年 5 月 16 日书面证词
- 链接：https://www.judiciary.senate.gov/download/2023-05-16-testimony-altman
- 发布日期：2023-05-16
- 核验日期：2026-10-08

### brockman-leaving-stripe

- 标题：Greg Brockman · Leaving Stripe
- 链接：https://blog.gregbrockman.com/leaving-stripe
- 发布日期：2015-05-06
- 核验日期：2026-10-08

### quip-launch-2013

- 标题：Bret Taylor、Kevin Gibbs / Quip · Introducing Quip
- 链接：https://quip.com/blog/introducing-quip
- 发布日期：2013-07-31
- 核验日期：2026-10-08

### quip-salesforce-2016

- 标题：Bret Taylor、Kevin Gibbs / Quip · Quip + Salesforce = Big News（含 8 月 26 日交易完成更新）
- 链接：https://quip.com/blog/salesforce
- 发布日期：2016-08-01
- 核验日期：2026-10-08

### twitter-taylor-board-2016

- 标题：Twitter / SEC · 2016 年 7 月董事任命 Form 8-K
- 链接：https://www.sec.gov/Archives/edgar/data/1418091/000156459016021048/twtr-8k_20160705.htm
- 发布日期：2016-07-05
- 核验日期：2026-10-08

### twitter-taylor-chair-2021

- 标题：Twitter / SEC · Jack Dorsey steps down; Bret Taylor to Become Independent Chair
- 链接：https://www.sec.gov/Archives/edgar/data/1418091/000119312521342255/d401229dex991.htm
- 发布日期：2021-11-29
- 核验日期：2026-10-08

### twitter-board-end-2022

- 标题：Twitter / SEC · 收购完成及董事任期结束 Form 8-K（10 月 28 日签署）
- 链接：https://www.sec.gov/Archives/edgar/data/1418091/000119312522272772/d411753d8k.htm
- 发布日期：2022-10
- 核验日期：2026-10-08

### marquette-taylor-cto-2010

- 标题：Marquette University · Bret Taylor Becomes Facebook’s CTO（2010 年任命邮件的馆藏条目）
- 链接：https://epublications.marquette.edu/zuckerberg_files_transcripts/29/
- 发布日期：2010-06-02
- 核验日期：2026-10-08

### ilya-alexnet-2012

- 标题：Krizhevsky、Sutskever、Hinton · ImageNet Classification with Deep Convolutional Neural Networks
- 链接：https://www.cs.toronto.edu/~hinton/absps/imagenet.pdf
- 发布日期：2012
- 核验日期：2026-10-08

### ilya-gpt-pretraining-2018

- 标题：Radford 等 · Improving Language Understanding by Generative Pre-Training
- 链接：https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
- 发布日期：2018
- 核验日期：2026-10-08

### openai-language-unsupervised-2018

- 标题：Alec Radford / OpenAI · Improving language understanding with unsupervised learning
- 链接：https://openai.com/index/language-unsupervised/
- 发布日期：2018-06-11
- 核验日期：2026-10-08

### jakub-multi-agent-2017

- 标题：Bansal 等 · Emergent Complexity via Multi-Agent Competition
- 链接：https://arxiv.org/abs/1710.03748
- 发布日期：2017-10-10
- 核验日期：2026-10-08

### openai-competitive-self-play-2017

- 标题：OpenAI · Competitive self-play
- 链接：https://openai.com/index/competitive-self-play/
- 发布日期：2017-10-11
- 核验日期：2026-10-08

### jakub-openai-five-paper-2019

- 标题：OpenAI、Berner 等 · Dota 2 with Large Scale Deep Reinforcement Learning
- 链接：https://arxiv.org/abs/1912.06680
- 发布日期：2019-12-13
- 核验日期：2026-10-08

### paul-electrical-flows-2010

- 标题：Christiano 等 · Electrical Flows, Laplacian Systems, and Faster Approximation of Maximum Flow in Undirected Graphs
- 链接：https://arxiv.org/abs/1010.2921
- 发布日期：2010-10-14
- 核验日期：2026-10-08

### paul-human-preferences-explainer-2017

- 标题：Amodei、Christiano、Ray / OpenAI · Learning from human preferences
- 链接：https://openai.com/index/learning-from-human-preferences/
- 发布日期：2017-06-13
- 核验日期：2026-10-08

### dario-concrete-safety-2016

- 标题：Amodei 等 · Concrete Problems in AI Safety
- 链接：https://arxiv.org/abs/1606.06565
- 发布日期：2016-06-21
- 核验日期：2026-10-08

### dario-scaling-laws-2020

- 标题：Kaplan 等 · Scaling Laws for Neural Language Models
- 链接：https://arxiv.org/abs/2001.08361
- 发布日期：2020-01-23
- 核验日期：2026-10-08

### anthropic-constitutional-ai-2022

- 标题：Bai 等 · Constitutional AI: Harmlessness from AI Feedback
- 链接：https://arxiv.org/abs/2212.08073
- 发布日期：2022-12-15
- 核验日期：2026-10-08

### deepmind-atari-2013

- 标题：Mnih 等 · Playing Atari with Deep Reinforcement Learning
- 链接：https://arxiv.org/abs/1312.5602
- 发布日期：2013-12-19
- 核验日期：2026-10-08

### deepmind-alphafold3-2024

- 标题：Abramson 等 · Accurate structure prediction of biomolecular interactions with AlphaFold 3
- 链接：https://www.nature.com/articles/s41586-024-07487-w
- 发布日期：2024-05-08
- 核验日期：2026-10-08

### demis-queens-nobel-2024

- 标题：Queens’ College · Sir Demis Hassabis wins Nobel Prize in Chemistry
- 链接：https://www.queens.cam.ac.uk/about-us/news-events/sir-demis-hassabis-wins-nobel-prize-in-chemistry/
- 发布日期：2024-10-09
- 核验日期：2026-10-08

### simo-facebook-watch-2018

- 标题：Fidji Simo · Facebook Watch Is Going Global
- 链接：https://about.fb.com/news/2018/08/facebook-watch-global/
- 发布日期：2018-08-29
- 核验日期：2026-10-08

### simo-facebook-app-2019

- 标题：Mark Zuckerberg · A Note From Mark Zuckerberg
- 链接：https://about.fb.com/news/2019/03/a-note-from-mark-zuckerberg/
- 发布日期：2019-03-14
- 核验日期：2026-10-08

### instacart-platform-2022

- 标题：Instacart · Instacart Launches Instacart Platform with New Advertising, Fulfillment and Insights Solutions for Retailers
- 链接：https://company.instacart.com/pressreleases/instacart-launches-instacart-platform-with-new-advertising-fulfillment-and-insights-solutions-for-retailers
- 发布日期：2022-03-23
- 核验日期：2026-10-08

### instacart-simo-transition-2025

- 标题：Instacart · Instacart Appoints Chris Rogers as Chief Executive Officer
- 链接：https://investors.instacart.com/node/9511/pdf
- 发布日期：2025-05-28
- 核验日期：2026-10-09

### embl-alphafold-launch-2021

- 标题：EMBL-EBI · DeepMind and EMBL release the most complete database of predicted 3D structures of human proteins
- 链接：https://www.ebi.ac.uk/about/news/announcements/alphafold-database-launch/
- 发布日期：2021-07-22
- 核验日期：2026-10-08

### photo-bret-taylor-2024

- 标题：Wikimedia Commons · Bret Taylor 在 TechCrunch Disrupt 2024（照片及 CC BY 2.0 许可）
- 链接：https://commons.wikimedia.org/wiki/File:TechCrunch_Disrupt_2024_D2_Bret_Taylor-3.jpg
- 发布日期：2024-10-29
- 核验日期：2026-10-08

### photo-fidji-simo-2016

- 标题：Wikimedia Commons · Loïc Le Meur 拍摄 Fidji Simo（照片及 CC BY 2.0 许可）
- 链接：https://commons.wikimedia.org/wiki/File:Fidji_Simo_(cropped).jpg
- 发布日期：2016-02-29
- 核验日期：2026-10-08
