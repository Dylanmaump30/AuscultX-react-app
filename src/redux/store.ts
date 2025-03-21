import { UserInfo } from "../models/user.model";
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./states/user";

export interface AppStore {
  user: UserInfo;
}

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
