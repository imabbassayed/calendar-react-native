import React,{useState} from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, query, where, getDocs } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';




const DashboardModal = (props) => {


const [selection, setSelection] = useState(1);

const styles = StyleSheet.create({
 
  btnGroup: {
      flexDirection: 'row',
      alignItems: "center",
      borderWidth: 0.5,
      borderRadius : 10,
      borderColor: '#AD40AF'
  },
  btn: {
      flex: 1,
      margin: 5,
   
  },
  btnText: {
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: 15
  }
});


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
            }}>Dashboard</Text>

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

            <View style={styles.btnGroup}>
                <TouchableOpacity style={[styles.btn, selection === 2 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => setSelection(2)}>
                    <Text style={[styles.btnText, selection === 2 ? { color: "white" } : null]}>This Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, selection === 3 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => setSelection(3)}>
                    <Text style={[styles.btnText, selection === 3 ? { color: "white" } : null]}>This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, selection === 4 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => setSelection(4)}>
                    <Text style={[styles.btnText, selection === 4 ? { color: "white" } : null]}>Today</Text>
                </TouchableOpacity>
            </View>


            

  


        </View>

        

    </Modal>


    </View>
    
  )

  
}

export default DashboardModal;