import { ReactNode, isValidElement, Children } from "react";
import clsx from "clsx";
import styles from "./PageLayout.module.scss";

//TODO hacer estilos mobile vs estilos desktop

export type PageLayoutProps = {
  children: ReactNode;
  className?: string;
  hasBackButton?: boolean; //TODO
  title?: string;
};

const PageLayout = ({ children, className, title }: PageLayoutProps) => {
  const hasCustomHeader = Children.toArray(children).some((child) => {
    return isValidElement(child) && child.type === PageLayout.Header;
  });

  return (
    <div className={clsx(styles["page-layout"], className)}>
      {!hasCustomHeader && title && (
        <PageLayout.Header className={styles["preset-header"]}>
          <h1>{title}</h1>
        </PageLayout.Header>
      )}
      {children}
    </div>
  );
};

PageLayout.Header = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => <header className={className}>{children}</header>;

PageLayout.Footer = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => <footer className={className}>{children}</footer>;

export default PageLayout;
