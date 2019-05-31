import React, { Component } from 'react';
import { View, Text, Button, Image, CameraRoll } from 'react-native';
import { ImagePicker } from 'expo';

class ImagePickerSample extends Component {

    state = {
        image: null
    }

    // カメラを起動
    _takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false
        });

        CameraRoll.saveToCameraRoll(result.uri);

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    }

    // カメラロールから選択
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9]
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    }

    render() {
        let { image } = this.state;

        return(
            <View style={styles.containerStyle}>
                <Text>Image Picker Sample</Text>

                <Button
                    onPress={this._takePhoto}
                    title="カメラを起動"
                />

                <Button
                    onPress={this._pickImage}
                    title="カメラロールから選択"
                />

                {
                    image &&
                    <Image
                        source={{uri: image}}
                        style={{width: 300, height: 300}}
                    />
                }
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 15
    }
}

export default ImagePickerSample;