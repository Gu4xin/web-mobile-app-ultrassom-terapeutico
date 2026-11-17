import { ARTICLES } from "../components/content";
import { ArticleScreen } from "../components/ui";

export default function WhatIsPage() {
  return <ArticleScreen article={ARTICLES[0]} />;
}
