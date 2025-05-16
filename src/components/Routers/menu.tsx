import { MenuList, RouteItem } from "@typing/router";
import { lazy } from "react";
import { FaHome, FaTags } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

const Login  = lazy(() => import("@pages/Login"));
const RedirectPage  = lazy(() => import("@pages/RedirectPage"));
const Home = lazy(() => import('@pages/Home'))
const Tags = lazy(() => import('@pages/Tags'))
const Transaction = lazy(() => import('@pages/Transaction'))
const TransactionHistory = lazy(() => import('@pages/TransactionHistory'))

export const menu: MenuList = [
  {
    name:'Home',
    path: 'home',
    icon: FaHome,
    component: <Home />
  },
  {
    name: 'Tags',
    path: 'tags',
    icon: FaTags,
    component: <Tags />
  },
  {
    name: 'Transaction',
    path: 'transaction',
    icon: GrTransaction,
    component: <Transaction />
  },
  {
    name: 'Transaction History',
    path: 'transaction-history',
    icon: GrTransaction,
    component:  <TransactionHistory />
  }
];

export const routes: RouteItem[] = menu.map(({ path, component}) => ({
  path,
  component
})).concat(...[
  {
    path: '',
    component: <RedirectPage redirectUrl="/login" />
  },
  {
    path: 'login',
    component: <Login />
  }
])