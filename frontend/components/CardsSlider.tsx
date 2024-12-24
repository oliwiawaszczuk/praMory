import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Animated} from "react-native";
import {Room} from "../types/Room";
import CardCover from "./CardCover";
import {greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";
import {Thing} from "../types/Thing";

export default function CardsSlider({items, whereToGoDetail, navigation}: { items: Room[] | Thing[], whereToGoDetail: "RoomDetail" | "ThingDetail", navigation: any }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [isNext, setIsNext] = useState<boolean>(true)
    const [isPrevious, setIsPrevious] = useState<boolean>(false)

    const roomsWithIds = items.map(item => ({ id: item.id, item }))

    const goToNext = () => {
        if (currentIndex < roomsWithIds.length-1)
            setCurrentIndex(currentIndex+1)
    }

    const goToPrevious = () => {
        if (currentIndex > 0)
            setCurrentIndex(currentIndex-1)
    }

    const currentItem = roomsWithIds[currentIndex].item

    useEffect(() => {
        setIsNext(currentIndex < roomsWithIds.length - 1)
        setIsPrevious(currentIndex > 0)
    }, [currentIndex, items])

    return (
        <View style={styles.sliderContainer}>
            <TouchableOpacity disabled={!isPrevious} activeOpacity={0.7} onPress={goToPrevious} style={[styles.arrowButton, { opacity: isPrevious ? 1 : 0.4 }]}/>

            <View style={styles.roomCardContainer}>
                <CardCover whereToGoDetail={whereToGoDetail} item={currentItem} navigation={navigation}/>
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