import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const databaseRouter = createTRPCRouter({
  selectSailor: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT * FROM sailors`;
  }),

  selectBoat: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT * FROM boats`;
  }),

  selectReserve: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT * FROM reserves`;
  }),

  updateSailor: publicProcedure
    .input(
      z.object({
        sid: z.number(),
        sname: z.string(),
        rating: z.number(),
        age: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`UPDATE sailors SET sname = ${input.sname}, rating = ${input.rating}, age = ${input.age} WHERE sid = ${input.sid}`;
    }),

  updateBoat: publicProcedure
    .input(z.object({ bid: z.number(), bname: z.string(), color: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`UPDATE boats SET bname = ${input.bname}, color = ${input.color} WHERE bid = ${input.bid}`;
    }),

  updateReserve: publicProcedure
    .input(z.object({ sid: z.number(), bid: z.number(), days: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`UPDATE reserves SET days = ${input.days} WHERE sid = ${input.sid} AND bid = ${input.bid}`;
    }),

  insertSailor: publicProcedure
    .input(
      z.object({
        sid: z.number(),
        sname: z.string(),
        rating: z.number(),
        age: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`INSERT INTO sailors VALUES (${input.sid}, ${input.sname}, ${input.rating}, ${input.age})`;
    }),

  insertBoat: publicProcedure
    .input(z.object({ bid: z.number(), bname: z.string(), color: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`INSERT INTO boats VALUES (${input.bid}, ${input.bname}, ${input.color})`;
    }),

  insertReserve: publicProcedure
    .input(z.object({ sid: z.number(), bid: z.number(), day: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`INSERT INTO reserves VALUES (${input.sid}, ${input.bid}, ${input.day})`;
    }),

  deleteSailor: publicProcedure
    .input(z.object({ sid: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.$queryRaw`DELETE FROM sailors WHERE sid = ${input.sid}`;
    }),

  deleteBoat: publicProcedure
    .input(z.object({ bid: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.$queryRaw`DELETE FROM boats WHERE bid = ${input.bid}`;
    }),

  deleteReserve: publicProcedure
    .input(z.object({ sid: z.number(), bid: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .$queryRaw`DELETE FROM reserves WHERE sid = ${input.sid} AND bid = ${input.bid}`;
    }),

  countSailors: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT COUNT(*) FROM sailors`;
  }),

  countBoats: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT COUNT(*) FROM boats`;
  }),

  averageRating: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT AVG(rating) FROM sailors`;
  }),

  averageAge: publicProcedure.query(({ ctx }) => {
    return ctx.db.$queryRaw`SELECT AVG(age) FROM sailors`;
  }),
});
