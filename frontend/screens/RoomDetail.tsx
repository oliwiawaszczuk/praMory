import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Text} from "../components/Text/Default"
import {Palace} from "../types/Palace"
import {Loading} from "../components/Loading"
import {storage} from "../store/storage"
import PrimaryButton from "../components/Buttons/Primary"
import {launchImageLibrary} from 'react-native-image-picker'
import HorizontalLine from "../components/HorizontalLine";
import {greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker} from "../const/Colors";
import AddNewRoom from "../components/AddNewRoom";
import SecondaryButton from "../components/Buttons/Secondary";
import LineToOpen from "../components/LineToOpen";
import RoomCardCover from "../components/RoomCardCover";
import NoteInput from "../components/Text/Note";
import {Room} from "../types/Room";

const PALACE_IMAGE_HEIGHT: number = 400
const PALACE_IMAGE_HEIGHT_MIN: number = 100

const {height: screenHeight} = Dimensions.get("window");

export default function RoomDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [roomsImages, setRoomsImages] = useState<string[] | null>(null)

    const [room, setRoom] = useState<Room | null>(null)
    const [thingsVisible, setThingsVisible] = useState<boolean>(false)

    // To image display
    const scrollY = new Animated.Value(0)
    const imageHeight = scrollY.interpolate({
        inputRange: [0, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT, PALACE_IMAGE_HEIGHT_MIN],
        extrapolate: "clamp",
    })

    // // Loading palace details
    // useEffect(() => {
    //     const foundPalace = palaces.find((item) => item.id === id)
    //     setPalace(foundPalace || null)
    // }, [id, palaces])
    //
    // useEffect(() => {
    //     if (palace) {
    //         navigation.setOptions({title: `Palace: ${palace.title}`})
    //         if (!palaceImage) setPalaceImage(palace.path_to_image)
    //     }
    // }, [palace, navigation])
    //
    // if (!palace) return <Loading/>
    //
    // // Image picker
    // const handlePickImage = () => {
    //     launchImageLibrary(
    //         {
    //             mediaType: 'photo',
    //             quality: 1,
    //         },
    //         (response) => {
    //             if (response.didCancel) {
    //                 console.log('User cancelled image picker');
    //             } else if (response.errorMessage) {
    //                 console.log('Error: ', response.errorMessage)
    //             } else if (response.assets && response.assets.length > 0) {
    //                 const pickedPhoto = response.assets[0]
    //                 // @ts-ignore
    //                 setPalaceImage(pickedPhoto.uri)
    //                 // @ts-ignore
    //                 updatePalaceImage(palace.id, pickedPhoto.uri)
    //             }
    //         }
    //     )
    // }
    //
    // const filteredRooms = rooms.filter((room) => room.palace_id === id)

    return (
        <View style={{flex: 1}}>
            {roomsImages && (
                <>
                    <TouchableOpacity activeOpacity={0.9} onLongPress={() => navigation.navigate('ImageLook', {pathToImage: roomsImages[0]})}>
                        <Animated.Image
                            // @ts-ignore
                            source={{uri: palaceImage}}
                            style={[styles.absImage, {height: imageHeight}]}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <HorizontalLine color={yellowPrimaryDarker} lineHeight={4}/>
                </>
            )}
            <ScrollView
                style={styles.scrollView}
                // contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
            >
                <LineToOpen label="Things" visible={thingsVisible} setVisible={setThingsVisible}/>
                {thingsVisible && (
                    <View>
                        <Text>things!</Text>
                    </View>
                )}

                {/*<SecondaryButton text="Pick palace bacground image from gallery" onPressFunc={handlePickImage}/>*/}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    absImage: {
        width: "100%",
    },
    scrollView: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flex: 1,
    },
});
