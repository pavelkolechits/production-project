import cls from "./Sidebar.module.scss";
import { classNames } from "shared/lib/helpers/classNames/classNames";
import { useState } from "react";
import { ThemeSwither } from "shared/ui/ThemeSwitcher";
import { LanguageSwitcher } from "shared/ui/LanguageSwither";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      {" "}
      <button onClick={onToggle}>toggle</button>
      <div className={cls.switchers}>
        <ThemeSwither />
        <LanguageSwitcher className={cls.lang}/>
      </div>
    </div>
  );
};
