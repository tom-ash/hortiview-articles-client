import styles from './styles.module.css';

export const Group = ({
    direction = "horizontal",
    children,
}: {
    direction: "horizontal" | "vertical";
    children: React.ReactNode;
}) => {
    return <div className={`group${direction}`}>{children}</div>;
}