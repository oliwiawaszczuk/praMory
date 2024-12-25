import React from "react";
import SecondaryButton from "../components/Buttons/Secondary";
import {launchImageLibrary} from "react-native-image-picker";

export const ImagesSection = ({saveImage}: { saveImage: (imageUri: string) => void }) => {
    const handlePickImages = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 0,  // wybór wielu zdjęć
                includeBase64: false,
            })

            if (result.assets && result.assets.length > 0) {
                const imageUris = result.assets.map((asset) => asset.uri)
                // @ts-ignore
                imageUris.forEach(uri => saveImage(uri))
            }
        } catch (error) {
            console.log("Error picking images", error)
        }
    }

    return (
        <>
            <SecondaryButton text="Pick images from gallery" onPressFunc={handlePickImages}/>
        </>
    )
};
