import {SafeAreaView} from "react-native-safe-area-context"
import {useRoute} from "@react-navigation/native"
import React from "react"
import {Image, View, StyleSheet, Animated} from "react-native"
import {Text} from "../components/Text/Default"
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function ImageLook() {
    const route = useRoute()
    const {pathToImage} = route.params as { pathToImage: string }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <ImageZoom uri={pathToImage} style={styles.image}/>
                </View>
                <View style={styles.footer}>
                    <Text>Settings</Text>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
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