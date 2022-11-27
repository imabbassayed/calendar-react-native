import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

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


      
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>

              <Ionicons
                    name="file-tray-full-outline"
                    size={40}
                    color="#666"
                    style = {{
                      marginRight : 5
                    }}
                />
            <TextInput
              placeholder= "Categories *"
              keyboardType="text"
        style={{flex: 1}}
            />

             <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 10,
                    backgroundColor: '#AD40AF',
                    
                    
                  }}             
                > 
                    <View>
                    <Ionicons name="add" size="40" color="white" />          
                    </View>
                
              </TouchableOpacity>  

              </View>
        </View>

        

    </Modal>


    </View>
    
  )
}

export default CategoriesModal;