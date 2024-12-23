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
import NoteInput from "../components/Input/Note";
import {Room} from "../types/Room";
import {pickImage} from "../utils/PickImage";
import NoteInputModal from "../components/Modals/NoteInputModal";
import TextInputModal from "../components/Modals/TextInputModal";
import {ImagePalacePin} from "../types/ImagePin";
import BackgroundImageView from "../components/BackgroundImageView";
import {useRoomDetails} from "../hooks/useRoomDetails";
import {ImageSection} from "../components/ImageSection";
import {useThingDetails} from "../hooks/useThingDetails";
import SliderLowerButtonsForThings from "../components/SliderLowerButtonsForThings";

export default function ThingDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const {thing} = useThingDetails(id)

    // const [isImageStatic, setIsImageStatic] = useState<boolean>(false)
    // const [activePin, setActivePin] = useState<ImagePalacePin | null>(null)
    //
    // const [thingsVisible, setThingsVisible] = useState<boolean>(false)
    // const [editVisible, setEditVisible] = useState<boolean>(false)
    //
    // const [isNameOpen, setIsNameOpen] = useState<boolean>(true)
    // const [nameEditVisible, setNameEditVisible] = useState<boolean>(false)
    //
    // const [isSnipOpen, setIsSnipOpen] = useState<boolean>(true)
    // const [snipEditVisible, setSnipEditVisible] = useState<boolean>(false)
    //
    // const [isNoteOpen, setIsNoteOpen] = useState<boolean>(true)
    // const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)

    if (thing) navigation.setOptions({title: `Thing: ${thing.name}`})
    else return <Loading/>

    // const handleLinkRoomToImage = () => {
    //     navigation.navigate("LinkPinToImage", {room_id: id})
    // }

    return (
        <View style={{flex: 1}}>
            <SliderLowerButtonsForThings currentItem={thing} navigation={navigation}/>
            <Text>{thing.id}</Text>
            {/*{pathToImage && (*/}
            {/*    <BackgroundImageView isImageStatic={isImageStatic} setIsImageStatic={setIsImageStatic} pathToImage={pathToImage} navigation={navigation} activePin={activePin} setActivePin={setActivePin} forWhatPins={room}/>*/}
            {/*)}*/}
            {/*<ScrollView style={styles.scrollView} nestedScrollEnabled={true}>*/}
            {/*    <LineToOpen label="Things" visible={thingsVisible} setVisible={setThingsVisible}/>*/}
            {/*    {thingsVisible && (*/}
            {/*        <View>*/}
            {/*            <Text>things!</Text>*/}
            {/*        </View>*/}
            {/*    )}*/}

            {/*    <LineToOpen label="Edit" visible={editVisible} setVisible={setEditVisible}/>*/}
            {/*    {editVisible && (*/}
            {/*        <View>*/}
            {/*            <LabelView labelText="Name" buttonText="Edit name" onPressFunc={() => setNameEditVisible(true)} onClick={() => setIsNameOpen(!isNameOpen)}/>*/}
            {/*            <TextInputModal modalVisible={nameEditVisible} setModalVisible={setNameEditVisible} noteEditText={nameEditText} setNoteEditText={setNameEditText} saveFunc={() => { setNameEditVisible(false); saveName() }}/>*/}
            {/*            {isNameOpen && room.name && <Text style={styles.textAsNote}>{room.name}</Text> }*/}

            {/*            <LabelView labelText="Snip" buttonText="Edit snip" onPressFunc={() => setSnipEditVisible(true)} onClick={() => setIsSnipOpen(!isSnipOpen)}/>*/}
            {/*            <TextInputModal modalVisible={snipEditVisible} setModalVisible={setSnipEditVisible} noteEditText={snipEditText} setNoteEditText={setSnipEditText} saveFunc={() => { setSnipEditVisible(false); saveSnip() }}/>*/}
            {/*            {isSnipOpen && room.snip && <Text style={styles.textAsNote}>{room.snip}</Text> }*/}

            {/*            <LabelView labelText="Note" buttonText="Edit note" onPressFunc={() => setNoteEditVisible(true)} onClick={() => setIsNoteOpen(!isNoteOpen)}/>*/}
            {/*            <NoteInputModal modalVisible={noteEditVisible} setModalVisible={setNoteEditVisible} noteEditText={noteEditText} setNoteEditText={setNoteEditText} saveFunc={() => { setNoteEditVisible(false); saveNote() }}/>*/}
            {/*            {isNoteOpen && room.note && (*/}
            {/*                <ScrollView style={[styles.scrollViewForNote, {height: 100}]} nestedScrollEnabled={true}>*/}
            {/*                    <Text style={styles.textAsNote}>{room.note}</Text>*/}
            {/*                </ScrollView>*/}
            {/*            )}*/}

            {/*            <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkRoomToImage}/>*/}
            {/*            <ImageSection saveImage={saveImage}/>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*</ScrollView>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flex: 1,
    },
    scrollViewForNote: {
        borderColor: greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
    },
    textAsNote: {
        margin: 5,
        padding: 10,
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
