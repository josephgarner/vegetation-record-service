import mongoose from "mongoose";
import { PlanterVegetationList } from "../../types";

const planterVegetationListSchema = new mongoose.Schema({
  planterID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  datePlanted: {
    type: Date,
    required: false,
    default: new Date(),
  },
  harvested: {
    type: Boolean,
    required: false,
    default: false,
  },
});

planterVegetationListSchema.statics.build = (attr: PlanterVegetationList) => {
  return new planterVegetationListData(attr);
};

interface planterVegetationListModel extends mongoose.Model<any> {
  build(attr: PlanterVegetationList): any;
}

const planterVegetationListData = mongoose.model<
  any,
  planterVegetationListModel
>("PlanterVegetationList", planterVegetationListSchema);

export { planterVegetationListData };
