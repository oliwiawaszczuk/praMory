import {TouchableOpacity, View, Image, StyleSheet} from "react-native";
import React from "react";
import {Palace} from "../types/Palace";
import {Text} from "./Text/Default";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";

export default function PalaceCard({palace, onclick}: { palace: Palace, onclick: () => void }) {
    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onclick}>
            <View style={styles.imageContainer}>
                {/*<Image*/}
                {/*    source={"../"}*/}
                {/*    style={styles.image}*/}
                {/*    resizeMode="cover"*/}
                {/*/>*/}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{palace.id} - {palace.title}</Text>
            </View>

            <View style={styles.iconContainer}>
                <View style={styles.circleIcon}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: greenPrimaryDarker,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
        position: 'relative',
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: greenPrimary,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        color: yellowPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    circleIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.3,
        borderColor: greenPrimary,
        backgroundColor: grayPrimary,
    },
})