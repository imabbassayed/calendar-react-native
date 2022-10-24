import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { validate } from 'validate.js';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import CustomButton from '../components/CustomButton';

import constraints from '../../constraints';

import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const RegisterScreen = ({navigation}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");


  const validateSignUp = () => {
    const nameInvalid = name.length == 0;
 
    if(nameInvalid == true){
      Alert.alert(
        "Registration Failed !",
        "Please enter your full name",
        [
          {text: "OK" }
        ]
      );
      return;
    }
    

    const emailInvalid = validate({emailAddress:email}, constraints);

    if(emailInvalid){
        Alert.alert(
          "Registration Failed !",
          "Please enter a valid email address",   
        );
        return;
    }

    const confirmPasswordInvalid = password != confirmPasword;

    if(confirmPasswordInvalid){
      Alert.alert(
        "Registration Failed !",
        "Please enter matching paswwords",   
      );
      return;
  }


    const passwordInvalid  = password.length < 6;

    if(passwordInvalid){
      Alert.alert(
        "Registration Failed !",
        "Please enter password with more than 6 characters",
      );
      return;
  }

    insertUser(email, password)
  }

  const insertUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user,{
          displayName: name,
        }).then(function() {
          navigation.navigate("Home");
        }, function(error) {
          Alert.alert(
            "Registration Failed !",
            "Please try agian",
            [
              {text: "OK" }
            ]
          );
        });
    })
    .catch((error) => {
      Alert.alert(
        "Registration Failed !",
        "Please try agian",
        [
          {text: "OK" }
        ]
      );
    });

  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 25}}>

         <View style={{alignItems: 'center'}}>
         
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
            
          Register
          </Text>
  
        <InputField
          label={'Full Name *'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
              
            />
          }
          text={text => setName(text)}
        />

        <InputField
          label={'Email *'}
          autoCapitalize={false}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          text={text => setEmail(text)}
        />

        <InputField
          label={'Password *'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          text={text => setPassword(text)}
        />

        <InputField
          label={'Confirm Password *'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          text={text => setConfirmPassword(text)}
          inputType="password"
        />

        <CustomButton 
        label={'Register'}
        onPress={validateSignUp}  
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;