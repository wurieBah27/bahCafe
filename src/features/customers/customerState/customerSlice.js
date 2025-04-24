import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocationDetails } from "../../../services/apiGeocoding";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = createAsyncThunk(
  "customer/fetchAddress",
  async (position = null) => {
    let positionObj;
    if (!position) {
      positionObj = await getPosition();
      position = {
        lat: positionObj.coords.latitude,
        lng: positionObj.coords.longitude,
      };
    }

    const addressObj = await getLocationDetails(position);

    const [addressContent] = addressObj;
    const {
      components,
      annotations: { currency },
      formatted,
    } = addressContent;

    console.log(addressObj);
    // const { results: address } = addressObj;
    const {
      city,
      continent,
      country_code,
      county,
      town,
      house_number,
      country,
    } = components;

    const address = {
      house_number,
      country,
      city,
      continent,
      country_code,
      county,
      currency,
      formatted,
      town,
    };

    return { address, position };
  },
);

const initialState = {
  name: "",
  position: {},
  address: "",
  status: "idle",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,

  reducers: {},
  extraReducers: (buildetr) =>
    buildetr
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export default customerSlice?.reducer;

export const getCustomer = (state) => state.customer;
