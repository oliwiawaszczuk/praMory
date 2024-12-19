import { StyleSheet, TouchableOpacity, View } from "react-native";
import {greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker} from "../const/Colors";
import React, {useEffect} from "react";
import { Text } from "./Text/Default";


export default function LineToOpen({ visible, setVisible, label }: { visible: any, setVisible: any, label: string }) {

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.touchable} onPress={() => setVisible(!visible)}>
            <View style={styles.lineToOpen}>
                <View
                    style={[
                        styles.triangle,
                        { transform: [{ rotate: visible ? "180deg" : "0deg" }] },
                    ]}
                ></View>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable: {
        marginBottom: 15,
        alignItems: 'center',
    },
    lineToOpen: {
        flexDirection: "row",
        alignItems: "center",
        height: 20,
        width: "100%",
        backgroundColor: greenPrimaryDarker,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        position: "relative",
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: yellowPrimaryDarker,
        position: "absolute",
        left: 10,
    },
    label: {
        color: yellowPrimaryDarker,
        fontSize: 24,
        position: "absolute",
        top: -16,
        fontFamily: 'RubikPuddles-Regular',
    },
});
