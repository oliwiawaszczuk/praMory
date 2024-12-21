import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    PanResponder,
    Modal
} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Text} from "../components/Text/Default"
import {Palace} from "../types/Palace"
import {Loading} from "../components/Loading"
import {storage} from "../store/storage"
import PrimaryButton from "../components/Buttons/Primary"
import {launchImageLibrary} from 'react-native-image-picker'
import HorizontalLine from "../components/HorizontalLine"
import {greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker} from "../const/Colors"
import AddNewRoom from "../components/AddNewRoom"
import SecondaryButton from "../components/Buttons/Secondary"
import LineToOpen from "../components/LineToOpen"
import RoomCardCover from "../components/RoomCardCover"
import NoteInput from "../components/Text/Note"
import {MIN_NOTE_HEIGHT, MAX_NOTE_HEIGHT, ONE_STEP_HEIGHT} from "../const/Const"
import RoomCardsSlider from "../components/RoomCardsSlider";
import RoomCard from "../components/RoomCard";

const PALACE_IMAGE_HEIGHT = 600
const PALACE_IMAGE_HEIGHT_MIN = 40

export default function PalaceDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)
    const [palace, setPalace] = useState<Palace | null>(null)
    const [noteVisible, setNoteVisible] = useState<boolean>(false)
    const [isSliderVisible, setIsSliderVisible] = useState<boolean>(false)

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

    const handlePickImage = () => {
        launchImageLibrary(
            {mediaType: 'photo', quality: 1},
            response => {
                if (response.assets && response.assets.length > 0) {
                    const pickedPhoto = response.assets[0]
                    setPalaceImage(pickedPhoto.uri || null)
                    updatePalaceImage(palace?.id || 0, pickedPhoto.uri || "")
                }
            }
        )
    }

    // ANIMATION
    const animatedImageHeight = useRef(new Animated.Value(PALACE_IMAGE_HEIGHT-250)).current

    const imageHeight = animatedImageHeight.interpolate({
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

    const filteredRooms = rooms.filter(room => room.palace_id === id)

    if (!palace) return <Loading/>

    return (
        <View style={{flex: 1}}>
            {palaceImage && (
                <>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onLongPress={() => navigation.navigate('ImageLook', {pathToImage: palaceImage})}
                    >
                        <Animated.Image
                            source={{uri: palaceImage}}
                            style={[styles.absImage, {height: imageHeight}]}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <View {...panResponder.panHandlers} style={styles.dragLine}>
                        {/*<HorizontalLine color={yellowPrimaryDarker} lineHeight={10}/>*/}
                        <View style={styles.handler}></View>
                    </View>
                </>
            )}
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <LineToOpen label="Rooms" visible={roomsVisible} setVisible={setRoomsVisible}/>
                <Modal visible={noteEditVisible} transparent onRequestClose={() => setNoteEditVisible(false)}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.overlay}
                                      onPress={() => setNoteEditVisible(false)}>
                        <View style={styles.modalContent}>
                            <NoteInput startValue={noteEditText} onChange={setNoteEditText}/>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    style={styles.button}
                                    text="Save"
                                    onPressFunc={() => {
                                        updatePalaceNote(palace?.id || 0, noteEditText)
                                        setNoteEditVisible(false)
                                    }}
                                />
                                <PrimaryButton
                                    style={styles.button}
                                    text="Cancel"
                                    onPressFunc={() => setNoteEditVisible(false)}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        height: "80%",
        borderRadius: 10,
        padding: 20,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
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

});
