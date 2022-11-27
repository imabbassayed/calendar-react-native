import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { app } from '../../firebaseConfig';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
var uid = null;
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;

    }
});

const CategoriesModal = (props) => {

  const [category, setCategory] = useState("");

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


  const insertCategory =  async () => {

    

    try {
      await addDoc(collection(db, "categories"), {
        name: category,
        user: uid
      });
      fetchCategories();

    } catch (e) {
      Alert.alert(
        "Insert Failed !",
        "Please try again",
      );
    }


  }

  const fetchCategories = async () => {

    const q = query(collection(db, "categories"), where("user", "==", uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
    });

  }

  fetchCategories();
   

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
        </View>

        

    </Modal>


    </View>
    
  )
}

export default CategoriesModal;