import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackRoot from './src/navigator/Navigator';
import {Provider} from 'react-redux';
import mystore , {persistor} from './reduxStore';
// import { useSelector } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  
//   const data = useSelector((item)=>item.reducer)

// console.log(data)
  // console.log(mystore,"mystore")
  return (
    <Provider store={mystore}>
       <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer  >
        <StackRoot />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

