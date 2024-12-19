import {SafeAreaView} from "react-native-safe-area-context"
import {useRoute} from "@react-navigation/native"
import React from "react"
import {Image, View, StyleSheet, Animated} from "react-native"
import {Text} from "../components/Text/Default"
import {PinchGestureHandler} from "react-native-gesture-handler";

export default function ImageLook() {
    const route = useRoute()
    const {pathToImage} = route.params as { pathToImage: string }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: pathToImage}}
                    style={ styles.image }
                    resizeMode="contain"
                />
            </View>
            <View style={styles.footer}>
                <Text>Settings</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    image: {
        width: '100%',
        height: '100%',
    },
    footer: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
})