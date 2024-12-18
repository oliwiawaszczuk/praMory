import {TouchableOpacity} from "react-native"
import React from "react"
import {Text} from "../Text/Default"
import {ButtonInterface, styles} from "./ButtonInterface";

export default function PrimaryButton({text, onPressFunc}: ButtonInterface) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={onPressFunc}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonTextPrimary}>{text}</Text>
        </TouchableOpacity>
    );
}
