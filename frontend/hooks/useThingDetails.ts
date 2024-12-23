import {useEffect, useState} from "react";
import {Thing} from "../types/Thing";
import {storage} from "../store/storage";

export function useThingDetails(thing_id: number) {
    const [thing, setThing] = useState<Thing | null>(null)

    const things = storage(state => state.things)

    useEffect(() => {
        const foundRoom = things.find((thing) => thing.id === thing_id)
        setThing(foundRoom || null)
    }, [thing_id, things])

    return {
        thing
    }
}