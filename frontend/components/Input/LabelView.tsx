import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import SecondaryButton from "../Buttons/Secondary";
import {Text} from "../Text/Default";
import {greenPrimary, greenPrimaryDarker, yellowPrimary} from "../../const/Colors";

export const LabelView = ({labelText, buttonText, onPressFunc, onClick}: {labelText: string, buttonText: string, onPressFunc: any, onClick: any}) => {
    return (
        <View style={styles.labelView}>
            <View style={styles.labelClickAndText}>
                <TouchableOpacity activeOpacity={0.7} style={styles.clickToHide} onPress={onClick}/>
                <Text style={styles.labelText}>{labelText}</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flex: 2}}>
                <SecondaryButton styleText={styles.buttonText} text={buttonText} onPressFunc={onPressFunc}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    labelView: {
        flexDirection: "row",
        marginHorizontal: 10,
    },
    labelText: {
        marginLeft: 10,
        fontSize: 26,
        fontFamily: "Mynerve-Regular",
        color: yellowPrimary,
    },
    buttonText: {
        fontSize: 14,
        paddingVertical: 0,
    },
    clickToHide: {
        height: "100%",
        width: 20,
        backgroundColor: greenPrimary,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: greenPrimaryDarker,
        borderWidth: 2,
    },
    labelClickAndText: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
})
