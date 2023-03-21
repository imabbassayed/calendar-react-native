import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import  Modal  from 'react-native-modal';
import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker} from '@react-native-picker/picker';

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const AddEventModal = (props) => {


const [title, setTitle] = useState("");
const [location, setLocation] = useState("");
const [fromDatetime, setFromDatetime] = useState(new Date());
const [toDatetime, setToDatetime] = useState(new Date());
const [selectedRepeatValue, setSelectedRepeatValue] = useState(0);
const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);


const suggestCategoriesFromApi = () => {

  const fromTimeMidnight = new Date(fromDatetime);
  const fromTime = (fromDatetime - fromTimeMidnight.setHours(0,0,0,0)) / 1000;

  const toTimeMidnight = new Date(toDatetime);
  const toTime = (toDatetime - toTimeMidnight.setHours(0,0,0,0)) / 1000;

  const url = 'http://localhost:5000/suggestCategory?from='+fromTime+'&to='+toTime+'&user='+userId;
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => setSelectedCategoryValue(json))
    .catch((error) => console.error(error))

}


const suggestEventFromApi = () => {

  const fromTimeMidnight = new Date(fromDatetime);
  const fromTime = (fromDatetime - fromTimeMidnight.setHours(0,0,0,0)) / 1000;

  const toTimeMidnight = new Date(toDatetime);
  const toTime = (toDatetime - toTimeMidnight.setHours(0,0,0,0)) / 1000;

  const url = 'http://localhost:5000/suggestEvent?from='+fromTime+'&to='+toTime+'&user='+userId+'&category='+selectedCategoryValue;
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => {setTitle(json)})
    .catch((error) => console.error(error))

}




const validateEvent = () => {

    const titleInvalid  = title.length == 0;

    if(titleInvalid){
      Alert.alert(
        "Adding Event Failed !",
        "Please enter a title",
      );
      return;
    }

    addEvent();
    
}

const addEvent =  async () => {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        title: title,
        location: location,
        from: fromDatetime,
        to : toDatetime,
        repeat: selectedRepeatValue,
        category: selectedCategoryValue,
        user:userId
      });
      props.close
      
    } catch (e) {
      Alert.alert(
        "Insert Failed !",
        "Please try again",
      );
    }


  } 

useEffect(() => {
    setCategoriesToDisplay([])
    const fetchCategories = async () => {
    const q = query(collection(db, "categories"), where("user", "==", userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setCategoriesToDisplay(categoriesToDisplay => [...categoriesToDisplay, {id : doc.id, name: doc.data().name}]);
    });

    }

  fetchCategories();
},[])


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
            }}>Add Event</Text>

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
                    
                }}>Date & Time</Text>

            <DateTimePicker
            name='fromdatetime'
            mode='datetime'
            value={fromDatetime}
            style={{
                marginTop: 15,
                marginBottom: 10,
                width : 200
            }} 
            onChange = {(_,date) => {setFromDatetime(date), suggestCategoriesFromApi()}}
            />
          
          <DateTimePicker
            name='todatetime'
            mode='datetime'
            style={{
                marginTop: 10,
                marginBottom: 30,
                width : 200
            }} 
            value = {toDatetime}
            onChange = {(_,date) => {setToDatetime(date), suggestCategoriesFromApi()}}
            />

           
          
                
                <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#AD40AF',
                    marginTop: 20,
                    
                }}>Category</Text>
                <Picker
                selectedValue={selectedCategoryValue}
                style={{ height: 200, width: 400, marginTop : -75}}
                onValueChange={(itemValue) => {setSelectedCategoryValue(itemValue), suggestEventFromApi()}}
                >

             {
              categoriesToDisplay.map((category,index) => (
                <Picker.Item label={category.name} value={category.id} id={category.id} />
              ))}
              
              </Picker>

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
                onPress={() => {validateEvent()}}
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
                    <Ionicons name="checkmark-done-outline" size="40" color="white" />          
                    </View>
                
                </TouchableOpacity>
                </View>
                

        </View>

        

    </Modal>


    </View>
    
  )
}

export default AddEventModal;