import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate, useParams } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";
import { useArticle } from "../../hooks/useArticle";

export const ArticlesShow = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { id } = useParams();
    const article = useArticle(Number(id))

    // TODO: Add loader.
    if (!article) {
      return (
        <div>
          LOADING
        </div>
      )
    }

    const {
        title,
        author,
        publishedOn,
        description,
        content,
    } = article

    return (
        <div>
            <h1>
                {title}
            </h1>
            <div>
                {author.name}
            </div>
            <p>{description}</p>
            <div className='article'>
                {/* TODO: Add structure and */}
                {publishedOn}
                {content}
            </div>
            <Button onClick={() => navigate(RouteConfig.ArticlesIndex.path)}>{t('template.articlesPageLink')}</Button>
        </div>
    )
}