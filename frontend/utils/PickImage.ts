import {Asset, launchImageLibrary} from "react-native-image-picker";

export const pickImage = () => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 1 },
            response => {
                if (response.assets && response.assets.length > 0) {
                    const pickedPhoto = response.assets[0] as Asset
                    resolve(pickedPhoto.uri)
                } else {
                    reject('No image selected')
                }
            }
        )
    })
}