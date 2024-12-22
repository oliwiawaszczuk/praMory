import {StyleSheet, TouchableOpacity, View} from "react-native";
import {yellowPrimaryDarker} from "../../const/Colors";
import React from "react";

export default function TaxiDeco({howManyLines}: {howManyLines: number}) {

    return (
        <>
            {[...Array(howManyLines)].map((_, index) => (
                <View key={index} style={[styles.line, {width: index % 2 === 0 ? '100%' : '98%'}]}></View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        borderTopWidth: 4,
        borderStyle: "dotted",
        borderTopColor: yellowPrimaryDarker,
    },
})