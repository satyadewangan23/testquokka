import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
    combineReducers,
  } from 'redux';
  import thunk from 'redux-thunk';
  import {
    persistStore,
    persistReducer,
  } from 'redux-persist';
 
  import reducer from './src/redux/reducer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const config = {
    key: 'root',
    storage: AsyncStorage,
  };
  
  const rootReducer1 = combineReducers({
    reducer,
  });
  
  const persistedReducer = persistReducer(config, rootReducer1);
  
  let middlewares = [thunk];
  
  const mystore = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(...middlewares)),
  );
  
  export const persistor = persistStore(mystore); 
  export default mystore;
  

