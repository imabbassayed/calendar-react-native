import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from "./src/navigation/AuthStack";

function App(){
  return (
    <NavigationContainer>
      <AuthStack/>
      <AppStack/>
    </NavigationContainer>
  );
}


export default App;
