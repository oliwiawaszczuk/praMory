import {TextInput} from "react-native-paper"
import React from "react"
import {grayPrimaryDarker, greenPrimary} from "../../const/Colors"
import {InputInterface, styles} from "./InputInterface"



export function InputText({label, get, set}: InputInterface) {
    return (
        <TextInput
            style={styles.input}
            activeOutlineColor={greenPrimary}
            mode="outlined"
            label={label}
            value={get}
            contentStyle={styles.inputText}
            onChangeText={set}
        />
    );
}