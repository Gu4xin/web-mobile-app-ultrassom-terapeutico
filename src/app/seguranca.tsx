import { ARTICLES } from "../components/content";
import { ArticleScreen } from "../components/ui";

export default function SafetyPage() {
  return <ArticleScreen article={ARTICLES[3]} />;
}
