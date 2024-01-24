import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootReducer } from "../rootReducer/reducers";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor = persistStore(store);
