// Managing the screens of the application using a Stack Navigator
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


// Categorizing the Login and Register Screen as a Stack Group as user might neet to navigate between those before login
// After Login the Home Screen is shown and thus access to the Login and Register Screen Stack Group is forbidden
const stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>

      <stack.Navigator>
      
        <stack.Group screenOptions={{headerShown: false}} >
              <stack.Screen name="Login" component={LoginScreen} />
              <stack.Screen name="Register" component={RegisterScreen} />
        </stack.Group>  
        
        <stack.Group  screenOptions={{headerShown:false}}>
            
            <stack.Screen
            name="Home" 
            component={HomeScreen}
            options={{
              headerBackVisible : false,
            }} />        

        </stack.Group>
      </stack.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
