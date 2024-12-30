import {TouchableOpacity, View, Image, StyleSheet, Modal, Animated, ScrollView} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import { Text } from "./Text/Default"
import { grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker } from "../const/Colors"
import {Room} from "../types/Room"
import {Loading} from "./Loading";
import {Thing} from "../types/Thing";

export default function CardCover({ item, navigation, whereToGoDetail }: {item: Room | Thing | null, navigation: any, whereToGoDetail: "RoomDetail" | "ThingDetail"}) {
    const [image, setImage] = useState<string | null>(null)

    const covers = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
    ]

    const [activeStates, setActiveStates] = useState([false, false, false, false])

    useEffect(() => {
        setImage(null)
        // @ts-ignore
        if (whereToGoDetail === "ThingDetail" && item?.path_to_images && item?.path_to_images.length > 0) setImage(item?.path_to_images[0].path)
        // @ts-ignore
        if (whereToGoDetail === "RoomDetail" && item?.path_to_image) setImage(item?.path_to_image)
    }, [item])

    const handlePress = (index: number) => {
        Animated.timing(covers[index], {
            toValue: activeStates[index] ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
             setActiveStates((prevStates) => {
                const newStates = [...prevStates]
                newStates[index] = !activeStates[index]
                return newStates
            })
        })
    }

    if (!item) return <Loading/>

    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.wrapper, {minHeight: activeStates[0] ? 0 : 25}]}>
                    <Animated.View style={[styles.cover, {width: covers[0].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(0)} activeOpacity={0.8} style={activeStates[0] ? styles.interactiveBar : styles.interactiveBarClose}>
                        {activeStates[0] && <Text style={styles.barText}>{item.name}</Text>}
                        {!activeStates[0] && <Text style={{color: greenPrimaryDarker}}>Name</Text>}
                    </TouchableOpacity>
                </View>

                <View style={[styles.wrapper, {minHeight: activeStates[1] ? 0 : 25}]}>
                    <Animated.View style={[styles.cover, {width: covers[1].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(1)} activeOpacity={0.8} style={activeStates[1] ? styles.interactiveBar : styles.interactiveBarClose}>
                        {activeStates[1] && (
                            item.snip ? <Text style={styles.barText}>{item.snip}</Text> : <Text style={{color: yellowPrimary}}>No snip</Text>
                        )}
                        {!activeStates[1] && <Text style={{color: greenPrimaryDarker}}>Snip</Text>}
                    </TouchableOpacity>
                </View>


                <View style={[styles.wrapper, activeStates[2] && image ? {height: 200} : {height: 80}]}>
                    <TouchableOpacity onPress={() => handlePress(2)} activeOpacity={0.8} style={styles.interactiveBar}>
                        {activeStates[2] && (
                            image ?
                            <View style={styles.imageContainer}>
                                <Image source={{uri: image}} style={{width:'100%', height:'100%'}} />
                            </View> : <Text style={{color: yellowPrimary}}>No image</Text>
                        )}
                        {!activeStates[2] && <Text style={{color: greenPrimaryDarker}}>Background Image</Text>}
                    </TouchableOpacity>
                    <Animated.View style={[styles.cover, {width: covers[2].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                </View>

                <View style={[styles.wrapper, {minHeight: activeStates[3] ? 0 : 25}]}>
                    <Animated.View style={[styles.cover, {width: covers[3].interpolate({inputRange: [0, 1], outputRange: ["10%", "100%"],}),},]} />
                    <TouchableOpacity onPress={() => handlePress(3)} activeOpacity={0.8} style={activeStates[3] ? styles.interactiveBar : styles.interactiveBarClose}>
                        {activeStates[3] && (
                            item.note ?
                                <ScrollView style={styles.textAsNote} nestedScrollEnabled={true}>
                                    <Text style={[styles.barText, {textAlign: "left"}]}>{item.note}</Text>
                                </ScrollView> :
                                <Text style={{color: yellowPrimary}}>No notes</Text>
                        )}
                        {!activeStates[3] && <Text style={{color: greenPrimaryDarker, flex: 1}}>Note</Text>}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{margin: 4}} onPress={() => navigation.navigate(whereToGoDetail, { id: item.id })}>
                    <Text style={{color: greenPrimary, borderColor: greenPrimary, borderWidth: 0.6, borderRadius: 12, paddingHorizontal: 30}}>Go to {whereToGoDetail === "RoomDetail" ? "room" : "thing"}</Text>
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
        // minHeight: 25,
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
        flex: 1,
        // maxHeight: 200,
        zIndex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    interactiveBarClose: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    barText: {
        color: yellowPrimary,
        fontWeight: "bold",
        flexWrap: "wrap",
        textAlign: "center",
        paddingHorizontal: 30,
    },
    textAsNote: {
        // margin: 5,
    },
})
