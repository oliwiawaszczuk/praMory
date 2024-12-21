import { View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity, PanResponder, Modal, ImageBackground} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Text} from "../components/Text/Default"
import {Palace} from "../types/Palace"
import {Loading} from "../components/Loading"
import {storage} from "../store/storage"
import PrimaryButton from "../components/Buttons/Primary"
import {launchImageLibrary} from 'react-native-image-picker'
import HorizontalLine from "../components/HorizontalLine"
import {
    activePinColor,
    greenPrimary,
    greenPrimaryDarker,
    pinsColor,
    yellowPrimary,
    yellowPrimaryDarker
} from "../const/Colors"
import AddNewRoom from "../components/AddNewRoom"
import SecondaryButton from "../components/Buttons/Secondary"
import LineToOpen from "../components/LineToOpen"
import RoomCardCover from "../components/RoomCardCover"
import NoteInput from "../components/Text/Note"
import {MIN_NOTE_HEIGHT, MAX_NOTE_HEIGHT, ONE_STEP_HEIGHT, PIN_SIZE} from "../const/Const"
import RoomCardsSlider from "../components/RoomCardsSlider";
import RoomCard from "../components/RoomCard";
import Slider from '@react-native-community/slider'
import {ImagePalacePin} from "../types/ImagePin";
import {scaleActualToDisplayed} from "../utils/ScalePoint";
import {pickImage} from "../utils/PickImage";
import NoteInputModal from "../components/Modals/NoteInputModal";

const PALACE_IMAGE_HEIGHT = 600
const PALACE_IMAGE_HEIGHT_MIN = 54

