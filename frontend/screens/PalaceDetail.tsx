import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Text} from "../components/Text/Default"
import {Palace} from "../types/Palace"
import {Loading} from "../components/Loading"
import {storage} from "../store/storage"
import PrimaryButton from "../components/Buttons/Primary"
import {launchImageLibrary} from 'react-native-image-picker'
import HorizontalLine from "../components/HorizontalLine";
import {yellowPrimary, yellowPrimaryDarker} from "../const/Colors";

const PALACE_IMAGE_HEIGHT: number = 400
const PALACE_IMAGE_HEIGHT_MIN: number = 100

const { height: screenHeight } = Dimensions.get("window");

export default function PalaceDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)

    const [palace, setPalace] = useState<Palace | null>(null)
    const palaces = storage((state) => state.palaces)
    const updatePalaceImage = storage((state) => state.updatePalaceImage)

    const scrollY = new Animated.Value(0)
    const imageHeight = scrollY.interpolate({
        inputRange: [0, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT, PALACE_IMAGE_HEIGHT_MIN],
        extrapolate: "clamp",
    })

    useEffect(() => {
        const foundPalace = palaces.find((item) => item.id === id)
        setPalace(foundPalace || null)
    }, [id, palaces])

    useEffect(() => {
        if (palace) {
            navigation.setOptions({title: `Palace: ${palace.title}`})
            if (!palaceImage) setPalaceImage(palace.path_to_image)
        }
    }, [palace, navigation])

    if (!palace) return <Loading/>

    const handlePickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('Error: ', response.errorMessage)
                } else if (response.assets && response.assets.length > 0) {
                    const pickedPhoto = response.assets[0]
                    // @ts-ignore
                    setPalaceImage(pickedPhoto.uri)
                    // @ts-ignore
                    updatePalaceImage(palace.id, pickedPhoto.uri)
                }
            }
        )
    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity activeOpacity={0.9} onLongPress={() => navigation.navigate('ImageLook', { pathToImage: palaceImage })}><Animated.Image
                // @ts-ignore
                source={{uri: palaceImage}}
                style={[styles.absImage, {height: imageHeight}]}
                resizeMode="cover"
            /></TouchableOpacity>
            <HorizontalLine color={yellowPrimaryDarker} lineHeight={4}/>
            <ScrollView
                style={styles.scrollView}
                // contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
            >

                <PrimaryButton text="Pick palace bacground image from gallery" onPressFunc={handlePickImage}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    absImage: {
        width: "100%",
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        margin: 10,
    },
    scrollView: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flex: 1,
    },
});
