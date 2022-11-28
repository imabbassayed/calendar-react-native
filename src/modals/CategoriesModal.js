import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';


const CategoriesModal = (props) => {


  const [category, setCategory] = useState("");
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);


  
  const deleteCategory = async (categoryToDelete, indexOfCategoryToDelete) => {


    try {
      await deleteDoc(doc(db, "categories", categoryToDelete));
      var tempArray = [...categoriesToDisplay]
      tempArray.splice(indexOfCategoryToDelete, 1);
      console.log(tempArray)
      setCategoriesToDisplay(tempArray);
      
    } catch (e) {
      console.log(e)
      Alert.alert(
        "Delete Failed !",
        "Please try again",
      );
  }


  }
  
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
    <SafeAreaView>
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
          </ScrollView>

              
        </View>

        

    </Modal>


    </SafeAreaView>
    
  )
}

export default CategoriesModal;