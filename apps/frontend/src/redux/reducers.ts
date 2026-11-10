import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./slices/user";

const rootPersistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["user"],
};

const userConfig = {
	key: "user",
	storage: storage,
};

const rootReducer = combineReducers({
	user: persistReducer(userConfig, user),
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(rootPersistConfig, rootReducer);
