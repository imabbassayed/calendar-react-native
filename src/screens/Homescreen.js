import React,{useState,useEffect} from 'react';
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

import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const HomeScreen = () => {

  const monthsLimit = 12;
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [eventsToDisplay, setEventsToDisplay] = useState(Object.create(null));
  eventsToDisplay["2022-12-28"] = []
  setEventsToDisplay(existingValues => ({
    ...existingValues,
    ["2022-12-28"] : [...existingValues["2022-12-28"], {"category": "ll3HQ6o8Zrh6W5sZEAKP", "from": "2022-11-30T12:30:48.498Z", "location": "Location", "title": "Test", "to": "2022-11-30T12:40:00.000Z"}],
  }
  ))

 
  const renderItem = (item) => {
    return(
      <EventItem item={item}/>
    )
  }

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

        items={eventsToDisplay}


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