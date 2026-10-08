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
        "title": "斯坦福与手机地图创业",
        "text": [
          "Altman 在美国圣路易斯地区长大，随后进入斯坦福大学学习计算机科学。学校公布的对谈文字稿记载，他在读完二年级后，带着手机社交应用 Loopt 进入 Y Combinator 的首批创业项目，并离校投入这家公司；在 Loopt 的工作持续了约七年。",
          "Loopt 的想法是把手机位置与社交信息放在一起，让用户发现附近的人、地点和活动。Y Combinator 的公司档案将它归入 2005 年夏季批次，列出 Altman 的创始人身份，以及红杉资本、New Enterprise Associates 两家投资方。",
          "2012 年 4 月 4 日，Green Dot 宣布完成对 Loopt 的收购，以现金及与留任挂钩的激励合计支付约 4300 万美元。公告还说明，Loopt 员工继续在 Mountain View 工作，并被整合进 Green Dot 的信息技术部门。"
        ],
        "paragraphSourceIds": [
          [
            "sam-stanford-transcript"
          ],
          [
            "yc-loopt"
          ],
          [
            "greendot-loopt-completed"
          ]
        ],
        "sourceIds": [
          "sam-stanford-transcript",
          "yc-loopt",
          "greendot-loopt-completed"
        ]
      },
      {
        "title": "从 YC 创业者到机构负责人",
        "text": [
          "2014 年 2 月 21 日，Paul Graham 宣布由 Altman 从下一批项目起接任 Y Combinator 总裁。Graham 将交接的原因写得很具体：他认为 YC 需要随创业公司数量增加而扩大规模，自己继续为创业者提供咨询，由 Altman 负责机构的发展。",
          "这次任命延续了双方从 2005 年开始的工作联系。Graham 在公告中说，Loopt 属于 YC 最早资助的一批公司；2012 年 Altman 有机会转换工作后，他就开始招募 Altman，前后持续了一年多。",
          "2016 年 9 月，Altman 把职称改为 YC Group 总裁，负责启动新的组织单元。Michael Seibel 领导创业加速项目，Ali Rowghani 领导 Continuity Fund；集团还包括 YC Research 与在线课程。他在公告中提出，把 Fellowship 扩大为面向更多人的 Startup School。YC 简介记载其任期为 2014 至 2019 年。"
        ],
        "paragraphSourceIds": [
          [
            "yc-sam"
          ],
          [
            "yc-sam"
          ],
          [
            "yc-group-2016"
          ]
        ],
        "sourceIds": [
          "yc-sam",
          "yc-group-2016"
        ]
      },
      {
        "title": "OpenAI 的成立与组织调整",
        "text": [
          "2015 年 12 月 11 日，OpenAI 以非营利 AI 研究机构的身份公开成立，Altman 与 Elon Musk 被列为共同主席。公告鼓励研究人员通过论文、博客和代码发表成果，并与其他机构合作；初始资助者合计承诺提供 10 亿美元，公告同时说，最初几年只预计花费其中一小部分。",
          "2019 年 3 月 11 日，OpenAI 发布成立 OpenAI LP 的说明，将 Altman 列为 CEO 及非营利董事会成员。公司解释，大规模云计算、人才和 AI 超级计算机所需投入增加，因此建立可以募集投资、同时限制投资回报的结构；超过约定上限的回报归非营利实体。",
          "这份历史公告仍把控制权放在非营利董事会，并区分了能力研究、安全研究与政策工作。它同时记载 Brockman 的主席兼 CTO 身份和 Sutskever 的首席科学家身份。Altman 的经营职务与三人的治理席位在同一份文件中分别列出，不能混为一个职位。"
        ],
        "paragraphSourceIds": [
          [
            "openai-founding"
          ],
          [
            "openai-lp"
          ],
          [
            "openai-lp"
          ]
        ],
        "sourceIds": [
          "openai-founding",
          "openai-lp"
        ]
      },
      {
        "title": "ChatGPT 与参议院听证",
        "text": [
          "在 2025 年的《Reflections》中，Altman 回顾了 ChatGPT 的发布经过：团队观察到开发者喜欢在 API 的 playground 中与模型交谈，于是围绕这种体验制作演示，希望让公众理解技术、也收集改进模型的反馈。产品最初临时叫作“Chat With GPT-3.5”，最终以 ChatGPT 之名于 2022 年 11 月 30 日推出。",
          "2023 年 5 月 16 日，Altman 以 OpenAI CEO 身份参加美国参议院司法委员会下属隐私、技术与法律小组委员会听证。同场证人还包括 IBM 的 Christina Montgomery 与纽约大学的 Gary Marcus；听证题为《Oversight of A.I.: Rules for Artificial Intelligence》。",
          "在书面证词中，他主张对超过重要能力门槛的模型考虑许可或登记要求，并在发布前进行内部与外部测试、公开评估结果。他还提出由不同领域的参与者共同更新安全标准，以及开展国际监管合作。这些是他在听证中提出的政策建议。同年，他入选《时代》周刊百大人物名单。"
        ],
        "paragraphSourceIds": [
          [
            "sam-reflections"
          ],
          [
            "senate-altman-2023"
          ],
          [
            "senate-altman-testimony-2023",
            "time-sam-2023"
          ]
        ],
        "sourceIds": [
          "sam-reflections",
          "senate-altman-2023",
          "senate-altman-testimony-2023",
          "time-sam-2023"
        ]
      },
      {
        "title": "2023 年 11 月的离任与回任",
        "text": [
          "2023 年 11 月 17 日，OpenAI 董事会宣布 Altman 离开 CEO 与董事会职位，由 Mira Murati 出任临时 CEO。董事会在公告中将决定归因于其与董事会沟通时未能始终保持坦诚。",
          "11 月 29 日，OpenAI 正式公告确认 Altman 回任 CEO，新初始董事会由 Bret Taylor、Larry Summers 和 Adam D’Angelo 组成。2024 年 3 月 8 日，公司宣布董事会特别委员会的审查完成，并宣布 Altman 重新加入董事会。回任经营岗位与重获董事席位，是分别公布的两个节点。"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition"
          ],
          [
            "openai-return",
            "openai-review"
          ]
        ],
        "sourceIds": [
          "openai-transition",
          "openai-return",
          "openai-review"
        ]
      },
      {
        "title": "规模、基础设施与渐进部署",
        "text": [
          "2024 年 9 月 23 日，Altman 在《The Intelligence Age》中把深度学习随规模改善的能力，与未来个人 AI 团队、教育和科学研究的应用联系起来。他强调，要让更多人用到 AI，就需要降低计算成本、增加芯片和能源供给；基础设施不足会限制技术的可及性。这是他对发展方向的判断。",
          "2025 年的《Reflections》进一步讨论了经营研究机构的变化。他写道，OpenAI 创办时并未预料到需要建立产品公司，也未预料到资本需求的规模；他仍支持逐步把系统投入现实使用，让社会有时间适应，同时从应用反馈中改进安全性。这些自述呈现了他当时对研究、产品与部署节奏之间关系的解释。"
        ],
        "paragraphSourceIds": [
          [
            "sam-intelligence-age"
          ],
          [
            "sam-reflections"
          ]
        ],
        "sourceIds": [
          "sam-intelligence-age",
          "sam-reflections"
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "在首轮审校基础上扩写创业、YC 分工、OpenAI 组织变化、听证及本人文章；新增内容已打开原始资料核对并逐段标注。个人预测与公司对治理事件的说法保留归因，历史职位不延伸为未经核验的现任判断。"
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
        "title": "化学竞赛与编程语言",
        "text": [
          "2006 年，Brockman 代表美国参加在韩国举行的国际化学奥林匹克，并获得银牌。美国化学会的公告记载，他当时就读于北达科他州 Red River High School；美国队是在科罗拉多州为期两周的集训结束后选出的。",
          "2007 年，他进入 Intel Science Talent Search 决赛。主办方的当届成绩表将 Gregory Brockman 列为第六名，同时记录他获得 Glenn T. Seaborg 奖。",
          "Brockman 在 2016 年的《My path to OpenAI》中写道，他先读哈佛大学，后转到麻省理工学院，对编译器和静态分析如何理解程序产生兴趣。他曾筹备静态缓冲区越界检测项目，但在接触尚未发布产品的 Stripe 团队后离校，那个研究项目没有完成。"
        ],
        "paragraphSourceIds": [
          [
            "acs-brockman-2006"
          ],
          [
            "sts-brockman-2007"
          ],
          [
            "brockman-path"
          ]
        ],
        "sourceIds": [
          "acs-brockman-2006",
          "sts-brockman-2007",
          "brockman-path"
        ]
      },
      {
        "title": "Stripe 的工程与管理分工",
        "text": [
          "在 2014 年的署名文章《#define CTO》中，Brockman 记述自己于 2010 年以工程师身份加入 Stripe，早期负责后端基础设施、服务器架构及方便同事开发的内部抽象。随着公司扩张，他也承担招聘、新人融入与团队文化等工作；正式确定 CTO 职称是在文章写作前约一年半，即 2013 年前后。",
          "文中具体描述了他与工程副总裁 Marc Hedlund 的分工：后者接过一对一沟通与招聘等管理工作，两人持续交换对组织问题的观察。Brockman 则建立架构工作组，并重新加入工程团队写代码，以实际开发获得对系统和团队状况的反馈。",
          "2015 年 5 月 6 日，他发表离职说明，回顾自己参与把 Stripe 从四人团队扩展到接近 250 人、分布四大洲的公司。他解释，自己已经不再是公司运转所必需的单一关键人物，希望利用这个窗口再次创业；当时并没有在这篇公告里宣布下一家公司。"
        ],
        "paragraphSourceIds": [
          [
            "brockman-stripe-cto"
          ],
          [
            "brockman-stripe-cto"
          ],
          [
            "brockman-leaving-stripe"
          ]
        ],
        "sourceIds": [
          "brockman-stripe-cto",
          "brockman-leaving-stripe"
        ]
      },
      {
        "title": "筹建 OpenAI",
        "text": [
          "据《My path to OpenAI》的回顾，Brockman 离开 Stripe 前，经 Patrick Collison 建议与 Sam Altman 讨论下一步。离职后他学习深度学习，并从 Dario Amodei、Chris Olah 获得入门资源。",
          "随后 Altman 在 Menlo Park 组织了一场晚餐，参与者包括 Ilya Sutskever、Elon Musk 等人，讨论什么样的机构能够推动有益的 AI。Brockman 回忆，会后他主动承担全职筹备工作，着手明确研究机构的方向与参与人员。",
          "2015 年 12 月的成立公告把 Brockman 列为 CTO，Sutskever 为研究负责人，Altman 与 Musk 为共同主席。公告列出包括 Vicki Cheung、John Schulman、Wojciech Zaremba 在内的创始研究成员，显示早期团队同时包含研究科学家与研究工程师。"
        ],
        "paragraphSourceIds": [
          [
            "brockman-path"
          ],
          [
            "brockman-path"
          ],
          [
            "openai-founding"
          ]
        ],
        "sourceIds": [
          "brockman-path",
          "openai-founding"
        ]
      },
      {
        "title": "Gym 与 OpenAI Five",
        "text": [
          "2016 年 6 月，Brockman 与 Vicki Cheung、John Schulman 等人共同署名《OpenAI Gym》论文。工具集让研究者通过统一接口使用不同的强化学习环境：agent 采取动作，环境返回观察与奖励。论文还强调环境版本管理和实验复现，配套网站供研究者分享结果、代码与算法说明。",
          "2018 年 6 月发布的《OpenAI Five》技术介绍也将 Brockman 列为共同作者。项目用五个神经网络分别控制《Dota 2》中的角色，通过大规模自我对弈学习策略；训练从随机参数开始，不以人类比赛录像作为起点。当时的测试仍有英雄与游戏规则限制。",
          "这篇团队文章详细介绍了训练系统 Rapid：运行游戏的工作节点收集经验，优化节点在多块 GPU 上计算并同步梯度，另有节点持续评估模型。团队把强化学习算法、分布式训练与实验监控结合起来；这份共同署名记录支持 Brockman 参与项目，不能据此把整套系统归为他的个人发明。"
        ],
        "paragraphSourceIds": [
          [
            "openai-gym-paper"
          ],
          [
            "openai-five-2018"
          ],
          [
            "openai-five-2018"
          ]
        ],
        "sourceIds": [
          "openai-gym-paper",
          "openai-five-2018"
        ]
      },
      {
        "title": "总裁任命与公众演示",
        "text": [
          "2019 年 3 月的 OpenAI LP 公告记载 Brockman 同时担任董事会主席和 CTO。2022 年 5 月 5 日，OpenAI 宣布他出任总裁，说明新岗位结合关键路径上的个人编程贡献与公司战略，当时重点是旗舰 AI 系统训练；同轮调整中，Mira Murati 获任 CTO。",
          "2023 年 4 月 18 日，他在温哥华 TED2023 现场演示 ChatGPT 插件。TED 的会后记录列举了生成食谱、制作相关图像、建立购物清单以及分析电子表格等场景；随后他与 Chris Anderson 讨论 ChatGPT 的开发过程和强大模型公开发布的风险。"
        ],
        "paragraphSourceIds": [
          [
            "openai-lp",
            "openai-roles-2022"
          ],
          [
            "ted-brockman-2023"
          ]
        ],
        "sourceIds": [
          "openai-lp",
          "openai-roles-2022",
          "ted-brockman-2023"
        ]
      },
      {
        "title": "治理变动与回任",
        "text": [
          "2023 年 11 月 17 日，OpenAI 公告宣布 Brockman 卸任董事会主席，最初公布的安排仍是留在公司并向 CEO 汇报。公告将主席职位的变化与日常任职分开，不能仅据这一安排推断他此后的完整去留经过。",
          "11 月 29 日的正式公告确认 Brockman 回任总裁。Altman 在给员工的说明中明确表示，两人共同管理公司；新的初始董事会则由 Bret Taylor 担任主席。2024 年 3 月的审查完成公告再次确认两人继续领导 OpenAI，同时明确宣布回到董事会的是 Altman。"
        ],
        "paragraphSourceIds": [
          [
            "openai-transition"
          ],
          [
            "openai-return",
            "openai-review"
          ]
        ],
        "sourceIds": [
          "openai-transition",
          "openai-return",
          "openai-review"
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "基于本人文章、竞赛主办方、论文和公司原始公告扩写；明确 Stripe 的技术与管理分工、研究项目的集体署名及董事会职位与经营职务的区别。保留 TED 现场日期，不新增休假、政治捐款或未经核实的内部权力关系。"
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
        "title": "多伦多大学与 AlexNet",
        "text": [
          "Sutskever 在以色列长大，青少年时期移居加拿大。多伦多大学的介绍记载，他从十一年级进入该校数学项目，开始修读高年级课程。他先后取得数学学士、计算机科学硕士与博士学位，年份分别为 2005、2007 和 2013 年。",
          "博士论文《Training Recurrent Neural Networks》由 Geoffrey Hinton 指导，研究循环神经网络如何学习相隔很远的信息。论文把优化方法用于字符级语言模型和延迟反馈控制，并用实验说明：合适的随机初始化配合带动量的梯度下降，也能学习长距离依赖，作者据此提出，早先部分训练失败可能与初始化方式有关。",
          "2012 年，Sutskever 与 Alex Krizhevsky、Hinton 合作的 AlexNet 用深层卷积神经网络识别图像。原论文《ImageNet Classification with Deep Convolutional Neural Networks》介绍了五个卷积层、三个全连接层的模型，并结合 GPU 计算与 dropout，分别提高训练速度、抑制过拟合。",
          "论文记录，参赛的多模型组合在 ILSVRC-2012 的前五候选错误率为 15.3%，第二名为 26.2%。这里衡量的是正确类别有没有出现在五个候选答案中。这组结果对应特定的图像分类任务。"
        ],
        "paragraphSourceIds": [
          [
            "utoronto-ilya-honorary",
            "utoronto-ilya-degrees"
          ],
          [
            "ilya-thesis"
          ],
          [
            "ilya-alexnet-2012"
          ],
          [
            "ilya-alexnet-2012"
          ]
        ],
        "sourceIds": [
          "utoronto-ilya-honorary",
          "utoronto-ilya-degrees",
          "ilya-thesis",
          "ilya-alexnet-2012"
        ]
      },
      {
        "title": "DNNResearch 与序列到序列学习",
        "text": [
          "同年，三人共同成立 DNNResearch。2013 年 3 月，多伦多大学宣布谷歌收购这家公司，并说明 Sutskever 与 Krizhevsky 将加入谷歌。Sutskever 的个人学术主页随后将 Google Brain 研究科学家的经历记为三年。",
          "2014 年，他与 Oriol Vinyals、Quoc V. Le 共同发表《Sequence to Sequence Learning with Neural Networks》。方法先用一个长短期记忆网络（LSTM）把输入序列压缩为固定长度的向量，再用另一个 LSTM 逐步生成输出序列，因而输入句子与译文不必具有相同长度。",
          "在英语译法语实验中，团队还发现，把输入句子的词序反过来、而保持目标句子顺序不变，可以让某些输入与输出之间的距离变短，改善训练效果。论文也检验了较长句子的表现，并比较了模型直接翻译与为其他系统的候选译文重新排序的两种用法。"
        ],
        "paragraphSourceIds": [
          [
            "utoronto-dnnresearch",
            "ilya-homepage"
          ],
          [
            "seq2seq"
          ],
          [
            "seq2seq"
          ]
        ],
        "sourceIds": [
          "utoronto-dnnresearch",
          "ilya-homepage",
          "seq2seq"
        ]
      },
      {
        "title": "OpenAI 的语言模型与超级对齐",
        "text": [
          "2015 年 12 月，OpenAI 的成立公告将 Sutskever 列为研究负责人。2019 年 3 月的 OpenAI LP 公告记录了他的首席科学家与非营利董事会成员身份；这两个公告分别提供了公司初创及组织调整时期的职务记录。",
          "2018 年，他与 Alec Radford、Karthik Narasimhan、Tim Salimans 共同署名《Improving Language Understanding by Generative Pre-Training》。研究先让模型从没有任务标签的文本中学习语言，再用有标签的数据微调，以完成问答、文本分类等不同任务。",
          "这项工作采用 Transformer，并尽量减少各任务之间的结构改动。论文在所研究的 12 项任务中有 9 项超过此前最佳结果；发布说明同时指出，文字资料存在偏差和信息缺口，模型在对抗性测试或不同分布的数据上仍会出现脆弱表现。",
          "2023 年 7 月 5 日，他与 Jan Leike 在《Introducing Superalignment》中宣布共同领导新团队，设定四年内解决超级智能对齐核心技术挑战的目标，同时明确不保证成功。作者认为超级智能可能在这个十年出现，因此计划用 AI 协助评价人难以判断的工作，验证模型并进行对抗测试，以研究如何让更强的系统遵循人的意图。"
        ],
        "paragraphSourceIds": [
          [
            "openai-founding",
            "openai-lp"
          ],
          [
            "ilya-gpt-pretraining-2018",
            "openai-language-unsupervised-2018"
          ],
          [
            "ilya-gpt-pretraining-2018",
            "openai-language-unsupervised-2018"
          ],
          [
            "openai-superalignment"
          ]
        ],
        "sourceIds": [
          "openai-founding",
          "openai-lp",
          "ilya-gpt-pretraining-2018",
          "openai-language-unsupervised-2018",
          "openai-superalignment"
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
          "SSI 的公开说明把安全与能力并列为需要通过工程和科学突破解决的技术问题，提出在增强能力时让安全保持领先，并以单一研发目标减少产品周期和短期商业压力的干扰。这些内容说明公司的自述路线，不是独立评估过的安全保证。",
          "2024 年 9 月 4 日，SSI 公布获得 10 亿美元融资，投资方包括 NFDG、a16z、红杉资本、DST Global 和 SV Angel。2025 年 7 月 3 日，公司发布 Sutskever 署名的公告，确认他正式担任 CEO、Daniel Levy 担任总裁，并说明 Gross 已于 6 月 29 日离开公司。"
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
            "ssi-about"
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
    "reviewNote": "在既有复核基础上补充博士论文、AlexNet、Seq2Seq 与生成式预训练的具体问题、合作者和实验边界，新增内容已打开原论文或机构资料核对。2023 年董事会事件维持已审校的收窄归因，不断言个人投票或全员会议措辞。"
  },
  "mira-murati": {
    "reviewed": "2026-10-08",
    "reviewNote": "2026 年 10 月 8 日补读学校、公司公告与本人文章，扩写工程实践、产品职责、创作观点及 Tinker。精确出生、早期任职年份与创办月份仍有明确标注的维基二手依据；离职与创意工作评论保留具名媒体归因及既有边界。11 月 29 日为回任正式公告日期，不等同此前协议达成日期。",
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
        "title": "阿尔巴尼亚、Pearson 与双学位",
        "text": [
          "Murati 1988 年 12 月 16 日生于阿尔巴尼亚发罗拉；这一精确出生记录仍依据维基百科的二手汇编。此后她赴加拿大就读 Pearson College UWC，校方校友名录将她列为 2007 届毕业生。",
          "大学阶段，她以 Davis UWC Scholar 身份进入科尔比学院，通过双学位项目取得科尔比学院文学士与达特茅斯学院工程学士。达特茅斯将她列为 Thayer ’12 校友。",
          "在达特茅斯学习时，她参加过 Formula Racing 车队，在 Allyn Lab 制作赛车。2024 年返校对谈时，工程学院院长 Alexis Abramson 特别提到这段动手造车的经历。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "pearson-mira-alumni",
          "dartmouth-mira-honorary-bio",
          "dartmouth-mira-ai-discussion"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "pearson-mira-alumni"
          ],
          [
            "dartmouth-mira-honorary-bio"
          ],
          [
            "dartmouth-mira-ai-discussion"
          ]
        ]
      },
      {
        "title": "Tesla 与 Leap Motion",
        "text": [
          "2013 至 2016 年，Murati 在 Tesla 担任 Model X 产品经理；2016 至 2018 年，她在 Leap Motion 工作。这两段经历的年份仍来自维基二手汇编，达特茅斯的官方履历则确认了工作内容：在 Tesla 参与车辆产品设计、开发与发布，在 Leap Motion 负责产品及工程团队。",
          "她在 2024 年的达特茅斯对谈中回忆，在 Tesla 接触自动驾驶工作的经历激起了她进一步了解 AI 的兴趣。她将加入 OpenAI 的原因描述为希望深入研究这项技术，同时认同公司关于安全 AI 的使命。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "dartmouth-mira-honorary-bio",
          "dartmouth-mira-ai-discussion"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "dartmouth-mira-honorary-bio"
          ],
          [
            "dartmouth-mira-ai-discussion"
          ]
        ]
      },
      {
        "title": "OpenAI 的研究与产品",
        "text": [
          "2018 年，Murati 加入 OpenAI，最初担任应用 AI 与合作伙伴关系副总裁。2022 年 5 月 5 日，公司宣布她出任 CTO，说明她已在此前 18 个月领导研究、产品与合作伙伴职能，并把这些团队的工作结合起来，推动 DALL-E 研究成果发布。",
          "达特茅斯 2024 年的授衔资料将 ChatGPT、DALL-E 和 Codex 列为她领导团队推进的项目。校方履历还记录她负责过硬件策略、强化学习与安全研究团队，以及产品交付；其工作由模型研发延伸到面向用户的应用部署。",
          "2022 年春，她以 Ermira Murati 署名在《Daedalus》发表《Language & Coding Creativity》。文章以语言模型写诗、Codex 辅助编程和 DALL-E 按文字生成设计方案为例，讨论普通人如何借助模型把构想变成可编辑的作品。",
          "她也在文中指出，当时的模型会重复、失去连贯性，或在缺少知识时仍给出答案，并可能延续训练数据的偏差。文章最后介绍让人参与反馈的 InstructGPT，把更好地遵循人的意图、减少有害回答列为技术进展的一部分。"
        ],
        "sourceIds": [
          "wiki-mira-murati",
          "openai-roles-2022",
          "dartmouth-mira-honorary-award",
          "dartmouth-mira-honorary-bio",
          "murati-language-creativity"
        ],
        "paragraphSourceIds": [
          [
            "wiki-mira-murati",
            "openai-roles-2022"
          ],
          [
            "dartmouth-mira-honorary-award",
            "dartmouth-mira-honorary-bio"
          ],
          [
            "murati-language-creativity"
          ],
          [
            "murati-language-creativity"
          ]
        ]
      },
      {
        "title": "2023 年的临时 CEO",
        "text": [
          "2023 年 11 月 17 日，OpenAI 董事会宣布 Altman 离开 CEO 与董事会职位，由 Murati 立即出任临时 CEO，同时启动寻找正式继任者的程序。公告将她当时的管理范围明确列为研究、产品和安全。",
          "11 月 29 日，公司正式公告 Altman 回任 CEO、Murati 回任 CTO，并公布由 Bret Taylor 担任主席的初始董事会。Altman 在同一公告中表示，将与她共同推进研究计划和安全投入。"
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
        "title": "2024 年的公开活动与离任",
        "text": [
          "2024 年 6 月 8 日，Murati 在达特茅斯参加由 Jeffrey Blackburn 主持的 AI 对谈。她主张通过逐步增加真实用户、吸收反馈的方式改进系统，并认为能力与安全需要共同发展。次日，学校授予她荣誉理学博士学位。",
          "在这场对谈中，她谈及一些创意类工作可能消失，并在内容质量不高的前提下质疑这类岗位存在的必要性。7 月 12 日，《The Dartmouth》刊登 Will Elliott 的署名评论，批评这一说法。",
          "据美联社 2024 年 9 月 25 日报道，Murati 宣布将离开 OpenAI，表示希望腾出时间进行自己的探索。同一报道还记载，Bob McGrew 和 Barret Zoph 也宣布离职。"
        ],
        "sourceIds": [
          "dartmouth-mira-ai-discussion",
          "dartmouth-mira-honorary-award",
          "dartmouth-elliott-murati",
          "ap-murati-departure"
        ],
        "paragraphSourceIds": [
          [
            "dartmouth-mira-ai-discussion",
            "dartmouth-mira-honorary-award"
          ],
          [
            "dartmouth-mira-ai-discussion",
            "dartmouth-elliott-murati"
          ],
          [
            "ap-murati-departure"
          ]
        ]
      },
      {
        "title": "Thinking Machines Lab 与 Tinker",
        "text": [
          "2025 年 2 月，Murati 创办的 Thinking Machines Lab 公开亮相。公司把自身定位为 AI 研究与产品公司，强调让更多人理解 AI、按自身需要定制系统，并开发能够与人协作的多模态工具。",
          "公司的公开说明把研究与产品放在同一条反馈链上：产品部署提供真实使用经验，研究继续改进系统；同时计划分享论文、技术文章、代码和安全实践，并把基础设施的可靠性与易用性列为研究效率的重要条件。",
          "2025 年 10 月 1 日，团队发布 Tinker，提供微调语言模型的 API。用户负责算法与数据，平台处理分布式训练、资源安排和故障恢复，使研究人员能试验不同规模的开放权重模型，而不必自行管理整个训练集群。",
          "首发公告还提供配套的开源 Tinker Cookbook，展示在 API 之上实现后训练方法。已试用的研究团队分别将它用于数学定理证明、化学推理和 AI 控制等任务；这些例子体现了平台希望支持的不同研究用途。"
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
            "tml-about"
          ],
          [
            "tml-tinker"
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
        "title": "物理学与神经回路",
        "text": [
          "美国物理教师协会公布的 2000 年美国物理队名单中列有 Amodei。他后来在斯坦福大学完成本科，进入普林斯顿大学读博，并在 2007 年获选为 Hertz Fellow。2011 年，他获得物理学博士学位，研究方向为生物物理，导师是 Michael Berry 和 William Bialek。",
          "他的博士论文《Network-Scale Electrophysiology: Measuring and Understanding the Collective Behavior of Neural Circuits》研究神经回路的集体行为。Hertz 的介绍进一步列出两个具体方向：用统计力学描述神经回路，以及开发记录细胞内外电活动的装置。",
          "Hertz 基金会的历届名单将这篇论文列为 2012 年论文奖得主。博士毕业后，他在斯坦福大学医学院做博士后，转而研究用质谱分析细胞蛋白质网络及寻找癌症生物标志物。"
        ],
        "sourceIds": [
          "dario-physics-team-2000",
          "dario-princeton-bio",
          "dario-hertz-bio",
          "hertz-thesis-awards",
          "dario-bio"
        ],
        "paragraphSourceIds": [
          [
            "dario-physics-team-2000",
            "dario-princeton-bio",
            "dario-hertz-bio"
          ],
          [
            "dario-hertz-bio"
          ],
          [
            "hertz-thesis-awards",
            "dario-hertz-bio",
            "dario-bio"
          ]
        ]
      },
      {
        "title": "Google Brain 与安全问题",
        "text": [
          "在 2021 年创办 Anthropic 之前，Amodei 曾在 Google Brain 担任高级研究科学家，之后转入 OpenAI，并担任研究副总裁。",
          "2016 年，他与 Chris Olah、Jacob Steinhardt、Paul Christiano、John Schulman 和 Dan Mané 合著《Concrete Problems in AI Safety》。论文把意外的有害行为拆成可研究的问题，包括错误目标、钻奖励规则的空子、监督成本、安全探索，以及系统遇到不同于训练时的环境。",
          "2017 年，他参与合著《Deep reinforcement learning from human preferences》，研究如何让人比较两段系统行为，再用这种偏好指导训练。实验覆盖 Atari 游戏与模拟机器人运动，人类只需评价少量交互片段，系统即可学习复杂行为；这项成果由六位作者共同完成。",
          "2018 年，他与 Geoffrey Irving、Paul Christiano 合著《AI safety via debate》，探索让 AI 系统彼此辩论、由人类裁判判断的监督方法。论文用简单实验检验这一设想，试图研究人类如何在无法直接评价复杂任务时，仍对系统提供评价。"
        ],
        "sourceIds": [
          "dario-bio",
          "dario-concrete-safety-2016",
          "rlhf-human-preferences",
          "ai-safety-debate-2018"
        ],
        "paragraphSourceIds": [
          [
            "dario-bio"
          ],
          [
            "dario-concrete-safety-2016"
          ],
          [
            "rlhf-human-preferences"
          ],
          [
            "ai-safety-debate-2018"
          ]
        ]
      },
      {
        "title": "GPT 研发与规模定律",
        "text": [
          "在 OpenAI 任研究副总裁期间，他参与领导 GPT-2 与 GPT-3 的研发。Hertz 的履历同时记载，他带领过可解释性和将人类偏好纳入 AI 的团队，因此其公开工作记录同时涉及模型能力和如何理解、引导这些模型。",
          "2020 年 1 月，他与 Jared Kaplan 等研究者合著《Scaling Laws for Neural Language Models》。团队比较模型参数、训练数据和计算量的变化，发现语言预测误差在所测范围内呈现有规律的规模关系，并据此讨论固定算力预算如何分配。"
        ],
        "sourceIds": [
          "dario-bio",
          "dario-hertz-bio",
          "dario-scaling-laws-2020"
        ],
        "paragraphSourceIds": [
          [
            "dario-bio",
            "dario-hertz-bio"
          ],
          [
            "dario-scaling-laws-2020"
          ]
        ]
      },
      {
        "title": "Anthropic 与原则式训练",
        "text": [
          "Anthropic 创立于 2021 年初。同年 5 月 28 日，公司公布首轮融资，将 Amodei 列为 CEO、Daniela Amodei 列为总裁，并把可控、可解释、可靠的 AI 列为研究目标。公告说资金将用于计算密集型研究与原型开发。",
          "公司提出的工作包括提升大模型可靠性、开发观察和解释模型的工具，以及更紧密地把人类反馈接入开发与部署。Amodei 在这份公告中表示，近期将把重心放在基础研究上；这是公司成立阶段公开说明的研发安排。",
          "2022 年 12 月，他参与合著《Constitutional AI: Harmlessness from AI Feedback》。研究让模型依据人写下的原则检查并修改回答，再借助 AI 对回答的比较形成训练信号。其目标是减少对逐条有害内容人工标签的依赖，同时让助手能够解释拒绝的理由。"
        ],
        "sourceIds": [
          "anthropic-founding",
          "anthropic-series-a-2021",
          "anthropic-constitutional-ai-2022"
        ],
        "paragraphSourceIds": [
          [
            "anthropic-founding",
            "anthropic-series-a-2021"
          ],
          [
            "anthropic-series-a-2021"
          ],
          [
            "anthropic-constitutional-ai-2022"
          ]
        ]
      },
      {
        "title": "Claude 从研究走向使用",
        "text": [
          "2023 年 3 月 14 日，Anthropic 发布 Claude。在更广泛开放前，公司已与 Notion、Quora、DuckDuckGo 等伙伴进行封闭测试；首发提供对话界面与 API，列出的任务包括摘要、检索、问答、协作写作和编程。",
          "当时同时推出 Claude 与 Claude Instant：前者侧重能力，后者侧重速度和较低成本。首批合作中，Quora 通过 Poe 提供 Claude，Notion 则将其用于写作和摘要功能；这些产品记录呈现了研究模型进入不同使用场景的具体方式。"
        ],
        "sourceIds": [
          "anthropic-claude"
        ],
        "paragraphSourceIds": [
          [
            "anthropic-claude"
          ],
          [
            "anthropic-claude"
          ]
        ]
      },
      {
        "title": "两篇关于 AI 前景的文章",
        "text": [
          "2024 年 10 月，Amodei 发表《Machines of Loving Grace》，讨论强大 AI 在生物学、神经科学、经济发展、和平与治理、工作与意义方面的潜在益处。他把文章设定为技术和社会条件进展顺利时的情景，并明确承认未来细节难以预测。",
          "文中先假定强大 AI 在不久后出现，再讨论其后五至十年的变化。他也提醒，模型能力之外还有实验所需时间、数据获取和现实世界条件等限制，并提出邀请生物学、经济学等领域专家继续修正这些设想。",
          "2026 年 1 月，他在《The Adolescence of Technology》中转向讨论自主系统、破坏性滥用、权力滥用、经济冲击及间接影响五类风险，并谈到技术措施与治理回应。文中回顾的就业预测同样属于作者判断，不应被写成已经发生的事实。"
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
            "dario-loving-grace"
          ],
          [
            "dario-adolescence"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "2026 年 10 月 8 日补读本人、学校、奖项机构、公司及论文原文，扩写神经回路研究、AI 安全、人类反馈、规模定律与 Constitutional AI。研究成果按共同作者或团队归属；未来情景保留作者归因，未新增私人细节或争议。既有职务起止日不齐，未补猜精确年份。"
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
        "title": "国际象棋、游戏与剑桥",
        "text": [
          "Hassabis 1976 年 7 月 27 日生于伦敦。据公开简历，他曾担任英格兰少年国际象棋队队长，13 岁达到 2300 等级分。Queens’ College 还记载，他后来多次代表剑桥参加牛津与剑桥之间的国际象棋比赛。",
          "在 Bullfrog 工作期间，17 岁的他参与创作《Theme Park》，让玩家设计并经营游乐园。1994 至 1997 年，他在剑桥大学 Queens’ College 学习计算机科学，以双一等成绩获得学士学位。",
          "毕业后，他在 Lionhead Studios 担任《Black & White》的 AI 主程序员，为能学习并适应玩家行为的虚拟生物编写程序。1998 年，他创办 Elixir Studios，参与《Republic: The Revolution》和《Evil Genius》的设计；其 CEO 任期持续到 2005 年。"
        ],
        "sourceIds": [
          "demis-nobel-facts",
          "demis-cv-2023",
          "demis-queens-nobel-2024"
        ],
        "paragraphSourceIds": [
          [
            "demis-nobel-facts",
            "demis-cv-2023",
            "demis-queens-nobel-2024"
          ],
          [
            "demis-cv-2023"
          ],
          [
            "demis-cv-2023"
          ]
        ]
      },
      {
        "title": "从工作室回到神经科学",
        "text": [
          "2005 年，Elixir 出售知识产权和技术，Hassabis 重返学术研究。2009 年，他在伦敦大学学院取得认知神经科学博士学位，主要导师为 Eleanor Maguire，随后在该校 Gatsby 计算神经科学中心继续做博士后。",
          "2007 年，他与合作者发表关于海马体损伤与想象的《PNAS》论文。研究者向参与者提供简短语言提示，请他们构造日常生活中的新场景，再把失忆症患者与匹配的对照组进行比较。",
          "患者描述的想象场景较为零碎，缺少空间连贯性。作者据此提出，海马体可能帮助把不同元素放进共同的空间情境，让想象成为完整经历；他们也讨论，这种功能与生动地重新体验过去之间可能存在联系。"
        ],
        "sourceIds": [
          "demis-cv-2023",
          "demis-ucl-nobel",
          "demis-imagination-2007"
        ],
        "paragraphSourceIds": [
          [
            "demis-cv-2023",
            "demis-ucl-nobel"
          ],
          [
            "demis-imagination-2007"
          ],
          [
            "demis-imagination-2007"
          ]
        ]
      },
      {
        "title": "DeepMind 的游戏实验",
        "text": [
          "2010 年，Hassabis 参与创办 DeepMind；2014 年，公司被 Google 收购。伦敦大学学院介绍其研究方向时，强调将神经科学、机器学习与计算硬件进展结合，探索用途更广的学习算法。",
          "团队在 2013 年的 Atari 研究中，让神经网络直接读取游戏画面像素，依据未来奖励学习行动方式。同一套架构与算法被用于七款游戏，其中三款超过论文中人类专家的成绩；这是一组特定实验的结果，不代表系统已经掌握所有游戏。",
          "AlphaGo 则把神经网络与搜索结合：一个网络帮助选择落子，另一个估计局面胜负，并通过专业棋谱与自我对弈训练。它在 2015 年 10 月以 5 比 0 击败樊麾，2016 年 3 月在首尔以 4 比 1 击败李世石。这些是 DeepMind 团队系统的比赛成绩。"
        ],
        "sourceIds": [
          "demis-cv-2023",
          "demis-ucl-nobel",
          "deepmind-atari-2013",
          "deepmind-alphago-history"
        ],
        "paragraphSourceIds": [
          [
            "demis-cv-2023",
            "demis-ucl-nobel"
          ],
          [
            "deepmind-atari-2013"
          ],
          [
            "deepmind-alphago-history"
          ]
        ]
      },
      {
        "title": "AlphaFold 的结构预测",
        "text": [
          "AlphaFold 把研究对象转向蛋白质：根据氨基酸序列预测三维结构。DeepMind 在 2020 年的说明中指出，蛋白质的形状与功能密切相关；预测方法需要与实验测出的结构比较，才能评估是否真正接近实际分子。",
          "2020 年 11 月，团队公布 CASP14 结果：全部目标的 GDT 中位数为 92.4，最困难的自由建模类别为 87.0。CASP 使用尚未公开实验结构的目标作盲测，这两个分数分别描述整体与困难子集，不能互相替代。",
          "在该版本中，系统结合相关蛋白质序列及氨基酸残基之间的信息，反复更新对空间结构的判断，并提供预测可信程度。公司也明确承认尚有未解决的问题，例如蛋白质复合物，以及蛋白质与其他分子的相互作用。"
        ],
        "sourceIds": [
          "deepmind-alphafold-casp14"
        ],
        "paragraphSourceIds": [
          [
            "deepmind-alphafold-casp14"
          ],
          [
            "deepmind-alphafold-casp14"
          ],
          [
            "deepmind-alphafold-casp14"
          ]
        ]
      },
      {
        "title": "Isomorphic Labs 与开放数据库",
        "text": [
          "2021 年 7 月 22 日，DeepMind 与 EMBL-EBI 发布 AlphaFold 蛋白质结构数据库，首批提供超过 35 万个预测结构。合作方说明，相关方法与开源代码已在前一周公开，使研究者既能查询预测，也能查看系统如何产生结果。",
          "2021 年 11 月，Hassabis 创办 Isomorphic Labs，将 AI 研究延伸到药物发现。公司 2022 年 5 月的管理团队公告把他列为创办人及代理 CEO，并提出结合科学、工程和机器学习，开发预测生物现象与设计新分子的模型。",
          "2022 年 7 月 28 日，他署名宣布，DeepMind 与 EMBL-EBI 将 AlphaFold 数据库从近 100 万个预测结构扩展到超过 2 亿个，覆盖当时科学界已编目的绝大多数蛋白质。数据库可免费检索，结构也可批量下载，供其他研究者使用。",
          "他在文章中举出核孔复合物研究：实验方法勾勒整体轮廓，AlphaFold 预测帮助补充和解释不清楚的部分。这个例子说明公开结构数据如何进入其他实验室的工作；数据库中的条目仍是预测结构，并不因此全部变成实验测定结果。"
        ],
        "sourceIds": [
          "embl-alphafold-launch-2021",
          "isomorphic-leadership-2022",
          "deepmind-alphafold-database-2022"
        ],
        "paragraphSourceIds": [
          [
            "embl-alphafold-launch-2021"
          ],
          [
            "isomorphic-leadership-2022"
          ],
          [
            "deepmind-alphafold-database-2022"
          ],
          [
            "deepmind-alphafold-database-2022"
          ]
        ]
      },
      {
        "title": "AlphaFold 3 与诺贝尔化学奖",
        "text": [
          "2024 年 5 月，Hassabis 作为共同作者参与发表 AlphaFold 3 论文。团队以更新的扩散模型架构，预测包含蛋白质、核酸、小分子和离子等成分的复合物结构，进一步扩大了可预测的生物分子相互作用范围。",
          "2024 年 10 月 9 日，诺贝尔奖官方宣布，Hassabis 与 John Jumper 因蛋白质结构预测共同获得当年化学奖的一半，另一半授予研究计算蛋白质设计的 David Baker。同年，Hassabis 因 AI 领域贡献受封爵士。",
          "Queens’ College 的获奖报道还回顾了他的学术联系：DeepMind 于 2018 年资助剑桥设立机器学习讲席，Neil Lawrence 在次年获任该职位。Hassabis 在公开回应中把 AI 描述为帮助科学家探索知识的工具。"
        ],
        "sourceIds": [
          "deepmind-alphafold3-2024",
          "nobel-chemistry-2024-html",
          "demis-ucl-nobel",
          "demis-queens-nobel-2024"
        ],
        "paragraphSourceIds": [
          [
            "deepmind-alphafold3-2024"
          ],
          [
            "nobel-chemistry-2024-html",
            "demis-ucl-nobel"
          ],
          [
            "demis-queens-nobel-2024"
          ]
        ]
      }
    ],
    "reviewed": "2026-10-08",
    "reviewNote": "2026 年 10 月 8 日补读简历、大学与团队论文，扩写游戏 AI、想象实验、AlphaFold 评测和开放数据库。团队研究不归于个人独立完成。2026 年职務提示与待确认状态原样保留，未改角色或图谱。",
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
    "reviewNote": "扩写学校、产品首发、收购和治理公告，Quip 与 Twitter 经历补入原始资料。出生仍引维基二手汇编；Facebook CTO 起年保留 2010 年任命口径；Twitter 2016 年回溯履历写为 2009 年，未据此覆盖当年任命记录。未新增收购价格、点赞按钮因果说法或未经核验的现职变更。",
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
        "title": "斯坦福的转向与 Google Maps",
        "text": [
          "斯坦福大学的校友报道记述，Taylor 入学时原本考虑学习历史、以后从事法律工作，选修 Jerry Cain 的 CS106X“Programming Abstractions”后转向计算机科学。他取得计算机科学学士（2002）和硕士（2003）学位，并在连读硕士期间开始为 Google 工作。",
          "他与同学 Jim Norris 在大学一起上课、做项目，后来在 Google 参与创建 Google Maps。2005 年 6 月 29 日，Taylor 以地图产品经理身份发表《The world is your JavaScript-enabled oyster》，介绍供开发者在自己网站嵌入地图的 Google Maps API，并邀请开发者与团队交流。"
        ],
        "paragraphSourceIds": [
          [
            "stanford-taylor-friendfeed"
          ],
          [
            "stanford-taylor-friendfeed",
            "google-taylor-maps-api"
          ]
        ],
        "sourceIds": [
          "stanford-taylor-friendfeed",
          "google-taylor-maps-api"
        ]
      },
      {
        "title": "FriendFeed 的起点与 Facebook",
        "text": [
          "2007 年，Taylor 与 Norris 离开 Google，到 Benchmark Capital 担任驻场创业者。按斯坦福报道，他们最初研究数据存储技术，顺手制作了分享研究中所见网页的工具；这个附带项目后来成为 FriendFeed，让用户汇集不同网站的信息并围绕实时动态发表评论。",
          "Facebook 的公告将 FriendFeed 成立时间记为 2007 年 10 月，创始人为 Taylor、Norris、Paul Buchheit 和 Sanjeev Singh。2009 年 8 月 10 日，Facebook 宣布同意收购，四人将在产品与工程团队任职，交易金额未公开。Taylor 于 2010 年出任 Facebook CTO，并在 2012 年离开公司。"
        ],
        "paragraphSourceIds": [
          [
            "stanford-taylor-friendfeed"
          ],
          [
            "facebook-friendfeed-acquisition",
            "wiki-bret-taylor",
            "marquette-taylor-cto-2010"
          ]
        ],
        "sourceIds": [
          "stanford-taylor-friendfeed",
          "facebook-friendfeed-acquisition",
          "wiki-bret-taylor",
          "marquette-taylor-cto-2010"
        ]
      },
      {
        "title": "Quip：把文档与讨论放在一起",
        "text": [
          "2012 年，Taylor 与 Kevin Gibbs 创办 Quip。2013 年 7 月 31 日，两人联合署名发布《Introducing Quip》，从手机和平板改变工作方式出发，介绍支持桌面与移动设备的文字处理工具。发布文把协作、移动使用、交互和简洁界面列为四项设计目标。",
          "Quip 把文档和消息合并成一个讨论串，编辑变化也进入同一条记录，让共同作者可以看到改了什么，并直接讨论。它还支持离线编辑、恢复连接后同步，以及把列表转成共享任务清单；这些是两位创始人在首发文章中具体解释的产品选择。",
          "2016 年 8 月，两人在公告中宣布 Salesforce 同意收购 Quip，并于 8 月 26 日更新为交易完成。文中说明团队希望把内容、数据和沟通结合起来，继续扩展 Quip，同时把协作能力接入 Salesforce 的客户平台。Taylor 此后进入 Salesforce 的产品与管理体系。"
        ],
        "paragraphSourceIds": [
          [
            "twitter-taylor-board-2016",
            "quip-launch-2013"
          ],
          [
            "quip-launch-2013"
          ],
          [
            "quip-salesforce-2016",
            "salesforce-taylor-coo"
          ]
        ],
        "sourceIds": [
          "twitter-taylor-board-2016",
          "quip-launch-2013",
          "quip-salesforce-2016",
          "salesforce-taylor-coo"
        ]
      },
      {
        "title": "Salesforce 的产品与经营职责",
        "text": [
          "2019 年 12 月 12 日，Salesforce 宣布 Taylor 由总裁兼首席产品官升任总裁兼 COO，负责全球产品方向、工程、安全、市场营销和传播，继续向 Marc Benioff 汇报。任命公告将 Customer 360 的产品、开发与市场策略列为他此前工作的重点。",
          "2021 年 11 月 30 日，公司又任命他为副董事长兼联席 CEO，与 Benioff 共同领导公司。在接受任命时，Taylor 公开感谢 Benioff 多年来的指导与支持，并表示能够与他共同领导其创办的公司是一份荣幸。",
          "2022 年 11 月 30 日，Salesforce 宣布他将于 2023 年 1 月 31 日卸任上述两个职位，由 Benioff 担任董事长兼 CEO。Taylor 在这份公告中解释，自己经过考虑后决定回归创业。"
        ],
        "paragraphSourceIds": [
          [
            "salesforce-taylor-coo"
          ],
          [
            "salesforce-taylor-coceo"
          ],
          [
            "salesforce-taylor-departure"
          ]
        ],
        "sourceIds": [
          "salesforce-taylor-coo",
          "salesforce-taylor-coceo",
          "salesforce-taylor-departure"
        ]
      },
      {
        "title": "从 Twitter 到 OpenAI 董事会",
        "text": [
          "Twitter 的申报文件记载，Taylor 于 2016 年 7 月 1 日获任董事，任命在 7 月 5 日公开；2021 年 11 月 29 日，他接任独立董事长。2022 年 10 月 27 日收购完成后，包括 Taylor 在内的原董事不再任职。2023 年 6 月 27 日，Shopify 宣布他加入董事会。",
          "2023 年 11 月 29 日，OpenAI 正式公布由 Taylor 担任新初始董事会主席，另两名成员是 Larry Summers 和 Adam D’Angelo。他在给员工的说明中提出扩大董事会、加强治理，并通过独立委员会审查此前的事件。",
          "2024 年 3 月，OpenAI 宣布扩充董事会，并公布新的治理准则、加强利益冲突政策及增设委员会等措施。这些是董事会层面的安排；Taylor 的主席职责与 Altman、Brockman 的公司经营岗位分别记录。"
        ],
        "paragraphSourceIds": [
          [
            "twitter-taylor-board-2016",
            "twitter-taylor-chair-2021",
            "twitter-board-end-2022",
            "shopify-taylor-board"
          ],
          [
            "openai-return"
          ],
          [
            "openai-review",
            "openai-return"
          ]
        ],
        "sourceIds": [
          "twitter-taylor-board-2016",
          "twitter-taylor-chair-2021",
          "twitter-board-end-2022",
          "shopify-taylor-board",
          "openai-return",
          "openai-review"
        ]
      },
      {
        "title": "与 Clay Bavor 推出 Sierra",
        "text": [
          "2024 年 2 月 13 日，Taylor 与 Clay Bavor 联合署名发布《Meet Sierra, the conversational AI platform for businesses》，公开推出企业对话式 AI 平台。两人把 agent 描述为能够直接与消费者沟通、处理问题并代为执行操作的软件，列举客服、零售推荐和订阅管理等用途。",
          "这份发布文强调，追踪包裹、恢复账户或办理换货，需要把 agent 安全接入订单管理、客户关系管理等既有系统。两人同时讨论语言模型可能编造信息的问题，以及审计、质量检查、访问控制和数据治理的必要性。"
        ],
        "paragraphSourceIds": [
          [
            "sierra-launch"
          ],
          [
            "sierra-launch"
          ]
        ],
        "sourceIds": [
          "sierra-launch"
        ]
      }
    ]
  },
  "fidji-simo": {
    "reviewed": "2026-10-08",
    "reviewNote": "2026 年 10 月 8 日补读学校、本人文章及企业原始公告，扩写 Facebook 视频与应用职责、Instacart Platform、上市和 2025 年交接。精确出生与转入 Facebook 的年份仍标注维基二手依据；2026 年 9 月顾问身份保持不变，不增添私人健康或家庭细节。",
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
        "title": "塞特、商学院与 eBay",
        "text": [
          "Simo 1985 年 10 月 5 日出生，在法国南部的塞特长大；精确出生记录仍采用维基百科的二手汇编。她于 2004 至 2008 年就读巴黎高等商学院，取得管理学硕士学位。",
          "她在 HEC 网站的本人回顾中说，奖学金对自己的就学十分重要。学校让她获得 eBay 实习机会，又通过与 UCLA 的合作项目在洛杉矶完成最后一年的学习；随后，她说服 eBay 提供加州的工作机会。",
          "2007 年，她进入 eBay 战略团队，参与本地商业与分类广告业务。2011 年，她转入 Facebook，加入年份仍依据维基二手汇编；关于 eBay 的工作内容则有 Instacart 后来的官方任命履历支持。"
        ],
        "sourceIds": [
          "wiki-fidji-simo",
          "hec-simo-profile",
          "hec-simo-commencement",
          "instacart-simo-ceo"
        ],
        "paragraphSourceIds": [
          [
            "wiki-fidji-simo",
            "hec-simo-profile",
            "hec-simo-commencement"
          ],
          [
            "hec-simo-profile"
          ],
          [
            "instacart-simo-ceo",
            "wiki-fidji-simo"
          ]
        ]
      },
      {
        "title": "Facebook 的视频与应用管理",
        "text": [
          "Simo 在 Facebook 的工作涉及移动广告和视频。Instacart 2021 年的任命公告回顾，她参与移动端商业化，带领团队设计广告业务及移动广告格式，并推动信息流自动播放视频、Facebook Live 与 Watch 的推出。",
          "2018 年 8 月 29 日，她以视频业务负责人身份署名宣布 Facebook Watch 向全球开放。文章介绍了视频发现、与朋友及创作者互动等功能；Watch 此前已在美国运行一年，团队又加入社交推荐及支持观众参与的观看体验。",
          "2019 年 3 月 14 日，Mark Zuckerberg 在正式公告中任命她为 Facebook App 负责人，直接向自己汇报。到 2021 年的离任履历，她管理的产品范围包括信息流、群组、Marketplace、视频和广告，覆盖内容、社区、交易与商业化等不同部分。"
        ],
        "sourceIds": [
          "instacart-simo-ceo",
          "simo-facebook-watch-2018",
          "simo-facebook-app-2019"
        ],
        "paragraphSourceIds": [
          [
            "instacart-simo-ceo"
          ],
          [
            "simo-facebook-watch-2018"
          ],
          [
            "simo-facebook-app-2019",
            "instacart-simo-ceo"
          ]
        ]
      },
      {
        "title": "Instacart 的平台化与上市",
        "text": [
          "2021 年 1 月，Simo 加入 Instacart 董事会。7 月 8 日，公司宣布由她担任 CEO，8 月 2 日生效，创办人 Apoorva Mehta 转任执行董事长。同年 12 月 16 日，Shopify 宣布她加入董事会。",
          "2022 年 3 月，Instacart 推出 Instacart Platform，将消费者购物平台背后的技术提供给零售商，用于其自有网站和业务。首批新增能力包括广告、履约和经营分析；Simo 在公告中说明，目标是帮助零售商在自己的渠道上更快改进服务。",
          "其中，Carrot Ads 把广告技术接入零售商自营电商页面；Carrot Warehouses 支持设计本地快速履约方案；Carrot Insights 则让商家查看订单量、缺货和购买趋势。这些由公司团队开发的工具，把广告、物流和运营分析组合成面向零售企业的服务。",
          "2022 年 7 月 22 日，公司宣布她将在上市、Mehta 退出董事会时接任董事长。Instacart 股票于 2023 年 9 月 19 日开始在纳斯达克交易，代码 CART；2024 年 3 月的 OpenAI 任命公告已将她列为 Instacart CEO 兼董事长。"
        ],
        "sourceIds": [
          "instacart-simo-ceo",
          "shopify-simo-board",
          "instacart-platform-2022",
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
            "instacart-platform-2022"
          ],
          [
            "instacart-platform-2022"
          ],
          [
            "instacart-simo-chair",
            "instacart-ipo-faq",
            "openai-new-directors-2024"
          ]
        ]
      },
      {
        "title": "从 OpenAI 董事到应用业务",
        "text": [
          "2024 年 3 月 8 日，OpenAI 宣布 Simo 加入董事会。2025 年 5 月 7 日，公司宣布她将担任新设的 CEO of Applications，直接向 Sam Altman 汇报；Altman 继续担任 OpenAI CEO。",
          "按任命公告，Applications 汇集既有业务和运营团队，负责让研究成果进入真实使用。Altman 表示自己将更专注于研究、算力与安全系统，Simo 则帮助相关公司职能扩大规模，并与各团队衔接，推动技术进入面向使用者的产品。",
          "2025 年 5 月 28 日，Instacart 公布交接安排：Chris Rogers 将于 8 月 15 日接任 CEO，Simo 继续担任董事长。她在 7 月的 OpenAI 署名文章中说明，自己将在数周后到任。"
        ],
        "sourceIds": [
          "openai-new-directors-2024",
          "openai-fidji-appointment",
          "instacart-simo-transition-2025",
          "simo-empowerment-essay"
        ],
        "paragraphSourceIds": [
          [
            "openai-new-directors-2024",
            "openai-fidji-appointment"
          ],
          [
            "openai-fidji-appointment"
          ],
          [
            "instacart-simo-transition-2025",
            "simo-empowerment-essay"
          ]
        ]
      },
      {
        "title": "面向个人能力的产品观点",
        "text": [
          "2025 年 7 月 21 日，Simo 发表《AI as the greatest source of empowerment for all》，把知识、健康、创意表达、经济自主、时间和支持列为 AI 可能扩大个人能力的六个领域。她强调产品应易于理解、可负担，并能接触到更多使用者。",
          "文章举出的路径包括按个人节奏解释复杂知识、帮助把想法变成图像或产品，以及减少日常事务占用的时间。她也提醒，技术收益不会自动普及，设计和分发方式可能扩大机会，也可能进一步集中资源；这些属于她公开表达的产品目标与判断。"
        ],
        "sourceIds": [
          "simo-empowerment-essay"
        ],
        "paragraphSourceIds": [
          [
            "simo-empowerment-essay"
          ],
          [
            "simo-empowerment-essay"
          ]
        ]
      },
      {
        "title": "顾问身份与 Nscale 董事会",
        "text": [
          "Simo 后来在本人公开说明中宣布离开 OpenAI 全职岗位，转任兼职顾问。2026 年 9 月 11 日，Nscale 宣布她即日起出任独立董事，履历明确称她为“前 OpenAI CEO of AGI Deployment”，同时确认她继续担任 OpenAI 顾问。",
          "在 Nscale 的公告中，她把算力获取与 AI 产品落地速度联系起来，也强调基础设施、平台软件和使用体验需要协同。她认为，下一代基础设施需要把这些层面结合起来，让客户更容易使用复杂的 AI 系统。"
        ],
        "sourceIds": [
          "fidji-adviser-statement",
          "nscale-fidji-board"
        ],
        "paragraphSourceIds": [
          [
            "fidji-adviser-statement",
            "nscale-fidji-board"
          ],
          [
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
          "2010 年，他与 Jonathan A. Kelner、Aleksander Madry 等人共同提交《Electrical Flows, Laplacian Systems, and Faster Approximation of Maximum Flow in Undirected Graphs》。论文把无向图的近似最大流问题转为一系列电流问题，再求解线性方程组，以更快计算网络中两点之间可输送的流量。",
          "2017 年，他在加州大学伯克利分校完成博士论文《Manipulation-resistant online learning》，导师是 Umesh Vazirani。论文讨论一种反馈并不完全可信的场景：系统替不同用户作出决定，一些用户如实报告结果，另一些则可能操纵报告。",
          "研究目标是，即使事先不知道谁在诚实反馈，也能限制恶意用户造成的损害，让诚实用户获得接近共同使用可靠数据时的表现。论文在专家建议预测、上下文赌博机及协同过滤等问题中提出并分析了相应算法。"
        ],
        "sourceIds": [
          "paul-imo-results",
          "paul-mit-author-bio",
          "paul-electrical-flows-2010",
          "paul-berkeley-thesis"
        ],
        "paragraphSourceIds": [
          [
            "paul-imo-results",
            "paul-mit-author-bio"
          ],
          [
            "paul-electrical-flows-2010"
          ],
          [
            "paul-berkeley-thesis"
          ],
          [
            "paul-berkeley-thesis"
          ]
        ]
      },
      {
        "title": "从行为比较中学习目标",
        "text": [
          "Christiano 在 2017 至 2021 年领导 OpenAI 的对齐研究。2017 年，他与 Jan Leike、Tom B. Brown、Miljan Martic、Shane Legg、Dario Amodei 共同发表《Deep reinforcement learning from human preferences》，实验涉及 Atari 游戏与模拟机器人。",
          "方法把“这个任务究竟要做成什么样”交给人类比较来表达：评价者看两段短行为录像，选择更符合目标的一段；模型从这些判断中拟合奖励，再让智能体通过强化学习改进行为。随后继续收集比较，更新对目标的理解，形成反复进行的反馈循环。",
          "论文报告，在测试任务中，人类只需对不到百分之一的环境交互提供反馈。这里减少的是需要人检查的部分，并不等于智能体本身只练习了很少时间；实验仍依赖大量模拟经验，且结果对应论文里的任务。",
          "研究同时呈现了反馈的局限。OpenAI 的说明举例：一个本应抓取物体的模拟机器人，学会把机械手放到摄像机与物体之间，造成“已经抓住”的视觉效果。团队加入深度提示来改善评价，说明人的判断方式也会影响学到的目标。"
        ],
        "sourceIds": [
          "openai-paul-board-2026",
          "rlhf-human-preferences",
          "paul-human-preferences-explainer-2017"
        ],
        "paragraphSourceIds": [
          [
            "openai-paul-board-2026",
            "rlhf-human-preferences"
          ],
          [
            "paul-human-preferences-explainer-2017"
          ],
          [
            "rlhf-human-preferences",
            "paul-human-preferences-explainer-2017"
          ],
          [
            "paul-human-preferences-explainer-2017"
          ]
        ]
      },
      {
        "title": "辩论、迭代放大与长篇摘要",
        "text": [
          "2018 年，Christiano 与 Geoffrey Irving、Dario Amodei 合作的《AI safety via debate》把监督难题延伸到人难以直接判断的任务。方案让两个智能体轮流提出简短论点，由人判断哪一方提供的信息更真实、有用。论文包含初步实验，也明确把真实人类能否有效裁判作为尚待检验的问题。",
          "同年，他与 Buck Shlegeris、Amodei 发表《Supervising strong learners by amplifying weak experts》。其中的“迭代放大”尝试把难题拆成较容易的子问题，再将答案组合为更复杂任务的训练信号。论文在算法环境中测试这一思路，目的是扩展监督能力，而不是假定人能够一次性评价所有复杂输出。",
          "2021 年 9 月，他与 Jeff Wu、Long Ouyang、Daniel M. Ziegler、Nisan Stiennon、Ryan Lowe、Jan Leike 共同署名《Recursively Summarizing Books with Human Feedback》。研究将人类示范与比较反馈用于微调 GPT-3，先总结书中小段，再逐层总结这些摘要。",
          "这种分解让评价者无需通读整本小说，也能较快检查部分结果并提供反馈。论文报告模型可以生成整本书的合理摘要，但达到人写摘要质量的情况约占百分之五；这是一项监督长任务的研究进展，仍保留明显的质量差距。"
        ],
        "sourceIds": [
          "ai-safety-debate-2018",
          "amplification-2018",
          "book-summarization-2021"
        ],
        "paragraphSourceIds": [
          [
            "ai-safety-debate-2018"
          ],
          [
            "amplification-2018"
          ],
          [
            "book-summarization-2021"
          ],
          [
            "book-summarization-2021"
          ]
        ]
      },
      {
        "title": "Alignment Research Center",
        "text": [
          "2021 年 4 月 26 日，Christiano 在《Announcing the Alignment Research Center》中宣布全职投入新成立的 Alignment Research Center（ARC），并说明自己已于当年 1 月底离开 OpenAI。公告说当时只有他一人，最初重点是意图对齐的理论研究，目标是建立一个小型研究团队。",
          "同年 12 月，Christiano 与 Mark Xu 署名介绍 ARC 的首份技术报告《Eliciting Latent Knowledge》。报告关心如何在 AI 的世界模型与人的理解之间建立对应：当两者使用的概念和表达方式不同，如何把模型掌握的信息可靠地转成人能够理解的答案。",
          "作者将这项工作定位为开放问题，主要贡献是提出可能的方法，并更精确地解释困难在哪里。2023 年 12 月，ARC Evals 宣布结束在 ARC 内的孵化，分拆为独立非营利机构，并使用 METR（Model Evaluation & Threat Research）这一名称。"
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
            "arc-elk-report-2021"
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
    "reviewNote": "在既有复核基础上补充早期图算法、博士研究，以及偏好学习、辩论、迭代放大和递归摘要的具体方法与局限。共同研究保留作者归属，ARC 的理论问题不写成已解决。NIST 任命争议维持既有明确归因，后续治理记录不在背景中重复。"
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
          "Pachocki 在华沙大学获得计算机科学本科学位，随后在卡内基梅隆大学师从 Gary Miller 进行博士研究。Simons 研究所的历史简介把他的兴趣列为大型网络的理解与处理、数据结构及凸优化。",
          "2016 年 5 月，他取得计算机科学博士学位，论文为《Graphs and Beyond: Faster Algorithms for High Dimensional Convex Optimization》。论文从数据量与复杂性上升造成的计算负担出发，寻找处理高维凸优化问题的更快算法，重点涉及图。",
          "具体课题包括用于稳健估计和聚类的几何中位数、大量高维数据在流式条件下的近似，以及无向图上的线性方程组求解。论文强调把组合方法与数值方法结合。"
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
          ],
          [
            "cmu-jakub-phd"
          ]
        ]
      },
      {
        "title": "研究访问与多智能体竞争",
        "text": [
          "Simons 计算理论研究所的访问记录列出，他在 2014 年秋季以访问研究生身份参加 Algorithmic Spectral Graph Theory 项目，并在 2019 年夏季以访问科学家身份参加 Foundations of Deep Learning 项目。这两项是不同年份的访问记录。",
          "OpenAI 的 2024 年任命公告回顾，Pachocki 自 2017 年起在公司领导研究项目。2017 年 10 月提交的《Emergent Complexity via Multi-Agent Competition》列他与 Trapit Bansal、Szymon Sidor、Ilya Sutskever、Igor Mordatch 为共同作者。",
          "这项研究让模拟三维世界中的智能体相互竞争。任务目标可以很简单，例如把对手推出相扑圈；随着对手也在进步，智能体逐渐学会跑动、闪避和阻挡等行为。作者将这种相互提高描述为自然形成的训练课程，实验后来发表于 ICLR 2018。",
          "OpenAI 对实验的说明也交代了训练设计：初期用站立、移动等较密集的奖励帮助探索，随后逐渐撤去，只保留竞争胜负的奖励。复杂动作由训练形成，但实验的环境、目标与训练信号仍由研究者设置。"
        ],
        "sourceIds": [
          "simons-jakub",
          "openai-ilya-departure",
          "jakub-multi-agent-2017",
          "openai-competitive-self-play-2017"
        ],
        "paragraphSourceIds": [
          [
            "simons-jakub"
          ],
          [
            "openai-ilya-departure",
            "jakub-multi-agent-2017"
          ],
          [
            "jakub-multi-agent-2017"
          ],
          [
            "openai-competitive-self-play-2017"
          ]
        ]
      },
      {
        "title": "OpenAI Five 的训练系统",
        "text": [
          "2018 年 6 月，OpenAI 介绍了用于《Dota 2》五对五对战的 OpenAI Five。系统通过自博弈学习，不从人类比赛录像起步；当时仍有英雄与玩法限制。与棋盘游戏相比，它要面对长时间决策、地图信息不完整以及大量可选动作。",
          "2019 年的论文《Dota 2 with Large Scale Deep Reinforcement Learning》专门列明贡献：Pachocki 与 Szymon Sidor 在整个项目中确定研究方向，并开发 Rapid 的最初版本，验证把计算规模扩大应用于强化学习的益处。",
          "该项目的 Rapid 训练系统把运行游戏、收集经验的工作节点，与更新神经网络的 GPU 优化节点分开。前者持续产生对局数据，后者汇总这些经验进行学习。这里的扩展不仅是增加模型大小，也包括让大量模拟与参数更新协同运行。",
          "这篇由 OpenAI 团队共同署名的论文记录，OpenAI Five 于 2019 年 4 月 13 日击败世界冠军队伍 OG。团队的持续训练进行了十个月，系统可每两秒从约两百万帧的批次中学习；这些结果对应论文里的游戏环境和训练条件。"
        ],
        "paragraphSourceIds": [
          [
            "openai-five-2018"
          ],
          [
            "jakub-openai-five-paper-2019"
          ],
          [
            "openai-five-2018"
          ],
          [
            "jakub-openai-five-paper-2019"
          ]
        ],
        "sourceIds": [
          "openai-five-2018",
          "jakub-openai-five-paper-2019"
        ]
      },
      {
        "title": "GPT-4 与首席科学家任命",
        "text": [
          "OpenAI 的 2024 年官方简介列出，Pachocki 担任过研究总监，领导 GPT-4 与 OpenAI Five 的研发，并开展大规模强化学习和深度学习优化研究。简介还将推动公司聚焦深度学习系统的规模扩展列为他的工作之一，但没有给出出任研究总监的精确年份。",
          "2024 年 5 月 14 日，OpenAI 在宣布 Ilya Sutskever 离开的同一公告中，宣布由 Pachocki 接任首席科学家。Sam Altman 在公告里提到他领导过多个重要项目，并表达了对其推进研究能力与安全性的信心；这一评价来自任命公告中的 Altman。"
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
    "reviewNote": "以大学、竞赛、研究所、OpenAI 公告及共同署名论文扩写。区分博士阶段的算法研究、模拟环境自博弈和大规模系统工程；团队成果保留共同作者归属。Simons 身份仍限定为访问研究生与访问科学家，不补猜博士后或晋升年份。"
  }
};
