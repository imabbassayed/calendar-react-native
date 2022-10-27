import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import TabNavigator from "./src/navigation/TabNavigator";

const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

function App(){
  return (
    <NavigationContainer>

      <stack.Navigator screenOptions={{headerShown: false}} >
        <stack.Group>
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
