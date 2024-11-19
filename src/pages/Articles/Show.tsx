import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate, useParams } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticle } from "../../hooks/useArticle";
import { Article } from "./partials/Article";
import { Group } from "../../ElementBackup/Group";
import { GoToHomeButton } from "./partials/GoToHomeButton";

export const ArticlesShow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, error } = useArticle(Number(id));

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  const article = data.article;

  const { title, author, publishedOn, description, content, tags } = article;

  return (
    <Group direction="vertical">
      <GoToHomeButton />
      <div className="article show">
        <h1>{title}</h1>
        <Article
          tags={tags}
          author={author}
          publishedOn={publishedOn}
          description={description}
        />
        <div className="content">{content}</div>
        <Button
          onClick={() => navigate(RouteConfig.ArticlesIndex.path)}
          className="article-item-button"
        >
          {t("template.articlesPageLink")}
        </Button>
      </div>
    </Group>
  );
};
