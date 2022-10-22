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

import GoogleSVG from '../assets/miscs/google.svg';
import FacebookSVG from '../assets/miscs/facebook.svg';
import TwitterSVG from '../assets/miscs/twitter.svg';

import CustomButton from '../components/CustomButton';

import constraints from '../../constraints';

import { app } from '../../firebaseConfig';
import {  getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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

    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
          </TouchableOpacity>
        </View>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;