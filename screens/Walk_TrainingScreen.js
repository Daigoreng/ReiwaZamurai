import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, 
  Dimensions, LayoutAnimation, UIManager, Platform, Alert} from 'react-native';
import {  Button, } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker';
import { MapView, Permissions, Location, } from 'expo';
// import { connect } from 'react-redux';
// import { Container, Header, Content, Item, Input } from 'native-base';

import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

let logsCount = 0;

const INITIAL_STATE = {
    logs: [], // GPSログを格納する領域
    subscription: null, // 位置情報の監視オブジェクト
    Location: {
        latitude: 35.658581, // Tokyo tower
        longitude: 139.745433, // Tokyo tower
    },
    totalDistance: 0.0
}

class Walk_TrainingScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    componentDidMount() {
        this.getLocationAsync();
    }

    // 位置情報
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
      return;
    }
 
    // 現在位置を取得
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
}

    // GPSログの取得を開始する関数
  startLogging = async () => {
    if(this.state.subscription){
      return;
    }
    this.setState({logs: []});
    const subscription = await Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 2}, this.loggingPosition);
    this.setState({ subscription: subscription, status: 'logging'});
  }

  // GPSログの取得を停止する関数
  stopLogging = () => {
    if(this.state.subscription){
      this.state.subscription.remove(this.loggingPosition)
    }
    this.setState({ subscription: null, status: 'stop'})
  }

//   stopMarker(){
//     return(
//         <MapView.Marker
//             coordinate={{
//                 // latitude: this.state.latitude,
//                 // longitude: this.state.longitude
//                 // latitude: this.state.logs[this.state.logs.length-1].latitude,
//                 // longitude: this.state.logs[this.state.logs.length-1].longitude
//                 latitude: this.state.logs[0].latitude,
//                 longitude: this.state.logs[0].longitude
//             }}
//             title="finish"
//             >
//             </MapView.Marker>
//     );
//   }

  // Location.watchPositionAsyncのコールバック関数
  loggingPosition = ({coords, timestamp}) => {
    if(coords.accuracy){
      let logs = [...this.state.logs]
      logs.push({latitude: coords.latitude, longitude: coords.longitude})
      this.setState({logs: logs})

      if(logsCount > 0){
        this.setState({
          totalDistance: 
            this.state.totalDistance +
            this.distance(
              this.state.logs[logsCount-1].latitude, 
              this.state.logs[logsCount-1].longitude, 
              this.state.logs[logsCount].latitude, 
              this.state.logs[logsCount].longitude)
            }
          )
      }
      logsCount++;
    }
    // console.log(this.state.logs);
  }

  distance(latitude1, longitude1, latitude2, longitude2){
    latitude1 = latitude1 * 3.14 / 180;
    longitude1 = longitude1 * 3.14 / 180;
    latitude2 = latitude2 * 3.14 / 180;
    longitude2 = longitude2 * 3.14 / 180;

    return 6371 * Math.acos(Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitude2 - longitude1) + Math.sin(latitude1) * Math.sin(latitude2)) * 1000;
  }

  render() {
    return (
      <View style={styles.container}>
        
        <MapView
          style={{ height: SCREEN_WIDTH }}
          scrollEnabled={false}
          cacheEnabled={Platform.OS === 'android'}
          region={{
            latitude:this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521
            // latitudeDelta: 0.001,
            // longitudeDelta: 0.001
          }}
      >
        {
          this.state.logs.length > 1 ?
        <MapView.Marker
          coordinate={{
            // latitude: this.state.latitude,
            // longitude: this.state.longitude
            latitude: this.state.logs[0].latitude,
            longitude: this.state.logs[0].longitude
          }}
          title="start"
        >
          </MapView.Marker> 
        : null
        }
        {
          this.state.logs.length > 1 ?
        <MapView.Polyline
          coordinates={this.state.logs}
          strokeColor="#00008b"
          strokeWidth={3}
        />
        
        : null
        }
       
            
        
      </MapView>
      

        <ScrollView style={{ flex: 1 }}>
          {this.state.status === 'stop' ?
        <Text>
          {this.state.totalDistance} m
        </Text>
        : null
          }
 </ScrollView>
<View style={styles.buttonContainer}>
        <Button 
          onPress={()=>this.startLogging()}
          title="start"          
          />
            
          {/* </Button> */}

            <Button
            title="stop"
            color='black'
            onPress={()=>{Alert.alert(
              "Question",
              "Do you finish?",
              [
                  { text: "Yes", onPress: this.stopLogging()}
              ],
              { cancelable: false }
            )}}
            // onPress={this.stopMarker}

            />
            </View>
        
      </View>
    );
        
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
  
    buttonContainer:{
      height:100,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
    },
  });

export default Walk_TrainingScreen;
