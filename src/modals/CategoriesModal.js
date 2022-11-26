import React, {useState} from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

import  Modal  from 'react-native-modal';
import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker} from '@react-native-picker/picker';


const CategoriesModal = (props) => {

  return(
    <View>
        <Modal
        testID={'modal'}
        isVisible = {props.isVisible}
        style={{
            justifyContent: 'flex-end',
            margin: 0,
        }}>
        <View style={{
             backgroundColor: 'white',
             padding: 22,
             justifyContent: 'center',
             alignItems: 'center',
             borderRadius: 4,
             borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
            <Text style={{
                marginBottom: 12,
                fontSize: 20,
                fontWeight: '500',
                color: '#AD40AF',
            }}>Categories</Text>
            

                <View style={{flexDirection:'row'}}>
                
                <TouchableOpacity
                onPress={props.close}
                style={{
                    width: 75,
                    height: 75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 50,
                    backgroundColor: '#666',
                    right: 115
                    
                    
                  }}             
                > 
                <View>
                <Ionicons name="close" size="67" color="white" />          
                </View>
    
                </TouchableOpacity>
                
                </View>
                

        </View>

        

    </Modal>


    </View>
    
  )
}

export default CategoriesModal;