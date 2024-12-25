import React, {useEffect, useState} from "react";
import {Button, TextInput, FlatList, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "../components/Text/Default"
import {greenPrimary, yellowPrimary} from "../const/Colors";

const size: number = 50
const length: number = 48

export default function SettingsScreen() {
    const [boolArray, setBoolArray] = useState(Array.from({ length }, () => false))
    const [clicked, setClicked] = useState<number>(0)

    const toggleValue = (index: number) => {
        const updatedArray = [...boolArray]
        updatedArray[index] = !updatedArray[index]
        setBoolArray(updatedArray)
        setClicked(clicked+1)
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.itemContainer}>
                {boolArray.map((item, index) =>
                    <TouchableOpacity onPress={() => toggleValue(index)} key={index} style={[styles.itemWrapper, item ? styles.trueItem : styles.falseItem]}/>
                )}
            </View>
            <Text style={styles.text}>{clicked}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: size,
        height: size,
        margin: 2,
    },
    trueItem: {
        borderWidth: 3,
        borderColor: greenPrimary,
        backgroundColor: yellowPrimary,
    },
    falseItem: {
        borderWidth: 2,
        borderColor: yellowPrimary,
        backgroundColor: greenPrimary,
    },
    itemContainer: {
        margin: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    text: {
        paddingHorizontal: "47%"
    },
})