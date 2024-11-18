import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticles } from "../../hooks/useArticles";
import { Group } from "../../ElementBackup/Group";
import { Article } from "./partials/Article";
import { GoToHomeButton } from "./partials/GoToHomeButton";

export const ArticlesIndex = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const articles = useArticles();

  return (
    <Group direction="vertical" classNames={["articles-browser"]}>
      <GoToHomeButton />
      <h1>{t("template.articlesPageTitle")}</h1>
      <ul>
        {(articles || []).map((article) => {
          const { id, title, author, publishedOn, description, tags } = article;

          return (
            <li className="article item">
              <h2>{title}</h2>
              <Article
                tags={tags}
                author={author}
                publishedOn={publishedOn}
                description={description}
              />
              <Button
                onClick={() => navigate(`${id}`)}
                className="article-item-button"
              >
                {t("template.articlePageLink")}
              </Button>
            </li>
          );
        })}
      </ul>
      <Button onClick={() => navigate(RouteConfig.Home.path)}>
        {t("template.homePageLink")}
      </Button>
    </Group>
  );
};
