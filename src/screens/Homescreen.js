import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { auth } from '../../firebaseConfig';

import GoogleSVG from '../assets/svgs/GoogleSVG';

const HomeScreen = ({navigation}) => {
  console.log(auth.currentUser)
  return(<SafeAreaView>
    <GoogleSVG/>
  </SafeAreaView>  
  )
}

export default HomeScreen;