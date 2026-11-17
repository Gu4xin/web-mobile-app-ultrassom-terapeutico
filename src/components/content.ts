export type Article = {
  id: string;
  route: "/o-que-e" | "/aplicacoes" | "/parametros" | "/seguranca";
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  keywords: string[];
};

export const ARTICLES: Article[] = [
  {
    id: "conceito",
    route: "/o-que-e",
    number: "01",
    title: "O que é o ultrassom terapêutico?",
    shortTitle: "O que é",
    summary: "Um recurso da fisioterapia que usa ondas sonoras para apoiar diferentes tratamentos.",
    keywords: ["conceito", "ultrassom", "ondas sonoras"],
  },
  {
    id: "aplicacoes",
    route: "/aplicacoes",
    number: "02",
    title: "Aplicações terapêuticas",
    shortTitle: "Aplicações",
    summary: "O profissional movimenta o aplicador sobre a região escolhida, com gel e parâmetros adequados.",
    keywords: ["aplicação", "aplicador", "gel"],
  },
  {
    id: "parametros",
    route: "/parametros",
    number: "03",
    title: "Parâmetros e configurações",
    shortTitle: "Parâmetros",
    summary: "Área reservada para a organização do conteúdo desta seção.",
    keywords: ["parâmetros", "configurações"],
  },
  {
    id: "seguranca",
    route: "/seguranca",
    number: "04",
    title: "Cuidados, contraindicações e segurança",
    shortTitle: "Segurança",
    summary: "Área reservada para a organização do conteúdo desta seção.",
    keywords: ["cuidados", "contraindicações", "segurança"],
  },
];

export function searchArticles(query: string) {
  const term = query.trim().toLocaleLowerCase("pt-BR");
  if (!term) return ARTICLES;
  return ARTICLES.filter((article) =>
    [article.title, article.shortTitle, article.summary, ...article.keywords]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(term),
  );
}
