import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("practices/:slug", "routes/practice.tsx"),
] satisfies RouteConfig;
