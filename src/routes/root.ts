import { id } from "date-fns/locale";
import Router from "koa-router";
import { z } from "zod";
import { vegetationData } from "../db";
import { SEASONS, Vegetation, VegetationList } from "../types";
import { handleError, validate } from "../utils";

export const rootRouter = new Router();

const vegetationSchema = z.object({
  body: z.object({
    name: z.string(),
    sow: z.nativeEnum(SEASONS).array(),
    harvest: z.nativeEnum(SEASONS).array(),
    growing: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
});

const listSchema = z.object({
  body: z
    .object({
      vegetations: z.string().array().optional(),
    })
    .optional(),
});

rootRouter.post("/vegetation", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await validate(vegetationSchema, ctx);

    const vegetationDetails = ctx.request.body as Vegetation;

    await vegetationData.updateOne(
      { name: vegetationDetails.name },
      {
        $set: {
          sow: vegetationDetails.sow,
          harvest: vegetationDetails.harvest,
          growing: vegetationDetails.growing,
        },
      },
      { upsert: true }
    );
    ctx.response.body = vegetationDetails;
  }, ctx);
});

rootRouter.get("/vegetation/list", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await validate(listSchema, ctx);
    const { vegetations } = ctx.request.body as VegetationList;
    console.log(vegetations);
    let rawVegetationList = [];
    if (vegetations && vegetations.length > 0) {
      const databaseList = await Promise.all(
        vegetations.map(async (veg: string) => {
          console.log(veg);
          return await vegetationData.findOne({ name: veg }).exec();
        })
      );
      rawVegetationList = databaseList.filter((e) => e !== null);
      console.log(rawVegetationList);
    } else {
      rawVegetationList = await vegetationData.find();
    }
    const groomedVegetationList = rawVegetationList.map((veg) => {
      return {
        name: veg.name,
        sow: veg.sow,
        harvest: veg.harvest,
        growing: veg.growing,
      };
    });
    ctx.body = groomedVegetationList;
  }, ctx);
});
