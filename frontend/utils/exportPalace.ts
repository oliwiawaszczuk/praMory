import {storage} from "../store/storage";
import RNFS from 'react-native-fs';
import { zip } from 'react-native-zip-archive';

export const saveAndShareZip = async (zipFilePath: string, fileName: string) => {
    const downloadDirectory = `${RNFS.ExternalStorageDirectoryPath}/Download/`
    const newZipPath = `${downloadDirectory}${fileName}.zip`

    try {
        await RNFS.copyFile(zipFilePath, newZipPath)
        console.log('File copied to:', newZipPath)
    } catch (error) {
        console.error('Error saving or sharing file:', error)
    }
}

export const exportPalace = async (palace_id: number) => {
    const state = storage.getState()
    const storage_palaces = state.palaces
    const storage_rooms = state.rooms
    const storage_things = state.things

    const palace = storage_palaces.find((palace) => palace.id === palace_id)
    if (!palace) return null

    const rooms = storage_rooms.filter(room => room.palace_id === palace_id)
    const rooms_id = rooms?.map((room) => room.id)
    const things = storage_things.filter((thing) => rooms_id?.includes(thing.room_id))

    const allThingPaths = things.map(thing => thing.path_to_images).flat().map((image) => image?.path)
    const allRoomPaths = rooms?.map(room => room.path_to_image)
    const allPaths = [...allThingPaths, ...allRoomPaths, palace?.path_to_image]

    const json = JSON.stringify(
        {
            palace: palace,
            rooms: rooms,
            things: things,
        },null, 2
    )

    const fileName = `palace_${palace_id}`

    const path = `${RNFS.DocumentDirectoryPath}/${fileName}.json`
    try {
        await RNFS.writeFile(path, json, 'utf8')
        console.log("Udalo się zapisać plik:", path)

        const imagePaths = await Promise.all(allPaths.map(async (imagePath) => {
            if (imagePath) {
                const newPath = `${RNFS.DocumentDirectoryPath}/${imagePath.split('/').pop()}`
                await RNFS.copyFile(imagePath, newPath)
                return newPath
            }
            return null
        }))

        const zipPath = `${RNFS.DocumentDirectoryPath}/palace_${palace_id}.zip`
        const filesToZip = [path, ...imagePaths.filter(Boolean)]


        // @ts-ignore
        const zipResult = await zip(filesToZip, zipPath)
        console.log("ZIP utworzony:", zipResult)
        await saveAndShareZip(zipResult, fileName)

    } catch (e) {
        console.log("ERROR:", e)
    }
}