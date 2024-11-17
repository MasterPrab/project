import mongoose from "mongoose";
const ShopSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
      },
      priceLevel: {
        type: Number,
        enum: [1,2,3,4],
        default: 3,
      },
      address: {
        type: String,
        required: [true, "Please add an address"],
      },
      province: {
        type: String,
        required: [true, "Please add a province"],
      },
      postalcode: {
        type: String,
        required: [true, "Please add a postalcode"],
        maxlength: [5, "Postalcode cannot be more than 5 digits"],
      },
      tel: {
        type: String,
      },
      picture: {
        type: String,
        required: [true, "Please add URL to shop picture"],
      },
    }
  );
  
const Shop = mongoose.models.Shop || mongoose.model('Shop',ShopSchema)
export default Shop