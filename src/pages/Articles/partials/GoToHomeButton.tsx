import { useNavigate } from "react-router-dom";
import { Button } from "../../../ElementBackup/Button";
import { RouteConfig } from "../../../App/RouteConfig";
import { useTranslation } from "react-i18next";
import styles from "../../../styles/styles.module.css";

export const GoToHomeButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => navigate(RouteConfig.Home.path)}
      className={styles.goToHomeButton}
    >
      {t("template.homePageLink")}
    </Button>
  );
};
