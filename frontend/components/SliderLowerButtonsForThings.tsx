import { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { yellowPrimary } from "../const/Colors"
import { Thing } from "../types/Thing"
import { storage } from "../store/storage"

interface SliderLowerButtonsProps {
    currentItem: Thing
    navigation: any
}

export default function SliderLowerButtonsForThings({ currentItem, navigation }: SliderLowerButtonsProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [items, setItems] = useState<Thing[]>([])
    const [isNext, setIsNext] = useState<boolean>(true)
    const [isPrevious, setIsPrevious] = useState<boolean>(false)

    useEffect(() => {
        const roomThings = storage.getState().things.filter(
            (thing) => thing.room_id === currentItem.room_id
        )
        const thingsWithIds = roomThings.map((thing, index) => ({ id: thing.id, index }))
        // @ts-ignore
        setItems(thingsWithIds)

        const currentThingIndex = thingsWithIds.findIndex((thing) => thing.id === currentItem.id)
        setCurrentIndex(currentThingIndex)
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
            navigation.navigate("ThingDetail", { id: items[newIndex].id })
        }
    }

    const goToNext = () => {
        if (currentIndex !== null && currentIndex < items.length - 1) {
            const newIndex = currentIndex + 1
            setCurrentIndex(newIndex)
            navigation.navigate("ThingDetail", { id: items[newIndex].id })
        }
    }

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
