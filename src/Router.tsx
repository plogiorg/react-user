import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/home";
import { Login } from "./views/login";

type Route = {
  name: string;
  path: string;
  component: ReactNode;
};

const ROUTES: Array<Route> = [
  {
    name: "Login",
    path: "/login",
    component: <Login />,
  },
  {
    name: "Home",
    path: "/",
    component: <Home />,
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
