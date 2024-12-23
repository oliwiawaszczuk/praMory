import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {yellowPrimaryDarker} from "../../const/Colors";

export function SquareBlankButton({onPress}: { onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.smallButton} onPress={onPress}>
            <View style={styles.smallButtonView}/>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    smallButton: {
        flex: 1,
        padding: 10,
        height: "100%",
    },
    smallButtonView: {
        borderColor: yellowPrimaryDarker,
        borderWidth: 2,
        borderRadius: 14,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
