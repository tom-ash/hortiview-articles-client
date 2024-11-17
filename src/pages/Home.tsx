import { Group } from "../ElementBackup/Group";
import { Button } from "../ElementBackup/Button";
import { useTranslation } from "react-i18next"
import { RouteConfig } from "../App/RouteConfig";
import { useNavigate } from "../Base/hooks/useBase";

export const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <Group direction="vertical">
        <h1>{t('template.homeHeading')}</h1>
        <p>{t('template.homeIntro')}</p>
        <Button onClick={() => navigate(RouteConfig.ArticlesIndex.path)}>{t('template.articlesPageLink')}</Button>
      </Group>
    )
}