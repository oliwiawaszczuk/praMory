import {useEffect, useState} from "react";
import {Thing} from "../types/Thing";
import {storage} from "../store/storage";
import {Room} from "../types/Room";

export function useThingDetails(thing_id: number) {
    const [thing, setThing] = useState<Thing | null>(null)

    const things = storage(state => state.things)
    const updateThing = storage(state => state.updateThing)
    const addImage = storage(state => state.addImage)

    useEffect(() => {
        const foundRoom = things.find((thing) => thing.id === thing_id)
        setThing(foundRoom || null)
    }, [thing_id, things])

    const saveName = (text: string) => { updateThing({...thing, name: text} as Thing) }

    const saveSnip = (text: string) => { updateThing({...thing, snip: text} as Thing) }

    const saveNote = (text: string) => { updateThing({...thing, note: text} as Thing) }

    const AddImage = (path: string) => { addImage(thing_id, path) }

    return {
        thing,
        saveName,
        saveSnip,
        saveNote,
        AddImage,
    }
}