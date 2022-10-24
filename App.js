import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import AuthStack from "./src/navigation/AuthStack";
//import AppStack from "./src/navigation/AppStack";


import HomeScreen from "./src/screens/HomeScreen";


import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";


const stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>

      <stack.Navigator > 
        <stack.Group screenOptions={{headerShown: false}}>
              <stack.Screen name="Login" component={LoginScreen} />
              <stack.Screen name="Register" component={RegisterScreen} />
        </stack.Group>  

        <stack.Group>
            <stack.Screen name="Home" component={HomeScreen} />
        </stack.Group>
      </stack.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
