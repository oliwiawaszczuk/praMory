import {useEffect, useState} from "react";
import {Thing} from "../types/Thing";
import {storage} from "../store/storage";
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

    const sortedImages = () => { return thing?.path_to_images?.slice().sort((a, b) => a.order - b.order) || [] }

    const changeImageOrder = (imageOrder: number, direction: number) => {
        const updatedImages = [...thing!.path_to_images!]

        const index = updatedImages.findIndex(image => image.order === imageOrder)

        if (index !== -1) {
            const currentImage = updatedImages[index]
            const swapIndex = index + direction

            if (swapIndex >= 0 && swapIndex < updatedImages.length+1) {
                const swapImage = updatedImages[swapIndex]

                updatedImages[swapIndex] = currentImage
                updatedImages[index] = swapImage

                currentImage.order = swapIndex
                swapImage.order = index

                updateThing({
                    ...thing!,
                    path_to_images: updatedImages
                })
            }
        }
    }

    const removeImage = (imageOrder: number) => {
        const updatedImages = thing?.path_to_images?.filter(image => image.order !== imageOrder) || []

        updatedImages.forEach((image, index) => { image.order = index })

        updateThing({
            ...thing!,
            path_to_images: updatedImages
        })
    }

    return {
        thing,
        sortedImages,
        saveName,
        saveSnip,
        saveNote,
        AddImage,
        changeImageOrder,
        removeImage,
    }
}