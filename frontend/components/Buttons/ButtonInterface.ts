import {StyleSheet, TextProps} from "react-native";
import {black, grayPrimary, yellowPrimary, yellowPrimaryDarker} from "../../const/Colors";
import {StyleProp, ViewStyle} from "react-native";
import {rgbaColor} from "react-native-reanimated/lib/typescript/Colors";

export interface ButtonInterface {
    text: string,
    onPressFunc: any,
    style?: StyleProp<ViewStyle>;
}

export interface ButtonIconInterface extends ButtonInterface {
    iconName: string,
}

export const styles = StyleSheet.create({
    button: {
        // flexGrow: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        // marginHorizontal: 10,
        borderColor: grayPrimary,
        borderWidth: 2,
    },
    buttonPrimary: {
        backgroundColor: yellowPrimary,
        borderColor: yellowPrimaryDarker,
    },
    buttonTextPrimary: {
        color: black,
        fontSize: 18,
        fontFamily: "FunnelDisplay-Regular",
    },
    buttonSecondary: {
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: yellowPrimaryDarker,
        borderWidth: 1,
    },
    buttonTextSecondary: {
        color: yellowPrimary,
        fontSize: 16,
        fontFamily: "Faustina-Regular",
    },
    // buttonThird: {
    //     backgroundColor: "#fff",
    //     marginVertical: 5,
    //     borderWidth: 0,
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 6,
    //     elevation: 3,
    // },
    // buttonTextThird: {
    //     width: "100%",
    //     color: grayPrimary,
    //     justifyContent: "flex-start",
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },
    // buttonFourth: {
    //     backgroundColor: "#fff",
    //     borderWidth: 1,
    //     borderColor: defaultIconColor,
    //     paddingVertical: 15,
    // },
    // buttonTextFourth: {
    //     color: primary,
    //     fontWeight: "bold",
    //     justifyContent: "center",
    //     fontSize: 16,
    // },
});