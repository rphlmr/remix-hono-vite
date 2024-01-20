import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// https://remix.run/docs/en/main/future/vite#fix-up-css-imports
import "~/tailwind.css";

export default function App() {
  return (
    <html lang="en" className="h-dvh bg-zinc-900 w-screen text-zinc-50">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body className="size-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
