import styles from "./styles.module.css";

type TypoProps = {
  level?: number;
  children: React.ReactNode;
  className?: string;
};

export const TypoDisplay = ({ level = 4, children, className }: TypoProps) => {
  return (
    <div className={`${styles.TypoDisplay} typo-level-${level} ${className}`}>
      {children}
    </div>
  );
};

export const TypoOverline = ({ children, className }: TypoProps) => {
  return (
    <div className={`${styles.TypoOverline} ${className}`}>{children}</div>
  );
};

export const TypoSubtitle = ({ children, className }: TypoProps) => {
  return (
    <div className={`${styles.TypoSubtitle} ${className}`}>{children}</div>
  );
};
