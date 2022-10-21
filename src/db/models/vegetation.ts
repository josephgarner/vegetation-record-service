import mongoose from "mongoose";
import { Vegetation } from "../../types";

const vegetationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sow: {
    type: Array,
    required: false,
  },
  harvest: {
    type: Array,
    required: false,
  },
  growing: {
    min: { type: Number, required: false },
    max: { type: Number, required: false },
  },
});

vegetationSchema.statics.build = (attr: Vegetation) => {
  return new vegetationData(attr);
};

interface vegetationModel extends mongoose.Model<any> {
  build(attr: Vegetation): any;
}

const vegetationData = mongoose.model<any, vegetationModel>(
  "Vegetation",
  vegetationSchema
);

export { vegetationData };
