import {storage} from "../store/storage";
import {useEffect, useState} from "react";
import {Palace} from "../types/Palace";
import {Room} from "../types/Room";

export function usePalaceDetails(palace_id: number) {
    const [palace, setPalace] = useState<Palace | null>(null)
    const [rooms, setRooms] = useState<Room[]>([])

    const storage_palaces = storage(state => state.palaces)
    const storage_rooms = storage(state => state.rooms)
    const updatePalace = storage(state => state.updatePalace)

    useEffect(() => {
        const foundPalace = storage_palaces.find((palace) => palace.id === palace_id)
        setPalace(foundPalace || null)
        setRooms(storage_rooms.filter((room) => room.palace_id === palace_id))
    }, [palace_id, storage_palaces, storage_rooms])

    const saveImage = (path: string) => {
        if (palace)
            updatePalace({...palace, path_to_image: path})
    }

    return { palace, rooms, saveImage }
}