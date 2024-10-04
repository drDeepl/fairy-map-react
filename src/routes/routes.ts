import Home from "../pages/home/Home";

export interface IRoutes {
  path: string;
  element: any;
  name: string;
  roles: string[];
}
const routes: IRoutes[] = [
  {
    path: "/",
    name: "Home",
    element: Home,
    roles: ["report_management"],
  },
];

export default routes;
