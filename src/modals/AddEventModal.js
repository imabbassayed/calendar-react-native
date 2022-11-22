import React, {useState} from 'react';
import { View, Text, Switch } from 'react-native';

import  Modal  from 'react-native-modal';
import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';


const AddEventModal = ({navigation}) => {

const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
const toggleSwitch = () => setIsAllDayEnabled(previousState => !previousState);

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
                onChange={toggleSwitch}
                value={isAllDayEnabled}
                trackColor={{true: '#AD40AF'}}/>
            </View>

            

         
        </View>
    </Modal>

    </View>
    
  )
}

export default AddEventModal;