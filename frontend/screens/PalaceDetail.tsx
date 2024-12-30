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
import AddNewRoom from "../components/Room/AddNewRoom"
import SecondaryButton from "../components/Buttons/Secondary"
import LineToOpen from "../components/LineToOpen"
import CardCover from "../components/CardCover"
import NoteInput from "../components/Input/Note"
import {MIN_NOTE_HEIGHT, MAX_NOTE_HEIGHT, ONE_STEP_HEIGHT, PIN_SIZE} from "../const/Const"
import CardsSlider from "../components/CardsSlider";
import RoomCard from "../components/Room/RoomCard";
import Slider from '@react-native-community/slider'
import {ImagePalacePin} from "../types/ImagePin";
import {scaleActualToDisplayed} from "../utils/ScalePoint";
import {pickImage} from "../utils/PickImage";
import NoteInputModal from "../components/Modals/NoteInputModal";
import BackgroundImageView from "../components/BackgroundImageView";
import TaxiDeco from "../components/Decorations/Taxi";
import {usePalaceDetails} from "../hooks/usePalaceDetails";
import {ImageSection} from "../components/ImageSection";
import {SquareBlankButton} from "../components/Buttons/SquareBlankButton";
import {exportPalace} from "../utils/exportPalace";
import OkAndCancelModal from "../components/Modals/OkAndCancelModal";

export default function PalaceDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)
    const [noteVisible, setNoteVisible] = useState<boolean>(false)
    const [isSliderVisible, setIsSliderVisible] = useState<boolean>(false)

    const [isImageStatic, setIsImageStatic] = useState<boolean>(false)
    const [activePin, setActivePin] = useState<ImagePalacePin | null>(null)

    const [roomsVisible, setRoomsVisible] = useState<boolean>(false)
    const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)
    const [noteEditText, setNoteEditText] = useState("")
    const [noteHeight, setNoteHeight] = useState(MIN_NOTE_HEIGHT)

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const {palace, sortedRooms, saveImage} = usePalaceDetails(id)
    const updatePalace = storage(state => state.updatePalace)

    useEffect(() => {
        if (palace) {
            navigation.setOptions({title: `Palace: ${palace.title}`})
            if (!palaceImage) {
                setPalaceImage(palace.path_to_image)
                setNoteEditText(palace.note || "")
            }
        }
    }, [palace, navigation])

    if (!palace) return <Loading/>

    const SaveNote = () => {
        updatePalace({...palace, note: noteEditText})
        setNoteEditVisible(false)
    }

    const SaveImage = (path: string) => {
        saveImage(path)
        setPalaceImage(path)
    }

    return (
        <View style={{flex: 1}}>
            <OkAndCancelModal modalVisible={modalVisible} setModalVisible={setModalVisible} label="Are you sure to export palace?" okFunc={() => exportPalace(palace.id)}/>
            {palaceImage && (
                <BackgroundImageView activePin={activePin} setActivePin={setActivePin} isImageStatic={isImageStatic} setIsImageStatic={setIsImageStatic} pathToImage={palaceImage} navigation={navigation} forWhatPins={palace}/>
            )}
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                {activePin && isImageStatic && (
                    <View>
                        <TouchableOpacity  activeOpacity={0.8} onPress={() => setActivePin(null)} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TaxiDeco howManyLines={4}/>
                        </TouchableOpacity>
                        <CardCover
                            // @ts-ignore
                            item={sortedRooms.find((room) => room.id === activePin.room_id)}
                            whereToGoDetail="RoomDetail"
                            navigation={navigation}
                        />
                    </View>
                )}
                <Text></Text>
                <LineToOpen label={`Rooms   ${sortedRooms.length}`} visible={roomsVisible} setVisible={setRoomsVisible}/>
                {roomsVisible && (
                    <View style={styles.dropdown}>
                        {sortedRooms.length > 0 && (isSliderVisible ?
                            <View style={styles.roomCardContainer}>
                                {sortedRooms.map(room => (
                                    <View key={room.id} style={styles.roomCard}><RoomCard room={room} navigation={navigation}/></View>
                                ))}
                            </View> :
                            <CardsSlider items={sortedRooms} whereToGoDetail="RoomDetail" navigation={navigation}/>
                        )}

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <SquareBlankButton onPress={() => {}}/>
                            <View style={{flex: 6}}>
                                <AddNewRoom palace_id={id}/>
                            </View>
                            <SquareBlankButton onPress={() => setIsSliderVisible(!isSliderVisible)}/>
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
                <ImageSection saveImage={SaveImage}/>
                <SecondaryButton text="Export Palace" onPressFunc={() => setModalVisible(true)} />
            </ScrollView>
            <NoteInputModal modalVisible={noteEditVisible} setModalVisible={setNoteEditVisible} noteEditText={noteEditText} setNoteEditText={setNoteEditText} saveFunc={SaveNote}/>
        </View>
    )
}

const styles = StyleSheet.create({
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
        flexWrap: "wrap",
        justifyContent: 'space-between',
        alignSelf: "flex-start",
    },
    roomCard: {
        width: 110,
        margin: 5,
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
});
