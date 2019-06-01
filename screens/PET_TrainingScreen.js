import React from 'react';
import { Text, View, Alert, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Button, Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import { Accelerometer } from 'expo';
import * as Animatable from 'react-native-animatable';

import * as actions from '../actions';


const img = require("../assets/training_PET.png")
const phone_img = require("../assets/sumaho.png")
const gym_img = require("../assets/gym.jpg")

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pushUpNum: 0,
      mode: 'sleep',
      startcol: 'blue',
      stopcol: 'gainsboro',
      accelerometerData: {},
      count: 0,
      checkcount: 0
    };
  }

  componentDidMount() {
    this._toggle();
    //this.props.calSum();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  // 加速度センシングを開始する
  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      // 加速度を取得
      this.setState({ accelerometerData });
    });
    // 1秒ごとに加速度を測定
    Accelerometer.setUpdateInterval(1000);
  }

  // 加速度センシングを終了する
  _unsubscribe = () => {
    if (this._subscription) {
      this._subscription.remove();
    }
    this._subscription = null;
  }

  onStopButtonPress = () =>{
    let num = this.state.pushUpNum;
    num = num += 1;
    this.setState({pushUpNum : num})
    this.setState({startcol : 'blue'})
    this.setState({stopcol: 'gainsboro'})
    this.setState({mode: 'sleep'})
  }

  onStartButtonPress = () =>{
    this.setState({startcol : 'gainsboro'})
    this.setState({stopcol: 'red'})
    this.setState({mode: 'active'})
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;

    if(z > 0){
      if(this.props.calsumReview === 0){
        z = "zの値は+です";
        this.props.countreview();
        this.props.check();
      }
    };

    if(z < 0){
      if(this.props.calsumReview === 1){
        this.props.check();
      }
    }


    if(this.state.mode === 'sleep'){
      return(
        <View style={{flex : 1,
          backgroundColor: 'white'}}>
            <View style={{flex: 2}}>
              <Text style={{textAlign:'center',
                fontSize: 30}}>スマホをセットしStartをタップ!!</Text>
            </View>
            <View style={{flex: 5
              }}>
              <Animatable.View animation="slideInDown" easing="ease-out-sine" iterationCount="infinite">
                <Image
                  style={{ width: 80,
                    marginLeft:180
                    }}
                  resizeMode="contain"
                  source={phone_img}
                />
              </Animatable.View>
            </View>
            <View style={{flex: 5
              }}>
                <Image
                  style={{ width: 300,
                    marginLeft:55
                    }}
                  resizeMode="contain"
                  source={img}
                />
            </View>
            <View style={{flex : 2,
              flexDirection:'row',
              justifyContent:'center'}}>
              <View style={{height: 200,
                width: 100,
                marginRight:20
                }}>
                <Button
                  title="Start"
                  buttonStyle={{ backgroundColor: this.state.startcol }}
                  onPress={() => this.onStartButtonPress()}
                />
              </View>
              <View style={{height:200,
                width: 100,
                marginLeft:20}}>
                <Button
                  title="Stop"
                  buttonStyle={{ backgroundColor: this.state.stopcol }}
                  onPress={() => this.onStopButtonPress()}
              />
              </View>
            </View>
        </View>
      );
    }else{
      return(
        <View style={{flex : 1,}}>
          <ImageBackground source={require("../assets/gym.jpg")} style={{width: '100%', height: '100%'}}>
            <View style={{flex: 1}}>
              <Text style={{textAlign:'center',
                fontSize: 30,
                color:'red'}}>ペットボトルを持ち上げて!!</Text>
            </View>
            <View style={{flex: 1}}>
              <Avatar
                size={100}
                rounded
                title={this.props.countReview}
                titleStyle={{color:'red'}}
                activeOpacity={0.7}
                containerStyle={{marginLeft:155}}
              />
            </View>
            
            <View style={{flex: 5
              }}>
              <Animatable.View animation="pulse" easing="ease-out-sine" iterationCount="infinite">
                <Image
                  style={{ width: 300,
                    marginLeft:50,
                    marginTop:150
                    }}
                  resizeMode="contain"
                  source={img}
                />
              </Animatable.View>
              
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
                  buttonStyle={{ backgroundColor: this.state.startcol }}
                  onPress={() => this.onStartButtonPress()}
                />
              </View>
              <View style={{height:200,
                width: 100,
                marginLeft:20}}>
                <Button
                  title="Stop"
                  buttonStyle={{ backgroundColor: this.state.stopcol }}
                  onPress={() => this.onStopButtonPress()}
              />
              </View>
            </View>
            </ImageBackground>
        </View>
        
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
    calsumReview: state.review.calsumReview,
    countReview: state.review.countReview
  };
};

export default connect(mapStateToProps, actions)(ProfileScreen);