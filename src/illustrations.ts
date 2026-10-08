/** Original explanatory graphics and explicitly licensed editorial photographs.
 * Figures clarify the cited research or chronology; they are not historical reconstructions.
 */
export interface FigureStep {
  label: string;
  title: string;
  lines: string[];
  sourceIds: string[];
}
interface BaseFigure {
  id: string;
  personId: string;
  chapterTitle: string;
  title: string;
  caption: string;
  alt: string;
  sourceIds: string[];
}
export interface DiagramFigure extends BaseFigure {
  kind: "timeline" | "process";
  steps: FigureStep[];
}
export interface PhotoFigure extends BaseFigure {
  kind: "photo";
  file: string;
  width: number;
  height: number;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}
export type BiographyFigure = DiagramFigure | PhotoFigure;
export const biographyFigures: BiographyFigure[] = [
  {
    "id": "sam-organizations",
    "personId": "sam-altman",
    "chapterTitle": "OpenAI 的成立与组织调整",
    "title": "从创业者到机构负责人",
    "caption": "三个职业节点的时间顺序。线条只表示先后，不表示组织之间的投资、控制或汇报关系。",
    "kind": "timeline",
    "steps": [
      {
        "label": "2005",
        "title": "Loopt",
        "lines": [
          "YC 首批创业项目"
        ],
        "sourceIds": [
          "yc-loopt"
        ]
      },
      {
        "label": "2014",
        "title": "Y Combinator",
        "lines": [
          "获任总裁"
        ],
        "sourceIds": [
          "yc-sam"
        ]
      },
      {
        "label": "2019",
        "title": "OpenAI LP",
        "lines": [
          "公告列为 CEO"
        ],
        "sourceIds": [
          "openai-lp"
        ]
      }
    ],
    "sourceIds": [
      "yc-loopt",
      "yc-sam",
      "openai-lp"
    ],
    "alt": "从创业者到机构负责人。2005，Loopt，YC 首批创业项目；2014，Y Combinator，获任总裁；2019，OpenAI LP，公告列为 CEO。三个职业节点的时间顺序。线条只表示先后，不表示组织之间的投资、控制或汇报关系。"
  },
  {
    "id": "greg-gym",
    "personId": "greg-brockman",
    "chapterTitle": "Gym 与 OpenAI Five",
    "title": "强化学习工具连接什么？",
    "caption": "依据 2016 年 Gym 论文绘制的交互循环。智能体用观察选择动作，环境返回新的观察与奖励，然后再次决策；图中省略算法细节。Gym 是共同署名团队的工具集。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "智能体",
        "lines": [
          "读取环境观察",
          "选择行动"
        ],
        "sourceIds": [
          "openai-gym-paper"
        ]
      },
      {
        "label": "02",
        "title": "训练环境",
        "lines": [
          "接收并执行行动",
          "进入下一状态"
        ],
        "sourceIds": [
          "openai-gym-paper"
        ]
      },
      {
        "label": "03",
        "title": "观察与奖励",
        "lines": [
          "反馈给智能体",
          "循环继续"
        ],
        "sourceIds": [
          "openai-gym-paper"
        ]
      }
    ],
    "sourceIds": [
      "openai-gym-paper"
    ],
    "alt": "强化学习工具连接什么？。01，智能体，读取环境观察，选择行动；02，训练环境，接收并执行行动，进入下一状态；03，观察与奖励，反馈给智能体，循环继续。依据 2016 年 Gym 论文绘制的交互循环。智能体用观察选择动作，环境返回新的观察与奖励，然后再次决策；图中省略算法细节。Gym 是共同署名团队的工具集。"
  },
  {
    "id": "ilya-seq2seq",
    "personId": "ilya-sutskever",
    "chapterTitle": "DNNResearch 与序列到序列学习",
    "title": "从一个序列到另一个序列",
    "caption": "2014 年 Seq2Seq 论文的编码与生成过程。输入和输出可以有不同长度；这是该论文的简化结构，不代表所有后来的翻译模型。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "编码 LSTM",
        "lines": [
          "逐步读取",
          "输入词序列"
        ],
        "sourceIds": [
          "seq2seq"
        ]
      },
      {
        "label": "02",
        "title": "固定长度向量",
        "lines": [
          "把输入信息",
          "表示为一个向量"
        ],
        "sourceIds": [
          "seq2seq"
        ]
      },
      {
        "label": "03",
        "title": "解码 LSTM",
        "lines": [
          "根据向量生成",
          "输出词序列"
        ],
        "sourceIds": [
          "seq2seq"
        ]
      }
    ],
    "sourceIds": [
      "seq2seq"
    ],
    "alt": "从一个序列到另一个序列。01，编码 LSTM，逐步读取，输入词序列；02，固定长度向量，把输入信息，表示为一个向量；03，解码 LSTM，根据向量生成，输出词序列。2014 年 Seq2Seq 论文的编码与生成过程。输入和输出可以有不同长度；这是该论文的简化结构，不代表所有后来的翻译模型。"
  },
  {
    "id": "jakub-rapid",
    "personId": "jakub-pachocki",
    "chapterTitle": "OpenAI Five 的训练系统",
    "title": "把自博弈变成持续训练",
    "caption": "依据 OpenAI Five 的 Rapid 系统说明绘制。更新后的策略回到游戏节点，继续生成经验；线条表示训练流程，不表示个人指挥关系。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "游戏工作节点",
        "lines": [
          "运行自博弈",
          "收集对局经验"
        ],
        "sourceIds": [
          "openai-five-2018"
        ]
      },
      {
        "label": "02",
        "title": "GPU 优化节点",
        "lines": [
          "汇总训练经验",
          "更新神经网络"
        ],
        "sourceIds": [
          "openai-five-2018"
        ]
      },
      {
        "label": "03",
        "title": "更新后的策略",
        "lines": [
          "回到游戏节点",
          "进入下一轮训练"
        ],
        "sourceIds": [
          "openai-five-2018"
        ]
      }
    ],
    "sourceIds": [
      "openai-five-2018"
    ],
    "alt": "把自博弈变成持续训练。01，游戏工作节点，运行自博弈，收集对局经验；02，GPU 优化节点，汇总训练经验，更新神经网络；03，更新后的策略，回到游戏节点，进入下一轮训练。依据 OpenAI Five 的 Rapid 系统说明绘制。更新后的策略回到游戏节点，继续生成经验；线条表示训练流程，不表示个人指挥关系。"
  },
  {
    "id": "paul-preferences",
    "personId": "paul-christiano",
    "chapterTitle": "从行为比较中学习目标",
    "title": "从人的比较到学习目标",
    "caption": "2017 年人类偏好学习的反馈循环。训练中继续收集新的比较并更新奖励模型；人的判断也可能出错，学习到奖励不等于已经解决对齐问题。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "人类比较",
        "lines": [
          "观看两段行为",
          "选择较好的一段"
        ],
        "sourceIds": [
          "rlhf-human-preferences"
        ]
      },
      {
        "label": "02",
        "title": "奖励模型",
        "lines": [
          "学习这些比较",
          "形成奖励信号"
        ],
        "sourceIds": [
          "rlhf-human-preferences"
        ]
      },
      {
        "label": "03",
        "title": "强化学习",
        "lines": [
          "利用奖励信号",
          "改进智能体行为"
        ],
        "sourceIds": [
          "rlhf-human-preferences"
        ]
      }
    ],
    "sourceIds": [
      "rlhf-human-preferences"
    ],
    "alt": "从人的比较到学习目标。01，人类比较，观看两段行为，选择较好的一段；02，奖励模型，学习这些比较，形成奖励信号；03，强化学习，利用奖励信号，改进智能体行为。2017 年人类偏好学习的反馈循环。训练中继续收集新的比较并更新奖励模型；人的判断也可能出错，学习到奖励不等于已经解决对齐问题。"
  },
  {
    "id": "mira-tinker",
    "personId": "mira-murati",
    "chapterTitle": "Thinking Machines Lab 与 Tinker",
    "title": "把研究选择与训练设施分开",
    "caption": "按 Tinker 首发说明简化绘制：研究者控制算法和数据，平台处理训练设施。图示的是产品分工，并不把团队开发归于 Murati 个人。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "研究者",
        "lines": [
          "选择算法",
          "准备训练数据"
        ],
        "sourceIds": [
          "tml-tinker"
        ]
      },
      {
        "label": "02",
        "title": "Tinker API",
        "lines": [
          "发起训练调用",
          "控制学习过程"
        ],
        "sourceIds": [
          "tml-tinker"
        ]
      },
      {
        "label": "03",
        "title": "平台设施",
        "lines": [
          "协调分布式计算",
          "处理故障恢复"
        ],
        "sourceIds": [
          "tml-tinker"
        ]
      }
    ],
    "sourceIds": [
      "tml-tinker"
    ],
    "alt": "把研究选择与训练设施分开。01，研究者，选择算法，准备训练数据；02，Tinker API，发起训练调用，控制学习过程；03，平台设施，协调分布式计算，处理故障恢复。按 Tinker 首发说明简化绘制：研究者控制算法和数据，平台处理训练设施。图示的是产品分工，并不把团队开发归于 Murati 个人。"
  },
  {
    "id": "dario-constitutional",
    "personId": "dario-amodei",
    "chapterTitle": "Anthropic 与原则式训练",
    "title": "Constitutional AI 的训练信号",
    "caption": "依据 2022 年团队论文简化绘制：先用自我修改的回答进行监督学习，再用 AI 比较产生的信号进行强化学习。原则由人制定，这种方法也不构成安全保证。",
    "kind": "process",
    "steps": [
      {
        "label": "01",
        "title": "人写下原则",
        "lines": [
          "明确评价回答",
          "所依据的规则"
        ],
        "sourceIds": [
          "anthropic-constitutional-ai-2022"
        ]
      },
      {
        "label": "02",
        "title": "检查并修改",
        "lines": [
          "模型依据原则",
          "自评与修正回答"
        ],
        "sourceIds": [
          "anthropic-constitutional-ai-2022"
        ]
      },
      {
        "label": "03",
        "title": "比较并学习",
        "lines": [
          "AI 比较回答",
          "产生训练信号"
        ],
        "sourceIds": [
          "anthropic-constitutional-ai-2022"
        ]
      }
    ],
    "sourceIds": [
      "anthropic-constitutional-ai-2022"
    ],
    "alt": "Constitutional AI 的训练信号。01，人写下原则，明确评价回答，所依据的规则；02，检查并修改，模型依据原则，自评与修正回答；03，比较并学习，AI 比较回答，产生训练信号。依据 2022 年团队论文简化绘制：先用自我修改的回答进行监督学习，再用 AI 比较产生的信号进行强化学习。原则由人制定，这种方法也不构成安全保证。"
  },
  {
    "id": "demis-alphafold",
    "personId": "demis-hassabis",
    "chapterTitle": "Isomorphic Labs 与开放数据库",
    "title": "AlphaFold 如何走向开放使用",
    "caption": "三个公开节点：盲测检验预测，开放代码与数据库便于复用，随后扩大覆盖。数据库中的结构仍是预测结果，不等同于逐一完成实验测定。",
    "kind": "timeline",
    "steps": [
      {
        "label": "2020",
        "title": "CASP14",
        "lines": [
          "与未公开的",
          "实验结构比较"
        ],
        "sourceIds": [
          "deepmind-alphafold-casp14"
        ]
      },
      {
        "label": "2021",
        "title": "开放代码与数据库",
        "lines": [
          "发表研究方法",
          "供外部研究者使用"
        ],
        "sourceIds": [
          "embl-alphafold-launch-2021"
        ]
      },
      {
        "label": "2022",
        "title": "扩展到 2 亿+",
        "lines": [
          "预测结构进入",
          "可检索的数据库"
        ],
        "sourceIds": [
          "deepmind-alphafold-database-2022"
        ]
      }
    ],
    "sourceIds": [
      "deepmind-alphafold-casp14",
      "embl-alphafold-launch-2021",
      "deepmind-alphafold-database-2022"
    ],
    "alt": "AlphaFold 如何走向开放使用。2020，CASP14，与未公开的，实验结构比较；2021，开放代码与数据库，发表研究方法，供外部研究者使用；2022，扩展到 2 亿+，预测结构进入，可检索的数据库。三个公开节点：盲测检验预测，开放代码与数据库便于复用，随后扩大覆盖。数据库中的结构仍是预测结果，不等同于逐一完成实验测定。"
  },
  {
    "id": "bret-disrupt-2024",
    "personId": "bret-taylor",
    "chapterTitle": "与 Clay Bavor 推出 Sierra",
    "title": "Sierra 公开推出的这一年",
    "caption": "Bret Taylor 在 2024 年 10 月 29 日的 TechCrunch Disrupt 活动上。照片提供同年公开活动的现场记录，不代表图中的展示背景或摄影方为本站背书。",
    "alt": "Bret Taylor 坐在 TechCrunch Disrupt 2024 舞台上，手持话筒交谈。",
    "kind": "photo",
    "file": "assets/bret-taylor.jpg",
    "width": 1280,
    "height": 854,
    "credit": "Katelyn Tucker / Slava Blazer Photography，TechCrunch，2024",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:TechCrunch_Disrupt_2024_D2_Bret_Taylor-3.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "sourceIds": [
      "photo-bret-taylor-2024"
    ]
  },
  {
    "id": "fidji-portrait-2016",
    "personId": "fidji-simo",
    "chapterTitle": "Facebook 的视频与应用管理",
    "title": "Facebook 工作时期的 Simo",
    "caption": "Loïc Le Meur 于 2016 年 2 月 29 日拍摄的 Fidji Simo。照片日期位于其 Facebook 任职时期，不是后来 OpenAI 职务的任命照。",
    "alt": "Fidji Simo 的真实肖像，2016 年由 Loïc Le Meur 拍摄。",
    "kind": "photo",
    "file": "assets/fidji-simo.jpg",
    "width": 960,
    "height": 1350,
    "credit": "Loïc Le Meur，2016；来源裁切 Nouvelles Odes",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fidji_Simo_(cropped).jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "sourceIds": [
      "photo-fidji-simo-2016",
      "wiki-fidji-simo"
    ]
  }
];
export const personFigures = (id: string) => biographyFigures.filter(figure => figure.personId === id);
const esc = (value: unknown) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]!);
const external = (url: string, label: string) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)}（新标签页）">${esc(label)}</a>`;

