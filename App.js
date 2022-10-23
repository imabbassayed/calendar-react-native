import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";

function App(){
  return (
    <NavigationContainer>
      <AuthStack/>
      <AppStack/>
    </NavigationContainer>
  );
}


export default App;
