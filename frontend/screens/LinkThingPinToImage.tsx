import {StyleSheet, View, Image, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {SafeAreaView} from "react-native-safe-area-context"
import {storage} from "../store/storage"
import {Loading} from "../components/Loading"
import {Point} from "../types/Point"
import {activePinColor} from "../const/Colors"
import PrimaryButton from "../components/Buttons/Primary"
import {ImagePalacePin, ImageRoomPin} from "../types/ImagePin"
import {useNavigation} from "@react-navigation/native"
import {scaleActualToDisplayed, scaleDisplayedToActual} from "../utils/ScalePoint"
import {PIN_SIZE} from "../const/Const"

export default function LinkThingPinToImage() {
    const navigation = useNavigation()
    const route = useRoute()
    const {thing_id} = route.params as { thing_id: number }

    const addPinThingToPalace = storage(state => state.addPinThingToRoom)
    const rooms = storage(state => state.rooms)
    const things = storage(state => state.things)
    const thing = things.find((thing) => thing.id === thing_id)
    const room = rooms.find((room) => room.id === thing?.room_id)

    if (!room) return <Loading/>

    const [imageSize, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 })
    const [clickPosition, setClickPosition] = useState<Point | null>(null)

    useEffect(() => {
        const existingPin = room.pins?.find((pin) => pin.thing_id === thing_id)
        if (existingPin) {
            setClickPosition(scaleActualToDisplayed(existingPin.position, imageSize, 1))
        }
    }, [room, thing_id, imageSize])

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
            const imageActualPosition: Point = scaleDisplayedToActual(clickPosition, imageSize, 1)

            const imagePalacePin: ImageRoomPin = {
                thing_id: thing_id,
                position: imageActualPosition,
            }
            addPinThingToPalace(room.id, imagePalacePin)
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
                            source={{uri: room.path_to_image}} style={[styles.image, {height: calculatedHeight}]}
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
        width: PIN_SIZE,
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: activePinColor,
    },
})
