// Modal responsible to inform the user of their availibality during the period of time entered.
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';


import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

import * as Clipboard from 'expo-clipboard';


const AvailabilityModal = (props) => {

// Usestate varibales to store inputs given by the user
const [fromTime, setFromTime] = useState(new Date());
const [toTime, setToTime] = useState(new Date());
const [date, setDate] = useState(new Date());
const [duration, setDuration] = useState(0);


const availability = []

// Function that sets the overall date for all varibles as the date availabily is within the same date but different timings
const setOverallDate = (date) => {
    setFromTime(date)
    setToTime(date)
    setDate(date)
}


// Function that converts the user's availabily during the time period entered to text and automatically copies to clipboard
const copyToClipboard = async () => {
    let text = "Hello there,\nBelow is/are my availability for today   -> \n"
    let count = 0
    availability.map(value => {
        count+=1
        text += count+") "+(new Date(value[0])).toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })+" to "+(new Date(value[1])).toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })+"\n"
      })
    await Clipboard.setStringAsync(text);
  };


  // Function that uses addDoc functionality provided by Firebase to add the availabily time of the user into the database and generate an id.
  // The auto generated id by Firebase is then used as token id which will be accessed through web to automatically book the free time by the client.
  const generateSlotBookingToken = async () => {

    const availabilityFLattened = []
    availability.map( function(value, key){
      availabilityFLattened.push(value[0])
      availabilityFLattened.push(value[1])
    })
    
    try {
        const docRef = await addDoc(collection(db, "slotbookingtokens"), {
          date : date,
          duration : duration,
          availability : availabilityFLattened,
          user: userId,
        });
        // Insert to the database and then fetfh the generated token id and then copy it to clipboard
        await Clipboard.setStringAsync('http://localhost:3000/index.php?id='+docRef.id);
        
      } catch (e) {
        console.log(e)
        Alert.alert(
          "Insert Failed !",
          "Please try again",
        );
      }


  };

// Function that queries the database to find the available times fo the user.
const fetchAvailability = async (type) => {
    availability.push([fromTime.getTime(),toTime.getTime()])

    date.setHours(0)
    date.setMinutes(0)

    const end = new Date (date);
    end.setHours(23)
    end.setMinutes(59)
    // Queries the databases whitin the range given by the user and if available adds it to the availibilty list.
    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", date), where("from", "<=", end)  );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const from = (doc.data().from.seconds) * 1000
            const to = (doc.data().to.seconds) * 1000

            availability.map( function(value, key){
                if (from >= value[0] && to < value[1]){
                    availability.push([to,value[1]])
                    availability[key][1] = from
            
                }else if (from >= value[0] && to >= value[1]){
                    availability[key][1] = from
                }

            }
                
              )
            
    });

    // Validating that the avaialble period match required duration given by the user if not pop it from the list.
    availability.map( function(value, key){
      if (value[1] - value[0] < duration){
          delete availability[key]
      }
    });

    if (type == 1){
        copyToClipboard();
    }else if (type == 2){
        generateSlotBookingToken();
    }

    }



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
            <View style={{
              flexDirection :'row',
              borderBottomWidth: 0.5,
              borderColor: '#AD40AF',
              marginBottom : 10
          }}>

            <Text style={{
                marginBottom: 12,
                fontSize: 20,
                fontWeight: '500',
                color: '#AD40AF',
                left: 20
            }}>Availability</Text>

              <TouchableOpacity
                onPress={props.close}
                style={{
                    left: 135,
                    bottom : 5
                    
                  }}             
                > 
                <View>
                <Ionicons name="close" size="30" color="grey" />          
                </View>
    
                </TouchableOpacity>

            </View>


            <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#AD40AF',
                    marginTop: 20,
                    
                }}>Select Date</Text>
             
          <DateTimePicker
            name='date'
            mode='date'
            value={date}
            style={{
                marginTop: 15,
                marginBottom: 10,
                width : 125,
            }} 
            onChange = {(_,date) => setOverallDate(date)}
            />
          


            <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#AD40AF',
                    marginTop: 20,
                    
                }}>Select Time Range</Text>
             
          <DateTimePicker
            name='from'
            mode='time'
            value={fromTime}
            style={{
                marginTop: 15,
                marginBottom: 10,
                width : 100
            }} 
            onChange = {(_,from) => setFromTime(from)}
            />
          
          <DateTimePicker
            name='to'
            mode='time'
            value={toTime}
            style={{
                marginTop: 10,
                marginBottom: 30,
                width : 100
            }} 
            onChange = {(_,to) => setToTime(to)}
            />

            <Text style={{
                                fontSize: 20,
                                fontWeight: '500',
                                color: '#AD40AF',
                                marginTop: 20,
                                
                            }}>Duration</Text>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 50,
                width:200
              }}>

              <Ionicons
                    name="timer-outline"
                    size={40}
                    color="#666"
                    style = {{
                      marginRight : 5
                    }}
                />
            <TextInput
              placeholder= "Duration *"
              keyboardType="numeric"
              style={{flex: 1}}
              onChangeText = {(text) => {
                setDuration(text)
              }}
            />

             

              </View>

                <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={props.close}
                style={{
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 50,
                    backgroundColor: '#666',
                    right: 100
                    
                    
                  }}             
                > 
                <View>
                <Ionicons name="close" size="52" color="white" />          
                </View>
    
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {fetchAvailability(1)}}
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                }}             
                > 
                    <View>
                    <Ionicons name="copy-outline" size="30" color="white" />          
                    </View>
                
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {fetchAvailability(2)}}
                style={{
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                    left: 100
                }}             
                > 
                    <View>
                    <Ionicons name="file-tray-stacked-outline" size="40" color="white" />          
                    </View>
                
                </TouchableOpacity>

                </View>
                

        </View>

        

    </Modal>


    </View>
    
  )
}

export default AvailabilityModal;