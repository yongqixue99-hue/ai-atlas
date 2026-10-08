// Background chapters for person dossiers: early life, education, career and public
// positions beyond the roles the atlas tracks. Compiled on 2026-10-08 from each
// person's English Wikipedia entry, a secondary source; role and governance facts
// stay with the primary announcements cited in data.ts. Nothing here is inferred
// beyond the cited entry. Private life, wealth, political donations, litigation and
// unverified 2026 changes of office are deliberately left out.
export interface Chapter {
  title: string;
  text: string[];
  sourceIds: string[];
}
export interface Profile {
  facts: [string, string][];
  chapters: Chapter[];
}

export const profiles: Record<string, Profile> = {
  "sam-altman": {
    facts: [
      ["出生", "1985 年 4 月 22 日 · 美国芝加哥"],
      ["成长", "密苏里州克莱顿"],
      ["教育", "斯坦福大学计算机科学，2005 年肄业"],
      ["此前", "Loopt 联合创始人 · Y Combinator 总裁"],
      ["荣誉", "2023 年《时代》周刊百大人物"],
    ],
    chapters: [
      {
        title: "早年与教育",
        text: [
          "Altman 1985 年 4 月 22 日生于芝加哥。1989 年，他随家人迁往密苏里州克莱顿。8 岁时他得到了人生第一台电脑，一台苹果 Macintosh，并从那时开始学习编程。",
          "他中学就读于拉杜的私立学校 John Burroughs School，之后进入斯坦福大学学习计算机科学。读了两年后，他在 2005 年离校，没有取得学士学位。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
      {
        title: "Loopt：第一次创业",
        text: [
          "离开斯坦福的同一年，19 岁的 Altman 参与创办了 Loopt 并出任 CEO。这是一款基于位置的手机社交应用：公司向移动运营商购买地理位置数据，试图搭建一张能实时看到朋友位置的网络。",
          "Loopt 先后筹得超过 3000 万美元的风险投资，其中首笔为 500 万美元，后续投资方包括红杉资本和 Y Combinator。但产品始终没有获得足够多的用户。2012 年 3 月，Green Dot 以 4340 万美元收购了 Loopt。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
      {
        title: "执掌 Y Combinator",
        text: [
          "2011 年，Altman 以兼职合伙人的身份加入 Y Combinator。2014 年 2 月，他接替 Paul Graham 出任总裁，提出的目标是让 YC 每年资助 1000 家新公司，并把投资范围扩展到“硬科技”创业公司。2016 年 9 月，他改任 YC Group 总裁，这一架构包含 Y Combinator 及其他部门。",
          "这一时期他还短暂执掌过 Reddit：2014 年，时任 CEO Yishan Wong 辞职后，他出任 CEO 八天；2015 年 7 月 10 日，他宣布 Steve Huffman 回归担任 CEO。他参与了 Reddit 在 2014、2015 和 2021 年的多轮融资，留在董事会直到 2022 年；Reddit 2024 年 2 月的上市文件显示，他是第三大股东，持股约 9%。",
          "2019 年 3 月，他卸任 YC 职务，全职投入 OpenAI。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
      {
        title: "创办 OpenAI",
        text: [
          "2015 年，OpenAI 以非营利组织的形式成立，创办者包括 Altman、Greg Brockman、Elon Musk、Peter Thiel、Jessica Livingston 等人，成立时各方承诺的出资总额为 10 亿美元。OpenAI 在 2019 年表示，承诺的资金中实际到位的是 1.3 亿美元。",
          "Altman 当时把 AI 安全和通用人工智能可能带来的生存风险列为创办动因，并主张开源的 AI 能让使用者对抗恶意行为者，从而降低风险。他参与招募了 Ilya Sutskever 和 Dario Amodei，并表示这会是一项持续数十年的工作。",
          "2018 年，Musk 以与特斯拉的 AI 研发存在潜在利益冲突为由，辞去 OpenAI 董事会职务。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
      {
        title: "出任 CEO 与 2023 年 11 月",
        text: [
          "2019 年 3 月起，Altman 全职担任 OpenAI CEO。2022 年 11 月底，OpenAI 推出基于 GPT-3.5 的 ChatGPT 免费预览版，五天内注册用户超过一百万。",
          "2023 年 5 月 16 日，他在美国参议院司法委员会下属的隐私、技术与法律小组委员会就 AI 监管作证；同月他开始一次全球行程，到访 22 个国家，会见了多国政府首脑。当年他入选《时代》周刊百大人物。",
          "2023 年 11 月 17 日，OpenAI 董事会解除了他的 CEO 职务，理由是他在与董事会的沟通中“并非始终坦诚”；Brockman 同时被移出董事会，并于当天辞去总裁职务。11 月 20 日，微软 CEO Satya Nadella 宣布 Altman 将加入微软，带领新的高级 AI 研究团队。员工发起的公开信最初有 505 人签名，后来在 770 名员工中超过 700 人签署。11 月 21 日，他与 Brockman 回到 OpenAI；Bret Taylor 出任董事会主席，Lawrence Summers 加入董事会，Adam D'Angelo 留任。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
      {
        title: "投资、其他公司与公共立场",
        text: [
          "2012 年 4 月，Altman 与弟弟 Jack 共同创办 Hydrazine Capital，首期基金 2100 万美元，其中约 75% 投给了 Y Combinator 的公司。他的个人投资包括 Humane、Retro Biosciences、Boom Technology、Cruise 和 Instacart。",
          "2019 年，他与 Alex Blania 共同创办 Worldcoin 背后的公司 Tools for Humanity。他担任核聚变公司 Helion Energy 的董事会主席。2021 年 3 月，他与 Michael Klein 共同发起 AltC Acquisition Corp 并任 CEO；2024 年 5 月，这家公司与 Oklo 合并使后者上市，他出任董事长，直到 2025 年 4 月卸任。这些职务与他在 OpenAI 的身份相互独立，本图谱没有把它们画成 OpenAI 的关系。",
          "在公共议题上，他 2021 年发表文章《Moore's Law for Everything》，主张 AI 创造的财富可以在十年内支撑每年 13500 美元的全民基本收入；2024 年他又提出“全民基本算力”的设想。2026 年 4 月，他对《大西洋月刊》表示，自己已不像过去那样相信全民基本收入。2017 年，他获得 Ric Weiland 奖。",
        ],
        sourceIds: ["wiki-sam-altman"],
      },
    ],
  },
  "greg-brockman": {
    facts: [
      ["出生", "1987 年 11 月 29 日 · 美国北达科他州汤普森"],
      ["教育", "先后就读哈佛大学与麻省理工学院，均未毕业"],
      ["竞赛", "2006 年国际化学奥林匹克银牌"],
      ["此前", "Stripe 首任 CTO"],
    ],
    chapters: [
      {
        title: "早年与竞赛",
        text: [
          "Brockman 1987 年 11 月 29 日生于北达科他州汤普森，中学就读于 Red River High School，数学、化学和计算机科学成绩突出。2003、2005 和 2007 年，他三次参加面向数学特长高中生的暑期项目 Canada/USA Mathcamp。",
          "2006 年，他在国际化学奥林匹克获得银牌。2007 年，他入围 Intel Science Talent Search 决赛，是北达科他州自 1973 年以来的第一位决赛选手。",
        ],
        sourceIds: ["wiki-greg-brockman"],
      },
      {
        title: "哈佛、MIT 与 Stripe",
        text: [
          "2008 年，Brockman 进入哈佛大学，大约一年后离开，之后短暂就读于麻省理工学院。两所学校他都没有读完。",
          "2010 年，他从麻省理工学院退学，加入 Stripe。这家公司由他在麻省理工学院的同学 Patrick Collison 与 John Collison 创办，他是最早的员工之一。2013 年，他成为 Stripe 的首任 CTO；条目记载，这一阶段 Stripe 的规模从 5 人增长到 205 人。2015 年 5 月，他离开 Stripe。",
        ],
        sourceIds: ["wiki-greg-brockman"],
      },
      {
        title: "组建 OpenAI",
        text: [
          "2015 年，Brockman 与 Sam Altman、Elon Musk 会面后，牵头招募 OpenAI 的创始团队，从其他机构的高薪职位上请来了包括 Ilya Sutskever 在内的研究者。同年 12 月，OpenAI 成立；最初一段时间，这家机构就在他家的客厅里办公。",
          "他是联合创始人兼总裁，也担任过 CTO，并在 2017 至 2023 年间是董事会成员。在研究与工程上，他主持了 OpenAI Gym 和 Dota 2 机器人项目 OpenAI Five。",
          "他也常常是 OpenAI 对外展示成果的人。2019 年 2 月 14 日，OpenAI 公布 GPT-2，但因担心被滥用而暂不公开，同年 5 月才向少量测试者开放。2023 年 3 月 14 日，他在直播中演示了 GPT-4；4 月 20 日，他在 TED 上讲述了 ChatGPT 的潜力。",
        ],
        sourceIds: ["wiki-greg-brockman"],
      },
      {
        title: "2023 年 11 月的五天",
        text: [
          "2023 年 11 月 17 日，在 Altman 被解职的同时，Brockman 被告知已被移出董事会。按原安排他将向临时 CEO Mira Murati 汇报，但他在当天宣布离开公司。",
          "11 月 20 日，微软 CEO Satya Nadella 宣布他与 Altman 将加入微软，带领新的高级 AI 研究团队。11 月 21 日，随着让 Altman 复职的协议达成，他回到 OpenAI。董事会重组后，Bret Taylor 接替他出任董事会主席。",
        ],
        sourceIds: ["wiki-greg-brockman", "wiki-bret-taylor"],
      },
      {
        title: "长假之后",
        text: [
          "2024 年 8 月至 11 月，Brockman 休了一段长假；路透社在 11 月 12 日报道他返回 OpenAI。",
          "2025 年 11 月，《财富》杂志的一篇报道称他为 OpenAI 的“首席建设者”，负责把 Altman 的数据中心计划变为现实。早在 2017 年，他入选过《福布斯》企业科技领域的 30 位 30 岁以下人物。",
        ],
        sourceIds: ["wiki-greg-brockman"],
      },
    ],
  },
  "ilya-sutskever": {
    facts: [
      ["出生", "1986 年 · 苏联高尔基（今俄罗斯下诺夫哥罗德）"],
      ["成长", "以色列耶路撒冷，16 岁移居加拿大"],
      ["教育", "多伦多大学数学学士（2005）、计算机科学硕士（2007）与博士（2013）"],
      ["导师", "Geoffrey Hinton"],
      ["荣誉", "2022 年当选英国皇家学会会士"],
    ],
    chapters: [
      {
        title: "三个国家的少年时代",
        text: [
          "Sutskever 1986 年生于苏联高尔基，即今天俄罗斯的下诺夫哥罗德。5 岁时，他随家人移民以色列，在耶路撒冷长大。八年级时，他已经开始在以色列开放大学修课。",
          "16 岁时他迁往加拿大，以三年级本科生的身份被多伦多大学 University College 录取。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
      {
        title: "多伦多大学与 AlexNet",
        text: [
          "他在多伦多大学一路读完三个学位：2005 年数学学士，2007 年计算机科学硕士，2013 年计算机科学博士。博士导师是 Geoffrey Hinton，论文题为《Training recurrent neural networks》。",
          "2012 年，他与 Hinton、Alex Krizhevsky 一起构建了卷积神经网络 AlexNet。三人合著的论文《ImageNet Classification with Deep Convolutional Neural Networks》发表于当年的 NeurIPS，2017 年又刊登在《Communications of the ACM》上。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
      {
        title: "斯坦福、DNNResearch 与 Google Brain",
        text: [
          "2012 年，Sutskever 在斯坦福大学 Andrew Ng 的团队做了大约两个月博士后，随后回到多伦多大学，加入 Hinton 新成立的公司 DNNResearch，这是从 Hinton 研究组分拆出来的。",
          "2013 年，谷歌收购 DNNResearch，他成为 Google Brain 的研究科学家。在谷歌，他与 Oriol Vinyals、Quoc Viet Le 合作提出序列到序列学习算法（2014 年论文），参与了 TensorFlow 的工作，也是 2016 年 AlphaGo 论文的众多作者之一。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
      {
        title: "OpenAI 首席科学家",
        text: [
          "2015 年底，Sutskever 离开谷歌，成为 OpenAI 的联合创始人兼首席科学家，并在 2017 至 2023 年间担任非营利董事会成员。",
          "其维基百科条目认为，是他确立了 OpenAI 依靠规模扩展的研究取向，他在 ChatGPT 的开发中起了关键作用，并主持了后来通向 o1 等推理模型的研究；条目也把 CLIP 和 DALL-E 列入他的贡献。2023 年，他宣布与 Jan Leike 共同领导“超级对齐”项目，目标是在四年内解决超级智能的对齐问题。",
          "他对技术走向的公开表态不多，但常引起讨论：2022 年他发推称今天的大型神经网络“有一点点意识”，引发了关于 AI 意识的争论；2023 年他写道，超级智能看似遥远，却可能在这个十年内出现。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
      {
        title: "2023 年 11 月与离开",
        text: [
          "2023 年 11 月，OpenAI 董事会解除 Altman 的职务，理由是他对董事会并非始终坦诚。据其维基百科条目，Sutskever 参与了这次表决，并在随后的全员会议上称这是“董事会在履行职责”。",
          "接下来的一周里，他公开表示后悔：“我对自己参与了董事会的行动感到遗憾。”大约一周后 Altman 复职，Sutskever 退出董事会。",
          "2024 年 5 月，他宣布离开 OpenAI，去做一个“对我个人非常有意义”的新项目。与他共同领导超级对齐项目的 Jan Leike 在数小时后也宣布离职。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
      {
        title: "SSI 与学术荣誉",
        text: [
          "2024 年 6 月，Sutskever 宣布与 Daniel Gross、Daniel Levy 共同创办 Safe Superintelligence（SSI），在帕洛阿尔托和特拉维夫设有办公室。他表示，公司的“第一个产品将是安全的超级智能”，在此之前不会做别的事。",
          "2024 年 9 月，SSI 从 Andreessen Horowitz、红杉资本、DST Global 和 SV Angel 等机构筹得 10 亿美元；2025 年 3 月再融资 20 亿美元，据报道估值达到 320 亿美元。2025 年 6 月，公司拒绝了 Meta 的收购提议；此后 Gross 离开并加入 Meta，Sutskever 接任 CEO。",
          "学术荣誉方面，他 2015 年入选《麻省理工科技评论》35 岁以下创新者，2022 年当选英国皇家学会会士，2022、2023 和 2024 年连续获得 NeurIPS 时间检验奖，2023 和 2024 年入选《时代》周刊 AI 领域百人榜，2025 年获多伦多大学荣誉博士学位。",
        ],
        sourceIds: ["wiki-ilya-sutskever"],
      },
    ],
  },
  "mira-murati": {
    facts: [
      ["出生", "1988 年 12 月 16 日 · 阿尔巴尼亚发罗拉"],
      ["教育", "科尔比学院文学士（2011）· 达特茅斯学院工程学士（机械工程，2012）"],
      ["此前", "Tesla Model X 产品经理 · Leap Motion 产品与工程负责人"],
      ["荣誉", "2024 年达特茅斯学院荣誉理学博士"],
    ],
    chapters: [
      {
        title: "从发罗拉到温哥华岛",
        text: [
          "Murati 1988 年 12 月 16 日生于阿尔巴尼亚发罗拉，能流利使用英语和意大利语。",
          "16 岁时，她通过 Davis United World College Scholars 项目前往加拿大温哥华岛，就读于 Pearson College UWC，并在 2007 年取得国际文凭（IB）。",
        ],
        sourceIds: ["wiki-mira-murati"],
      },
      {
        title: "两个学位与早期工作",
        text: [
          "她通过双学位项目在美国完成本科：2011 年获科尔比学院文学士，2012 年获达特茅斯学院工程学士，专业是机械工程。",
          "2011 年，她在高盛东京做过暑期分析师实习，也曾在 Zodiac Aerospace 短暂实习。2013 年她加入 Tesla，担任 Model X 的产品经理，直到 2016 年。2016 至 2018 年，她在增强现实创业公司 Leap Motion（今 Ultraleap）负责产品与工程。",
        ],
        sourceIds: ["wiki-mira-murati"],
      },
      {
        title: "在 OpenAI：从合作副总裁到 CTO",
        text: [
          "2018 年，Murati 加入 OpenAI，担任应用 AI 与合作伙伴关系副总裁，2022 年 5 月升任 CTO。在这个位置上，她主持了 ChatGPT、DALL-E、Codex 和 Sora 的相关工作，同时管理研究、产品和安全团队。",
          "2022 年春，她在美国人文与科学院的刊物《Daedalus》上发表文章《Language & Coding Creativity》。2023 年 10 月，她在《财富》杂志“商界最具影响力的 100 位女性”榜单上列第 57 位。",
          "2024 年 6 月，她在达特茅斯学院塞耶工程学院的一次对谈中说，一些内容质量不高的创意类工作可能会消失，这一说法受到作家、艺术家和达特茅斯学生的批评。同月，达特茅斯学院授予她荣誉理学博士学位。",
        ],
        sourceIds: ["wiki-mira-murati"],
      },
      {
        title: "临时 CEO 的三天与离任",
        text: [
          "2023 年 11 月 17 日，OpenAI 董事会解除 Altman 职务后，Murati 出任临时 CEO。大约三天后，她被 Emmett Shear 接替；再过两天左右，Altman 复职，Shear 离开，她回到 CTO 的岗位。",
          "2024 年 9 月 25 日，她宣布卸任 CTO，理由是希望有机会“做自己的探索”。首席研究官 Bob McGrew 和研究副总裁 Barret Zoph 随后也宣布离开。",
        ],
        sourceIds: ["wiki-mira-murati"],
      },
      {
        title: "Thinking Machines Lab",
        text: [
          "2025 年 2 月，Murati 创办的 Thinking Machines Lab 公开亮相。这是一家公益公司（public benefit corporation），宣布的使命是“让 AI 系统被更广泛地理解、可定制、并具备更通用的能力”。",
          "据报道，公司从 Meta、Mistral 和 OpenAI 招募了约 30 名研究员和工程师，OpenAI 联合创始人 John Schulman 参与其中，Alec Radford 和 Bob McGrew 担任顾问。",
          "融资方面，由 Andreessen Horowitz 领投的一轮融资使公司估值达到 120 亿美元（2025 年 7 月报道），阿尔巴尼亚政府也参与了投资。在治理上，Murati 在董事会事项上拥有加权的决定性一票。2025 年 10 月，公司发布首个产品 Tinker，一款用于创建定制前沿模型的工具。",
        ],
        sourceIds: ["wiki-mira-murati"],
      },
    ],
  },
  "dario-amodei": {
    facts: [
      ["出生", "1983 年 · 美国旧金山"],
      ["教育", "斯坦福大学物理学学士 · 普林斯顿大学生物物理学博士（2011）"],
      ["导师", "Michael J. Berry · William Bialek"],
      ["此前", "百度 · Google Brain · OpenAI 研究副总裁"],
      ["荣誉", "2025、2026 年《时代》周刊百大人物"],
    ],
    chapters: [
      {
        title: "家庭与求学",
        text: [
          "Amodei 1983 年生于旧金山，妹妹 Daniela 比他小四岁，后来与他一同创办了 Anthropic。父亲 Riccardo Amodei 是来自意大利托斯卡纳马萨马里蒂马的意大利裔皮革匠人，在他 23 岁时去世；母亲 Elena Engel 生于芝加哥，曾做图书馆项目经理。",
          "他毕业于旧金山的 Lowell High School，2000 年入选美国物理奥林匹克代表队。大学起初就读于加州理工学院，是 Tom Tombrello 的 Physics 11 课程学生之一，之后转入斯坦福大学，取得物理学学士学位。",
        ],
        sourceIds: ["wiki-dario-amodei"],
      },
      {
        title: "普林斯顿：从物理到神经回路",
        text: [
          "Amodei 在普林斯顿大学攻读生物物理学博士，导师是 Michael J. Berry 和 William Bialek。2007 年，他在读期间获得 Hertz 基金会奖学金。",
          "2011 年，他完成博士论文《Network-Scale Electrophysiology: Measuring and Understanding the Collective Behavior of Neural Circuits》，研究如何测量和理解神经回路的集体行为，并因这项工作获得 Hertz 论文奖。此后他在斯坦福大学医学院做博士后。",
        ],
        sourceIds: ["wiki-dario-amodei"],
      },
      {
        title: "百度、Google Brain 与 OpenAI",
        text: [
          "2014 年 11 月至 2015 年 10 月，Amodei 在百度工作，随后加入 Google Brain 从事机器学习研究。",
          "2016 年他加入 OpenAI，参与了 GPT-2、GPT-3 以及基于人类反馈的强化学习的研发，后来出任研究副总裁。他是 2017 年论文《Deep reinforcement learning from human preferences》的作者之一，这篇论文的合作者中还有后来同样出现在本图谱里的 Paul Christiano。",
          "条目记载，他与妹妹因方向上的分歧离开了 OpenAI。",
        ],
        sourceIds: ["wiki-dario-amodei", "wiki-paul-christiano"],
      },
      {
        title: "创办 Anthropic",
        text: [
          "2021 年，Amodei 与妹妹 Daniela 以及另外五位前 OpenAI 成员共同创办 Anthropic，其中包括 Jared Kaplan 和 Chris Olah。他出任 CEO，这家公司此后推出了 Claude 系列大语言模型。",
          "2023 年 11 月 OpenAI 董事会风波期间，据路透社 11 月 21 日报道，OpenAI 董事会曾接触他，探讨由他接替 Altman 以及两家公司合并的可能；两项提议他都拒绝了。",
        ],
        sourceIds: ["wiki-dario-amodei"],
      },
      {
        title: "长文与公共立场",
        text: [
          "Amodei 习惯用长文阐述判断。2024 年 10 月 11 日，他发表《Machines of Loving Grace》，认为 AI 有可能极大地推进生物学、神经科学、经济发展与全球和平，并改变工作与意义。同年他提出“协约”（entente）的主张：民主国家应在强大 AI 上保持领先，并在合作的民主国家之间分享收益；12 月接受《金融时报》采访时，他重申民主国家必须保持领先，支持的政策工具包括半导体出口管制。",
          "他同时反复谈论风险。2025 年 9 月，他对 Axios 表示，事情“变得非常、非常糟糕”的可能性是 25%。2026 年 1 月，他发表《The Adolescence of Technology》，把风险归为五类：失准的自主系统、被用于大规模破坏、被用于夺取权力、经济冲击，以及间接影响。文中提出，AI 可能在一到五年内取代一半的入门级白领岗位。",
        ],
        sourceIds: ["wiki-dario-amodei"],
      },
      {
        title: "2026 年与美国国防部的分歧",
        text: [
          "2026 年 2 月，美国国防部要求 Anthropic 取消合同中的一项禁令，即不得将 Claude 用于大规模国内监控或完全自主武器。Amodei 拒绝了这一要求。",
          "2 月下旬，Anthropic 被国防部列为“供应链风险”，特朗普政府下令各机构停止使用 Claude。3 月 26 日，一名联邦法官对国防部发出了临时禁令。",
          "荣誉方面，他 2025 年和 2026 年两度入选《时代》周刊百大人物，2026 年与妹妹 Daniela 一同入选；2025 年，他还作为“AI 的缔造者”之一出现在《时代》年度人物中。",
        ],
        sourceIds: ["wiki-dario-amodei"],
      },
    ],
  },
  "demis-hassabis": {
    facts: [
      ["出生", "1976 年 7 月 27 日 · 英国伦敦"],
      ["教育", "剑桥大学计算机科学双一等（1997）· 伦敦大学学院认知神经科学博士（2009）"],
      ["导师", "Eleanor Maguire"],
      ["棋力", "13 岁达到大师水平，等级分 2300"],
      ["荣誉", "2024 年诺贝尔化学奖 · 2024 年受封爵士"],
    ],
    chapters: [
      {
        title: "棋童与第一台电脑",
        text: [
          "Hassabis 1976 年 7 月 27 日生于伦敦，在北伦敦长大，父亲是希腊裔塞浦路斯人，母亲是新加坡华人。他 4 岁时看父亲和叔叔下棋，由此学会了国际象棋；13 岁达到大师水平，等级分 2300，多次担任英格兰少年队队长，拥有候选大师头衔。",
          "1984 年，他用下棋赢来的奖金买了一台 ZX Spectrum 48K，靠看书自学编程。他写的第一个 AI 程序运行在 Commodore Amiga 上，用来下黑白棋。",
          "他 1988 至 1990 年就读于巴尼特的 Queen Elizabeth's School，之后在家由父母教了一年，再转入芬奇利的 Christ's College。16 岁时，他比同龄人提前两年完成了 A-level 考试。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
      {
        title: "Bullfrog 与剑桥",
        text: [
          "Hassabis 参加《Amiga Power》杂志举办的“赢取 Bullfrog 工作机会”比赛，由此进入游戏公司 Bullfrog，从测试 1993 年的《Syndicate》做起。17 岁时，他与 Peter Molyneux 共同设计了 1994 年发行的《Theme Park》并担任主程序员。这款游戏卖出数百万份，带动了一类模拟经营游戏的出现。他在间隔年里挣到的钱足以支付自己的大学学费。",
          "他进入剑桥大学 Queens' College 攻读计算机科学，1997 年以双一等成绩毕业。在校期间，他在 1995、1996 和 1997 年三次代表剑桥参加牛津剑桥国际象棋对抗赛。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
      {
        title: "Lionhead、Elixir 与智力运动",
        text: [
          "毕业后，他加入 Peter Molyneux 创办的 Lionhead Studios，担任《Black & White》（2001）的 AI 主程序员。",
          "1998 年，他离开 Lionhead，在伦敦创办独立游戏工作室 Elixir Studios，先后与 Eidos Interactive、Vivendi Universal 和微软签下发行协议，并担任《Republic: The Revolution》和《Evil Genius》的执行设计师。2005 年 4 月，工作室把知识产权和技术出售给多家发行商后关闭。",
          "这些年里他也是智力运动奥林匹克的常客：1998、1999、2000、2001 和 2003 年五次获得 Pentamind 世界冠军，2003 和 2004 年两次获得 Decamentathlon 世界冠军。他还在 2004 年获得《外交》游戏世界团体冠军，并六次在世界扑克大赛中进入奖金圈。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
      {
        title: "转向神经科学",
        text: [
          "此后 Hassabis 进入伦敦大学学院 Queen Square 神经病学研究所，师从 Eleanor Maguire，2009 年取得认知神经科学博士学位，论文题为《Neural Processes Underpinning Episodic Memory》。",
          "他的第一篇学术论文 2007 年发表于《PNAS》，显示海马体受损的失忆症患者同样无法想象新的经历。他据此提出，“场景构建”是回忆与想象共用的关键过程。这项关于想象的研究被《科学》杂志列入当年十大突破。",
          "他曾在麻省理工学院 Tomaso Poggio 的实验室和哈佛大学做访问学者。2009 年，他成为伦敦大学学院 Gatsby 计算神经科学中心的 Henry Wellcome 博士后研究员，与 Peter Dayan 合作。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
      {
        title: "DeepMind 与 AlphaGo",
        text: [
          "2010 年，Hassabis 与 Shane Legg、Mustafa Suleyman 共同创办 DeepMind。公司提出的使命是先“解决智能”，再用它“解决其他一切”，方法是把系统神经科学与机器学习结合起来。",
          "2013 年 12 月，DeepMind 公布了深度 Q 网络，它只凭屏幕像素就能以超出人类的水平玩 Atari 游戏。2014 年，谷歌以 4 亿英镑收购 DeepMind，公司继续留在伦敦，保持较大的独立性。",
          "AlphaGo 在 2015 年 10 月以 5 比 0 击败欧洲冠军樊麾，2016 年 3 月以 4 比 1 击败李世石，2017 年以 3 比 0 击败柯洁。2016 年 7 月，DeepMind 还报告称，其系统把谷歌数据中心的冷却能耗降低了 40%。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
      {
        title: "AlphaFold、公共角色与荣誉",
        text: [
          "2018 年 12 月，AlphaFold 在 CASP13 竞赛中胜出，43 个蛋白质里有 25 个的结构预测是所有参赛者中最准确的。2020 年 11 月，AlphaFold 2 在 CASP14 上取得 87.0 的 GDT 中位数，竞赛组织者表示这个问题已基本得到解决。此后，DeepMind 与 EMBL-EBI 合作建立 AlphaFold 蛋白质结构数据库，2022 年 7 月宣布公开约 2 亿个蛋白质的预测结构。",
          "2021 年，他参与创办专注 AI 药物研发的 Isomorphic Labs 并担任 CEO。他 2018 年出任英国政府人工智能办公室顾问，2022 年出任英国高级研究与发明署（ARIA）顾问。在 AI 风险上，他 2023 年签署了关于 AI 可能导致人类灭绝风险的声明，并在同年 10 月表示，应当像对待气候危机一样认真对待 AI 风险。",
          "他 2017 年获颁 CBE 并当选英国皇家工程院院士，2018 年当选英国皇家学会会士，2023 年获得拉斯克奖、生命科学突破奖和加拿大盖尔德纳国际奖，2024 年与 John M. Jumper 因蛋白质结构预测分享诺贝尔化学奖，同年因对人工智能的贡献受封爵士。",
        ],
        sourceIds: ["wiki-demis-hassabis"],
      },
    ],
  },
  "bret-taylor": {
    facts: [
      ["出生", "1980 年 · 美国加州奥克兰"],
      ["教育", "斯坦福大学计算机科学学士（2002）与硕士（2003）"],
      ["此前", "Google Maps 共同创造者 · Facebook CTO · Salesforce 联席 CEO"],
      ["现任", "Sierra 联合创始人"],
    ],
    chapters: [
      {
        title: "东湾与斯坦福",
        text: [
          "Taylor 1980 年生于加州奥克兰，主要在旧金山湾区东岸长大，1998 年毕业于拉斐特的 Acalanes High School。",
          "他在斯坦福大学先后取得计算机科学学士（2002）和硕士（2003）学位。",
        ],
        sourceIds: ["wiki-bret-taylor"],
      },
      {
        title: "Google 与 Google Maps",
        text: [
          "2003 年，Taylor 由 Marissa Mayer 招入 Google，从助理产品经理做起。他带领团队做出了 Search by Location 和 Google Local，这两个产品是 Google Maps 的前身；他也是 Google Maps 的共同创造者之一。",
          "2007 年 6 月，他离开 Google，以驻场创业者的身份加入风险投资机构 Benchmark Capital。",
        ],
        sourceIds: ["wiki-bret-taylor"],
      },
      {
        title: "FriendFeed 与 Facebook",
        text: [
          "在 Benchmark 期间，Taylor 与几位前 Google 同事在 2007 年共同创办了 FriendFeed，并担任 CEO。2009 年 8 月，Facebook 以估计 5000 万美元的价格收购了这家公司；Facebook 的“赞”按钮正是在这次收购之后从 FriendFeed 沿用而来。",
          "他随收购加入 Facebook，2010 年 6 月出任 CTO。2012 年，他离开 Facebook 再次创业。",
        ],
        sourceIds: ["wiki-bret-taylor"],
      },
      {
        title: "Quip 与 Salesforce",
        text: [
          "2012 年，Taylor 创办 Quip，一家做协作办公软件的公司，与 Google Docs 竞争。2016 年，Quip 被 Salesforce 收购。",
          "在 Salesforce，他 2017 年出任首席产品官，2019 年升任总裁兼 COO。在 COO 任上，他主导了对 Slack 的收购（2021 年完成），牵头搭建 Customer 360 系统，并设立了助理产品经理培养项目。2021 年 11 月，他被任命为副董事长，并与 Marc Benioff 一同担任联席 CEO。",
          "2022 年 11 月 30 日，他宣布将卸任联席 CEO 和副董事长，于 2023 年 1 月底生效。",
        ],
        sourceIds: ["wiki-bret-taylor"],
      },
      {
        title: "董事会席位与 Sierra",
        text: [
          "2016 年 7 月，Twitter 宣布 Taylor 加入董事会；2021 年他出任董事长，直到 2022 年 10 月 Elon Musk 完成收购、董事会解散。2023 年，他加入 Shopify 董事会。",
          "2023 年 2 月，他与前 Google 高管 Clay Bavor 共同创办面向企业的 AI 公司 Sierra，方向是用 AI 重做客户服务。彭博社 2024 年 1 月报道，Sierra 将以接近 10 亿美元的估值获得融资。",
          "2023 年 11 月，在 Altman 短暂被解职又复职、OpenAI 董事会随之重组之后，他接替 Greg Brockman 出任 OpenAI 董事会主席。",
        ],
        sourceIds: ["wiki-bret-taylor"],
      },
    ],
  },
  "fidji-simo": {
    facts: [
      ["出生", "1985 年 10 月 5 日 · 法国塞特"],
      ["教育", "巴黎高等商学院管理学硕士，最后一年在 UCLA 安德森管理学院"],
      ["此前", "eBay 战略团队 · Facebook 应用负责人 · Instacart CEO"],
      ["荣誉", "2025 年《时代》周刊 AI 领域百人榜"],
    ],
    chapters: [
      {
        title: "塞特与两所商学院",
        text: [
          "Simo 1985 年 10 月 5 日出生，在法国南部的塞特长大。她是家里第一个高中毕业的人。",
          "她在巴黎高等商学院（HEC Paris）取得管理学硕士学位，课程的最后一年在加州大学洛杉矶分校安德森管理学院完成。",
        ],
        sourceIds: ["wiki-fidji-simo"],
      },
      {
        title: "eBay",
        text: [
          "2007 至 2011 年，Simo 在 eBay 的战略团队工作，参与搭建本地商务和分类广告方面的业务。",
        ],
        sourceIds: ["wiki-fidji-simo"],
      },
      {
        title: "Facebook 的十年",
        text: [
          "2011 年，Simo 从 eBay 转入 Facebook，在那里工作了大约十年，最终出任副总裁、Facebook 应用负责人。",
          "她带领团队建立了 Facebook 的广告业务，并完成了移动端的商业化。产品上，她把自动播放视频引入信息流，主持打造并推出了 Facebook Live 和 Facebook Watch。",
          "这十年间，她先后负责过信息流、Stories、群组、视频、Marketplace、游戏、新闻、Dating 和广告等产品线的开发与策略。",
        ],
        sourceIds: ["wiki-fidji-simo"],
      },
      {
        title: "Instacart 与董事会席位",
        text: [
          "2021 年 1 月，Simo 加入 Instacart 董事会；7 月被任命为 CEO，8 月上任，接替转任执行董事长的 Apoorva Mehta。2023 年 9 月，Instacart 在纳斯达克上市，股票代码 CART，这次上市被认为结束了科技行业约二十年来最长的一段 IPO 空窗期；上市后，她接替 Mehta 兼任董事长。",
          "她 2021 年 12 月加入 Shopify 董事会，此前还担任过 L.A. Dance Project 和太阳马戏团的董事。",
          "在企业之外，她 2021 年 10 月参与创办 Metrodora Institute，一家专注神经免疫疾病的诊所兼研究中心。她公开谈到，自己多年求诊的经历是创办这家机构的动因之一。诊所 2023 年 4 月在犹他州盐湖城开业，2025 年 7 月 16 日停止临床运营；她同时是非营利组织 Complex Disorders Association 的创办人和主席。",
        ],
        sourceIds: ["wiki-fidji-simo"],
      },
      {
        title: "转入 OpenAI",
        text: [
          "2024 年 3 月，Simo 加入 OpenAI 董事会。2025 年 5 月 7 日，她宣布将在数月后卸任 Instacart CEO，转任 OpenAI 首任 CEO of Applications。",
          "她在 2025 年 8 月到任，向 Sam Altman 汇报，负责范围涵盖产品、业务、技术与工程等职能。她此后的职务变化，见下一章所引的公开记录。",
          "她多次入选商业榜单，包括《财富》40 位 40 岁以下精英（2016、2021 年）、《财富》最具影响力女性（2023 年）、CNBC Changemakers（2024 年）和《时代》周刊 AI 领域百人榜（2025 年）。",
        ],
        sourceIds: ["wiki-fidji-simo"],
      },
    ],
  },
  "paul-christiano": {
    facts: [
      ["教育", "麻省理工学院数学学位（2012）· 加州大学伯克利分校博士（2017）"],
      ["导师", "Umesh Vazirani"],
      ["竞赛", "2008 年国际数学奥林匹克银牌（美国队）"],
      ["此前", "OpenAI 语言模型对齐团队负责人 · Alignment Research Center 创办人"],
      ["荣誉", "2023 年《时代》周刊 AI 领域百人榜"],
    ],
    chapters: [
      {
        title: "数学竞赛与麻省理工",
        text: [
          "Christiano 中学就读于加州圣何塞的 Harker School。2008 年，他作为美国队成员参加第 49 届国际数学奥林匹克，获得银牌。",
          "2012 年，他从麻省理工学院毕业，取得数学学位。在校期间，他做过数据结构、量子密码学和组合优化方面的研究。",
        ],
        sourceIds: ["wiki-paul-christiano"],
      },
      {
        title: "伯克利的博士阶段",
        text: [
          "他在加州大学伯克利分校师从 Umesh Vazirani，2017 年取得博士学位，论文题为《Manipulation-resistant online learning》。",
          "读博期间，他与 Katja Grace 在 AI Impacts 项目上合作，共同提出一种用“每秒遍历边数”（TEPS）比较超级计算机与大脑的初步方法，《IEEE Spectrum》在 2015 年报道过这项工作。他还试验过 Carl Shulman 提出的“捐赠者彩票”设想，筹集了近 5 万美元，集中捐给一家慈善机构。",
        ],
        sourceIds: ["wiki-paul-christiano"],
      },
      {
        title: "在 OpenAI：对齐研究的四年",
        text: [
          "2017 至 2021 年，Christiano 在 OpenAI 领导语言模型对齐团队。2017 年，他与 Jan Leike、Tom Brown、Miljan Martic、Shane Legg 和 Dario Amodei 合著《Deep Reinforcement Learning from Human Preferences》。《时代》周刊和 Vox 都把他称为基于人类反馈的强化学习（RLHF）的主要设计者之一；《纽约时报》当年评价这项工作“被认为是 AI 安全研究上值得注意的一步”。",
          "2018 年，他参与发表《AI safety via debate》，探讨在人类难以直接判断结果的领域里如何对 AI 实行可扩展的监督；同年还有《Supervising strong learners by amplifying weak experts》。2021 年，他参与了《Recursively Summarizing Books with Human Feedback》。当年他离开 OpenAI。",
        ],
        sourceIds: ["wiki-paul-christiano"],
      },
      {
        title: "Alignment Research Center",
        text: [
          "2021 年 4 月 26 日，Christiano 宣布成立 Alignment Research Center（ARC）。这家机构专注概念性和理论性的对齐研究，包括为神经网络的行为寻找机制性解释的方法。",
          "同年 12 月，他与 Ajeya Cotra、Mark Xu 发表了关于“引出潜在知识”（eliciting latent knowledge）的研究文档。ARC 还开发了用于识别和测试 AI 模型是否具有潜在危险的技术；2023 年 4 月，他对《经济学人》表示，ARC 正在考虑制定一套 AI 安全的行业标准。",
          "2023 年 12 月，ARC 的评估团队 ARC Evals 分拆为独立的非营利机构 METR。",
        ],
        sourceIds: ["wiki-paul-christiano"],
      },
      {
        title: "风险判断与公共角色",
        text: [
          "Christiano 对风险的表述向来具体。2017 年《连线》杂志报道，他担心的不是“邪恶的机器人”，而是当 AI 超出人类理解之后，其行为偏离设计目标。2023 年，他在 Bankless 播客上估计“AI 接管”的可能性为 10% 至 20%，并推测在人类水平的 AI 出现后不久，出现灾难性结局的可能性大约是一半对一半。",
          "2023 年 9 月，他被任命为英国政府 Frontier AI Taskforce 顾问委员会成员。2024 年 4 月，他出任美国 AI 安全研究所（隶属 NIST）的 AI 安全负责人；此前的 3 月，VentureBeat 报道 NIST 有员工因他与有效利他主义运动的关联而反对这项任命，美国科学家联盟的 Divyansh Kaushik 则公开为他的资历辩护。",
          "他还是 Anthropic 长期利益信托的初始受托人之一，并在 2023 年入选《时代》周刊 AI 领域百人榜。他 2026 年进入 OpenAI 治理层的经过，见下一章所引的公开记录。",
        ],
        sourceIds: ["wiki-paul-christiano"],
      },
    ],
  },
  "jakub-pachocki": {
    facts: [
      ["出生", "1991 年 · 波兰格但斯克"],
      ["教育", "华沙大学计算机科学本科 · 卡内基梅隆大学博士"],
      ["导师", "Gary Miller"],
      ["竞赛", "2012 年 Google Code Jam 冠军"],
    ],
    chapters: [
      {
        title: "竞赛选手",
        text: [
          "Pachocki 1991 年生于波兰格但斯克。中学阶段，他六次进入波兰信息学奥林匹克决赛；2009 年，他入选国际信息学奥林匹克并获得银牌。",
          "此后几年是他竞赛成绩最集中的时期。2011 年他获得 Google Code Jam 第三名。2012 年，他代表华沙大学参加 ICPC 世界总决赛，所在队伍获得金牌、总成绩第二；同年他夺得 Google Code Jam 冠军，并在 TopCoder Open 算法组获得第二名。2013 年，他又获得 Facebook Hacker Cup 第二名。他在 Topcoder、Codeforces 等平台上使用的账号名是“meret”。",
        ],
        sourceIds: ["wiki-jakub-pachocki"],
      },
      {
        title: "华沙、匹兹堡与博士后",
        text: [
          "Pachocki 在华沙大学取得计算机科学本科学位。2011 至 2012 年，他在 Facebook 做过软件工程实习。",
          "此后他前往卡内基梅隆大学，师从 Gary Miller 攻读博士，论文《Graphs and Beyond: Faster Algorithms for High Dimensional Convex Optimization》完成于 2016 年，研究图以及高维凸优化的更快算法。",
          "博士毕业后，他先后在哈佛大学和 Simons 计算理论研究所做博士后。",
        ],
        sourceIds: ["wiki-jakub-pachocki"],
      },
      {
        title: "在 OpenAI：从研究员到首席科学家",
        text: [
          "2017 年，Pachocki 加入 OpenAI。其维基百科条目记载，他在 2021 年出任研究总监，领导过 GPT-4 和 Dota 2 项目 OpenAI Five 的研发。",
          "2024 年 5 月，在其导师 Ilya Sutskever 离开之后，他出任首席科学家。Sam Altman 当时称他“无疑是我们这一代最出色的头脑之一”。同年 10 月，《商业内幕》报道称，他正在领导一个代号为“Strawberry”的 AI 项目。",
        ],
        sourceIds: ["wiki-jakub-pachocki"],
      },
    ],
  },
};
