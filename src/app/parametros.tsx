import { ARTICLES } from "../components/content";
import { ArticleScreen } from "../components/ui";

export default function ParametersPage() {
  return <ArticleScreen article={ARTICLES[2]} />;
}
