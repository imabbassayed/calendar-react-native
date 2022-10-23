
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "../screens/homeScreen";


const stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <stack.Navigator screenOptions={{headershown: false}}>
            <stack.Screen name="Home" component={HomeScreen} />
        </stack.Navigator>
    )
}

export default AppStack;