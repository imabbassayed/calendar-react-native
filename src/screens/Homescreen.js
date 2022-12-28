import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import {Agenda} from 'react-native-calendars';

import { IconButton } from '../components/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddEventModal from '../modals/AddEventModal';
import SettingsModal from '../modals/SettingsModal';
import CategoriesModal from '../modals/CategoriesModal';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { userId, db } from '../../firebaseConfig';

const HomeScreen = () => {

  const monthsLimit = 12;
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [eventsToDisplay, setEventsToDisplay] = useState(Object.create(null));

  var today = new Date();
  for (let i = 0; i <= 365; i++) {
    eventsToDisplay[today.toJSON().slice(0, 10)] = []
    today.setDate(today.getDate() - 1)
  }
  var today = new Date();
  for (let i = 0; i <= 365; i++) {
    eventsToDisplay[today.toJSON().slice(0, 10)] = []
    today.setDate(today.getDate() + 1)
  }
  

  const fetchEvents = async () => {
    const q = query(collection(db, "events"), where("user", "==", userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const date = new Date(doc.data().from.seconds * 1000 + doc.data().from.nanoseconds / 1000000 ).toJSON().slice(0, 10);
            const event = Object.create(null)
            event.name = doc.data().title

    });

    }

  fetchEvents();

  const renderItem = (item) => {
    return (
        <TouchableOpacity  style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'}/>
        </View>
      </TouchableOpacity>
    );
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

        items={{
          "2022-03-12" :
           [{hour: '4pm', duration: '1h', title: 'Pilates ABC'}]     
        }}

        renderItem={renderItem}

        
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

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});

export default HomeScreen;