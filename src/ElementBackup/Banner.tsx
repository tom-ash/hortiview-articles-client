export type BannerProps = {
  fixed?: boolean;
  onClosing: () => void;
  children: React.ReactNode;
  open?: boolean;
};

export const Banner = ({
    fixed,
    onClosing,
    children,
    open,
}: BannerProps) => {
  return (
    <div
      className={`banner ${open ? "open" : ""} ${fixed ? "fixed" : ""}`}
    >
      <div className="banner-content">
        <div className="banner-text">{children}</div>
        <div className="banner-close" onClick={() => onClosing()}>
            x
        </div>
      </div>
    </div>
  );
};
