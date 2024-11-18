import { useNavigate } from "react-router-dom";
import { Button } from "../../../ElementBackup/Button";
import { RouteConfig } from "../../../App/RouteConfig";
import { useTranslation } from "react-i18next";

export const GoToHomeButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => navigate(RouteConfig.Home.path)}
      className="go-to-home-button"
    >
      {t("template.homePageLink")}
    </Button>
  );
};
