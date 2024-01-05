import { createTRPCRouter } from "@/server/api/trpc";
import { databaseRouter } from "@/server/api/routers/database";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  database: databaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
