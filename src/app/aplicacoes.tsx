import { ARTICLES } from "../components/content";
import { ArticleScreen } from "../components/ui";

export default function ApplicationsPage() {
  return <ArticleScreen article={ARTICLES[1]} />;
}
