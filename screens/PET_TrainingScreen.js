import React from 'react';
import { Text, View, Alert, AsyncStorage, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Accelerometer } from 'expo';
import * as Animatable from 'react-native-animatable';

import * as actions from '../actions';


const img = require("../assets/training_PET.png")
const phone_img = require("../assets/sumaho.png")

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

  increment() {
    if(this.state.mode == 'active'){
      this.setState({
        count: this.state.count += 1
      });
    }
  }

  decrement() {
    this.setState({
      checkcount: this.state.checkcount = 0
    });
  }

  checkcounting() {
    if(this.state.checkcount === 0){
      this.setState({
        checkcount: this.state.checkcount += 1
      });
    }
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
      if(this.state.checkcount === 0){
        z = "zの値は+です";
        this.increment();
        this.checkcounting();
      }
    };

    if(z < 0){
      if(this.state.checkcount === 1){
        this.decrement();
      }
    }

    if(this.state.mode === 'sleep'){
      return(
        <View style={{flex : 1}}>
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
        <View style={{flex : 1}}>
            <View style={{flex: 2}}>
              <Text style={{textAlign:'center',
                fontSize: 30}}>ペットボトルを持ち上げて!!</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={{fontSize:40,
                textAlign:'center'}}>
                合計 : {this.props.calSum(this.state.count).payload[0]} 回
              </Text>
            </View>
            <View style={{flex: 5
              }}>
              <Animatable.View animation="pulse" easing="ease-out-sine" iterationCount="infinite">
                <Image
                  style={{ width: 300,
                    marginLeft:55
                    }}
                  resizeMode="contain"
                  source={img}
                />
              </Animatable.View>
              
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
    }
  }
}


const mapStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
  };
};

export default connect(mapStateToProps, actions)(ProfileScreen);