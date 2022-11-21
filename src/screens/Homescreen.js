import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Arrow,
  StyleSheet,
  Animated
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from '../components/IconButton';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';



const HomeScreen = ({navigation}) => {


  return(
  <SafeAreaView style={{flex: 1}}>
    
    
    


    <TouchableOpacity
                  onPress={() => alert('This is a button!')}
                  style={{
                    position: 'absolute',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 30,
                    bottom: 100,
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                  }}             
    > 
        <View>
          <Ionicons name="add" size="45" color="white" />          
        </View>
    
    </TouchableOpacity>


    <TouchableOpacity
                  onPress={() => alert('This is a button!')}
                  style={{
                    position: 'absolute',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 30,
                    bottom: 100,
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                  }}             
    > 
        <View>
          <Ionicons name="search" size="35" color="white" />          
        </View>
    
    </TouchableOpacity>



  

  </SafeAreaView>  
  )
}

export default HomeScreen;