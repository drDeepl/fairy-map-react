// import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const initialState = {
//   sidebarShow: true,
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, changeState);

// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

// export { store, persistor };

import { createStore, AnyAction } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Tip tanımlamaları
interface State {
  sidebarShow: boolean;
}

interface Action extends AnyAction {
  type: string;
}

// İlk durum
const initialState: State = {
  sidebarShow: true,
};

// Reducer fonksiyonu
const changeState = (state: State = initialState, { type, ...rest }: Action) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Redux persist yapılandırması
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer oluşturma
const persistedReducer = persistReducer(persistConfig, changeState);

// Store ve persistor oluşturma
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
