import {storage} from "../store/storage";
import {Room} from "../types/Room";
import {useEffect, useState} from "react";

export function useRoomDetails(room_id: number) {
    const [room, setRoom] = useState<Room | null>(null)
    const [pathToImage, setPathToImage] = useState<string | null>(null)
    const [nameEditText, setNameEditText] = useState("")
    const [snipEditText, setSnipEditText] = useState("")
    const [noteEditText, setNoteEditText] = useState("")

    const storage_rooms = storage(state => state.rooms)
    const storage_things = storage(state => state.things)

    const updateRoom = storage(state => state.updateRoom)

    useEffect(() => {
        const foundRoom = storage_rooms.find((room) => room.id === room_id)
        setRoom(foundRoom || null)
    }, [room_id, storage_rooms])

    useEffect(() => {
        if (room) {
            if (room.path_to_image) setPathToImage(room.path_to_image)
            if (room.name) setNameEditText(room.name)
            if (room.snip) setSnipEditText(room.snip)
            if (room.note) setNoteEditText(room.note)
        }
    }, [room])

    // if (!room) return null

    const things = storage_things.filter((thing) => thing.room_id === room_id)

    const saveName = () => { updateRoom({...room, name: nameEditText} as Room) }

    const saveSnip = () => { updateRoom({...room, snip: snipEditText} as Room) }

    const saveNote = () => { updateRoom({...room, note: noteEditText} as Room) }

    const saveImage = (imageUri: string) => {
        if (room) {
            setPathToImage(imageUri)
            updateRoom({...room, path_to_image: imageUri})
        }
    }

    return {
        room,
        storage_rooms,
        things,
        pathToImage,
        nameEditText,
        snipEditText,
        noteEditText,
        setNameEditText,
        setSnipEditText,
        setNoteEditText,
        saveName,
        saveSnip,
        saveNote,
        saveImage,
    }
}