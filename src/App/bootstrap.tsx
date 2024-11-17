import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "../reportWebVitals";
import RemoteModule from "./RemoteModule";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RemoteModule
      token={""}
      basePath={""}
      sourcePath={""}
      organizationId={""}
      config={null}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigateTo={() => {}}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addTranslation={() => {}}
      currentNavigationPath={""}
      currentLanguage={"en"}
      standalone
      modulePermissionToken={""}
      moduleId={"1"}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addNotification={() => {}}
    />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
