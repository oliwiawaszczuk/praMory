import {storage} from "../store/storage";
import {Room} from "../types/Room";
import {useEffect, useState} from "react";

export function useRoomDetails(room_id: number) {
    const [room, setRoom] = useState<Room | null>(null)
    const [pathToImage, setPathToImage] = useState<string | null>(null)
    const [nameEditText, setNameEditText] = useState("")
    const [snipEditText, setSnipEditText] = useState("")
    const [noteEditText, setNoteEditText] = useState("")

    const rooms = storage(state => state.rooms)

    const updateRoomImage = storage(state => state.updateRoomImage)
    const updateRoomNote = storage(state => state.updateRoomNote)
    const updateRoomName = storage(state => state.updateRoomName)
    const updateRoomSnip = storage(state => state.updateRoomSnip)

    useEffect(() => {
        const foundRoom = rooms.find((room) => room.id === room_id)
        setRoom(foundRoom || null)
    }, [room_id, rooms])

    useEffect(() => {
        if (room) {
            if (room.path_to_image) setPathToImage(room.path_to_image)
            if (room.name) setNameEditText(room.name)
            if (room.snip) setSnipEditText(room.snip)
            if (room.note) setNoteEditText(room.note)
        }
    }, [room])

    const saveName = () => { updateRoomName(room_id, nameEditText) }

    const saveSnip = () => { updateRoomSnip(room_id, snipEditText) }

    const saveNote = () => { updateRoomNote(room_id, noteEditText) }

    const saveImage = (imageUri: string) => {
        if (room) {
            setPathToImage(imageUri)
            updateRoomImage(room.id, imageUri)
        }
    }

    return {
        room,
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