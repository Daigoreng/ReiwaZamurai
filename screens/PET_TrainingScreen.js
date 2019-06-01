import React from 'react';
import { Text, View, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';


let coler = 'red';
let status = 0;

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pushUpNum: 0,
    };
  }

  rend_Button (col,state){
    if(state === 0){
      return(
        <View>
          <Button
            title="Reset all review data"
            buttonStyle={{ backgroundColor: 'red' }}
            onPress={() => this.onResetButtonPress('allReviews')}
          />
        </View>
      );
    }else{
      return(
        <View>
          <Button
            title="Reset all review data"
            buttonStyle={{ backgroundColor: 'blue' }}
            onPress={() => this.onResetButtonPress('allReviews')}
          />
        </View>
      );
    }
  }

  onResetButtonPress = async (key) => {
    await AsyncStorage.removeItem(key);

    Alert.alert(
      'Reset',
      `'${key}' in AsyncStorage has been removed.`,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
        <View style={{flex : 1}}>
            <View style={{flex: 3}}>
              <Text style={{textAlign:'center',
                fontSize: 30}}>hello</Text>
            </View>
            <View style={{flex : 1,
              flexDirection:'row',
              justifyContent:'center'}}>
              <View style={{height: 200,
                width: 100,
                marginRight:20
                }}>
                <Button
                  title="Start"
                  buttonStyle={{ backgroundColor: 'blue' }}
                />
              </View>
              <View style={{height:200,
                width: 100,
                marginLeft:20}}>
                <Button
                  title="Stop"
                  buttonStyle={{ backgroundColor: 'red' }}
              />
              </View>
            </View>
        </View>
    )
    
    /*　　元のreturn
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ padding: 20 }}>
          <Button
            title="Take a Photo!"
            onPress={() => this.props.navigation.navigate('shotimage')}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            title="Reset welcome page"
            buttonStyle={{ backgroundColor: 'red' }}
            onPress={() => this.onResetButtonPress('isInitialized')}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            title="Reset all review data"
            buttonStyle={{ backgroundColor: 'red' }}
            onPress={() => this.onResetButtonPress('allReviews')}
          />
        </View>
      </View>
    );*/
  }
}


const mapStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
  };
};

export default connect(mapStateToProps, actions)(ProfileScreen);