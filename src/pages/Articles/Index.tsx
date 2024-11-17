import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticles } from "../../hooks/useArticles";

export const ArticlesIndex = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const articles = useArticles()

    console.log(articles)

    return (
        <div>
            <h1>{t('template.articlesPageTitle')}</h1>
            <p>{t('template.articlesPageText')}</p>
            <Button onClick={() => navigate(RouteConfig.Home.path)}>{t('template.homePageLink')}</Button>
        </div>
    )
}