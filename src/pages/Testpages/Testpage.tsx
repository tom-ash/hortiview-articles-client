import { Button } from "../../ElementBackup/Button";
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { useTranslation } from "react-i18next";

export const Testpage = () => {
    /**
     * use the router hook to navigate to any page
     */
    const navigate = useNavigate();
    const { t } = useTranslation();
    return <div>
        <h1>{t('template.testpageTitle')}</h1>
        <p>{t('template.testpageText')}</p>
        <Button onClick={() => navigate(RouteConfig.Home.path)}>{t('template.testpageLink')}</Button>
    </div>;
}