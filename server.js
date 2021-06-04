require("isomorphic-fetch");
require("dotenv").config();
const Koa = require("koa");
const next = require("next");
const session = require("koa-session");

const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const { default: Shopify, ApiVersion } = require("@shopify/shopify-api");
const Router = require("koa-router");

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_API_SCOPES.split(","),
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage

});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();

const ACTIVE_SHOPIFY_SHOPS = {};
const getShop = async (shopURL, accessToken) => {
  return await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/getShop?shopURL=${shopURL}`)).json();
}
app.prepare().then(() => {

  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(session({ sameSite: "none", secure: true }, server))
  server.use(
    createShopifyAuth({


      async afterAuth(ctx) {
        const { shop, scope, accessToken } = ctx.state.shopify;
        console.log("token is", accessToken, shop, scope);
        if (shop != undefined) {
          ACTIVE_SHOPIFY_SHOPS[shop] = scope;
          ctx.cookies.set("shopOrigin", shop, {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
          })
          ctx.cookies.set("accessToken", accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
          })
          const registration = await Shopify.Webhooks.Registry.register({
            shop,
            accessToken,
            path: '/webhooks',
            topic: 'APP_UNINSTALLED',
            apiVersion: ApiVersion.October20,
            webhookHandler: (_topic, shop, _body) => {
              console.log('App uninstalled');
              delete ACTIVE_SHOPIFY_SHOPS[shop];
            },
          });

          if (registration.success) {
            console.log('Successfully registered webhook!');
          } else {
            console.log('Failed to register webhook', registration.result);
          }
          console.log("api called");
          try {

            await fetch(`${process.env.API_URL}/shop/install`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessToken: accessToken,
                shopURL: shop,
                scopes: scope
              })
            });
            ctx.redirect(`/?shop=${shop}`);
          }
          catch (e) {
            console.log("ERROR", e)
          }



        } else ctx.redirect(`/?shop=${shop}`);
      },
    })
  );
  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);

    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  // router.get("/subscriptions/mySubscriptions", async (ctx) => {
  //   const shop = ctx.query.shop;

  //   if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
  //     ctx.redirect(`/auth?shop=${shop}`);
  //   } else {
  //     await handleRequest(ctx);
  //   }
  // });
  // router.get("/subscriptions/cartMode", async (ctx) => {
  //   const shop = ctx.query.shop;

  //   if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
  //     ctx.redirect(`/auth?shop=${shop}`);
  //   } else {
  //     await handleRequest(ctx);
  //   }
  // });
  // router.get("/subscriptions/customers", async (ctx) => {
  //   const shop = ctx.query.shop;

  //   if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
  //     ctx.redirect(`/auth?shop=${shop}`);
  //   } else {
  //     await handleRequest(ctx);
  //   }
  // });
  // router.get("/subscriptions/discCodes", async (ctx) => {
  //   const shop = ctx.query.shop;

  //   if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
  //     ctx.redirect(`/auth?shop=${shop}`);
  //   } else {
  //     await handleRequest(ctx);
  //   }
  // });

  router.get("/", async (ctx) => {
    const shop = ctx.query.shop;

    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {

      await handleRequest(ctx);
    }
  });
  router.post('/webhooks', async (ctx) => {
    await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
    console.log(`Webhook processed with status code 200`);
  });

  router.get("(/_next/static/.*)", handleRequest);
  router.get("/_next/webpack-hmr", handleRequest);
  router.get("(.*)", verifyRequest({ accessMode: "online" }), handleRequest);
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
