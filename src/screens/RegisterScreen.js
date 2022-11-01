import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { validate } from 'validate.js';

import InputField from '../components/InputField';
import GoogleSVG from '../assets/svgs/GoogleSVG';

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

  const img = "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";


  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 25}}>

         <View style={{alignItems: 'center'}}>
         <Image style={{width: 200, height: 200}} source={{uri: "data:image/png;base64,"+img}} />

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
             Register with Google   
      
             </Text>
             <GoogleSVG/>


          </TouchableOpacity>
        
         
        </View>


          <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or
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