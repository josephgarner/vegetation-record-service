import Router from "koa-router";
import { z } from "zod";
import { planterVegetationListData } from "../db";
import { PlanterVegetationList } from "../types";
import { handleError, validate } from "../utils";

export const planterVegetationList = new Router({
  prefix: "/planter-vegetation-list",
});

const planterVegetationListSchema = z.object({
  body: z.object({
    planterID: z.string(),
    name: z.string(),
    datePlanted: z.date().optional(),
    harvested: z.boolean().optional(),
  }),
});

const planterVegetationListIDSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

planterVegetationList.get("/:id", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await validate(planterVegetationListIDSchema, ctx);
    const { id } = ctx.params;
    const rawVegetationList = await planterVegetationListData.find({
      planterID: id,
      harvested: false,
    });
    const groomedVegetationList = rawVegetationList.map((veg) => {
      return {
        planterID: veg.planterID,
        name: veg.name,
        datePlanted: veg.datePlanted,
        harvested: veg.harvested,
      };
    });
    ctx.body = groomedVegetationList;
  }, ctx);
});

planterVegetationList.post("/add", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await validate(planterVegetationListSchema, ctx);

    const vegetationDetails = ctx.request.body as PlanterVegetationList;

    await planterVegetationListData.updateOne(
      { planterID: vegetationDetails.planterID },
      {
        $set: {
          datePlanted: vegetationDetails.datePlanted,
          name: vegetationDetails.name,
          harvested: vegetationDetails.harvested,
        },
      },
      { upsert: true }
    );
    ctx.body = vegetationDetails;
  }, ctx);
});
