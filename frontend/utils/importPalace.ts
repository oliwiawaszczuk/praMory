import RNFS from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';
import DocumentPicker from 'react-native-document-picker';
import {storage} from "../store/storage";
import {log} from "expo/build/devtools/logger";
import {Palace} from "../types/Palace";
import {Room} from "../types/Room";
import {Thing} from "../types/Thing";

export const importPalace = async () => {
    const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.zip],
    })

    const uri = result[0].uri
    const fileName = result[0].name

    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`

    try {
        await RNFS.copyFile(uri, destPath)
        console.log("File copy to:", destPath)
    } catch (e) {
        console.error("Error copy zip file", e)
    }

    const extractPath = `${RNFS.DocumentDirectoryPath}/extracted_palace`

    try {
        const extractedPath = await unzip(destPath, extractPath)
        console.log("Extracted path:", extractedPath)

        const files = await RNFS.readDir(extractedPath)
        const jsonFile = files.find(f => f.name.endsWith(".json"))

        if (!jsonFile) throw new Error("json file not found")

        const jsonContent = await RNFS.readFile(jsonFile.path, "utf8")
        const {palace, rooms, things} = JSON.parse(jsonContent)

        const state = storage.getState()
        const palace_id = state.palaces.length > 0 ? Math.max(...state.palaces.map(p => p.id)) + 1 : 1
        palace.id = palace_id
        palace.path_to_image = palace.path_to_image.replace("cache", "files")
        state.addPalace(palace)

        const roomIdMap = new Map<number, number>()
        const thingIdMap = new Map<number, number>()

        let maxRoomId = state.rooms.length > 0 ? Math.max(...state.rooms.map(r => r.id)) + 1 + roomIdMap.size : 0

        // @ts-ignore
        for (let room: Room of rooms) {
            const oldRoomId = room.id
            const newRoomId = ++maxRoomId

            room.palace_id = palace_id
            room.id = newRoomId
            if (room.path_to_image)
                room.path_to_image = room.path_to_image.replace("cache", "files")

            roomIdMap.set(oldRoomId, newRoomId)

            // @ts-ignore
            room.pins = room.pins.map(pin =>
                pin.room_id === oldRoomId ? {...pin, room_id: newRoomId} : pin
            )
            state.addRoom(room)
        }

        let maxThingId = state.things.length > 0 ? Math.max(...state.things.map(t => t.id)) : 0

        // @ts-ignore
        for (let thing: Thing of things) {
            const oldThingId = thing.id
            const newThingId = ++maxThingId
            thing.id = newThingId

            const oldRoomId = thing.room_id
            const newRoomId = roomIdMap.get(oldRoomId)
            thing.room_id = newRoomId
            for (let path_to_images of thing.path_to_images)
                path_to_images.path = path_to_images.path.replace("cache", "files")

            thingIdMap.set(oldThingId, newThingId)

            state.addThing(thing)
        }

        for (let room of rooms) {
            // @ts-ignore
            room.pins = room.pins.map(pin => {
                if (thingIdMap.has(pin.thing_id)) {
                    return {...pin, thing_id: thingIdMap.get(pin.thing_id)}
                }
                return pin
            })

            state.updateRoom(room)
        }

        const imageFiles = files.filter(f => !f.name.endsWith(".json"))

        for (const imageFile of imageFiles) {
            const newPath = `file://${RNFS.DocumentDirectoryPath}/${imageFile.name}`
            await RNFS.copyFile(imageFile.path, newPath)
        }

    } catch (e) {
        console.error("Error importing palace:", e)
    }
}
