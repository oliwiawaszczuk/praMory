import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Animated} from "react-native";
import {Room} from "../types/Room";
import RoomCardCover from "./RoomCardCover";
import {greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";

export default function RoomCardsSlider({rooms, navigation}: { rooms: Room[], navigation: any }) {
    // const [currentRoom, setCurrentRoom] = useState<Room>(rooms[0])
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isNext, setIsNext] = useState<boolean>(true);
    const [isPrevious, setIsPrevious] = useState<boolean>(false);

    const roomsWithIds = rooms.map(room => ({ id: room.id, room }))

    const goToNext = () => {
        if (currentIndex < roomsWithIds.length-1)
            setCurrentIndex(currentIndex+1)
    }

    const goToPrevious = () => {
        if (currentIndex > 0)
            setCurrentIndex(currentIndex-1)
    }

    const currentRoom = roomsWithIds[currentIndex].room

    useEffect(() => {
        setIsNext(currentIndex < roomsWithIds.length - 1)
        setIsPrevious(currentIndex > 0)
    }, [currentIndex, rooms])

    return (
        <View style={styles.sliderContainer}>
            <TouchableOpacity disabled={!isPrevious} activeOpacity={0.7} onPress={goToPrevious} style={[styles.arrowButton, { opacity: isPrevious ? 1 : 0.4 }]}/>

            <View style={styles.roomCardContainer}>
                <RoomCardCover room={currentRoom} navigation={navigation} />
            </View>

            <TouchableOpacity disabled={!isNext} activeOpacity={0.7} onPress={goToNext} style={[styles.arrowButton, { opacity: isNext ? 1 : 0.4 }]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    roomCardContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10,
    },
    arrowButton: {
        padding: 5,
        height: "85%",
        backgroundColor: yellowPrimary,
        borderColor: greenPrimaryDarker,
        borderWidth: 3,
        borderRadius: 50,
    },
    arrowText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
    },
})