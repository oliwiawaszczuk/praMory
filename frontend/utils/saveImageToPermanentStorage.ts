import RNFS from "react-native-fs";

export const saveImageToPermanentStorage = async (tempUri: string) => {
    const fileName = tempUri.split('/').pop()
    const permanentUri = `file://${RNFS.DocumentDirectoryPath}/${fileName}`
    await RNFS.copyFile(tempUri, permanentUri)
    return permanentUri
}