function diagram(figure: DiagramFigure, narrow: boolean) {
  const width = narrow ? 320 : 660;
  const count = figure.steps.length;
  const height = narrow ? count * 128 + 20 : 238;
  const rowWidth = (width - 48) / count;
  const boxes = figure.steps.map((step, index) => {
    const x = narrow ? 52 : 24 + rowWidth * index;
    const y = narrow ? 18 + index * 128 : 16;
    const number = figure.kind === "timeline" ? step.label : String(index + 1).padStart(2,"0");
    const lines = step.lines.map((line, lineIndex) => `<text x="${x + 14}" y="${y + (narrow ? 76 : 116) + 21 * lineIndex}" class="figure-svg-note">${esc(line)}</text>`).join("");
    const connector = index < count - 1 ? narrow
      ? `<path d="M29 ${y + 16}V${y + 144}" class="figure-connector"/>`
      : `<path d="M${x + 14} 53H${x + rowWidth + 14}" class="figure-connector"/>` : "";
    return `${connector}<circle cx="${narrow ? 29 : x + 14}" cy="${y + (narrow ? 16 : 37)}" r="5" class="figure-dot"/><rect x="${x}" y="${y + 64}" width="${narrow ? 244 : rowWidth - 14}" height="${narrow ? 0 : 127}" rx="4" class="figure-card"/><text x="${x + 14}" y="${y + 20}" class="figure-svg-label">${esc(number)}</text><text x="${x + 14}" y="${y + (narrow ? 49 : 86)}" class="figure-svg-title">${esc(step.title)}</text>${lines}`;
  }).join("");
  return `<svg class="biography-svg ${narrow ? "figure-narrow" : "figure-wide"}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(figure.alt)}" focusable="false">${boxes}</svg>`;
}
export function renderBiographyFigure(figure: BiographyFigure, baseUrl: string, sourceButton: (ids: readonly string[], label: string) => string) {
  const art = figure.kind === "photo"
    ? `<img src="${esc(baseUrl + figure.file)}" alt="${esc(figure.alt)}" width="${figure.width}" height="${figure.height}" loading="lazy" decoding="async">`
    : `${diagram(figure, false)}${diagram(figure, true)}`;
  const credit = figure.kind === "photo"
    ? `摄影：${esc(figure.credit)} · ${external(figure.sourceUrl,"照片来源")} · ${external(figure.licenseUrl,figure.license)}。沿用来源预览文件，画面未修改。`
    : "AI Atlas 原创图解 · 依据公开资料简化绘制";
  return `<figure class="biography-figure biography-figure-${figure.kind}" data-figure="${esc(figure.id)}"><div class="figure-heading"><span>${figure.kind === "photo" ? "影像记录" : figure.kind === "timeline" ? "时间脉络" : "研究图解"}</span><h3>${esc(figure.title)}</h3></div>${art}<figcaption><p>${esc(figure.caption)}</p><div class="figure-credit">${credit}</div>${sourceButton(figure.sourceIds,"图示依据")}</figcaption></figure>`;
}
