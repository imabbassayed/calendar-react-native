
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "../screens/HomeScreen";


const stack = createNativeStackNavigator();

const AppStack = () => {
<stack.Navigator screenOptions={{headershown: false}}>
    <stack.Screen name="Dashboard" component={HomeScreen} />
</stack.Navigator>
}

export default AppStack;