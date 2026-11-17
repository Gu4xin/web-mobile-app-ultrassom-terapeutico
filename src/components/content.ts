export type Reference = {
  title: string;
  publication: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  body: string;
};

export type Article = {
  id: string;
  route: "/o-que-e" | "/aplicacoes" | "/parametros" | "/seguranca";
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  sections: ArticleSection[];
  keywords: string[];
  references: Reference[];
};

export const REFERENCES = {
  houghton: {
    title: "Electrophysical Agents—Contraindications and Precautions",
    publication: "Houghton et al. · Physiotherapy Canada · 2010",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3031347/",
  },
  bader: {
    title: "Overview of Therapeutic Ultrasound Applications and Safety Considerations: 2024 Update",
    publication: "Bader et al. · Journal of Ultrasound in Medicine · 2025",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11796337/",
  },
  healthCanada: {
    title: "Safety Code 23: Safe Use of Ultrasound",
    publication: "Health Canada · Medical and paramedical applications",
    url: "https://www.canada.ca/en/health-canada/services/environmental-workplace-health/reports-publications/radiation/guidelines-safe-use-ultrasound-part-medical-paramedical-applications-excerpt-safety-code-23-1989-health-canada.html",
  },
} satisfies Record<string, Reference>;

export const ARTICLES: Article[] = [
  {
    id: "conceito",
    route: "/o-que-e",
    number: "01",
    title: "O que é o ultrassom terapêutico?",
    shortTitle: "O que é",
    summary: "Um recurso de eletroterapia que usa ondas sonoras para apoiar diferentes abordagens em fisioterapia.",
    sections: [
      {
        heading: "Uma onda mecânica, não um exame",
        body: "No contexto da fisioterapia, ultrassom terapêutico é a aplicação de energia acústica de alta frequência por meio de um transdutor. Diferentemente do ultrassom diagnóstico, seu propósito é produzir efeitos físicos nos tecidos; ele não gera uma imagem para diagnóstico.",
      },
      {
        heading: "Como a energia interage com o tecido",
        body: "A energia pode estar associada a efeitos térmicos e não térmicos. O que ocorre depende de fatores como equipamento, acoplamento, tecido e configuração escolhida. Esses conceitos descrevem mecanismos possíveis, não garantem um resultado clínico.",
      },
      {
        heading: "O que a evidência permite afirmar",
        body: "O ultrassom é estudado e utilizado como recurso em diferentes contextos musculoesqueléticos, mas a evidência varia conforme a indicação e o desfecho. Ele não deve ser apresentado como solução universal nem substituir avaliação, raciocínio clínico ou outras estratégias de cuidado.",
      },
    ],
    keywords: ["conceito", "ondas sonoras", "eletroterapia", "transdutor", "efeitos", "mecanismo"],
    references: [REFERENCES.bader, REFERENCES.houghton],
  },
  {
    id: "aplicacoes",
    route: "/aplicacoes",
    number: "02",
    title: "Aplicações em fisioterapia",
    shortTitle: "Aplicações",
    summary: "Entenda o papel possível do recurso e o que considerar antes de interpretar seus efeitos.",
    sections: [
      {
        heading: "Um recurso dentro de um plano",
        body: "O ultrassom terapêutico pode aparecer como recurso adjuvante em alguns contextos de reabilitação. A escolha precisa fazer sentido para a condição, os objetivos funcionais e as preferências da pessoa — não apenas para uma região do corpo ou um diagnóstico isolado.",
      },
      {
        heading: "Aplicação e acoplamento",
        body: "Na prática descrita em materiais educativos, o profissional utiliza um meio de acoplamento, como gel, e conduz o aplicador na região selecionada. A técnica, o equipamento e a indicação devem seguir formação profissional, avaliação e orientações do fabricante. Esta descrição não é um passo a passo de tratamento.",
      },
      {
        heading: "Evidência não é igual para toda indicação",
        body: "Resultados de estudos não podem ser generalizados de uma condição para outra. A literatura apresenta variação na qualidade e nos achados; por isso, a possível contribuição do recurso deve ser discutida com cautela e integrada ao cuidado, sem promessa de benefício.",
      },
    ],
    keywords: ["aplicação", "fisioterapia", "gel", "acoplamento", "região", "evidência", "reabilitação"],
    references: [REFERENCES.bader, REFERENCES.houghton],
  },
  {
    id: "parametros",
    route: "/parametros",
    number: "03",
    title: "Parâmetros e configurações",
    shortTitle: "Parâmetros",
    summary: "Frequência, modo e demais ajustes são conceitos para estudo, não uma receita de tratamento.",
    sections: [
      {
        heading: "O que costuma ser configurável",
        body: "Equipamentos podem apresentar ajustes relacionados à frequência, ao modo de emissão, à intensidade, à duração, ao aplicador e ao acoplamento. Os nomes, faixas e controles variam entre modelos e fabricantes.",
      },
      {
        heading: "Não existe uma configuração universal",
        body: "Este guia não recomenda valores, dosagens ou protocolos. A seleção de parâmetros depende do equipamento específico, do contexto, da finalidade pretendida e da avaliação profissional. Não use configurações encontradas em outro equipamento como substituto do respectivo manual.",
      },
      {
        heading: "Ler criticamente",
        body: "Ao estudar um artigo ou uma aula, observe qual equipamento, população e condição foram avaliados. Um parâmetro descrito em pesquisa não é automaticamente transferível para outra situação, nem constitui indicação para uso individual.",
      },
    ],
    keywords: ["frequência", "modo", "intensidade", "duração", "configuração", "equipamento", "manual", "protocolo"],
    references: [REFERENCES.bader, REFERENCES.healthCanada],
  },
  {
    id: "seguranca",
    route: "/seguranca",
    number: "04",
    title: "Cuidados e segurança",
    shortTitle: "Segurança",
    summary: "Uma visão educativa sobre precauções, contraindicações e consulta ao manual do fabricante.",
    sections: [
      {
        heading: "Segurança começa antes do aparelho",
        body: "A decisão sobre utilizar ou não o recurso requer avaliação profissional e conhecimento do equipamento. Condições de saúde, sensibilidade, circulação, região corporal e características do dispositivo podem mudar a análise. As precauções dependem do contexto e não cabem em uma lista universal.",
      },
      {
        heading: "Situações que exigem atenção especializada",
        body: "A literatura de agentes eletrofísicos discute condições e regiões que podem exigir precaução ou contraindicação, como alterações importantes de sensibilidade ou circulação, suspeita de trombose, neoplasia e situações relacionadas à gestação. Estes exemplos não são uma lista completa nem uma forma de autoavaliação: a decisão cabe a profissional habilitado, com base em fontes atualizadas e no caso concreto.",
      },
      {
        heading: "Orientações para estudo responsável",
        body: "Consulte sempre o manual do fabricante e as orientações institucionais. Interromper ou evitar uma aplicação, avaliar riscos e escolher alternativas são decisões profissionais. Este material é educativo; não oferece atendimento, diagnóstico ou prescrição e não substitui avaliação clínica.",
      },
    ],
    keywords: ["segurança", "cuidados", "contraindicações", "precauções", "sensibilidade", "circulação", "gestação", "manual", "risco"],
    references: [REFERENCES.houghton, REFERENCES.bader, REFERENCES.healthCanada],
  },
];

export function searchArticles(query: string) {
  const term = query.trim().toLocaleLowerCase("pt-BR");
  if (!term) return ARTICLES;
  return ARTICLES.filter((article) => {
    const searchable = [
      article.title,
      article.summary,
      ...article.keywords,
      ...article.sections.flatMap((section) => [section.heading, section.body]),
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");
    return searchable.includes(term);
  });
}
