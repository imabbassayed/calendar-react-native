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

const HomeScreen = ({navigation}) => {

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(true);

  return(
  <SafeAreaView style={{
    flex: 1,
    backgroundColor: '#FFF'}}>

    <AddEventModal isVisible={showAddEventModal} close={() => setShowAddEventModal(false)} />


    <View style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: '#AD40AF'}}>  
                
                <IconButton
                  onPress={() => alert('This is a button!')}
                  icon = {<Ionicons name="menu-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:10}}
                />

                <IconButton
                  onPress={() => alert('This is a button!')}
                  icon = {<Ionicons name="settings-outline" size={35} color="#AD40AF" />}
                  title = ""
                  style={{left:330}}

                />

    </View>  

    <Agenda

        items={{
          '2012-05-22': [{name: 'item 1 - any js object'}],
          '2022-08-21': [{name: 'item 2 - any js object', height: 1500}],
          '2022-08-22': [],
        }}

        theme={{
          selectedDayBackgroundColor: '#AD40AF',
          agendaKnobColor: '#AD40AF'
        }}
        selected={new Date()}
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