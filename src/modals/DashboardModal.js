import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, query, where, getDocs } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';


const DashboardModal = (props) => {

const fetchStats = async (type) => {
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


        </View>

        

    </Modal>


    </View>
    
  )
}

export default DashboardModal;