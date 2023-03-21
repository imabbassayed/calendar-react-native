// A reusuable custom button that encapsulates an icon whitin it
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const IconButton = ({ title, onPress, icon, style }) => (
    <TouchableOpacity style={style} onPress={onPress}>
      {icon}
      <Text>{title}</Text>
    </TouchableOpacity>
  );