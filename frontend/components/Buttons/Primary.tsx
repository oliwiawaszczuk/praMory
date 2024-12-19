import {TouchableOpacity} from "react-native"
import React from "react"
import {Text} from "../Text/Default"
import {ButtonInterface, styles} from "./ButtonInterface";

export default function PrimaryButton({text, onPressFunc, style}: ButtonInterface) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, style]}
            onPress={onPressFunc}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonTextPrimary}>{text}</Text>
        </TouchableOpacity>
    );
}
