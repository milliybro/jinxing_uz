import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compose, split, tail, take } from "ramda";
import { useTranslation } from "react-i18next";
import settings from "@/config/settings";
import { colors } from "@/config/theme";
import clsx from "clsx";
import type { AppLang, CustomRoute } from "@/types";

// "/list-of-acts/9382" -> ["list-of-acts"]
type getTopRouteFn = (str: string) => string[];
// getTopRoute :: string -> [string] -> [string] -> [string]
const getTopRoute = compose(take(1), tail, split("/")) as getTopRouteFn;

interface DefaultLayoutState {
  defaultLanguage: AppLang;
  handleLanguageChange: (value: AppLang) => void;
}

export default function useDefaultLayoutState(
  sidebarRoutes: CustomRoute[],
): DefaultLayoutState {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: AppLang): void => {
    void i18n.changeLanguage(value);
  };

  const defaultLanguage = (localStorage.getItem("i18nextLng") ??
    settings.defaultLanguage) as AppLang;

  return {
    defaultLanguage,
    handleLanguageChange,
  };
}
