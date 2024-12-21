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
import {pickImage} from "../utils/PickImage";
import NoteInputModal from "../components/Modals/NoteInputModal";
import TextInputModal from "../components/Modals/TextInputModal";

const PALACE_IMAGE_HEIGHT: number = 400
const PALACE_IMAGE_HEIGHT_MIN: number = 100

const {height: screenHeight} = Dimensions.get("window");

export default function RoomDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [pathToImage, setPathToImage] = useState<string | null>(null)

    const [room, setRoom] = useState<Room | null>(null)
    const [thingsVisible, setThingsVisible] = useState<boolean>(false)
    const [editVisible, setEditVisible] = useState<boolean>(false)

    const [isNameOpen, setIsNameOpen] = useState<boolean>(true)
    const [nameEditVisible, setNameEditVisible] = useState<boolean>(false)
    const [nameEditText, setNameEditText] = useState("")

    const [isSnipOpen, setIsSnipOpen] = useState<boolean>(true)
    const [snipEditVisible, setSnipEditVisible] = useState<boolean>(false)
    const [snipEditText, setSnipEditText] = useState("")

    const [isNoteOpen, setIsNoteOpen] = useState<boolean>(true)
    const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)
    const [noteEditText, setNoteEditText] = useState("")

    const rooms = storage(state => state.rooms)
    const updateRoomImage = storage(state => state.updateRoomImage)
    const updateRoomNote = storage(state => state.updateRoomNote)
    const updateRoomName = storage(state => state.updateRoomName)
    const updateRoomSnip = storage(state => state.updateRoomSnip)

    // To image display
    const scrollY = new Animated.Value(0)
    const imageHeight = scrollY.interpolate({
        inputRange: [0, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT, PALACE_IMAGE_HEIGHT_MIN],
        extrapolate: "clamp",
    })

    // Loading palace details
    useEffect(() => {
        const foundRoom = rooms.find((room) => room.id === id)
        setRoom(foundRoom || null)
    }, [id, rooms])

    useEffect(() => {
        if (room) {
            navigation.setOptions({title: `Room: ${room.name}`})
            if (room.path_to_image) setPathToImage(room.path_to_image)
            if (room.name) setNameEditText(room.name)
            if (room.snip) setSnipEditText(room.snip)
            if (room.note) setNoteEditText(room.note)
        }
    }, [room, navigation])

    if (!room) return <Loading/>

    // const filteredRooms = rooms.filter((room) => room.palace_id === id)

    const handleLinkRoomToImage = () => {
        navigation.navigate("LinkPinToImage", {room_id: id})
    }

    const handlePickImage = async () => {
        try {
            const imageUri = await pickImage()
            // @ts-ignore
            setPathToImage(imageUri)
            // @ts-ignore
            updateRoomImage(room.id || 0, imageUri)
        } catch (error) {
            console.log("Error pick image", error)
        }
    }
    const SaveName = () => {
        updateRoomName(room.id, nameEditText)
        setNameEditVisible(false)
    }

    const SaveSnip = () => {
        updateRoomSnip(room.id, snipEditText)
        setSnipEditVisible(false)
    }

    const SaveNote = () => {
        updateRoomNote(room.id, noteEditText)
        setNoteEditVisible(false)
    }

    return (
        <View style={{flex: 1}}>
            {pathToImage && (
                <>
                    <TouchableOpacity activeOpacity={0.9} onLongPress={() => navigation.navigate('ImageLook', {pathToImage: pathToImage})}>
                        <Animated.Image
                            // @ts-ignore
                            source={{uri: pathToImage}}
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

                <LineToOpen label="Edit" visible={editVisible} setVisible={setEditVisible}/>
                {editVisible && (
                    <View>
                        <LabelView labelText="Name" buttonText="Edit name" onPressFunc={() => setNameEditVisible(true)} onClick={() => setIsNameOpen(!isNameOpen)}/>
                        <TextInputModal modalVisible={nameEditVisible} setModalVisible={setNameEditVisible} noteEditText={nameEditText} setNoteEditText={setNameEditText} saveFunc={SaveName}/>
                        {isNameOpen && room.name && (
                            <Text style={styles.textAsNote}>{room.name}</Text>
                        )}

                        <LabelView labelText="Snip" buttonText="Edit snip" onPressFunc={() => setSnipEditVisible(true)} onClick={() => setIsSnipOpen(!isSnipOpen)}/>
                        <TextInputModal modalVisible={snipEditVisible} setModalVisible={setSnipEditVisible} noteEditText={snipEditText} setNoteEditText={setSnipEditText} saveFunc={SaveSnip}/>
                        {isSnipOpen && room.snip && (
                            <Text style={styles.textAsNote}>{room.snip}</Text>
                        )}

                        <LabelView labelText="Note" buttonText="Edit note" onPressFunc={() => setNoteEditVisible(true)} onClick={() => setIsNoteOpen(!isNoteOpen)}/>
                        <NoteInputModal modalVisible={noteEditVisible} setModalVisible={setNoteEditVisible} noteEditText={noteEditText} setNoteEditText={setNoteEditText} saveFunc={SaveNote}/>
                        {isNoteOpen && room.note && (
                            <Text style={[styles.textAsNote, {height: 120}]}>{room.note}</Text>
                        )}

                        <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkRoomToImage}/>
                        <SecondaryButton text="Pick room bacground image from gallery" onPressFunc={handlePickImage}/>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const LabelView = ({labelText, buttonText, onPressFunc, onClick}: {labelText: string, buttonText: string, onPressFunc: any, onClick: any}) => {
    return (
        <View style={styles.labelView}>
            <View style={styles.labelClickAndText}>
                <TouchableOpacity activeOpacity={0.7} style={styles.clickToHide} onPress={onClick}/>
                <Text style={styles.labelText}>{labelText}</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flex: 2}}>
                <SecondaryButton styleText={styles.buttonText} text={buttonText} onPressFunc={onPressFunc}/>
            </View>
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
    textAsNote: {
        margin: 5,
        padding: 10,
        borderColor: greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
    },
    labelView: {
        flexDirection: "row",
        marginHorizontal: 10,
    },
    labelText: {
        marginLeft: 10,
        fontSize: 26,
        fontFamily: "Mynerve-Regular",
        color: yellowPrimary,
    },
    buttonText: {
        fontSize: 14,
        paddingVertical: 0,
    },
    clickToHide: {
        height: "100%",
        width: 20,
        backgroundColor: greenPrimary,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: greenPrimaryDarker,
        borderWidth: 2,
    },
    labelClickAndText: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
});
