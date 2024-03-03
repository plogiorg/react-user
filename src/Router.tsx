import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/home";
import { Login, Signup } from "./views/auth";
import TermsAndConditions from "./views/home/TermsAndConditions.tsx";

type Route = {
  name: string;
  path: string;
  component: ReactNode;
};

const ROUTES: Array<Route> = [
  {
    name: "Login",
    path: "/auth",
    component: <Login />,
  },
  {
    name: "Signup",
    path: "/auth/register",
    component: <Signup />,
  },
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Terms and Condition",
    path: "/tos",
    component: <TermsAndConditions />,
  },
];

const Router = () => {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.name} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default Router;
