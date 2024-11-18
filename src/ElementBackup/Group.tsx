import styles from "./styles.module.css";

export const Group = ({
  direction = "horizontal",
  children,
  classNames: customClassNames = [],
}: {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
  classNames?: string[];
}) => {
  const classNames = ["group", direction].concat(customClassNames);

  return <div className={classNames.join(" ")}>{children}</div>;
};
