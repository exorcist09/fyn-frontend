import logowhite from "./fyn_black_logo.png";
import logoblack from "./fyn_white_logo.png";
import bgLogin from "./bg_registerandlogin.jpg";
import { Coins, Funnel, LayoutDashboard, List, ListChecks, Wallet } from "lucide-react";

export const assets = {
  logowhite,
  logoblack,
  bgLogin,
};

export const SIDEBAR_DATA = [
  {
    id: "01",
    label: "DashBoard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Category",
    icon: ListChecks,
    path: "/category",
  },
  {
    id: "03",
    label: "Income",
    icon: Wallet,
    path: "/income",
  },
  {
    id: "04",
    label: "Expense",
    icon: Coins,
    path: "/expense",
  },
  {
    id: "05",
    label: "Filters",
    icon: Funnel,
    path: "/filter",
  },
];
