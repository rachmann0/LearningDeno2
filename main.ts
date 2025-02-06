// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

// Deno.serve((_req) => {
//   return new Response("Hello, World!");
// });


import { Application, Router } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import "npm:dotenv/config";

//! ENV VARIABLES
const port = Number(Deno.env.get('PORT')) || 8000;
if (isNaN(port)) throw new Error("PORT must be a number!");

const app = new Application();
const router = new Router();

router
  .get("/", (ctx) => (ctx.response.body = "Welcome to the API!"))
  .get("/users", (ctx) => (ctx.response.body = [{ id: 1, name: "Reece" }]))
  .post("/users", async (ctx) => {
    const body = await ctx.request.body.json();
    ctx.response.body = { message: "User created", user: body };
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
