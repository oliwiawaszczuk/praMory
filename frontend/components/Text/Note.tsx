import React, {ChangeEvent} from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {grayPrimary, grayPrimaryBrighter, greenPrimary, yellowPrimary, yellowPrimaryDarker} from "../../const/Colors";

export default function NoteInput({startValue, onChange}: {startValue: string, onChange: any}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={startValue}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Type notes..."
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="rgba(255, 215, 0, 0.7)"
                textAlignVertical="top"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    input: {
        width: "100%",
        backgroundColor: grayPrimaryBrighter,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        lineHeight: 24,
        color: yellowPrimary,
        borderColor: greenPrimary,
        borderWidth: 1,
        minHeight: 150,
    },
});
