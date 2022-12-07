import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';

import {Agenda} from 'react-native-calendars';

import { IconButton } from '../components/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddEventModal from '../modals/AddEventModal';
import SettingsModal from '../modals/SettingsModal';
import CategoriesModal from '../modals/CategoriesModal';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const HomeScreen = ({navigation}) => {

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [eventsToDisplay, setEventsToDisplay] = useState([]);


  '2012-05-22': [{name: 'item 1 - any js object'}],
          '2022-08-21': [{name: 'item 2 - any js objectasdfasdfasdfadsf', height: 50000}],
          '2022-08-22': [],

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
        }}
        selected={new Date()}

        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
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