export default function PalaceDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)
    const [palace, setPalace] = useState<Palace | null>(null)
    const [noteVisible, setNoteVisible] = useState<boolean>(false)
    const [isSliderVisible, setIsSliderVisible] = useState<boolean>(false)

    const [isImageStatic, setIsImageStatic] = useState<boolean>(false)
    const [imageSize, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 })
    const [imageScale, setImageScale] = useState<number>(1)
    const [activePin, setActivePin] = useState<ImagePalacePin | null>(null)
    const [displayedPins, setDisplayedPins] = useState<ImagePalacePin[]>([])
    const [sliderValue, setSliderValue] = useState<number>(1)

    const [roomsVisible, setRoomsVisible] = useState<boolean>(false)
    const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)
    const [noteEditText, setNoteEditText] = useState("")
    const [noteHeight, setNoteHeight] = useState(MIN_NOTE_HEIGHT)

    const palaces = storage(state => state.palaces)
    const rooms = storage(state => state.rooms)
    const updatePalaceImage = storage(state => state.updatePalaceImage)
    const updatePalaceNote = storage(state => state.updatePalaceNote)

    useEffect(() => {
        const foundPalace = palaces.find(item => item.id === id)
        setPalace(foundPalace || null)
    }, [id, palaces])

    useEffect(() => {
        if (palace) {
            navigation.setOptions({title: `Palace: ${palace.title}`})
            if (!palaceImage) {
                setPalaceImage(palace.path_to_image)
                setNoteEditText(palace.note || "")
            }
        }
    }, [palace, navigation])

    const handlePickImage = async () => {
        try {
            const imageUri = await pickImage()
            // @ts-ignore
            setPalaceImage(imageUri)
            // @ts-ignore
            updatePalaceImage(palace?.id || 0, imageUri)
        } catch (error) {
            console.log("Error pick image", error)
        }
    }

    // ANIMATION
    const animatedImageHeight = useRef(new Animated.Value(PALACE_IMAGE_HEIGHT-250)).current

    const imageAnimationHeight = animatedImageHeight.interpolate({
        inputRange: [PALACE_IMAGE_HEIGHT_MIN, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT_MIN, PALACE_IMAGE_HEIGHT],
        extrapolate: 'clamp',
    })

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {dy: animatedImageHeight}
                ],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: (evt, {moveY}) => {
                animatedImageHeight.extractOffset()
            },
        })
    ).current

    const { width: screenWidth } = Dimensions.get('window')
    const { width: imageWidth, height: imageHeight } = imageSize

    const imageAspectRatio = imageWidth > 0 ? imageHeight / imageWidth : 1
    const calculatedHeight = screenWidth * imageAspectRatio

    const handleSliderChange = (value: number) => {
        setImageScale(value)
    }

    const handleImageLoad = (event: any) => {
        if (imageSize.width === 0) {
            const {width, height} = event.nativeEvent.source
            if (width > 0 && height > 0) {
                setImageSize({width, height})
            }
        }
    }

    useEffect(() => {
        if (palace && imageSize.width > 0 && imageScale > 0) {
            const newDisplayedPins = palace.pins.map((pin) => ({
                ...pin,
                position: scaleActualToDisplayed(pin.position, imageSize, imageScale),
            }))
            setDisplayedPins(newDisplayedPins)
        }
    }, [palace, imageSize, imageScale])

    useEffect(() => {
        if(!isImageStatic)
            setSliderValue(imageScale)
    }, [isImageStatic])

    const filteredRooms = rooms.filter(room => room.palace_id === id)

    const SaveNote = () => {
        updatePalaceNote(palace?.id || 0, noteEditText)
        setNoteEditVisible(false)
    }

    if (!palace) return <Loading/>

    return (
        <View style={{flex: 1}}>
            {palaceImage && (
                <View style={{position: "relative"}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setIsImageStatic(!isImageStatic)}
                        style={{width: 30, height: 30, position: "absolute", top: 5, right: 5, borderRadius: 10, backgroundColor: greenPrimaryDarker, zIndex: 2}}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onLongPress={() => navigation.navigate('ImageLook', {pathToImage: palaceImage})}
                        style={{alignItems: "center"}}
                    >
                        {!isImageStatic ? <Animated.Image
                            source={{uri: palaceImage}}
                            style={[styles.absImage, {height: imageAnimationHeight}]}
                            resizeMode="cover"
                        /> : <ImageBackground
                                source={{ uri: palaceImage }}
                                resizeMode="contain"
                                style={{ width: screenWidth / imageScale, height: calculatedHeight / imageScale }}
                                onLoad={handleImageLoad}
                            >
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                    {displayedPins.map((pin, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setActivePin(pin)}
                                            style={{
                                                position: 'absolute',
                                                left: pin.position.x,
                                                top: pin.position.y,
                                                width: PIN_SIZE / imageScale,
                                                height: PIN_SIZE / imageScale,
                                                borderRadius: 10,
                                                backgroundColor: pin.position.x === activePin?.position.x && pin.position.y === activePin?.position.y ? activePinColor : pinsColor,
                                            }}
                                        />
                                    ))}
                                </View>
                            </ImageBackground>}
                    </TouchableOpacity>
                    {!isImageStatic ?
                        <View {...panResponder.panHandlers} style={styles.dragLine}>
                            <View style={styles.handler}></View>
                        </View> :
                        <View style={styles.sliderContainer}>
                            <HorizontalLine color={yellowPrimaryDarker} lineHeight={10}/>
                            <Slider
                                style={styles.slider}
                                minimumValue={1}
                                maximumValue={5}
                                value={sliderValue}
                                onValueChange={handleSliderChange}
                                minimumTrackTintColor="rgba(0, 0, 0, 0)"
                                maximumTrackTintColor="rgba(0, 0, 0, 0)"
                                thumbTintColor={greenPrimaryDarker}
                                step={0.1}
                            />
                        </View>
                    }
                </View>
            )}
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                {activePin && isImageStatic && (
                    <View>
                        <TouchableOpacity  activeOpacity={0.8} onPress={() => setActivePin(null)} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{borderTopWidth: 4, borderStyle: "dotted", width: "100%", borderTopColor: yellowPrimaryDarker}}></View>
                            <View style={{borderTopWidth: 4, borderStyle: "dotted", width: "98%", borderTopColor: yellowPrimaryDarker}}></View>
                            <View style={{borderTopWidth: 4, borderStyle: "dotted", width: "100%", borderTopColor: yellowPrimaryDarker}}></View>
                            <View style={{borderTopWidth: 4, borderStyle: "dotted", width: "98%", borderTopColor: yellowPrimaryDarker}}></View>
                        </TouchableOpacity>
                        <RoomCardCover
                            // @ts-ignore
                            room={rooms.find((room) => room.id === activePin.room_id)}
                            navigation={navigation}
                        />
                    </View>
                )}

                <LineToOpen label="Rooms" visible={roomsVisible} setVisible={setRoomsVisible}/>
                {roomsVisible && (
                    <View style={styles.dropdown}>
                        {filteredRooms.length > 0 && (isSliderVisible ?
                            <View style={styles.roomCardContainer}>
                                {filteredRooms.map(room => (
                                    <View key={room.id} style={styles.roomCard}><RoomCard room={room} navigation={navigation}/></View>
                                ))}
                            </View> :
                            <RoomCardsSlider rooms={filteredRooms} navigation={navigation}/>
                        )}

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <SmallButton onPress={() => {}}/>
                            <View style={{flex: 6}}>
                                <AddNewRoom palace_id={id}/>
                            </View>
                            <SmallButton onPress={() => setIsSliderVisible(!isSliderVisible)}/>
                        </View>
                    </View>
                )}

                <LineToOpen label="Notes" visible={noteVisible} setVisible={setNoteVisible}/>
                {noteVisible && (
                    <View>
                        {palace.note && <Text style={[styles.textAsNote, {height: noteHeight}]}>{palace.note}</Text>}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <View style={styles.moreOptionsForNote}>
                                <PrimaryButton
                                    style={styles.moreOptionsForNoteButton}
                                    text="^"
                                    onPressFunc={() => setNoteHeight(Math.min(noteHeight + ONE_STEP_HEIGHT, MAX_NOTE_HEIGHT))}
                                />
                                <PrimaryButton
                                    style={styles.moreOptionsForNoteButton}
                                    text="v"
                                    onPressFunc={() => setNoteHeight(Math.max(noteHeight - ONE_STEP_HEIGHT, MIN_NOTE_HEIGHT))}
                                />
                            </View>
                            <PrimaryButton
                                style={{flex: 1, marginHorizontal: 10, marginVertical: 15}}
                                text="Edit note"
                                onPressFunc={() => setNoteEditVisible(true)}
                            />
                        </View>
                    </View>
                )}
                <SecondaryButton text="Pick palace background image from gallery" onPressFunc={handlePickImage}/>
            </ScrollView>
            <NoteInputModal modalVisible={noteEditVisible} setModalVisible={setNoteEditVisible} noteEditText={noteEditText} setNoteEditText={setNoteEditText} saveFunc={SaveNote}/>
        </View>
    )
}

