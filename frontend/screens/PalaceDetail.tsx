import { View, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import { Text } from "../components/Text/Default"
import { Palace } from "../types/Palace"
import { Loading } from "../components/Loading"
import { storage } from "../store/storage"
import PrimaryButton from "../components/Buttons/Primary"
import { launchImageLibrary } from 'react-native-image-picker'

export default function PalaceDetail({ navigation }: {navigation: any}) {
    const route = useRoute()
    const { id } = route.params as { id: number }

    const [palaceImage, setPalaceImage] = useState<string | null>(null)

    const [palace, setPalace] = useState<Palace | null>(null)
    const palaces = storage((state) => state.palaces)
    const updatePalaceImage = storage((state) => state.updatePalaceImage)

    useEffect(() => {
        const foundPalace = palaces.find((item) => item.id === id)
        setPalace(foundPalace || null)
    }, [id, palaces])

    useEffect(() => {
        if (palace) {
            navigation.setOptions({ title: `Palace: ${palace.title}` })
            if (!palaceImage) setPalaceImage(palace.path_to_image)
        }
    }, [palace, navigation])

    if (!palace) return <Loading />

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
        );
    };

    return (
        <View>
            <Text>Palace ID: {id}</Text>
            <Text>Palace Title: {palace.title}</Text>

            <PrimaryButton text="Wybierz zdjęcie z galerii" onPressFunc={handlePickImage} />
            {palaceImage && <Image source={{ uri: palaceImage }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />}
            <Text>Palace image uri: {palaceImage}</Text>
        </View>
    )
}
