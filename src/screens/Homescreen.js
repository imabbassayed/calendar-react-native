import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';

import {Agenda} from 'react-native-calendars';

import { IconButton } from '../components/IconButton';
import EventItem from '../components/EventItem'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddEventModal from '../modals/AddEventModal';
import SettingsModal from '../modals/SettingsModal';
import CategoriesModal from '../modals/CategoriesModal';

import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const HomeScreen = () => {

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


  
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [eventsToDisplay, setEventsToDisplay] = useState(emptyDates);


  

  useEffect(() => {
    setEventsToDisplay(emptyDates)
    const fetchEvents = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const eventsToDisplayCopy = {...eventsToDisplay}
            const fromDate = new Date ((doc.data().from.seconds) * 1000)
            const formattedFromDate = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth()+1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
            const toDate =  new Date ((doc.data().to.seconds) * 1000)
            eventsToDisplayCopy[formattedFromDate] = [...eventsToDisplayCopy[formattedFromDate], {
              title: doc.data().title,
              start: fromDate.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
              end: toDate.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
              category: doc.data().category,
              location: doc.data().location
            },
             ]
            setEventsToDisplay(eventsToDisplayCopy)

          
            
    });

    }
    fetchEvents();
},[])


  return(
  <SafeAreaView style={{
    flex: 1,
    backgroundColor: '#FFF'}}>

    <AddEventModal isVisible={showAddEventModal} close={() => setShowAddEventModal(false)} />
    <CategoriesModal isVisible={showSettingsModal} close={() => setShowSettingsModal(false)} />


    <View style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: '#AD40AF'}}>  
                
                <IconButton
                  icon = {<Ionicons name="menu-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:10}}
                />

                <IconButton
                  onPress={() => setShowSettingsModal(true) }
                  icon = {<Ionicons name="settings-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:330}}

                />

    </View>  

    <Agenda

        //items={{'2023-02-28': []}}


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

        items = {eventsToDisplay}

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