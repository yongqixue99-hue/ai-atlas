# 2026-10-08 人物背景复核

基线：[Claude 提交 77ab76bd](https://github.com/yongqixue99-hue/ai-atlas/commit/77ab76bd42e33ce949024a6ca79c64cd2f362e4a)。本轮保留首页地图、人物章节、深色模式及全部关系数据，优先完成交接清单中的传记核查。

## 覆盖范围与结果

- 原稿：10 篇、52 章、128 个正文段落、45 条速览，共 173 个内容单元。
- 每个原始单元都有一条审校说明和 SHA-256 指纹，见 [逐项审计](editorial-audit-2026-10-08.json)。正文中的复合句也逐项核查；统计单位仍是原段落和速览，不把它们称作 173 个“已证实事实”。
- 修订后：51 章、108 段正文、40 条速览。保留内容提供逐段、逐条来源；资料不足的细节删去或缩窄，没有按原篇幅补写。
- 新增 85 条来源记录；来源索引现在包含 154 条记录，其中也保留用于审校对照的旧维基来源。
- 自动测试检查引用能解析、章节来源恰好等于段落来源并集、审计覆盖和界面交互；不能以测试通过代替事实判断。

## 主要修正

- Sam / Greg / Ilya：区分 2015 年的共同主席、CTO、研究负责人和后来职位；初始资助者不自动列为创始成员。
- Greg：GPT-2 于 2019 年 2 月释出小模型，不能说成当时全部不公开；TED 现场日期采用 2023 年 4 月 18 日，区别于后续发布日。未能从直接打开页面取得的 GPT-4 直播细节未写入。
- Jakub：Simons 页面支持访问研究生、访问科学家身份，不能据此写成连续博士后任职；研究总监的精确晋升年份没有补猜。
- Mira：Davis UWC Scholar 身份依校方简介对应科尔比学院就读，不能直接移到 Pearson 中学；创意工作评论收窄为具名校报评论的归因。
- Bret：删除“收购 FriendFeed 之后才引入 Facebook 点赞按钮”的错误因果时序及未核实的交易价格。
- Dario：学位写成物理学博士、生物物理方向；Hertz 论文奖采用历届名单的 2012 年，同时记录人物简介里的年份冲突。
- Demis：CASP14 全部目标 GDT 中位数为 92.4，87.0 对应自由建模子集，不能混为整体成绩。
- Paul：Anthropic 长期利益信托公告脚注注明 2024 年 4 月离任，将其写为有结束时间的历史经历。
- 2023 年 OpenAI 回任记录区分协议达成时间和 11 月 29 日正式公告，不把后者当成唯一可能的复职生效日。

## 尚未完成的来源替换

Mira、Bret、Fidji 的出生或部分早期任职仍引用已打开核对的英文维基条目，并在页面标为二手汇编。其他七篇背景不再引用维基，但 Ilya 的事后声明、Mira 的离职及评论、Paul 的 NIST 任命争议仍有明确归因的媒体资料。因此不能说“十篇全部换成原始资料”。

Sam 的 TIME 名单仅用于入选事实，并有斯坦福文字稿交叉支持；异常返回赞助内容的 Fidji TIME 页面没有用于新增荣誉。旧学术主页只用于历史研究和教育，不用于证明现职。删去仅有二手支持、又非本轮主线的细节，不等于宣判那些细节为假。

## 职务与编辑决策

### Demis：新证据明确，图谱更新待确认

[Google CEO 的官方公告](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/)明确说明 Hassabis 转任 Google DeepMind 主席及 Alphabet 首席科学家，并交出日常运营职责。该页面正文抽取未显示发布日期，因此来源记录不填入未经正文确认的精确发布日期。

[2026 年 9 月 16 日 DeepMind Institute 成立公告](https://institute.deepmind.com/essays/introducing-the-deepmind-institute/)直接显示日期，并列出上述两个新职衔；[Google 作者资料](https://blog.google/authors/demis-hassabis/)一致。旧 About 页仍用 CEO，本轮给该来源标题加上冲突说明，人物页在旧职务旁显示证据提示。按交接要求，人物 role、关系 status、时间线尚未修改。后续应获确认后一起更新，不单改一个标签，也不臆造精确生效日。

### Fidji：保留现有顾问身份

[本人公开说明](https://www.linkedin.com/posts/fidjisimo_today-i-shared-with-the-openai-team-that-activity-7481120077711425536-e03r)及 [Nscale 2026 年 9 月 11 日公告](https://www.nscale.com/press-releases/fidji-simo-joins-nscale-board-of-directors)支持已离开全职岗位、继续担任顾问。无需根据维基的较旧现任写法改回 CEO of AGI Deployment。未从相对时间反推出本人帖文的发布日期。

### 敏感段落

Ilya 的个人表决及全员会措辞未独立证实，改用公司公告中董事身份与 TIME 所报道的参与后悔声明；Mira 的批評限定为具名作者；Paul 的任命与匿名反对报道拆开，后一段明确写为 VentureBeat 报道。保留这些议题的整体编辑选择仍待维护者统一决定。政治捐款未新增，家庭、财富与无关私人细节不扩展。

## 后续

1. 决定是否按已核实的 9 月 16 日角色快照同步更新 Demis 的人物、关系和时间线。
2. 继续寻找三篇剩余二手细节的原始来源。
3. 再推进 Brad Lightcap、Thibault Sottiaux 背景章节及图片清单。
