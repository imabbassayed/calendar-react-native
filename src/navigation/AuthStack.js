
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <stack.Navigator screenOptions={{headershown: false}}>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Register" component={RegisterScreen} />
        </stack.Navigator>
    )
}

export default AuthStack;