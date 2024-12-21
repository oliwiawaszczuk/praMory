import {StyleSheet, View, Image, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {SafeAreaView} from "react-native-safe-area-context"
import {Text} from "../components/Text/Default"
import {storage} from "../store/storage"
import {Loading} from "../components/Loading"
import {Room} from "../types/Room"
import {Palace} from "../types/Palace"
import {Point} from "../types/Point";
import {activePinColor} from "../const/Colors";
import PrimaryButton from "../components/Buttons/Primary";
import {ImagePalacePin} from "../types/ImagePin";
import {useNavigation} from "@react-navigation/native";

export default function LinkPinToImage() {
    const navigation = useNavigation()
    const route = useRoute()
    const {room_id} = route.params as { room_id: number }

    const addPinRoomToPalace = storage(state => state.addPinRoomToPalace)
    const palaces = storage(state => state.palaces)
    const rooms = storage(state => state.rooms)
    // @ts-ignore
    const room: Room = rooms.find((room) => room.id === room_id)
    // @ts-ignore
    const palace: Palace = palaces.find((palace) => palace.id === room.palace_id)

    if (!palace) return <Loading/>

    const [imageSize, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 })
    const [clickPosition, setClickPosition] = useState<Point | null>(null)

    useEffect(() => {
        const existingPin = palace.pins?.find(pin => pin.room_id === room_id)
        if (existingPin) {
            setClickPosition(existingPin.position)
        }
    }, [palace, room_id])

    const handleImageLoad = (event: any) => {
        const {width, height} = event.nativeEvent.source
        setImageSize({width, height})
    }

    const handleImageClick = (event: any) => {
        const {locationX, locationY} = event.nativeEvent
        setClickPosition({x: locationX, y: locationY})
    }

    const handleSavePosition = () => {
        if (clickPosition) {
            const imagePalacePin: ImagePalacePin = {
                room_id: room_id,
                position: clickPosition,
            }
            addPinRoomToPalace(palace.id, imagePalacePin)
            navigation.goBack()
        }
    }

    const { width: screenWidth } = Dimensions.get('window')
    const { width: imageWidth, height: imageHeight } = imageSize
    const imageAspectRatio = imageWidth > 0 ? imageHeight / imageWidth : 1
    const calculatedHeight = screenWidth * imageAspectRatio

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleImageClick} activeOpacity={1}>
                        <Image
                            // @ts-ignore
                            source={{uri: palace.path_to_image}} style={[styles.image, {height: calculatedHeight}]}
                            onLoad={handleImageLoad}
                        />
                    </TouchableOpacity>
                    {clickPosition && (
                        <View style={[styles.square, {top: clickPosition.y, left: clickPosition.x}]} />
                    )}
                </View>
                <View style={styles.footer}>
                    <PrimaryButton text="Save position" onPressFunc={handleSavePosition}/>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
    },
    footer: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    square: {
        position: 'absolute',
        width: 10,
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: activePinColor,
    },
})
