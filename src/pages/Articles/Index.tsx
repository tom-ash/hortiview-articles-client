import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticles } from "../../hooks/useArticles";
import { Group } from "../../ElementBackup/Group";
import { Article } from "./partials/Article";
import { GoToHomeButton } from "./partials/GoToHomeButton";
import styles from "../../styles/styles.module.css";

export const ArticlesIndex = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, error } = useArticles();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  const articles = data.articles;

  return (
    <Group direction="vertical" classNames={[styles.vertical]}>
      <GoToHomeButton />
      <h1 className={styles.articlesIndexHeading}>
        {t("template.articlesPageTitle")}
      </h1>
      <ul className={styles.unorderedList}>
        {(articles || []).map((article) => {
          const { id, title, author, publishedOn, description, tags } = article;

          return (
            <li
              className={`${styles.article} ${styles.listItem}`}
              key={`${id}-${title}`}
            >
              <h2>{title}</h2>
              <Article
                tags={tags}
                author={author}
                publishedOn={publishedOn}
                description={description}
              />
              <Button
                onClick={() => navigate(`${id}`)}
                className={`${styles.defaultButton} ${styles.defaultButton}`}
              >
                {t("template.articlePageLink")}
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => navigate(RouteConfig.Home.path)}
        className={`${styles.defaultButton} ${styles.defaultButton}`}
      >
        {t("template.homePageLink")}
      </Button>
    </Group>
  );
};
