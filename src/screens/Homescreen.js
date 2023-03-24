//Landing page after the user sucessfully signs in.
import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import {Agenda} from 'react-native-calendars';

import { IconButton } from '../components/IconButton';
import EventItem from '../components/EventItem'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddEventModal from '../modals/AddEventModal';
import DashboardModal from '../modals/DashboardModal';
import AvailabilityModal from '../modals/AvailabilityModal';
import SettingsModal from '../modals/SettingsModal'



import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const HomeScreen = () => {


  // Creating a empty dictionary wuth last year and the coming year dates as key (365 days)
  // This is because the React Native Calnder Agenda requires empty lists for days that needs to be displayed as empty.
  const emptyDates = Object.create(null);
  const monthsLimit = 12;
  const todayDate = new Date();

  for(let i=0; i < 370; i++){
    var newDate = new Date(todayDate.getTime() + (i * 86400000) );
    const newDateFormatted =  newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
    emptyDates[newDateFormatted] = []
  }

  for(let i=0; i > -370; i--){
    var newDate = new Date(todayDate.getTime() + (i * 86400000) );
    const newDateFormatted =  newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
    emptyDates[newDateFormatted] = []
  }


  // Usestate varibles that store the state of the modal.
  // If true the modal will be shown and if false the modal will be hidden
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);



  const eventsToDisplayCopy = {...emptyDates}
  const markedDates = {}

  const categories = {}

  

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

// All the events for the previous and coming 365 days are fetched and added to the empty dictionairy created above (eventsToDisplayCopy)
  useEffect(() => {

    const fetchEvents = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const fromDate = new Date ((doc.data().from.seconds) * 1000)
            const formattedFromDate = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth()+1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
            const toDate =  new Date ((doc.data().to.seconds) * 1000)
            eventsToDisplayCopy[formattedFromDate] = [...eventsToDisplayCopy[formattedFromDate], {
              title: doc.data().title,
              start: fromDate.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
              end: toDate.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
              category: categories[doc.data().category],
              location: doc.data().location
            },
             ]
             // For each day number of dots are displated before fully opening that day to quickly portray how busy that day is to the user
             // Hence a marked date variable is created that stores the corresponding black dots to the number of events that day 
             if (eventsToDisplayCopy[formattedFromDate].length == 1){
                markedDates[formattedFromDate] = {dots: []}
             }
             markedDates[formattedFromDate]["dots"] = [...markedDates[formattedFromDate]["dots"] , {color:'black'}]

 
           



    });

    }
    fetchEvents();

   
},[])






  return(
  <SafeAreaView style={{
    flex: 1,
    backgroundColor: '#FFF'}}>

    <AddEventModal isVisible={showAddEventModal} close={() => setShowAddEventModal(false)} />
    <SettingsModal isVisible={showSettingsModal} close={() => setShowSettingsModal(false)} />
    <AvailabilityModal isVisible={showAvailabilityModal} close={() => setShowAvailabilityModal(false)} />
    <DashboardModal isVisible={showDashboardModal} close={() => setShowDashboardModal(false)} />




    <View style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: '#AD40AF'}}> 

               <IconButton
                  onPress={() => setShowSettingsModal(true) }
                  icon = {<Ionicons name="settings-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:30}}


                /> 
                
                <IconButton
                  onPress={() => setShowDashboardModal(true) }
                  icon = {<Ionicons name="speedometer-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:330}}

                />

               

    </View>  

    <Agenda

        markingType={'multi-dot'}
        markedDates={markedDates}

        theme={{
          selectedDayBackgroundColor: '#AD40AF',
          agendaKnobColor: '#AD40AF',
          agendaTodayColor: '#AD40AF',
        }}
        selected={(new Date()).toJSON().slice(0, 10)}

        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={monthsLimit}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={monthsLimit}

        items = {eventsToDisplayCopy}

        renderItem={(item) => {
          return EventItem(item);
        }}

       
    >

    </Agenda>

    <TouchableOpacity
                  onPress={() => setShowAddEventModal(true) }
                  style={{
                    position: 'absolute',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 30,
                    bottom: 100,
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                  }}             
    > 
        <View>
          <Ionicons name="add" size="45" color="white" />          
        </View>
    
    </TouchableOpacity>


    <TouchableOpacity
                  onPress={() => setShowAvailabilityModal(true) }
                  style={{
                    position: 'absolute',
                    width: 45,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 185,
                    bottom: 100,
                    borderRadius : 10,
                    backgroundColor: 'grey',
                  }}             
    > 
        <View>
          <Ionicons name="file-tray-stacked-outline" size="25" color="white" /> 
        </View>
    
    </TouchableOpacity>

    <TouchableOpacity
                  onPress={() => alert('This is a button!')}
                  style={{
                    position: 'absolute',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 30,
                    bottom: 100,
                    borderRadius : 50,
                    backgroundColor: '#AD40AF',
                  }}             
    > 
        <View>
          <Ionicons name="search" size="35" color="white" />          
        </View>
    
    </TouchableOpacity>



  

  </SafeAreaView>  
  )

  

}






export default HomeScreen;