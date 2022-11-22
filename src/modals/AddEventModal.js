import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import  Modal  from 'react-native-modal';
import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';



const AddEventModal = ({navigation}) => {

  return(
    <View>
        <Modal
        testID={'modal'}
        isVisible = {true}
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
                color: '#333',
            }}>Add Event</Text>
            <InputField
                label={'Title *'}
                icon={
                    <Ionicons
                    name="calendar-outline"
                    size={40}
                    color="#666"
                    style={{marginRight: 5}}
                />
                }
                style= {{
                    width: 5
                }}
                inputType="Text"
                text={text => setTitle(text)}
            />

            <InputField
                label={'Location'}
                icon={
                    <Ionicons
                    name="location-outline"
                    size={40}
                    color="#666"
                    style={{marginRight: 5}}
                />
                }
                style= {{
                    width: 5
                }}
                inputType="Text"
                text={text => setTitle(text)}
            />
            Allday toggloe
            Starts datepicker
            end datecpicker
            repeat select
        </View>

       

    </Modal>

    </View>
    
  )
}

export default AddEventModal;