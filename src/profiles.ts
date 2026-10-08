// Background dossiers reviewed on 2026-10-08. Sources attach to individual
// fact rows and paragraphs; chapter sources are their exact union. A review
// date records editorial work, not an assertion that historical roles are current.
// Remaining secondary-source dependencies and pending role updates stay visible.
export interface Chapter {
  title: string;
  text: string[];
  sourceIds: string[];
  paragraphSourceIds: string[][];
}
export interface Profile {
  facts: [string, string, string[]][];
  chapters: Chapter[];
  reviewed: string;
  reviewNote: string;
  roleNote?: { text: string; sourceIds: string[] };
}

export const profiles: Record<string, Profile> = {
  "sam-altman": {
    "facts": [
      [
        "成长",
        "美国圣路易斯地区",
        [
          "sam-stanford-transcript"
        ]
      ],
      [
        "教育",
        "斯坦福大学计算机科学，读完两年后离校",
        [
          "sam-stanford-transcript"
        ]
      ],
      [
        "此前",
        "Loopt 联合创始人 · Y Combinator 总裁（2014—2019）",
        [
          "yc-loopt",
          "sam-stanford-transcript",
          "yc-group-2016"
        ]
      ],
      [
        "荣誉",
        "2023 年《时代》周刊百大人物",
        [
          "time-sam-2023"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "斯坦福与 Loopt",
        "text": [
          "Altman 在圣路易斯地区长大，随后进入斯坦福大学学习计算机科学。斯坦福大学公布的对谈文字稿记载，他读完两年后离校，将工作重心转向手机社交应用 Loopt。",
          "他参与创办的 Loopt 是 Y Combinator 2005 年夏季首批资助的公司之一。这款应用利用手机位置帮助用户发现附近的人、地点和活动；Y Combinator 的公司档案列出红杉资本和 New Enterprise Associates 为其投资方。",
          "2012 年 4 月 4 日，Green Dot 宣布已经完成对 Loopt 的收购。公告披露，交易以现金及与留任挂钩的激励支付，合计约 4300 万美元。"
        ],
        "sourceIds": [
          "sam-stanford-transcript",
          "yc-loopt",
          "yc-sam",
          "greendot-loopt-completed"
        ],
        "paragraphSourceIds": [
          [
            "sam-stanford-transcript"
          ],
          [
            "yc-loopt",
            "yc-sam"
          ],
          [
            "greendot-loopt-completed"
          ]
        ]
      },
      {
        "title": "执掌 Y Combinator",
        "text": [
          "2014 年 2 月 21 日，Paul Graham 宣布 Altman 将从下一批创业项目起担任 Y Combinator 总裁，由他领导机构的发展；Graham 则继续参与面向创业公司的咨询时间。",
          "2016 年 9 月，Altman 在署名公告中将自己的职称改为 YC Group 总裁。该架构包含 YC、YC Continuity、YC Research 和在线课程，他负责推动新部门的建立。Y Combinator 的作者简介将他的总裁任期记为 2014 至 2019 年。"
        ],
        "sourceIds": [
          "yc-sam",
          "yc-group-2016"
        ],
        "paragraphSourceIds": [
          [
            "yc-sam"
          ],
          [
            "yc-group-2016"
          ]
        ]
      },
      {
        "title": "创办 OpenAI",
        "text": [
          "2015 年 12 月 11 日，OpenAI 以非营利 AI 研究机构的身份公开成立。公告把 Altman 与 Elon Musk 列为共同主席，并披露初始资助者合计承诺提供 10 亿美元。",
          "2019 年 3 月 11 日，OpenAI 发布 OpenAI LP 的组织调整说明，将 Altman 列为 CEO 及非营利董事会成员。公告区分了负责开展业务的有限合伙实体与继续承担治理职责的非营利组织。"
        ],
        "sourceIds": [
          "openai-founding",
          "openai-lp"
        ],
        "paragraphSourceIds": [
          [
            "openai-founding"
          ],
          [
            "openai-lp"
          ]
        ]
      },
      {
        "title": "2023 年 11 月的治理变动",
        "text": [
          "2023 年 11 月 17 日，OpenAI 董事会宣布 Altman 离开 CEO 与董事会职位，由 Mira Murati 出任临时 CEO。董事会在公告中将决定归因于其与董事会沟通时未能始终保持坦诚。",
          "11 月 29 日，OpenAI 的正式公告确认 Altman 回任 CEO。新的初始董事会由主席 Bret Taylor、Larry Summers 和 Adam D’Angelo 组成。"
        ],
        "sourceIds": [
          "openai-transition",
          "openai-return"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition"
          ],
          [
            "openai-return"
          ]
        ]
      },
      {
        "title": "公开作证与年度名单",
        "text": [
          "2023 年 5 月 16 日，Altman 以 OpenAI CEO 身份在美国参议院司法委员会下属隐私、技术与法律小组委员会作证。听证会题为《Oversight of A.I.: Rules for Artificial Intelligence》，委员会保留了证词和听证记录。",
          "同年，Altman 入选《时代》周刊的 2023 年百大人物名单。"
        ],
        "sourceIds": [
          "senate-altman-2023",
          "time-sam-2023"
        ],
        "paragraphSourceIds": [
          [
            "senate-altman-2023"
          ],
          [
            "time-sam-2023"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "已逐段核对旧稿并将保留内容改用公司、大学、听证会及评选机构资料；删去未进一步核实的精确早年细节、投资清单与持股信息。任职按历史公告记录。"
  },
  "greg-brockman": {
    "facts": [
      [
        "教育",
        "先后就读哈佛大学与麻省理工学院，之后离校加入 Stripe",
        [
          "brockman-path"
        ]
      ],
      [
        "竞赛",
        "2006 年国际化学奥林匹克银牌",
        [
          "acs-brockman-2006"
        ]
      ],
      [
        "此前",
        "2010 年加入 Stripe；2013 年前后出任 CTO",
        [
          "brockman-stripe-cto"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "中学竞赛",
        "text": [
          "2006 年，Brockman 代表美国参加在韩国举行的国际化学奥林匹克，并获得银牌。美国化学会的获奖公告记载，他当时就读于北达科他州 Red River High School。",
          "2007 年，他进入 Intel Science Talent Search 决赛。主办方的最终成绩表将 Gregory Brockman 列为第六名，并记录他获得当届 Glenn T. Seaborg 奖。"
        ],
        "sourceIds": [
          "acs-brockman-2006",
          "sts-brockman-2007"
        ],
        "paragraphSourceIds": [
          [
            "acs-brockman-2006"
          ],
          [
            "sts-brockman-2007"
          ]
        ]
      },
      {
        "title": "哈佛、MIT 与 Stripe",
        "text": [
          "在 2016 年的自述《My path to OpenAI》中，Brockman 记述自己先就读哈佛大学，之后转到麻省理工学院。他原本参与编程语言相关研究，接触到尚未发布产品的 Stripe 团队后决定离校加入。",
          "Brockman 在 2014 年的署名文章中写道，自己于 2010 年以工程师身份加入 Stripe，早期工作包括后端基础设施与服务器架构。文章说，公司在约一年半前正式将他的职位定为 CTO；这一表述对应 2013 年前后。"
        ],
        "sourceIds": [
          "brockman-path",
          "brockman-stripe-cto"
        ],
        "paragraphSourceIds": [
          [
            "brockman-path"
          ],
          [
            "brockman-stripe-cto"
          ]
        ]
      },
      {
        "title": "组建 OpenAI 与研究项目",
        "text": [
          "Brockman 在 2016 年回顾创建 OpenAI 的经过时写道，离开 Stripe 前，他曾与 Sam Altman 讨论下一步计划。随后，Altman 组织了一场包括 Ilya Sutskever、Elon Musk 等人在内的晚餐；会后，Brockman 决定全职投入新研究机构的筹备。",
          "2015 年 12 月的 OpenAI 成立公告把 Brockman 列为 CTO。2016 年，他与 Vicki Cheung、John Schulman 等人共同署名《OpenAI Gym》论文，介绍用于强化学习研究的工具集。",
          "2018 年 6 月发布的《OpenAI Five》技术介绍也将他列为共同作者。该项目由五个神经网络组成，在《Dota 2》中通过自我对弈进行训练。"
        ],
        "sourceIds": [
          "brockman-path",
          "openai-founding",
          "openai-gym-paper",
          "openai-five-2018"
        ],
        "paragraphSourceIds": [
          [
            "brockman-path"
          ],
          [
            "openai-founding",
            "openai-gym-paper"
          ],
          [
            "openai-five-2018"
          ]
        ]
      },
      {
        "title": "总裁任命与公开演示",
        "text": [
          "2022 年 5 月 5 日，OpenAI 宣布 Brockman 出任总裁。公司将这一新职位描述为结合关键工程工作和公司战略，并说明他当时着重于旗舰 AI 系统的训练。",
          "2023 年 4 月 18 日，Brockman 在温哥华的 TED2023 第二场会议展示 ChatGPT 插件，并与 Chris Anderson 讨论开发过程和发布风险。"
        ],
        "sourceIds": [
          "openai-roles-2022",
          "ted-brockman-2023"
        ],
        "paragraphSourceIds": [
          [
            "openai-roles-2022"
          ],
          [
            "ted-brockman-2023"
          ]
        ]
      },
      {
        "title": "2023 年 11 月的离任与回任",
        "text": [
          "2023 年 11 月 17 日，OpenAI 公告宣布 Brockman 卸任董事会主席；公告最初的安排是让他继续在公司任职，向 CEO 汇报。",
          "11 月 29 日，OpenAI 的正式回任公告确认他再次担任总裁。Altman 在同一公告中说明，两人将合作管理公司；新董事会主席为 Bret Taylor。"
        ],
        "sourceIds": [
          "openai-transition",
          "openai-return"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition"
          ],
          [
            "openai-return"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "已逐段核对旧稿；保留内容采用本人文章、公司公告、论文及竞赛主办方资料。纠正 TED 现场日期，移除未经本轮原始资料核实的董事任期起点、休假细节和媒体职务描述。"
  },
  "ilya-sutskever": {
    "facts": [
      [
        "成长",
        "在以色列长大，青少年时期移居加拿大",
        [
          "utoronto-ilya-honorary"
        ]
      ],
      [
        "教育",
        "多伦多大学数学学士（2005）、计算机科学硕士（2007）与博士（2013）",
        [
          "utoronto-ilya-degrees",
          "utoronto-ilya-honorary"
        ]
      ],
      [
        "导师",
        "Geoffrey Hinton",
        [
          "ilya-thesis"
        ]
      ],
      [
        "荣誉",
        "2022 年当选英国皇家学会会士",
        [
          "royalsociety-ilya"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "多伦多大学与神经网络",
        "text": [
          "Sutskever 在以色列长大，青少年时期移居加拿大。多伦多大学的介绍记载，他从十一年级进入该校数学项目，开始修读高年级课程。",
          "他先后取得多伦多大学数学学士、计算机科学硕士与博士学位，年份分别为 2005、2007 和 2013 年。博士论文题为《Training Recurrent Neural Networks》，导师为 Geoffrey Hinton。",
          "2012 年，他与 Alex Krizhevsky、Hinton 合作开发卷积神经网络 AlexNet，用于识别图像中的物体。"
        ],
        "sourceIds": [
          "utoronto-ilya-honorary",
          "utoronto-ilya-degrees",
          "ilya-thesis"
        ],
        "paragraphSourceIds": [
          [
            "utoronto-ilya-honorary"
          ],
          [
            "utoronto-ilya-degrees",
            "utoronto-ilya-honorary",
            "ilya-thesis"
          ],
          [
            "utoronto-ilya-honorary"
          ]
        ]
      },
      {
        "title": "DNNResearch 与 Google Brain",
        "text": [
          "Sutskever、Krizhevsky 与 Hinton 于 2012 年共同成立 DNNResearch。2013 年 3 月，多伦多大学宣布谷歌收购这家公司，并说明 Sutskever 与 Krizhevsky 将加入谷歌。",
          "Sutskever 的个人学术主页记载，他在 Google Brain 担任过三年研究科学家。2014 年，他与 Oriol Vinyals、Quoc V. Le 共同发表《Sequence to Sequence Learning with Neural Networks》，提出使用神经网络完成序列到序列任务的方法。"
        ],
        "sourceIds": [
          "utoronto-dnnresearch",
          "ilya-homepage",
          "seq2seq"
        ],
        "paragraphSourceIds": [
          [
            "utoronto-dnnresearch"
          ],
          [
            "ilya-homepage",
            "seq2seq"
          ]
        ]
      },
      {
        "title": "OpenAI 与超级对齐",
        "text": [
          "2015 年 12 月，OpenAI 的成立公告将 Sutskever 列为研究负责人。2019 年 3 月的 OpenAI LP 公告记录了他的首席科学家与非营利董事会成员身份。",
          "2023 年 7 月 5 日，他与 Jan Leike 共同署名发布“超级对齐”项目，宣布共同领导新团队，目标是在四年内解决超级智能对齐的核心技术挑战。文中明确指出，这是一项目标，并不保证能够成功。",
          "在同一篇文章中，两位作者表示，超级智能可能在这个十年内出现。他们将研究问题表述为：如何确保比人类聪明得多的 AI 系统遵循人的意图。"
        ],
        "sourceIds": [
          "openai-founding",
          "openai-lp",
          "openai-superalignment"
        ],
        "paragraphSourceIds": [
          [
            "openai-founding",
            "openai-lp"
          ],
          [
            "openai-superalignment"
          ],
          [
            "openai-superalignment"
          ]
        ]
      },
      {
        "title": "2023 年 11 月与离开 OpenAI",
        "text": [
          "2023 年 11 月 17 日，OpenAI 董事会宣布解除 Altman 的 CEO 职务，并在同一公告中将 Sutskever 列为董事会成员。",
          "据《时代》周刊 11 月 20 日报道，Sutskever 随后公开表示，对自己参与董事会行动感到遗憾。11 月 29 日，OpenAI 的回任公告明确，他不再担任董事。",
          "2024 年 5 月 14 日，OpenAI 宣布 Sutskever 离开，并由 Jakub Pachocki 接任首席科学家。公告中 Altman 提到，Sutskever 将去从事一项对他个人有意义的工作。"
        ],
        "sourceIds": [
          "openai-transition",
          "time-ilya-regret",
          "openai-return",
          "openai-ilya-departure"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition"
          ],
          [
            "time-ilya-regret",
            "openai-return"
          ],
          [
            "openai-ilya-departure"
          ]
        ]
      },
      {
        "title": "创办 Safe Superintelligence",
        "text": [
          "2024 年，Sutskever 参与创办 Safe Superintelligence（SSI），创始团队还包括 Daniel Gross 和 Daniel Levy。公司宣布以安全超级智能为唯一的研发目标与产品方向，并在帕洛阿尔托及特拉维夫设有办公室。",
          "2024 年 9 月 4 日，SSI 公布获得 10 亿美元融资，投资方包括 NFDG、a16z、红杉资本、DST Global 和 SV Angel。",
          "2025 年 7 月 3 日，SSI 发布 Sutskever 署名的公告，确认他正式担任 CEO、Daniel Levy 担任总裁。公告同时说明，Gross 已于 6 月 29 日离开公司。"
        ],
        "sourceIds": [
          "ssi-investor",
          "ssi-about",
          "ssi-founder",
          "ssi-founder-levy",
          "ssi-founder-gross",
          "ssi-updates"
        ],
        "paragraphSourceIds": [
          [
            "ssi-investor",
            "ssi-about",
            "ssi-founder",
            "ssi-founder-levy",
            "ssi-founder-gross"
          ],
          [
            "ssi-updates"
          ],
          [
            "ssi-updates"
          ]
        ]
      },
      {
        "title": "学术荣誉",
        "text": [
          "2022 年，Sutskever 当选英国皇家学会会士。皇家学会的档案列举了他在 AlexNet 与序列到序列学习方面的共同发明经历。",
          "2025 年 6 月 6 日，多伦多大学宣布向他授予荣誉理学博士学位，以表彰他的计算机科学工作及在安全、负责任 AI 方面的公共贡献。"
        ],
        "sourceIds": [
          "royalsociety-ilya",
          "utoronto-ilya-honorary"
        ],
        "paragraphSourceIds": [
          [
            "royalsociety-ilya"
          ],
          [
            "utoronto-ilya-honorary"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "学位、研究、任职与 SSI 历史采用原始资料；2023 年董事会事件仍保留，但事后表示遗憾的内容明确归于《时代》报道，不断言未经原始记录核实的个人投票或全员会议措辞。"
  },
  "mira-murati": {
    "reviewed": "2026-10-08",
    "reviewNote": "已逐句对照原稿并补入学校、公司公告与本人文章；出生及早期任职年份仍保留维基二手汇编，离职与公开对谈另有具名媒体及评论来源。创意工作言论保留，是否收录仍待维护者决定。",
    "facts": [
      [
        "出生",
        "1988 年 12 月 16 日 · 阿尔巴尼亚发罗拉",
        [
          "wiki-mira-murati"
        ]
      ],
      [
        "教育",
        "科尔比学院文学士 · 达特茅斯学院工程学士（2012）",
        [
          "dartmouth-mira-honorary-bio"
        ]
      ],
      [
        "此前",
        "2013—2016 年 Tesla 产品经理 · 2016—2018 年 Leap Motion",
        [
          "wiki-mira-murati"
        ]
      ],
      [
        "荣誉",
        "2024 年达特茅斯学院荣誉理学博士",
        [
          "dartmouth-mira-honorary-award"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "早年与双学位",
        "text": [
          "Murati 1988 年 12 月 16 日生于阿尔巴尼亚发罗拉。她曾就读于加拿大的 Pearson College UWC，学校的校友名录将她列为 2007 届毕业生。",
          "达特茅斯学院的官方简介记载，她以 Davis UWC Scholar 身份就读科尔比学院，并通过双学位项目取得科尔比学院文学士和达特茅斯学院工程学士；达特茅斯将她列为 Thayer ’12 校友。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "pearson-mira-alumni",
          "dartmouth-mira-honorary-bio"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "pearson-mira-alumni"
          ],
          [
            "dartmouth-mira-honorary-bio"
          ]
        ]
      },
      {
        "title": "Tesla 与 Leap Motion",
        "text": [
          "2013 至 2016 年，Murati 在 Tesla 担任 Model X 产品经理；2016 至 2018 年在 Leap Motion 工作。达特茅斯的履历说明，她在 Leap Motion 负责产品与工程团队，在 Tesla 参与车辆产品的设计、开发和发布。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "dartmouth-mira-honorary-bio"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "dartmouth-mira-honorary-bio"
          ]
        ]
      },
      {
        "title": "OpenAI 的研究与产品",
        "text": [
          "2018 年，Murati 加入 OpenAI，最初担任应用 AI 与合作伙伴关系副总裁。2022 年 5 月 5 日，OpenAI 宣布她出任 CTO，并说明她此前已领导研究、产品和合作伙伴职能，参与推动 DALL-E 研究成果发布。",
          "2022 年春，她以 Ermira Murati 署名在《Daedalus》发表《Language & Coding Creativity》，讨论语言模型的创作能力及人与机器的关系。2024 年，达特茅斯的授予荣誉学位说明将 ChatGPT、DALL-E 和 Codex 列为她领导团队开展的项目。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "openai-roles-2022",
          "murati-language-creativity",
          "dartmouth-mira-honorary-award"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "openai-roles-2022"
          ],
          [
            "murati-language-creativity",
            "dartmouth-mira-honorary-award"
          ]
        ]
      },
      {
        "title": "2023 年的临时 CEO",
        "text": [
          "2023 年 11 月 17 日，OpenAI 董事会宣布 Altman 离任，并任命 Murati 为临时 CEO。11 月 29 日的公司公告正式确认 Altman 回任 CEO、Murati 回任 CTO；这份公告的日期与此前达成回任协议的日期应作区分。"
        ],
        "sourceIds": [
          "openai-transition",
          "openai-return"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition",
            "openai-return"
          ]
        ]
      },
      {
        "title": "2024 年的公开活动与离任",
        "text": [
          "2024 年 6 月 8 日，Murati 在达特茅斯参加由 Jeffrey Blackburn 主持的 AI 对谈。她谈及一些创意类工作可能消失，并在内容质量不高的前提下质疑这类岗位存在的必要性。7 月 12 日，《The Dartmouth》刊登 Will Elliott 的署名评论，批评这一说法。",
          "2024 年 6 月 9 日，达特茅斯学院授予 Murati 荣誉理学博士学位。",
          "据美联社 2024 年 9 月 25 日报道，Murati 宣布将离开 OpenAI，表示希望腾出时间进行自己的探索。同一报道还记载，Bob McGrew 和 Barret Zoph 也宣布离职。"
        ],
        "sourceIds": [
          "dartmouth-mira-ai-discussion",
          "dartmouth-elliott-murati",
          "dartmouth-mira-honorary-award",
          "ap-murati-departure"
        ],
        "paragraphSourceIds": [
          [
            "dartmouth-mira-ai-discussion",
            "dartmouth-elliott-murati"
          ],
          [
            "dartmouth-mira-honorary-award"
          ],
          [
            "ap-murati-departure"
          ]
        ]
      },
      {
        "title": "Thinking Machines Lab",
        "text": [
          "2025 年 2 月，Murati 创办的 Thinking Machines Lab 公开亮相。公司网站将其定位为 AI 研究与产品公司，强调可定制的 AI 系统以及人与 AI 的协作。",
          "2025 年 10 月 1 日，公司发布 Tinker。官方公告将其描述为用于微调语言模型的 API：使用者控制算法和数据，由平台处理分布式训练的复杂性。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "tml-about",
          "tml-tinker"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "tml-about"
          ],
          [
            "tml-tinker"
          ]
        ]
      }
    ]
  },
  "dario-amodei": {
    "facts": [
      [
        "教育",
        "斯坦福大学本科 · 普林斯顿大学物理学博士（2011，研究方向为生物物理）",
        [
          "dario-princeton-bio"
        ]
      ],
      [
        "导师",
        "Michael Berry · William Bialek",
        [
          "dario-princeton-bio"
        ]
      ],
      [
        "竞赛",
        "2000 年美国物理队成员",
        [
          "dario-physics-team-2000"
        ]
      ],
      [
        "荣誉",
        "2007 年 Hertz Fellow · 2012 年 Hertz 论文奖",
        [
          "dario-hertz-bio",
          "hertz-thesis-awards"
        ]
      ],
      [
        "榜单",
        "2025、2026 年 TIME 百大人物",
        [
          "time-dario-2025",
          "time-dario-daniela-2026"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "物理训练与普林斯顿",
        "text": [
          "美国物理教师协会公布的 2000 年美国物理队名单中列有 Amodei。他后来在斯坦福大学完成本科，再进入普林斯顿大学读博。",
          "2011 年，他获得普林斯顿大学物理学博士学位，研究方向为生物物理，导师是 Michael Berry 和 William Bialek。2007 年，他获选为 Hertz Fellow。"
        ],
        "sourceIds": [
          "dario-physics-team-2000",
          "dario-princeton-bio",
          "dario-hertz-bio"
        ],
        "paragraphSourceIds": [
          [
            "dario-physics-team-2000",
            "dario-princeton-bio"
          ],
          [
            "dario-princeton-bio",
            "dario-hertz-bio"
          ]
        ]
      },
      {
        "title": "神经回路研究",
        "text": [
          "他的博士论文题为《Network-Scale Electrophysiology: Measuring and Understanding the Collective Behavior of Neural Circuits》，研究神经回路的集体行为与电活动记录方法。Hertz 基金会的历届获奖名单将这篇论文列为 2012 年论文奖得主。",
          "博士毕业后，他在斯坦福大学医学院做博士后。Hertz 基金会的简介记载，他研究过质谱技术在细胞蛋白质网络及癌症生物标志物分析中的应用。"
        ],
        "sourceIds": [
          "dario-hertz-bio",
          "hertz-thesis-awards",
          "dario-bio"
        ],
        "paragraphSourceIds": [
          [
            "dario-hertz-bio",
            "hertz-thesis-awards"
          ],
          [
            "dario-bio",
            "dario-hertz-bio"
          ]
        ]
      },
      {
        "title": "Google Brain 与 OpenAI",
        "text": [
          "在 2021 年创办 Anthropic 之前，Amodei 先在 Google Brain 从事研究，后任 OpenAI 研究副总裁。据本人简介，他在 OpenAI 参与领导 GPT-2 与 GPT-3 的研发；所列资料未给出这些职务的精确起止日。",
          "2017 年，他与 Paul Christiano、Jan Leike、Tom B. Brown、Miljan Martic 和 Shane Legg 合著《Deep reinforcement learning from human preferences》，研究用人类对行为片段的比较反馈训练强化学习系统。"
        ],
        "sourceIds": [
          "dario-bio",
          "anthropic-founding",
          "rlhf-human-preferences"
        ],
        "paragraphSourceIds": [
          [
            "dario-bio",
            "anthropic-founding"
          ],
          [
            "rlhf-human-preferences"
          ]
        ]
      },
      {
        "title": "创办 Anthropic 与发布 Claude",
        "text": [
          "Anthropic 创立于 2021 年初。公司同年 5 月的公告将 Amodei 列为 CEO、Daniela Amodei 列为总裁，并把可靠性、可解释性及人类反馈列入研究方向。",
          "2023 年 3 月 14 日，Anthropic 发布 Claude，提供对话界面和 API 使用方式，列出的用途包括摘要、问答、写作与编程。"
        ],
        "sourceIds": [
          "anthropic-founding",
          "anthropic-series-a-2021",
          "anthropic-claude"
        ],
        "paragraphSourceIds": [
          [
            "anthropic-founding",
            "anthropic-series-a-2021"
          ],
          [
            "anthropic-claude"
          ]
        ]
      },
      {
        "title": "两篇关于 AI 前景的文章",
        "text": [
          "2024 年 10 月，Amodei 发表《Machines of Loving Grace》，讨论强大 AI 在生物学、神经科学、经济发展、和平与治理、工作与意义方面的潜在益处。他在文中明确说明，这些描述是对未来的推测。",
          "2026 年 1 月，他在《The Adolescence of Technology》中讨论自主系统、破坏性滥用、权力滥用、经济冲击及间接影响五类风险。文中还回顾了他在 2025 年作出的就业预测；这些是作者的判断，并非已经发生的结果。"
        ],
        "sourceIds": [
          "dario-loving-grace",
          "dario-adolescence"
        ],
        "paragraphSourceIds": [
          [
            "dario-loving-grace"
          ],
          [
            "dario-adolescence"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "背景逐句对照原条目后，以本人文章、学校、奖项机构和论文资料重写；未取得原始支持的早年细节及争议叙述已删去。"
  },
  "demis-hassabis": {
    "facts": [
      [
        "出生",
        "1976 年 7 月 27 日 · 英国伦敦",
        [
          "demis-nobel-facts"
        ]
      ],
      [
        "教育",
        "剑桥大学计算机科学双一等（1997）· 伦敦大学学院认知神经科学博士（2009）",
        [
          "demis-cv-2023",
          "demis-ucl-nobel"
        ]
      ],
      [
        "导师",
        "Eleanor Maguire",
        [
          "demis-ucl-nobel"
        ]
      ],
      [
        "棋力",
        "13 岁达到大师水平，等级分 2300",
        [
          "demis-cv-2023"
        ]
      ],
      [
        "荣誉",
        "2024 年诺贝尔化学奖 · 2024 年受封爵士",
        [
          "nobel-chemistry-2024-html",
          "demis-ucl-nobel"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "国际象棋与剑桥",
        "text": [
          "Hassabis 1976 年 7 月 27 日生于伦敦。据其公开简历，他少年时担任过英格兰少年国际象棋队队长，13 岁达到 2300 等级分。",
          "1994 至 1997 年，他在剑桥大学 Queens' College 学习计算机科学，以双一等成绩获得学士学位。"
        ],
        "sourceIds": [
          "demis-nobel-facts",
          "demis-cv-2023"
        ],
        "paragraphSourceIds": [
          [
            "demis-nobel-facts",
            "demis-cv-2023"
          ],
          [
            "demis-cv-2023"
          ]
        ]
      },
      {
        "title": "Bullfrog、Lionhead 与 Elixir",
        "text": [
          "在 Bullfrog 工作期间，17 岁的 Hassabis 参与创作了《Theme Park》。从剑桥毕业后，他在 Lionhead Studios 担任《Black & White》的 AI 主程序员；其简历将这两家公司的经历列于 1993 至 1998 年。",
          "1998 年，他创办 Elixir Studios，并任 CEO 至 2005 年，参与《Republic: The Revolution》和《Evil Genius》的设计。2005 年，工作室出售知识产权和技术，他随后重返学术研究。"
        ],
        "sourceIds": [
          "demis-cv-2023"
        ],
        "paragraphSourceIds": [
          [
            "demis-cv-2023"
          ],
          [
            "demis-cv-2023"
          ]
        ]
      },
      {
        "title": "记忆与想象研究",
        "text": [
          "2009 年，Hassabis 在伦敦大学学院取得认知神经科学博士学位，主要导师是 Eleanor Maguire。之后，他在该校 Gatsby 计算神经科学中心继续做博士后研究。",
          "2007 年，他与合作者在《PNAS》发表关于海马体损伤与想象的论文。实验中的失忆症患者在构建新的想象场景时明显弱于对照组；作者据此讨论海马体为这些场景提供空间连贯性的作用。"
        ],
        "sourceIds": [
          "demis-ucl-nobel",
          "demis-imagination-2007"
        ],
        "paragraphSourceIds": [
          [
            "demis-ucl-nobel"
          ],
          [
            "demis-imagination-2007"
          ]
        ]
      },
      {
        "title": "DeepMind 与 AlphaGo",
        "text": [
          "2010 年，Hassabis 参与创办 DeepMind。2014 年，公司被 Google 收购。",
          "DeepMind 的 AlphaGo 在 2015 年 10 月以 5 比 0 击败欧洲冠军樊麾，2016 年 3 月又在首尔以 4 比 1 击败李世石。这里记录的是团队系统的比赛成绩。"
        ],
        "sourceIds": [
          "demis-cv-2023",
          "demis-ucl-nobel",
          "deepmind-alphago-history"
        ],
        "paragraphSourceIds": [
          [
            "demis-cv-2023",
            "demis-ucl-nobel"
          ],
          [
            "deepmind-alphago-history"
          ]
        ]
      },
      {
        "title": "AlphaFold 与科学研究",
        "text": [
          "2020 年 11 月，DeepMind 公布 AlphaFold 在 CASP14 的评测结果：全部目标的 GDT 中位数为 92.4，最困难的自由建模类别为 87.0。两个分数对应不同的评测范围。",
          "2022 年 7 月 28 日，Hassabis 署名宣布，DeepMind 与 EMBL-EBI 将 AlphaFold 数据库扩展到超过 2 亿个蛋白质预测结构。",
          "2024 年 10 月 9 日，诺贝尔奖官方宣布，他与 John Jumper 因蛋白质结构预测共同获得当年化学奖的一半；另一半授予 David Baker。同年，他受封爵士。"
        ],
        "sourceIds": [
          "deepmind-alphafold-casp14",
          "deepmind-alphafold-database-2022",
          "nobel-chemistry-2024-html",
          "demis-ucl-nobel"
        ],
        "paragraphSourceIds": [
          [
            "deepmind-alphafold-casp14"
          ],
          [
            "deepmind-alphafold-database-2022"
          ],
          [
            "nobel-chemistry-2024-html",
            "demis-ucl-nobel"
          ]
        ]
      },
      {
        "title": "Isomorphic Labs",
        "text": [
          "2021 年，Hassabis 创办 Isomorphic Labs，目标是将 AI 用于药物发现。公司 2022 年 5 月的管理团队公告将他列为创办人及代理 CEO。"
        ],
        "sourceIds": [
          "isomorphic-leadership-2022"
        ],
        "paragraphSourceIds": [
          [
            "isomorphic-leadership-2022"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "历史背景按原始资料复核；2026 年 9 月 16 日官方记录列出新职务，角色与图谱更新仍待确认。旧 CEO 标签不代表本轮确认的现职。",
    "roleNote": {
      "text": "职务更新待确认：2026 年 9 月 16 日官方资料已列为 DeepMind 主席、Alphabet 首席科学家；图谱暂保留旧记录。",
      "sourceIds": [
        "deepmind-institute-2026",
        "google-ai-leadership-2026"
      ]
    }
  },
  "bret-taylor": {
    "reviewed": "2026-10-08",
    "reviewNote": "教育、产品、收购与主要任命已补入学校及公司原始资料；出生、部分早期职务日期与 Twitter 经历仍引用维基二手汇编。已删除 FriendFeed 收购导致 Facebook 引入点赞按钮的错误时序及未核实价格。",
    "facts": [
      [
        "出生",
        "1980 年 · 美国加州奥克兰",
        [
          "wiki-bret-taylor"
        ]
      ],
      [
        "教育",
        "斯坦福大学计算机科学学士（2002）与硕士（2003）",
        [
          "stanford-taylor-friendfeed"
        ]
      ],
      [
        "此前",
        "2010 年出任 Facebook CTO · 2021 年出任 Salesforce 联席 CEO",
        [
          "wiki-bret-taylor",
          "salesforce-taylor-coceo"
        ]
      ],
      [
        "创业",
        "2024 年与 Clay Bavor 公开推出 Sierra 平台",
        [
          "sierra-launch"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "斯坦福与 Google Maps",
        "text": [
          "Taylor 在斯坦福大学取得计算机科学学士（2002）和硕士（2003）学位。学校的校友报道记载，他在连读硕士期间已开始为 Google 工作。",
          "2005 年 6 月 29 日，他以 Google Maps 产品经理身份在 Google 官方博客介绍 Google Maps API，让开发者可以在自己的网站中嵌入地图。Sierra 的官方简介也将他列为 Google Maps 的共同创造者。"
        ],
        "sourceIds": [
          "stanford-taylor-friendfeed",
          "google-taylor-maps-api",
          "sierra-bret-bio"
        ],
        "paragraphSourceIds": [
          [
            "stanford-taylor-friendfeed"
          ],
          [
            "google-taylor-maps-api",
            "sierra-bret-bio"
          ]
        ]
      },
      {
        "title": "FriendFeed 与 Facebook",
        "text": [
          "2007 年，Taylor 离开 Google，进入 Benchmark Capital 担任驻场创业者。同年 10 月，他与 Paul Buchheit、Jim Norris 和 Sanjeev Singh 共同创办 FriendFeed。",
          "2009 年 8 月 10 日，Facebook 宣布同意收购 FriendFeed，团队将加入 Facebook，四位创始人将在产品与工程团队担任高级职务；公告没有公布交易金额。Taylor 随后在 2010 年出任 Facebook CTO，并于 2012 年离开公司。"
        ],
        "sourceIds": [
          "stanford-taylor-friendfeed",
          "facebook-friendfeed-acquisition",
          "wiki-bret-taylor"
        ],
        "paragraphSourceIds": [
          [
            "stanford-taylor-friendfeed",
            "facebook-friendfeed-acquisition"
          ],
          [
            "facebook-friendfeed-acquisition",
            "wiki-bret-taylor"
          ]
        ]
      },
      {
        "title": "Quip 与 Salesforce",
        "text": [
          "2012 年，Taylor 创办协作软件公司 Quip。2016 年，Quip 被 Salesforce 收购。",
          "2019 年 12 月 12 日，Salesforce 宣布他由总裁兼首席产品官升任总裁兼 COO，职责包括产品、工程、安全、市场营销和传播。2021 年 11 月 30 日，公司又任命他为副董事长兼联席 CEO，与 Marc Benioff 共同领导公司。",
          "2022 年 11 月 30 日，Salesforce 宣布 Taylor 将于 2023 年 1 月 31 日卸任副董事长和联席 CEO。"
        ],
        "sourceIds": [
          "wiki-bret-taylor",
          "salesforce-taylor-coo",
          "salesforce-taylor-coceo",
          "salesforce-taylor-departure"
        ],
        "paragraphSourceIds": [
          [
            "wiki-bret-taylor",
            "salesforce-taylor-coo"
          ],
          [
            "salesforce-taylor-coo",
            "salesforce-taylor-coceo"
          ],
          [
            "salesforce-taylor-departure"
          ]
        ]
      },
      {
        "title": "董事会经历",
        "text": [
          "2016 年，Taylor 加入 Twitter 董事会；2021 年出任董事长，任期在 2022 年 10 月收购完成、原董事会解散时结束。2023 年 6 月 27 日，Shopify 宣布他加入董事会。",
          "2023 年 11 月 29 日，OpenAI 在正式宣布 Altman 回任 CEO 时，公布的新初始董事会由 Taylor 担任主席，另两名成员是 Larry Summers 和 Adam D’Angelo。"
        ],
        "sourceIds": [
          "wiki-bret-taylor",
          "shopify-taylor-board",
          "openai-return"
        ],
        "paragraphSourceIds": [
          [
            "wiki-bret-taylor",
            "shopify-taylor-board"
          ],
          [
            "openai-return"
          ]
        ]
      },
      {
        "title": "推出 Sierra",
        "text": [
          "2024 年 2 月 13 日，Taylor 与 Clay Bavor 联合署名介绍 Sierra，公开推出面向企业的对话式 AI 平台，帮助企业构建直接与消费者沟通、处理问题并执行操作的 AI agent。",
          "该公告列举了客户支持、零售推荐和订阅管理等应用，也说明 agent 需要与企业既有系统连接，才能处理订单追踪、账户恢复和换货等任务。"
        ],
        "sourceIds": [
          "sierra-launch"
        ],
        "paragraphSourceIds": [
          [
            "sierra-launch"
          ],
          [
            "sierra-launch"
          ]
        ]
      }
    ]
  },
  "fidji-simo": {
    "reviewed": "2026-10-08",
    "reviewNote": "已逐句核对原稿，主要教育与任命改引 HEC、Instacart、Shopify、OpenAI 和本人公开说明；出生与转入 Facebook 的年份仍引用维基二手汇编。2026 年 9 月的官方来源支持站内顾问身份，未改图谱角色或关系状态。",
    "facts": [
      [
        "出生",
        "1985 年 10 月 5 日 · 法国塞特",
        [
          "wiki-fidji-simo"
        ]
      ],
      [
        "教育",
        "巴黎高等商学院管理学硕士（2008），最后一年在 UCLA 就读",
        [
          "hec-simo-commencement",
          "hec-simo-profile"
        ]
      ],
      [
        "此前",
        "2007 年加入 eBay · 2011 年加入 Facebook · 2021 年出任 Instacart CEO",
        [
          "instacart-simo-ceo",
          "wiki-fidji-simo"
        ]
      ],
      [
        "公开记录",
        "2025 年获任 OpenAI CEO of Applications；2026 年 9 月官方履历确认顾问身份",
        [
          "openai-fidji-appointment",
          "nscale-fidji-board"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "塞特与商学院",
        "text": [
          "Simo 1985 年 10 月 5 日出生，在法国南部的塞特长大。她于 2008 年从巴黎高等商学院的管理学硕士项目毕业。",
          "在 HEC 的本人回顾中，她谈到通过学校获得 eBay 实习机会，并通过 HEC 与 UCLA 的合作项目在洛杉矶完成最后一年的学习，随后说服 eBay 为她提供在加州工作的机会。"
        ],
        "sourceIds": [
          "wiki-fidji-simo",
          "hec-simo-commencement",
          "hec-simo-profile"
        ],
        "paragraphSourceIds": [
          [
            "wiki-fidji-simo",
            "hec-simo-commencement"
          ],
          [
            "hec-simo-profile"
          ]
        ]
      },
      {
        "title": "eBay 与 Facebook",
        "text": [
          "2007 年，Simo 加入 eBay 战略团队，参与本地商业和分类广告业务。2011 年，她转入 Facebook。",
          "Instacart 在 2021 年的任命公告中回顾了她此前约十年的 Facebook 经历：她担任过副总裁、Facebook App 负责人，负责信息流、视频、群组、Marketplace 和广告等产品的开发与策略，并参与移动端商业化。公告还记载，她推动了信息流自动播放视频以及 Facebook Live 和 Watch 的推出。"
        ],
        "sourceIds": [
          "instacart-simo-ceo",
          "wiki-fidji-simo"
        ],
        "paragraphSourceIds": [
          [
            "instacart-simo-ceo",
            "wiki-fidji-simo"
          ],
          [
            "instacart-simo-ceo"
          ]
        ]
      },
      {
        "title": "Instacart 与 Shopify",
        "text": [
          "2021 年 1 月，Simo 加入 Instacart 董事会。7 月 8 日，公司宣布任命她为 CEO，8 月 2 日生效，Apoorva Mehta 转任执行董事长。同年 12 月 16 日，Shopify 宣布她加入董事会。",
          "2022 年 7 月 22 日，Instacart 宣布将由她出任董事长，待公司上市、Mehta 退出董事会时生效。公司的投资者问答确认，股票于 2023 年 9 月 19 日开始在纳斯达克交易，代码为 CART；2024 年 3 月的 OpenAI 公告已称她为 Instacart CEO 兼董事长。"
        ],
        "sourceIds": [
          "instacart-simo-ceo",
          "shopify-simo-board",
          "instacart-simo-chair",
          "instacart-ipo-faq",
          "openai-new-directors-2024"
        ],
        "paragraphSourceIds": [
          [
            "instacart-simo-ceo",
            "shopify-simo-board"
          ],
          [
            "instacart-simo-chair",
            "instacart-ipo-faq",
            "openai-new-directors-2024"
          ]
        ]
      },
      {
        "title": "转入 OpenAI",
        "text": [
          "2024 年 3 月 8 日，OpenAI 宣布 Simo 加入董事会。2025 年 5 月 7 日，公司宣布她将担任新设的 CEO of Applications，直接向 Sam Altman 汇报，领导负责把研究成果交付给用户的业务与运营团队；公告明确 Altman 继续担任 OpenAI CEO。",
          "2025 年 7 月 21 日，她在 OpenAI 网站发表《AI as the greatest source of empowerment for all》，说明自己将在数周后到任，并把知识、健康、创意表达、经济自主、时间和支持列为 AI 可能帮助人们获得更多能力的领域。"
        ],
        "sourceIds": [
          "openai-new-directors-2024",
          "openai-fidji-appointment",
          "simo-empowerment-essay"
        ],
        "paragraphSourceIds": [
          [
            "openai-new-directors-2024",
            "openai-fidji-appointment"
          ],
          [
            "simo-empowerment-essay"
          ]
        ]
      },
      {
        "title": "顾问身份的后续确认",
        "text": [
          "Simo 后来在本人公开说明中宣布离开 OpenAI 的全职岗位，转任兼职顾问。2026 年 9 月 11 日，Nscale 宣布她加入董事会，其官方履历明确使用“前 OpenAI CEO of AGI Deployment”的称呼，并确认她继续担任 OpenAI 顾问。"
        ],
        "sourceIds": [
          "fidji-adviser-statement",
          "nscale-fidji-board"
        ],
        "paragraphSourceIds": [
          [
            "fidji-adviser-statement",
            "nscale-fidji-board"
          ]
        ]
      }
    ]
  },
  "paul-christiano": {
    "facts": [
      [
        "教育",
        "麻省理工学院数学学士（2012）· 加州大学伯克利分校博士（2017）",
        [
          "paul-mit-author-bio",
          "paul-berkeley-thesis"
        ]
      ],
      [
        "导师",
        "Umesh Vazirani",
        [
          "paul-berkeley-thesis"
        ]
      ],
      [
        "竞赛",
        "2008 年国际数学奥林匹克银牌（美国队）",
        [
          "paul-imo-results"
        ]
      ],
      [
        "此前",
        "2017 至 2021 年领导 OpenAI 对齐研究；2021 年创办 ARC",
        [
          "openai-paul-board-2026",
          "paul-announces-arc"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "数学竞赛与大学研究",
        "text": [
          "2008 年，Christiano 代表美国参加国际数学奥林匹克并获银牌。2012 年，他取得麻省理工学院数学学士学位；本科期间研究过组合优化、数据结构和量子密码学。",
          "2017 年，他在加州大学伯克利分校完成博士论文《Manipulation-resistant online learning》，导师是 Umesh Vazirani。论文研究在部分用户可能操纵反馈的情况下，如何为诚实用户提供在线学习的性能保证。"
        ],
        "sourceIds": [
          "paul-imo-results",
          "paul-mit-author-bio",
          "paul-berkeley-thesis"
        ],
        "paragraphSourceIds": [
          [
            "paul-imo-results",
            "paul-mit-author-bio"
          ],
          [
            "paul-berkeley-thesis"
          ]
        ]
      },
      {
        "title": "在 OpenAI 研究人类反馈",
        "text": [
          "OpenAI 的 2026 年公告回顾，Christiano 在 2017 至 2021 年领导该机构的对齐研究。他与合作者于 2017 年发表《Deep reinforcement learning from human preferences》，研究从人类对行为片段的比较中学习目标。",
          "2018 年，他参与《AI safety via debate》和《Supervising strong learners by amplifying weak experts》，分别研究通过辩论及任务分解来监督复杂任务的方法。2021 年，他还是《Recursively Summarizing Books with Human Feedback》的作者之一。"
        ],
        "sourceIds": [
          "openai-paul-board-2026",
          "rlhf-human-preferences",
          "ai-safety-debate-2018",
          "amplification-2018",
          "book-summarization-2021"
        ],
        "paragraphSourceIds": [
          [
            "openai-paul-board-2026",
            "rlhf-human-preferences"
          ],
          [
            "ai-safety-debate-2018",
            "amplification-2018",
            "book-summarization-2021"
          ]
        ]
      },
      {
        "title": "Alignment Research Center",
        "text": [
          "2021 年 4 月 26 日，Christiano 宣布全职投入新成立的 Alignment Research Center（ARC），并说明自己已于当年 1 月底离开 OpenAI。创立公告把最初工作重点放在意图对齐的理论研究。",
          "同年 12 月，ARC 发布首份技术报告《Eliciting Latent Knowledge》，讨论如何建立 AI 世界模型与人类理解之间的对应。2023 年 12 月，ARC Evals 宣布从 ARC 分拆，并采用 METR 这一名称。"
        ],
        "sourceIds": [
          "paul-announces-arc",
          "arc-elk-report-2021",
          "metr-spinout-2023"
        ],
        "paragraphSourceIds": [
          [
            "paul-announces-arc"
          ],
          [
            "arc-elk-report-2021",
            "metr-spinout-2023"
          ]
        ]
      },
      {
        "title": "顾问与公共机构任命",
        "text": [
          "2023 年 9 月，英国政府将 Christiano 列入 Frontier AI Taskforce 的首批专家顾问委员会成员。同月，Anthropic 公布他为长期利益信托的初始受托人之一；该公告后续脚注明确，他于 2024 年 4 月离任。",
          "2024 年 4 月 16 日，NIST 公告宣布任命他为美国 AI 安全研究所的 AI 安全负责人。",
          "VentureBeat 于 2024 年 3 月援引匿名人士报道任命遭到内部反对，也刊登了 Divyansh Kaushik 对其资历的支持。"
        ],
        "sourceIds": [
          "uk-frontier-taskforce-2023",
          "anthropic-ltbt-2023",
          "nist-paul-appointment-2024",
          "venturebeat-nist-appointment-2024"
        ],
        "paragraphSourceIds": [
          [
            "uk-frontier-taskforce-2023",
            "anthropic-ltbt-2023"
          ],
          [
            "nist-paul-appointment-2024"
          ],
          [
            "venturebeat-nist-appointment-2024"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "教育、研究与任命已补原始资料；任命争议仍为明确归因的媒体报道，保留待维护者统一决定。背景不重复后续公开治理记录。"
  },
  "jakub-pachocki": {
    "facts": [
      [
        "教育",
        "华沙大学计算机科学本科 · 卡内基梅隆大学计算机科学博士（2016）",
        [
          "simons-jakub",
          "cmu-jakub-phd"
        ]
      ],
      [
        "导师",
        "Gary Miller",
        [
          "cmu-jakub-phd"
        ]
      ],
      [
        "竞赛",
        "2012 年 Google Code Jam 冠军",
        [
          "uw-jakub-codejam"
        ]
      ]
    ],
    "chapters": [
      {
        "title": "程序设计竞赛",
        "text": [
          "2009 年，Pachocki 代表波兰参加国际信息学奥林匹克，获得银牌。赛事成绩库记录了他的参赛年份与奖牌。",
          "2011 年，他获得 Google Code Jam 第三名；2012 年夺冠。华沙大学的赛事成绩档案记录了这两次成绩，学校另有公告确认他是 2012 年 ICPC 世界总决赛亚军队伍的成员。"
        ],
        "sourceIds": [
          "ioi-jakub",
          "uw-jakub-codejam",
          "uw-jakub-icpc"
        ],
        "paragraphSourceIds": [
          [
            "ioi-jakub"
          ],
          [
            "uw-jakub-codejam",
            "uw-jakub-icpc"
          ]
        ]
      },
      {
        "title": "华沙与卡内基梅隆",
        "text": [
          "Pachocki 在华沙大学获得计算机科学本科学位，随后在卡内基梅隆大学师从 Gary Miller 进行博士研究。",
          "卡内基梅隆大学记录，他于 2016 年 5 月获得计算机科学博士学位，论文为《Graphs and Beyond: Faster Algorithms for High Dimensional Convex Optimization》。研究集中于图相关的凸优化问题及高效算法。"
        ],
        "sourceIds": [
          "simons-jakub",
          "cmu-jakub-phd"
        ],
        "paragraphSourceIds": [
          [
            "simons-jakub",
            "cmu-jakub-phd"
          ],
          [
            "cmu-jakub-phd"
          ]
        ]
      },
      {
        "title": "研究访问与 OpenAI 项目",
        "text": [
          "Simons 计算理论研究所的访问记录列出，他在 2014 年秋季以访问研究生身份参加 Algorithmic Spectral Graph Theory 项目，并在 2019 年夏季以访问科学家身份参加 Foundations of Deep Learning 项目。",
          "OpenAI 的 2024 年任命公告记载，Pachocki 自 2017 年起在公司领导研究项目，担任过研究总监，并领导 GPT-4、OpenAI Five 以及大规模强化学习和深度学习优化相关工作。"
        ],
        "sourceIds": [
          "simons-jakub",
          "openai-ilya-departure"
        ],
        "paragraphSourceIds": [
          [
            "simons-jakub"
          ],
          [
            "openai-ilya-departure"
          ]
        ]
      },
      {
        "title": "首席科学家的任命",
        "text": [
          "2024 年 5 月 14 日，OpenAI 在宣布 Ilya Sutskever 离开的同一公告中，宣布由 Pachocki 接任首席科学家。",
          "Sam Altman 在公告中评价 Pachocki 是这一代最出色的头脑之一，并表示他领导过公司的多个重要项目。"
        ],
        "sourceIds": [
          "openai-ilya-departure"
        ],
        "paragraphSourceIds": [
          [
            "openai-ilya-departure"
          ],
          [
            "openai-ilya-departure"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "已逐段核对旧稿；保留内容改用大学、竞赛主办方、研究所和 OpenAI 资料。Simons 页面支持访问研究生与访问科学家身份，不支持旧稿所称的先后博士后经历；未补写未核实的入职职级年份。"
  }
};
