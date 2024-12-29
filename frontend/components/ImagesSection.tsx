import React from "react";
import SecondaryButton from "../components/Buttons/Secondary";
import {launchImageLibrary} from "react-native-image-picker";
import {saveImageToPermanentStorage} from "../utils/saveImageToPermanentStorage";

export const ImagesSection = ({saveImage}: { saveImage: (imageUri: string) => void }) => {
    const handlePickImages = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 0,  // wybór wielu zdjęć
                includeBase64: false,
            })

            if (result.assets && result.assets.length > 0) {
                const imageUris = await Promise.all(result.assets.map(async (asset) => {
                    // @ts-ignore
                    return await saveImageToPermanentStorage(asset.uri)
                }))
                // @ts-ignore
                imageUris.forEach(uri => {
                    saveImage(uri)
                    console.log(uri)
                })
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
