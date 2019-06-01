import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Dimensions, Button } from 'react-native';
import { ButtonGroup, ListItem, Slider } from 'react-native-elements';
import { connect } from 'react-redux';


import * as actions from '../actions';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';


const ALL_INDEX = 0;
const SCREEN_WIDTH = Dimensions.get('window').width;

const GREAT = 'sentiment-very-satisfied';
const GREAT_INDEX = 1;
const GREAT_COLOR = 'red';

const GOOD = 'sentiment-satisfied';
const GOOD_INDEX = 2;
const GOOD_COLOR = 'orange';

const POOR = 'sentiment-dissatisfied';
const POOR_INDEX = 3;
const POOR_COLOR = 'blue';

let imageSelectedIndex =  0;
let countReview_did = 0;
let bar = 0;

const IMAGE_URL = [
  require("../assets/pet_with_lawn.jpg"),
  require("../assets/pet_2.jpg"),
  require("../assets/pet_3.jpg"),
  require("../assets/pet_4.jpg"),
  require("../assets/pet_5.jpg"),
  require("../assets/pet_6.jpg"),
  require("../assets/pet_7.jpg")

];

function PetStatusBar(props) {
  return(
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
      <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
      <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
    </View>
  );
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      maxbar: SCREEN_WIDTH,
      bar: 0
    };
  }

  onStartButtonPress(){
    this.setState({bar:this.props.countReview*50});
  }

  componentDidMount() {
    this.props.fetchAllReviews();
    
  }

  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }  

  render() {
    bar = this.state.maxbar - countReview_did*100;
    console.log(this.state.bar)

    if(this.state.bar > SCREEN_WIDTH - 100){
      this.setState({bar:0})
      imageSelectedIndex =  imageSelectedIndex + 1;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{flex:12}}>
          <Image
            style={{ height: 300, width: SCREEN_WIDTH}}
            source={IMAGE_URL[imageSelectedIndex]}
        />
        </View>
        <View style={styles.container}>
          <Text style={styles.sizeFont}>
            消費カロリー
          </Text>
        </View>
        <View style={{flex:4,
          backgroundColor:'black'}}>
            <View style={{height:15,
              backgroundColor:'red',
              marginRight:this.state.bar}}>
            </View>
        </View>
        <View style={{flex:4}}>
        <Button
          title="feeding"
          buttonStyle={{ backgroundColor: this.state.startcol }}
          onPress={() => this.onStartButtonPress()}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
    
  },
  sizeFont: {
    flex: 1,
    fontSize: 30,
    alignItems: "stretch",
    justifyContent: "center",
    
  }
});

const mapStateToProps = (state) => {
  return {
    countReview: state.review.countReview
  };
};


export default connect(mapStateToProps, actions)(HomeScreen);