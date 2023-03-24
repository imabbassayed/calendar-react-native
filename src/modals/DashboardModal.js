// Modal that display user's hours spend on a certain category within the last month, last week and today timeframes.
import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

import  Modal  from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, query, where, getDocs } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

import { VictoryPie } from "victory-native";





const DashboardModal = (props) => {

const categories = {}

// Usestate varibale that changes Victory pie chart colorscale configuration 
const [colorScale,setColorScale] = useState("qualitative")


const today = new Date()
const thisweek = new Date()
thisweek.setDate(thisweek.getDate() - 7)
const thismonth = new Date()
thismonth.setDate(thismonth.getDate() - 30)

// Varibles that store the categories with the amount of time spent in hours for this month, this ween and today time period.
const thismonthdata = {}
const [thisMonthDataList,setThisMonthDataList] = useState([])


const thisweekdata = {}
const [thisWeekDataList,setThisWeekDataList] = useState([])


const todaydata = {}
const [todayDataList,setTodayDataList] = useState([])



// First the categories with their name is fetched as category id is stored in the event collection only. Hence it is needed to get the category name based on id.
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

// Fetching all events during the month and categorising them based on their categories and adding the time spend.
useEffect(() => {
  setThisMonthDataList([])
    const fetchEventsThisMonth = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", thismonth), where("from", "<=",today));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          // Storing number of seconds spent in the event fetched and adding it to the  total number of seconds spent the category that the event is categorised.            
          if (thismonthdata[doc.data().category] === undefined){
            thismonthdata[categories[doc.data().category]] =  ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }else{
            thismonthdata[categories[doc.data().category]] = thismonthdata[categories[doc.data().category]] + ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }
        });
        for(let index in thismonthdata){
          //thismonthdataList.push({x : index+"\n"+(thismonthdata[index] / 3600000)+ "Hour(s)", y : thismonthdata[index]})
          setThisMonthDataList(thisMonthDataList => [...thisMonthDataList, {x : index+"\n"+(thismonthdata[index] / 3600000)+ " Hour(s)", y : thismonthdata[index]} ]);
        }

        setDataToShow(thisMonthDataList)

    }
    fetchEventsThisMonth();

},[])

// Fetching all events during the week and categorising them based on their categories and adding the time spend.

useEffect(() => {
  setThisWeekDataList([])
  const fetchEventsThisWeek = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", thisweek), where("from", "<=",today));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // Storing number of seconds spent in the event fetched and adding it to the  total number of seconds spent the category that the event is categorised.            
          if (thisweekdata[doc.data().category] === undefined){
            thisweekdata[categories[doc.data().category]] =  ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }else{
            thisweekdata[categories[doc.data().category]] = thisweekdata[categories[doc.data().category]] + ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }
        });
        for(let index in thisweekdata){
          //thismonthdataList.push({x : index+"\n"+(thismonthdata[index] / 3600000)+ "Hour(s)", y : thisweekdata[index]})
          setThisWeekDataList(thisWeekDataList => [...thisWeekDataList, {x : index+"\n"+(thismonthdata[index] / 3600000)+ " Hour(s)", y : thisweekdata[index]} ]);
        }
  
    }
    fetchEventsThisWeek();
},[])


// Fetching all events during the day and categorising them based on their categories and adding the time spend.

useEffect(() => {
  setTodayDataList([])
  const todayto = new Date();

  today.setHours(0);
  today.setMinutes(0);

  const fetchEventsToday = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId), where("from", ">=", today), where("from", "<=",todayto));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          // Storing number of seconds spent in the event fetched and adding it to the  total number of seconds spent the category that the event is categorised.            
          if (todaydata[doc.data().category] === undefined){
            todaydata[categories[doc.data().category]] =  ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }else{
            todaydata[categories[doc.data().category]] = todaydata[categories[doc.data().category]] + ( (doc.data().to.seconds * 1000) - (doc.data().from.seconds * 1000) ) 
          }
        });
        for(let index in todaydata){
          //thismonthdataList.push({x : index+"\n"+(thismonthdata[index] / 3600000)+ "Hour(s)", y : todaydata[index]})
          setTodayDataList(todayDataList => [...todayDataList, {x : index+"\n"+(thismonthdata[index] / 3600000)+ " Hour(s)", y : todaydata[index]} ]);
        }
  
    }
    fetchEventsToday();

},[])


const [selection, setSelection] = useState(2);
const [dataToShow, setDataToShow] = useState([]);


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
  },
  btnText1: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 10
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
                <TouchableOpacity style={[styles.btn, selection === 2 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => {setSelection(2)
                setDataToShow(thisMonthDataList)}}>
                    <Text style={[styles.btnText, selection === 2 ? { color: "white" } : null]}>This Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, selection === 3 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => {setSelection(3)
                setDataToShow(thisWeekDataList)}}>
                    <Text style={[styles.btnText, selection === 3 ? { color: "white" } : null]}>This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, selection === 4 ? { backgroundColor: "#AD40AF" } : null]} onPress={() => {setSelection(4)
                setDataToShow(todayDataList)}}>
                    <Text style={[styles.btnText, selection === 4 ? { color: "white" } : null]}>Today</Text>
                </TouchableOpacity>
            </View>


          <View>
            <VictoryPie
              data={dataToShow}
              labelRadius={({ innerRadius }) => innerRadius + 60 }
              innerRadius={85}
              radius={135}
              style={{ labels: { fill: "#AD40AF", fontSize: 15, fontWeight: "bold"} }}
              animate={{
                duration: 75
              }}
              padAngle={1}
              colorScale={colorScale}

            />
          </View>


          <View style={{...styles.btnGroup,width:170}}>
                <TouchableOpacity style={[styles.btn, colorScale === 'grayscale' ? { backgroundColor: "#AD40AF" } : null]} onPress={() => {
                setColorScale('grayscale')}}>
                    <Text style={[styles.btnText1, colorScale === 'grayscale' ? { color: "white" } : null]}>Greyscale</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, colorScale === 'qualitative' ? { backgroundColor: "#AD40AF" } : null]} onPress={() => {
                setColorScale('qualitative')}}>
                    <Text style={[styles.btnText1, colorScale === 'qualitative' ? { color: "white" } : null]}>Color</Text>
                </TouchableOpacity>
            </View>

            
        </View>

        

    </Modal>


    </View>
    
  )

  
}

export default DashboardModal;