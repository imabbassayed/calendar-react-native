// Modal respobsible settings such as  viewing, deleting and adding categories or syncing with google calendar

import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';
import GoogleSVG from '../assets/svgs/GoogleSVG';



const SettingsModal = (props) => {


  const [category, setCategory] = useState("");
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);


  // Function that uses deleteDoc functionality provided by Firebase to delete the category from firebase store
  const deleteCategory = async (categoryToDelete, indexOfCategoryToDelete) => {

    try {
      await deleteDoc(doc(db, "categories", categoryToDelete));
      var tempArray = [...categoriesToDisplay]
      tempArray.splice(indexOfCategoryToDelete, 1);
      // After succesful deletation update the categoryToDisplay so it is responsively removed from user screen as well
      setCategoriesToDisplay(tempArray);
      
    } catch (e) {
      Alert.alert(
        "Delete Failed !",
        "Please try again",
      );
  }


  }
  

  // Function to validate user input and make sure the required fields are not empty and is filled with correct data type e.g. string 
  const validateCategory = () => {

    const categoryInvalid  = category.length == 0;

    if(categoryInvalid){
      Alert.alert(
        "Insert Failed !",
        "Please enter a Category",
      );
      return;
  }

    insertCategory()
  }



  // Function that uses addDoc functionality provided by Firebase to add the category into the Firestore Database.
  const insertCategory =  async () => {

    try {
      const docRef = await addDoc(collection(db, "categories"), {
        name: category,
        user: userId
      });
      setCategoriesToDisplay(categoriesToDisplay => [...categoriesToDisplay, {id : docRef.id, name: category}]);
      
    } catch (e) {
      Alert.alert(
        "Insert Failed !",
        "Please try again",
      );
    }


  }

// Function that returns users created categories to display to the user.
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


  // Function that connects to the python code located in googlecalendarintegration through RestFul API.
// This function syns google Calendar Events into the Firebase Firestore database.
const syncWithGoogleCalendar = () => {

  const url = 'http://localhost:5000/syncGoogleEvents';
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => { Alert.alert(
      "Sync Succesfull !",
      "Successfully synced with Google Calendar",   
    );
  })
    .catch((error) => console.error(error))

}

  return(
    <SafeAreaView >
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
            }}>Settings</Text>

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
      
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 50,
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
              onChangeText = {(text) => {
                setCategory(text)
              }}
            />

             <TouchableOpacity onPress={() => {validateCategory()}}
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

              <ScrollView style={{
                height : 400
              }}>


              {
              categoriesToDisplay.map((category,index) => (
                <View
              style={{
                flexDirection: 'row',
                paddingBottom: 8,
                marginBottom: 10,
              
             
              }}
              >

              <TouchableOpacity 
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 10,
                    backgroundColor: '#AD40AF',
                    marginRight : 100,
                  }}             
                > 
                <Text style={{
                  color: 'white'
                }}>{index + 1}</Text>
              </TouchableOpacity>  

            <Text style={{
               fontSize: 20,
               fontWeight: '500',
               marginRight : 100,
            }}>
              {category.name}
            </Text>

             <TouchableOpacity 
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius : 10,
                    backgroundColor: '#666',
                  }}

                  onPress={() => {
                    deleteCategory(category.id, index);
                  }}
                > 
                    <View>
                    <Ionicons name="close" size="40" color="white" />          
                    </View>
                
              </TouchableOpacity>  

                  
              </View>

                
              
              ))}

          <TouchableOpacity
              onPress={() => {syncWithGoogleCalendar()}}
              style={{
                borderColor: '#AD40AF',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop:10,

                
              }}>
              <Text 
              style={{fontWeight: '800',
                      textAlign: 'center', 
                      paddingRight: 10,
                      paddingTop: 2
              }}>
              Sync with Google Calendar   
        
              </Text>
              <GoogleSVG/>


          </TouchableOpacity>
          </ScrollView>

              
        </View>

        

    </Modal>


    </SafeAreaView>
    
  )
}

export default SettingsModal;