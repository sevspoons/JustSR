import { createStore } from "redux";
import { testReducer,State } from "./reducers/testReducer";
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig,testReducer); 

const store = createStore(persistedReducer);

const persistedStore = persistStore(store);

export { store,persistedStore };
export type { State };
