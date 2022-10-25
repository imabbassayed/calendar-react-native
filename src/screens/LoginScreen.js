import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { validate } from 'validate.js';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoogleSVG from '../assets/svgs/GoogleSVG';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

import constraints from '../../constraints';

import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";


const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 


  const validateSignIn = () => {


    const emailInvalid = validate({emailAddress:email}, constraints);

    if(emailInvalid){
        Alert.alert(
          "Login Failed !",
          "Please enter a valid email address",   
        );
        return;
    }

    const passwordInvalid  = password.length == 0;

    if(passwordInvalid){
      Alert.alert(
        "Login Failed !",
        "Please enter a password",
      );
      return;
  }

    logInUser(email, password)
  }

  const logInUser = async (email, password) => {

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Home")
      })
      .catch((error) => {
          Alert.alert(
            "Login Failed !",
            "Please try agian",
            [
              {text: "OK" }
            ]
          );
          console.log(error)
          return;
        
        
      });

    }
    
    const logInUserWithGoogle = () => {
      
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
            
          Login
        </Text>

        <InputField
          label={'Email *'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          autoCapitalize={false}
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

          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />
        
        <CustomButton label={"Login"} onPress={() => {validateSignIn()}} />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
         <TouchableOpacity
            onPress={() => {logInUserWithGoogle}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',

              
            }}>
            <Text 
            style={{fontWeight: '800',
                    textAlign: 'center', 
                    paddingRight: 10,
                    paddingTop: 2
             }}>
             Log in with Google   
      
             </Text>
             <GoogleSVG/>


          </TouchableOpacity>
        
         
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;