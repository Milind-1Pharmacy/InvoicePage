// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../components/commanComponents/Layout";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
