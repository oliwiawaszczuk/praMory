import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { yellowPrimary } from "../const/Colors";
import { Room } from "../types/Room";
import { storage } from "../store/storage";

interface SliderLowerButtonsProps {
    currentItem: Room
    navigation: any
}

export default function SliderLowerButtonsForRooms({ currentItem, navigation }: SliderLowerButtonsProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [items, setItems] = useState<Room[]>([])
    const [isNext, setIsNext] = useState<boolean>(true)
    const [isPrevious, setIsPrevious] = useState<boolean>(false)

    useEffect(() => {
        const palaceRooms = storage.getState().rooms.filter(
            (room) => room.palace_id === currentItem.palace_id
        )

        const sortedRooms = palaceRooms.sort((a, b) => a.name.localeCompare(b.name))

        const roomsWithIds = sortedRooms.map((room, index) => ({ id: room.id, index }))
        // @ts-ignore
        setItems(roomsWithIds)

        const currentRoomIndex = roomsWithIds.findIndex((room) => room.id === currentItem.id)
        setCurrentIndex(currentRoomIndex)
    }, [currentItem])

    useEffect(() => {
        if (items.length > 0 && currentIndex !== null) {
            setIsPrevious(currentIndex > 0)
            setIsNext(currentIndex < items.length - 1)
        }
    }, [currentIndex, items])

    const goToPrev = () => {
        if (currentIndex !== null && currentIndex > 0) {
            const newIndex = currentIndex - 1
            setCurrentIndex(newIndex)
            navigation.navigate("RoomDetail", { id: items[newIndex].id })
        }
    };

    const goToNext = () => {
        if (currentIndex !== null && currentIndex < items.length - 1) {
            const newIndex = currentIndex + 1
            setCurrentIndex(newIndex)
            navigation.navigate("RoomDetail", { id: items[newIndex].id })
        }
    };

    if (items.length === 0 || currentIndex === null) return null

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={goToPrev}
                style={[styles.button, !isPrevious && styles.disabledButton]}
                disabled={!isPrevious}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={goToNext}
                style={[styles.button, !isNext && styles.disabledButton]}
                disabled={!isNext}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 25,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        zIndex: 9999,
    },
    button: {
        flex: 1,
        backgroundColor: yellowPrimary,
        opacity: 1,
        margin: 4,
        borderRadius: 10,
    },
    disabledButton: {
        opacity: 0.5,
    },
})
