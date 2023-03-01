import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default function EventItem (item) {

  return (
    <TouchableOpacity  style={styles.item} >

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
      <View>
          <Ionicons name="location-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemHourText}> {item.location}</Text>
        </View>

        <View >
          <Ionicons name="file-tray-full-outline" size={15} color="#AD40AF" />
          <Text style={styles.itemTitleText}> {'Sport'}</Text>
        </View>
        

      </View>

    </TouchableOpacity>
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
    color: 'black'
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
