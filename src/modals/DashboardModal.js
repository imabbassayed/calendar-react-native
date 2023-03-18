import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, query, where, getDocs } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

import PieChart from 'react-native-expo-pie-chart';

import { VictoryPie } from "victory-native";





const DashboardModal = (props) => {

const categories = {}


const today = new Date()
const thisweek = new Date()
thisweek.setDate(thisweek.getDate() - 7)
const thismonth = new Date()
thismonth.setDate(thismonth.getDate() - 30)

const thismonthdata = {}
const thismonthdataList = []

const [thismonthdataList1,setthismonthdataList1] = useState([])



useEffect(() => {

  const fetchCategories = async () => {
    const q = query(collection(db, "categories"), where("user", "==", userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          categories[doc.id] =  doc.data().name
          
    });
  }
    fetchCategories();
},[])

useEffect(() => {
    const fetchEvents = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", thismonth), where("from", "<=",today));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            
          if (thismonthdata[doc.data().category] === undefined){
            thismonthdata[categories[doc.data().category]] =  ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }else{
            thismonthdata[categories[doc.data().category]] = thismonthdata[categories[doc.data().category]] + ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }
        });
        for(let index in thismonthdata){
          //thismonthdataList.push({x : index, y : thismonthdata[index]})
          setthismonthdataList1(thismonthdataList1 => [...thismonthdataList1, {x : index, y : thismonthdata[index]} ]);
        }

    }
    fetchEvents();

},[])


const [selection, setSelection] = useState(2);

const data = [{"x": "Fun", "y": 1800000}, {"x": "Sport", "y": 3600000}, {"x": "Work", "y": 3600000}];




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
      borderRadius : 10,

   
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


          <View>
            <VictoryPie
              data={thismonthdataList1}
              labelRadius={({ innerRadius }) => innerRadius + 60 }
              innerRadius={100}
              radius={150}
              style={{ labels: { fill: "#AD40AF", fontSize: 15, fontWeight: "bold"} }}
              animate={{
                duration: 2000
              }}
              padAngle={1}
              colorScale={'qualitative'}

            />
          </View>
            
        </View>

        

    </Modal>


    </View>
    
  )

  
}

export default DashboardModal;