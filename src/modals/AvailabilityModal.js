import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';


import { collection, query, where, getDocs } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

import * as Clipboard from 'expo-clipboard';


const AvailabilityModal = (props) => {


const [fromTime, setFromTime] = useState(new Date());
const [toTime, setToTime] = useState(new Date());
const [date, setDate] = useState(new Date());

const availability = []


const setOverallDate = (date) => {
    setFromTime(date)
    setToTime(date)
    setDate(date)
}

const copyToClipboard = async () => {
    let text = "Hello there,\nBelow is/are my availability for today   -> \n"
    let count = 0
    availability.map(value => {
        count+=1
        text += count+") "+(new Date(value[0])).toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })+" to "+(new Date(value[1])).toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })+"\n"
      })
    //console.log(text)
    await Clipboard.setStringAsync(text);
  };


const fetchAvailability = async () => {
    availability.push([fromTime.getTime(),toTime.getTime()])

    date.setHours(0)
    date.setMinutes(0)

    const end = new Date (date);
    end.setHours(23)
    end.setMinutes(59)

    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", date), where("from", "<=", end)  );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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

    copyToClipboard()


    

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
                    right: 115
                    
                    
                  }}             
                > 
                <View>
                <Ionicons name="close" size="52" color="white" />          
                </View>
    
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {fetchAvailability()}}
                style={{
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                    left: 115
                }}             
                > 
                    <View>
                    <Ionicons name="copy-outline" size="40" color="white" />          
                    </View>
                
                </TouchableOpacity>
                </View>
                

        </View>

        

    </Modal>


    </View>
    
  )
}

export default AvailabilityModal;