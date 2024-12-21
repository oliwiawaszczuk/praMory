import {TouchableOpacity} from "react-native"
import React from "react"
import {Text} from "../Text/Default"
import {ButtonInterface, styles} from "./ButtonInterface";

export default function SecondaryButton({text, onPressFunc, style, styleText}: ButtonInterface) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, style]}
            onPress={onPressFunc}
            activeOpacity={0.8}
        >
            <Text style={[styles.buttonTextSecondary, styleText]}>{text}</Text>
        </TouchableOpacity>
    );
}
