import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImagePickerSample from './ShotImage';


class Setting2Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is Setting2Screen</Text>
        <ImagePickerSample />
      </View>
    );
  }
}


export default Setting2Screen;