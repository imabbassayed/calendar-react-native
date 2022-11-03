import React from 'react';
import {
  Button,
} from 'react-native';
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

      <stack.Navigator>
        <stack.Group screenOptions={{headerShown: false}} >
              <stack.Screen name="Login" component={LoginScreen} />
              <stack.Screen name="Register" component={RegisterScreen} />
        </stack.Group>  

        <stack.Group>
            <stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerBackVisible : false,
              headerTitle : "",
              headerRight : () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"

                />
              ),

            }} />            
        </stack.Group>
      </stack.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
