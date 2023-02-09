import "./styles/index.scss";
import { Routes, Route, Link } from "react-router-dom";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { Suspense, useContext, useState } from "react";
import { useTheme } from "./providers/ThemeProvider";

import { classNames } from "../shared/lib/helpers/classNames/classNames";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/NavBar";
import { Sidebar } from "widgets/Sidebar";
import { useTranslation } from "react-i18next";



export const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
