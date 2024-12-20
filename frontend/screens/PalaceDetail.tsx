import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity, Modal} from "react-native"
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
import RoomCard from "../components/RoomCard";
import NoteInput from "../components/Text/Note";
import {MIN_NOTE_HEIGHT, MAX_NOTE_HEIGHT, ONE_STEP_HEIGHT} from "../const/Const";

const PALACE_IMAGE_HEIGHT: number = 400
const PALACE_IMAGE_HEIGHT_MIN: number = 100

export default function PalaceDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)

    const [palace, setPalace] = useState<Palace | null>(null)
    const palaces = storage((state) => state.palaces)
    const rooms = storage((state) => state.rooms)
    const updatePalaceImage = storage((state) => state.updatePalaceImage)
    const updatePalaceNote = storage((state) => state.updatePalaceNote)

    const [noteVisible, setNoteVisible] = useState<boolean>(false)
    const [roomsVisible, setRoomsVisible] = useState<boolean>(false)

    const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)
    const [noteEditText, setNoteEditText] = useState<string>("")
    const [noteHeight, setNoteHeight] = useState<number>(MIN_NOTE_HEIGHT)

    // To image display
    const scrollY = new Animated.Value(0)
    const imageHeight = scrollY.interpolate({
        inputRange: [0, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT, PALACE_IMAGE_HEIGHT_MIN],
        extrapolate: "clamp",
    })

    // Loading palace details
    useEffect(() => {
        const foundPalace = palaces.find((item) => item.id === id)
        setPalace(foundPalace || null)
    }, [id, palaces])

    useEffect(() => {
        if (palace) {
            navigation.setOptions({title: `Palace: ${palace.title}`})
            if (!palaceImage) {
                setPalaceImage(palace.path_to_image)
                setNoteEditText(palace.note ? palace.note : "")
            }
        }
    }, [palace, navigation])

    if (!palace) return <Loading/>

    // Image picker
    const handlePickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('Error: ', response.errorMessage)
                } else if (response.assets && response.assets.length > 0) {
                    const pickedPhoto = response.assets[0]
                    // @ts-ignore
                    setPalaceImage(pickedPhoto.uri)
                    // @ts-ignore
                    updatePalaceImage(palace.id, pickedPhoto.uri)
                }
            }
        )
    }

    const filteredRooms = rooms.filter((room) => room.palace_id === id)

    return (
        <View style={{flex: 1}}>
            {palaceImage && (
                <>
                    <TouchableOpacity activeOpacity={0.9}
                                      onLongPress={() => navigation.navigate('ImageLook', {pathToImage: palaceImage})}>
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
                <LineToOpen label="Rooms" visible={roomsVisible} setVisible={setRoomsVisible}/>
                {roomsVisible && (
                    <View style={[styles.dropdown]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <SmallButton onPress={() => {}}/>
                            <View style={{flex: 6, height: '100%'}}>
                                <AddNewRoom palace_id={id}/>
                            </View>
                            <SmallButton onPress={() => {}}/>
                        </View>


                        <View style={styles.roomCardContainer}>
                            {filteredRooms.map((room) => (
                                <RoomCard key={room.id} room={room} navigation={navigation}/>
                            ))}
                        </View>
                    </View>
                )}

                <Modal visible={noteEditVisible} transparent={true} onRequestClose={() => setNoteEditVisible(false)}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.overlay} onPress={() => setNoteEditVisible(false)}>
                        <View style={styles.modalContent}>
                            <NoteInput startValue={noteEditText} onChange={(text: string) => { setNoteEditText(text) }}/>

                            <View style={styles.buttonContainer}>
                                <PrimaryButton style={styles.button} text="Save" onPressFunc={() => {
                                    updatePalaceNote(palace.id, noteEditText)
                                    setNoteEditVisible(false)
                                }}/>
                                <PrimaryButton style={styles.button} text="Cancel" onPressFunc={() => setNoteEditVisible(false)}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <LineToOpen label="Notes" visible={noteVisible} setVisible={setNoteVisible}/>
                {/*{noteVisible && <NoteInput value={palace.note} onChange={updatePalaceNote}/>}*/}
                {noteVisible &&
                    <View>
                        {palace.note && <Text style={[styles.textAsNote, {height: noteHeight}]}>{palace.note}</Text>}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <View style={styles.moreOptionsForNote}>
                                <PrimaryButton style={styles.moreOptionsForNoteButton} text="^" onPressFunc={() => setNoteHeight(Math.min(noteHeight + ONE_STEP_HEIGHT, MAX_NOTE_HEIGHT))}/>
                                <PrimaryButton style={styles.moreOptionsForNoteButton} text="v" onPressFunc={() => setNoteHeight(Math.max(noteHeight - ONE_STEP_HEIGHT, MIN_NOTE_HEIGHT))}/>
                            </View>
                            <PrimaryButton style={{flex: 1, marginHorizontal: 10, marginVertical: 15}} text="Edit note" onPressFunc={() => setNoteEditVisible(true)}/>
                        </View>
                    </View>
                }
                <SecondaryButton text="Pick palace bacground image from gallery" onPressFunc={handlePickImage}/>
            </ScrollView>
        </View>
    )
}

function SmallButton({onPress}: { onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.smallButton} onPress={onPress}>
            <View style={styles.smallButtonView}>
                {/*<Text>^</Text>*/}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    smallButton: {
        flex: 1,
        padding: 10,
        height: "100%",
    },
    smallButtonView: {
        borderColor: yellowPrimaryDarker,
        borderWidth: 2,
        borderRadius: 14,
        aspectRatio: 1,
        // justifyContent: "center",
        // alignItems: "center",
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
    },
    dropdown: {
        padding: 10,
        elevation: 2,
    },
    roomCardContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: "wrap",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
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
});
