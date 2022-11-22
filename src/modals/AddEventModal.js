import React, {useState} from 'react';
import { View, Text, Switch } from 'react-native';
import {Picker} from 'react-native-picker';

import  Modal  from 'react-native-modal';
import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';

const AddEventModal = ({navigation}) => {

const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
const toggleAllDaySwitch = () => setIsAllDayEnabled(previousState => !previousState);
const [selectedRepeatValue, setSelectedRepeatValue] = useState(0);


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
                color: '#AD40AF',
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
                
                inputType="Text"
                text={text => setLocation(text)}
            />
            <View style={{flexDirection:'row'}}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#AD40AF',
                    right: 50
                }}>All Day</Text>
                <Switch  
                onChange={toggleAllDaySwitch}
                value={isAllDayEnabled}
                trackColor={{true: '#AD40AF'}}
                />
            </View>

            <DateTimePicker
            mode='datetime'
            value={new Date()}
            style={{
                marginTop: 30,
                marginBottom: 50,
            }} 
            />

            <DateTimePicker
            mode='datetime'
            value={new Date()}
            style={{
                marginTop: 30,
                marginBottom: 50,
            }} 
            />

            <Picker
            selectedValue={selectedRepeatValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setSelectedRepeatValue(itemValue)}
            >
                <Picker.Item label="Never" value="0" />
                <Picker.Item label="Every Day" value="1" />
                <Picker.Item label="Every Week" value="2" />
                <Picker.Item label="Every Month" value="3" />
                <Picker.Item label="Every Year" value="4" />
            </Picker>


            

         
        </View>
    </Modal>

    </View>
    
  )
}

export default AddEventModal;