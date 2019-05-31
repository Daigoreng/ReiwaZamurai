import Geocoder from "react-native-geocoding";
import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";

import * as actions from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width; // ←追記部分
const MAP_ZOOM_RATE = 15.0;

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapLoaded: false,
      initialRegion: {
        latitude: 35.709, // 東京都の緯度
        longitude: 139.732, // 東京都の経度
        latitudeDelta: MAP_ZOOM_RATE, // 緯度方向のズーム度合い
        longitudeDelta: MAP_ZOOM_RATE * 2.25 // 経度方向のズーム度合い(緯度方向の2.25倍)
      },
      modalVisible: false, // ←追記部分
      // モーダルに表示する画像の保存場所
      modalImageURI: require("../assets/image_placeholder.png")
    };
  }

  async componentDidMount() {
    Geocoder.setApiKey("AIzaSyB_T1w8bWGOn3HN0Y_L9fC_AJoLGq2shug");
    let result = await Geocoder.getFromLocation(
      this.props.detailReview.country
    );
    this.setState({
      isMapLoaded: true, // 地図読み込み完了
      initialRegion: {
        latitude: result.results[0].geometry.location.lat, // 変換後の緯度
        longitude: result.results[0].geometry.location.lng, // 変換後の経度
        latitudeDelta: MAP_ZOOM_RATE, // 値自体は変わっていないが書く必要あり
        longitudeDelta: MAP_ZOOM_RATE * 2.25 // 値自体は変わっていないが書く必要あり
      }
    });
  }

  renderImages() {
    const imageArray = [
      { isImage: false, uri: require("../assets/image_placeholder.png") },
      { isImage: false, uri: require("../assets/image_placeholder.png") },
      { isImage: false, uri: require("../assets/image_placeholder.png") }
    ];

    for (let i = 0; i < this.props.detailReview.imageURIs.length; i++) {
      imageArray[i].isImage = true;
      // 添付画像の保存場所に更新
      imageArray[i].uri = this.props.detailReview.imageURIs[i];
    }

    return (
      <View style={{ flexDirection: "row" }}>
        {imageArray.map((image, index) => {
          return (
            <TouchableOpacity // ←追記ここから
              key={index} // keyプロパティには一意の値(ここでは`index`)を指定しなければいけない
              onPress={() =>
                this.setState({
                  // 画像がタッチされたら
                  modalVisible: image.isImage, // 添付画像が`true`であればモーダルを表示し、
                  modalImageURI: image.uri // モーダルにその添付画像を表示する
                })
              }
            >
              <Image
                style={{ height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 }}
                source={image.uri}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    if (this.state.isMapLoaded === false) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Modal // ←追記ここから
          visible={this.state.modalVisible} // モーダルを表示するか否か
          animationType="fade" // モーダルを表示する際のアニメーション
          transparent={false} // モーダルの背景を半透明にするか否か
        >
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <TouchableOpacity // ←追記ここから
              // 画面一杯、かつ縦方向横方向共に中央寄せ
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              // タッチされたら、モーダルを非表示にする
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Image // ←追記ここから
                // 縦も横も同じサイズ(スマホ画面の横幅)、つまり正方形画像
                style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH }}
                // 表示する画像のソース
                source={this.state.modalImageURI}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        <ScrollView>
          <View style={{ alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 30, padding: 5 }}>
              {this.props.detailReview.country}
            </Text>
            <Text style={{ padding: 5 }}>
              {this.props.detailReview.dateFrom} ~{" "}
              {this.props.detailReview.dateTo}
            </Text>
          </View>

          <MapView // ←追記ここから
            style={{ height: SCREEN_WIDTH }} // 高さをスマホ画面横幅と一緒にする(つまり正方形サイズ)
            scrollEnabled={false} // 地図上をスクロールできないようにする
            cacheEnabled={Platform.OS === "android"} // Androidだけキャッシュをありにする
            initialRegion={this.state.initialRegion} // `this.state`の方の`initialRegion`に合わせる
          />

          {this.renderImages()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // ←追記ここから
  return {
    detailReview: state.review.detailReview
  };
};

export default connect(
  mapStateToProps,
  actions
)(DetailScreen);
