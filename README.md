# There is now React Router Hono Server 🔥

https://github.com/rphlmr/react-router-hono-server

---

# Welcome to Remix + Vite + Hono!

This is a demo of [remix-hono](https://github.com/sergiodxa/remix-hono) with Vite. 

It uses [Hono Vite dev server](https://github.com/honojs/vite-plugins/blob/main/packages/dev-server/README.md) with HTTPS

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.


![CleanShot 2024-02-22 at 12 33 10](https://github.com/rphlmr/remix-hono-vite/assets/20722140/26ed6547-c776-40bd-8556-af58dd91331b)


## Try it

```shellscript
npx create-remix@latest --template rphlmr/remix-hono-vite
```

## How it works
- On the local dev, you rely on [Hono Vite dev server](https://github.com/honojs/vite-plugins/blob/main/packages/dev-server/README.md)
  - With HTTPS self signed certificate
- When building, `server/build.ts` bundles `server/index.ts` and `server/middlewares.ts` to `build/server/index.js`
  - If you deploy with Docker, it should be as easy as just copying the `build` folder and `node_modules`.

## Development

Copy `.env.example` to `.env` and fill the variables. (it is loaded by Remix for you, see [this PR](https://github.com/remix-run/remix/pull/7958))

Run the Hono server with [Hono Vite dev server](https://github.com/honojs/vite-plugins/blob/main/packages/dev-server/README.md):

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to. (works great on https://fly.io)

### DIY

If you're familiar with deploying Hono applications you should be right at home. Just make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
