// A reusuable element that used when displaying events in the calendar
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from '../components/IconButton';


import * as Clipboard from 'expo-clipboard';



export default function EventItem (item) {

  // Function to copy event details to clipboard
  const copyToClipboard = async () => {
    const text = "Hello there,\nBelow are the event details -> \nTiming: "+item.start+" - "+item.end+"\nTitle: "+item.title+"\nLocation: https://maps.google.com/?q="+item.location
    await Clipboard.setStringAsync(text);
  };

  return (
    <View  style={styles.item} >

      <View style={{width:150}}>
        <View>
          <Ionicons name="alarm-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemHourText}>{item.start+' - '+item.end}</Text>
        </View>
        <View>
          <Ionicons name="calendar-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemTitleText}>{item.title}</Text>
        </View>
      </View>

      <View>

        <View style={{width:150}}>
          <Ionicons name="location-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemLocationText}  onPress={() => {
             Linking.openURL('https://maps.google.com/?q='+item.location)
            }}>{item.location}</Text>
        </View>

        <View>
          <Ionicons name="file-tray-full-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemTitleText}>{item.category}</Text>
        </View>

      </View>

      <View >
        <IconButton
                  icon = {<Ionicons name="copy-outline" size={20} color="#AD40AF" 
                  onPress={copyToClipboard} />}
        /> 

    <IconButton
                  icon = {<Ionicons name="create-outline" size={20} color="black" 
                  />}
        /> 

    <IconButton
                  icon = {<Ionicons name="trash-outline" size={20} color="#AD40AF" 
                  />}
        /> 

        
      </View>

    </View>
  );

};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black',
    fontSize: 12
  },
  itemLocationText: {
    color: 'blue',
    fontSize: 12
  },
  itemTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  emptyItem: {
    paddingLeft: 20,
    height: 33,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});
