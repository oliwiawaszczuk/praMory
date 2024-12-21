import { TouchableOpacity, View, Image, StyleSheet, Modal, Animated } from "react-native"
import React, { useRef, useState } from "react"
import { Text } from "./Text/Default"
import { grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker } from "../const/Colors"
import { storage } from "../store/storage"
import { InputText } from "./Input/InputText"
import PrimaryButton from "./Buttons/Primary"
import {Room} from "../types/Room"
import {Loading} from "./Loading";

export default function RoomCardCover({ room, navigation }: {room: Room, navigation: any}) {
    const covers = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
    ]

    const [activeStates, setActiveStates] = useState([false, false, false, false])

    const handlePress = (index: number) => {
        Animated.timing(covers[index], {
            toValue: activeStates[index] ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
             setActiveStates((prevStates) => {
                const newStates = [...prevStates]
                newStates[index] = !activeStates[index];
                return newStates;
            })
        })
    }

    if (!room) return <Loading/>

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Animated.View style={[styles.cover, {width: covers[0].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(0)} activeOpacity={0.8} style={styles.interactiveBar}>
                        {activeStates[0] && <Text style={styles.barText}>{room.name}</Text>}
                        {!activeStates[0] && <Text style={{color: greenPrimaryDarker}}>Name</Text>}
                    </TouchableOpacity>
                </View>

                <View style={styles.wrapper}>
                    <Animated.View style={[styles.cover, {width: covers[1].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(1)} activeOpacity={0.8} style={styles.interactiveBar}>
                        {activeStates[1] && (
                            room.snip ? <Text style={styles.barText}>{room.snip}</Text> : <Text style={{color: yellowPrimary}}>No snip</Text>
                        )}
                        {!activeStates[1] && <Text style={{color: greenPrimaryDarker}}>Snip</Text>}
                    </TouchableOpacity>
                </View>


                <View style={[styles.wrapper, {height: 200}]}>
                    <TouchableOpacity onPress={() => handlePress(2)} activeOpacity={0.8} style={styles.interactiveBar}>
                        {activeStates[2] && (
                            room.path_to_image ?
                            <View style={styles.imageContainer}>
                                <Image source={{uri: room.path_to_image}} style={{width:'100%', height:'100%'}} />
                            </View> : <Text style={{color: yellowPrimary}}>No image</Text>
                        )}
                        {!activeStates[2] && <Text style={{color: greenPrimaryDarker}}>Background Image</Text>}
                    </TouchableOpacity>
                    <Animated.View style={[styles.cover, {width: covers[2].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                </View>

                <View style={styles.wrapper}>
                    <Animated.View style={[styles.cover, {width: covers[3].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(3)} activeOpacity={0.8} style={styles.interactiveBar}>
                        {activeStates[3] && (
                            room.note ? <Text style={styles.textAsNote}>{room.note}</Text> : <Text style={{color: yellowPrimary}}>No notes</Text>
                        )}
                        {!activeStates[3] && <Text style={{color: greenPrimaryDarker}}>Note</Text>}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{margin: 4}} onPress={() => navigation.navigate("RoomDetail", { id: room.id })}>
                    <Text style={{color: greenPrimary, borderColor: greenPrimary, borderWidth: 0.6, borderRadius: 12, paddingHorizontal: 30}}>Go to room</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: greenPrimaryDarker,
        borderRadius: 20,
        paddingVertical: 10,
        marginVertical: 10,
        width: "100%",
    },
    imageContainer: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 10,
        // backgroundColor: greenPrimary,
        margin: 10,
    },
    title: {
        color: yellowPrimary,
        fontSize: 18,
        fontFamily: "LeagueSpartan-Regular",
        paddingBottom: 10,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 300,
        backgroundColor: grayPrimary,
        borderRadius: 10,
        padding: 20,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    wrapper: {
        width: "80%",
        height: 25,
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: yellowPrimaryDarker,
        overflow: "hidden",
        position: "relative",
        borderRadius: 12,
    },
    cover: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: yellowPrimary,
        borderRadius: 12,
    },
    interactiveBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },
    barText: {
        color: yellowPrimary,
        fontWeight: "bold",
    },
    textAsNote: {
        margin: 5,
        padding: 10,
        borderColor: greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
    },
})
