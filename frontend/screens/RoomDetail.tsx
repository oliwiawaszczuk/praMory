import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Loading} from "../components/Loading"
import PrimaryButton from "../components/Buttons/Primary"
import {greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker} from "../const/Colors";
import LineToOpen from "../components/LineToOpen";
import {ImagePalacePin} from "../types/ImagePin";
import BackgroundImageView from "../components/BackgroundImageView";
import {useRoomDetails} from "../hooks/useRoomDetails";
import {ImageSection} from "../components/ImageSection";
import AddNewThing from "../components/AddNewThing";
import ThingCard from "../components/ThingCard";
import SliderLowerButtonsForRooms from "../components/SliderLowerButtonsForRooms";
import EditNameSnipNote from "../components/EditNameSnipNote";

export default function RoomDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [isImageStatic, setIsImageStatic] = useState<boolean>(false)
    const [activePin, setActivePin] = useState<ImagePalacePin | null>(null)

    const [thingsVisible, setThingsVisible] = useState<boolean>(false)
    const [editVisible, setEditVisible] = useState<boolean>(false)

    const {
        room,
        things,
        pathToImage,
        saveName,
        saveSnip,
        saveNote,
        saveImage,
    } = useRoomDetails(id)

    if (room) navigation.setOptions({title: `Room: ${room.name}`})
    else return <Loading/>

    const handleLinkRoomToImage = () => {
        navigation.navigate("LinkRoomPinToImage", {room_id: id})
    }

    return (
        <View style={{flex: 1, position: "relative"}}>
            <SliderLowerButtonsForRooms currentItem={room} navigation={navigation}/>
            {pathToImage && (
                <BackgroundImageView isImageStatic={isImageStatic} setIsImageStatic={setIsImageStatic} pathToImage={pathToImage} navigation={navigation} activePin={activePin} setActivePin={setActivePin} forWhatPins={room}/>
            )}
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
                <LineToOpen label="Things" visible={thingsVisible} setVisible={setThingsVisible}/>
                {thingsVisible && (<>
                    <View style={styles.thingCardContainer}>
                        {things.map((thing) =>
                            <View key={thing.id}>
                                <ThingCard thing={thing} navigation={navigation}/>
                            </View>
                        )}
                    </View>
                    <AddNewThing room_id={room.id}/>
                </>)}

                <LineToOpen label="Edit" visible={editVisible} setVisible={setEditVisible}/>
                {editVisible && (
                    <View>
                        <EditNameSnipNote name={room.name} snip={room.snip} note={room.note} saveName={saveName} saveSnip={saveSnip} saveNote={saveNote}/>

                        <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkRoomToImage}/>
                        <ImageSection saveImage={saveImage}/>
                    </View>
                )}
            </ScrollView>
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
    thingCardContainer: {
        flexDirection: 'row',
        // flex: 1,
        flexWrap: "wrap",
        justifyContent: 'space-between',
        // alignItems: 'flex-start',
    },
});