function SmallButton({onPress}: { onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.smallButton} onPress={onPress}>
            <View style={styles.smallButtonView}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    smallButton: {
        flex: 1,
        padding: 10,
        height: "100%",
    },
    dragLine: {
        width: "100%",
        height: 10,
        backgroundColor: yellowPrimary,
        zIndex: 10,
    },
    smallButtonView: {
        borderColor: yellowPrimaryDarker,
        borderWidth: 2,
        borderRadius: 14,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    absImage: {
        width: "100%",
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        margin: 10,
    },
    scrollView: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flex: 1,
        position: "relative",
    },
    dropdown: {
        paddingHorizontal: 10,
        elevation: 2,
    },
    roomCardContainer: {
        flexDirection: 'row',
        // flex: 1,
        flexWrap: "wrap",
        justifyContent: 'space-between',
        // alignItems: 'flex-start',
    },
    roomCard: {
        width: 110,
        // height: 100,
    },
    textAsNote: {
        margin: 5,
        padding: 10,
        borderColor: greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
    },
    moreOptionsForNote: {
        flex: 2,
        // marginHorizontal: 10,
        padding: 10,
        flexDirection: "row",
    },
    moreOptionsForNoteButton: {
        marginHorizontal: 4,
    },
    handler: {
        height: 40,
        width: 60,
        backgroundColor: yellowPrimaryDarker,
        position: "absolute",
        right: 0,
        top: -15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 3,
        borderColor: greenPrimaryDarker,
        borderRightWidth: 0,
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },
    slider: {
        position: "absolute",
        width: '80%',
        height: 20,
    },
});
