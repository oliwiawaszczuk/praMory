import React from "react";
import BackgroundImageView from "../components/BackgroundImageView";
import SecondaryButton from "../components/Buttons/Secondary";
import {pickImage} from "../utils/PickImage";
import RNFS from "react-native-fs";
import {saveImageToPermanentStorage} from "../utils/saveImageToPermanentStorage";

export const ImageSection = ({saveImage}: {saveImage: (imageUri: string) => void }) => {
    const handlePickImage = async () => {
        try {
            const imageUri = await pickImage()
            // @ts-ignore
            const permanentUri = await saveImageToPermanentStorage(imageUri)
            // @ts-ignore
            saveImage(permanentUri)
        } catch (error) {
            console.log("Error pick image", error)
        }
    }

    return (
        <>
            <SecondaryButton text="Pick image from gallery" onPressFunc={handlePickImage} />
        </>
    )
}
