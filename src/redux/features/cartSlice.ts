import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

// Extend ReservationItem to include reservedBy and userRole
type ExtendedReservationItem = ReservationItem & {
  reservedBy: string;
  userRole: string;
};

type CartState = {
  carItems: ExtendedReservationItem[];
};

const initialState: CartState = { carItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add reservation with reservedBy and userRole
    addReservation: (state, action: PayloadAction<ExtendedReservationItem>) => {
      state.carItems.push(action.payload);
    },
    // Remove reservation based on matching fields
    removeReservation: (state, action: PayloadAction<ExtendedReservationItem>) => {
      const remainItems = state.carItems.filter(obj => {
        return (
          obj.courseModel !== action.payload.courseModel ||
          obj.pickupDate !== action.payload.pickupDate ||
          obj.pickupTime !== action.payload.pickupTime ||
          obj.pickupPrice !== action.payload.pickupPrice ||
          obj.pickupLocation !== action.payload.pickupLocation ||
          obj.courseId !== action.payload.courseId ||
          obj.surname !== action.payload.surname ||
          obj.name !== action.payload.name ||
          obj.reservedBy !== action.payload.reservedBy || // Compare reservedBy
          obj.userRole !== action.payload.userRole         // Compare userRole
        );
      });
      state.carItems = remainItems;
    },
  },
});

export const { addReservation, removeReservation } = cartSlice.actions;
export default cartSlice.reducer;