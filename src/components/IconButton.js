import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const IconButton = ({ title, onPress, icon }) => (
    <TouchableOpacity onPress={onPress}>
      {icon}
      <Text>{title}</Text>
    </TouchableOpacity>
  );