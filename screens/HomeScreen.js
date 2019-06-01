import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
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
      value: 0
    };
  }


  componentDidMount() {
    this.props.fetchAllReviews();
    countReview_did = this.props.countReview;
  
  }


  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }  

  render() {
    
    console.log(this.props.countReview);
    
    //[this.state.value === 1] => [calorie >= 1]
    if(this.state.value >= 1){
      this.setState({
        value: 0
      });
      imageSelectedIndex =  imageSelectedIndex + 1;

    
    if(countReview_did !== this.props.countReview){
      this.setState({
        value: countReview_did
      });
    }
    
    }
    return (
      <View style={{ flex: 1 }}>

        <Image
          style={{ height: 300, width: SCREEN_WIDTH ,flex:5}}
          source={IMAGE_URL[imageSelectedIndex]}
        />

        {/* <ImageBackground 
          source={require("../assets/lawn.jpg")} 
          style={{
            width: 280,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{ height: 300, width: 300 ,flex:5}}
            source={IMAGE_URL[imageSelectedIndex]}
          />
        </ImageBackground> */}
        <View style={styles.container}>
          <Text style={styles.sizeFont}>
            消費カロリー
          </Text>
          <Slider
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            disabled = "Yes"
            maximumTrackTintColor = "floralwhite"
            minimumTrackTintColor = "skyblue"
            thumbTintColor = "skyblue"
          />

          <Text>
            Value: {this.state.value},
            imageSelectedIndex: {imageSelectedIndex}
          </Text>
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