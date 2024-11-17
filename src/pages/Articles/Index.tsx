import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticles } from "../../hooks/useArticles";

export const ArticlesIndex = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const articles = useArticles()

    return (
        <div>
            <h1>{t('template.articlesPageTitle')}</h1>
            <p>{t('template.articlesPageText')}</p>

            {(articles || []).map(article => {
                const {
                    id,
                    title,
                    author,
                    publishedOn,
                    description,
                } = article

                return (
                  <div
                    style={{
                      background: 'lightgray',
                      padding: 20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <h2>
                      {title}
                    </h2>
                    <div>
                      {author.name}
                    </div>
                    <div>
                        {publishedOn}
                    </div>
                    <div>
                      {description}
                    </div>
                    <Button onClick={() => navigate(`${id}`)}>{t('template.articlePageLink')}</Button>
                  </div>
                )
            })}

            <Button onClick={() => navigate(RouteConfig.Home.path)}>{t('template.homePageLink')}</Button>
        </div>
    )
}