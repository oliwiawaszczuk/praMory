import {StyleSheet} from "react-native";
import {
    grayPrimaryBrighter,
    grayPrimaryDarker,
    greenPrimary,
    yellowPrimary,
    yellowPrimaryDarker
} from "../../const/Colors";

export interface InputInterface {
    label: string,
    get: string,
    set: (text: string) => void
}


export const styles = StyleSheet.create({
    input: {
        backgroundColor: grayPrimaryBrighter,
        borderRadius: 8,
        marginBottom: 16,
    },
    inputText: {
        color: yellowPrimary,
        fontSize: 14,
        paddingHorizontal: 12,
    },
});