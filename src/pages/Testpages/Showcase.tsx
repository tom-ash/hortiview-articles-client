import { Group } from "../../ElementBackup/Group";
import { Button } from "../../ElementBackup/Button";
import { TypoOverline, TypoDisplay, TypoSubtitle } from "../../ElementBackup/Typos";
import { useTranslation } from "react-i18next"
import { RouteConfig } from "../../App/RouteConfig";
import { useNavigate } from "../../Base/hooks/useBase";
import { Farm } from "../../Base/services/HortiView/types/farms";
import { useFarmOrgEntities } from "../../hooks/useFarmOrgEntities";

export const Showcase = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: farms, isLoading } = useFarmOrgEntities<Farm>("farms");
    if(isLoading) return <div>Loading...</div>
    return <Group direction="vertical">
        <TypoOverline>{t('template.testname')}</TypoOverline>
        <TypoDisplay level={5}>{t('template.farmTitle')}</TypoDisplay>
        <TypoSubtitle>{farms?.at(0)?.farmName}</TypoSubtitle>
        <Button onClick={() => navigate(RouteConfig.Testpage.path)}>{t('template.routingtest')}</Button>
    </Group>
}