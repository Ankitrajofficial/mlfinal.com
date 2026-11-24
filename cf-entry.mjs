// Cloudflare Worker entry: OpenNext handler, optional Hyperdrive-backed DATABASE_URL, Vercel crons as cron triggers.
import handler from "./.open-next/worker.js";
export * from "./.open-next/worker.js";
const CRONS = {};
function withDb(env) {
  if (!env.HYPERDRIVE) return env;
  const url = env.HYPERDRIVE.connectionString;
  return Object.assign({}, env, { DATABASE_URL: url, DATABASE_URL_UNPOOLED: url, DIRECT_DATABASE_URL: url, POSTGRES_PRISMA_URL: url, POSTGRES_URL: url });
}
export default {
  fetch(request, env, ctx) { return handler.fetch(request, withDb(env), ctx); },
  async scheduled(ev, env, ctx) {
    const base = env.CRON_BASE_URL || "https://mlfinal-com.office-11b.workers.dev";
    for (const p of CRONS[ev.cron] || []) {
      const r = await handler.fetch(new Request(base + p, { headers: { authorization: "Bearer " + (env.CRON_SECRET || ""), "user-agent": "vercel-cron/1.0" } }), withDb(env), ctx);
      console.log("cron", p, r.status);
    }
  },
};
