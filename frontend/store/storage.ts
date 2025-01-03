import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Palace} from '../types/Palace';
import {Room} from "../types/Room";
import {ImagePalacePin, ImageRoomPin} from "../types/ImagePin";
import {Thing} from "../types/Thing";

interface StorageInterface {
    palaces: Palace[]
    addPalace: (palace: Palace) => void
    removePalace: (id: number) => void
    updatePalace: (newPalace: Palace) => void
    addPinRoomToPalace: (id: number, imagePalacePin: ImagePalacePin) => void

    rooms: Room[]
    addRoom: (room: Room) => void
    removeRoom: (id: number) => void
    updateRoom: (room: Room) => void
    addPinThingToRoom: (id: number, imageRoomPin: ImageRoomPin) => void

    things: Thing[]
    addThing: (room: Thing) => void
    removeThing: (id: number) => void
    updateThing: (room: Thing) => void
    addImage: (thing_id: number, path: string) => void
    removeImage: (thing_id: number, path: string) => void
    swapImages: (thing_id: number, index_1: number, index_2: number) => void
}

export const storage = create<StorageInterface>()(
    persist(
        (set) => ({
            palaces: [],
            rooms: [],
            things: [],

        // MODIFICATION PALACE
            addPalace: (newPalace: Palace) => {
                set((state) => ({
                    palaces: [...state.palaces, newPalace],
                }))
            },
            removePalace: (id: number) => {
                 set((state) => {
                    const roomsInPalace = state.rooms.filter((room) => room.palace_id === id)
                    const rooms_id = roomsInPalace.map((room) => room.id)

                    return {
                        palaces: state.palaces.filter((palace) => palace.id !== id),
                        rooms: state.rooms.filter((room) => room.palace_id !== id),
                        things: state.things.filter((thing) => !rooms_id.includes(thing.room_id)),
                    }
                })
            },
            updatePalace: (newPalace: Palace) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) =>
                        palace.id === newPalace.id ? newPalace : palace
                    ),
                }))
            },

        // MODIFICATION ROOMS
            addRoom: (newRoom: Room) => {
                set((state) => ({
                    rooms: [...state.rooms, newRoom],
                }))
            },
            removeRoom: (id: number) => {
                set((state) => {
                    const rooms_id = state.rooms.map((room) => room.id)

                    return {
                        rooms: state.rooms.filter((room) => room.id !== id),
                        things: state.things.filter((thing) => !rooms_id.includes(thing.room_id)),
                        palaces: state.palaces.map((palace) => {
                            if (palace.pins) {
                                palace.pins = palace.pins.filter((pin) => pin.room_id !== id)
                            }
                            return palace
                        }),
                    }
                })
            },
            updateRoom: (newRoom: Room) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === newRoom.id ? newRoom : room
                    ),
                }))
            },
            addPinRoomToPalace: (id: number, newPin: ImagePalacePin) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) => {
                        if (palace.id === id) {
                            if (!palace.pins)
                                return { ...palace, pins: [newPin] }
                            const existingPinIndex = palace.pins.findIndex(pin => pin.room_id === newPin.room_id)
                            if (existingPinIndex >= 0) {
                                const updatedPins = [...palace.pins]
                                updatedPins[existingPinIndex] = newPin
                                return { ...palace, pins: updatedPins }
                            } else
                                return { ...palace, pins: [...palace.pins, newPin] }
                        }
                        return palace
                    }),
                }))
            },

        // MODIFICATION THINGS
            addThing: (newThing: Thing) => {
                set((state) => ({
                    things: [...state.things, newThing],
                }))
            },
            removeThing: (id: number) => {
                set((state) => ({
                    things: state.things.filter((thing) => thing.id !== id),
                    rooms: state.rooms.map((room) => {
                        if (room.pins)
                            room.pins = room.pins.filter((pin) => pin.thing_id !== id)
                        return room
                    }),
                    palaces: state.palaces.map((palace) => {
                        if (palace.pins)
                            palace.pins = palace.pins.filter((pin) => pin.room_id !== state.rooms.find(room => room.id === id)?.id)
                        return palace
                    }),
                }))
            },
            updateThing: (newThing: Thing) => {
                set((state) => ({
                    things: state.things.map((thing) =>
                        thing.id === newThing.id ? newThing : thing
                    ),
                }))
            },
            addPinThingToRoom: (id: number, newPin: ImageRoomPin) => {
                set((state) => ({
                    rooms: state.rooms.map((room) => {
                        if (room.id === id) {
                            if (!room.pins)
                                return { ...room, pins: [newPin] }
                            const existingPinIndex = room.pins.findIndex(pin => pin.thing_id === newPin.thing_id)
                            if (existingPinIndex >= 0) {
                                const updatedPins = [...room.pins]
                                updatedPins[existingPinIndex] = newPin
                                return { ...room, pins: updatedPins }
                            } else
                                return { ...room, pins: [...room.pins, newPin] }
                        }
                        return room
                    }),
                }))
            },
            addImage: (thing_id: number, path: string) => {
                set((state) => ({
                    things: state.things.map((thing) => {
                        if (thing.id === thing_id) {
                            const newImage = { path, order: (thing.path_to_images?.length || 0) }
                            return {
                                ...thing,
                                path_to_images: thing.path_to_images ? [...thing.path_to_images, newImage] : [newImage],
                            }
                        }
                        return thing
                    }),
                }))
            },
            removeImage: (thing_id: number, path: string) => {
                set((state) => ({
                    things: state.things.map((thing) => {
                       if (thing.id === thing_id) {
                           const updatedImages = thing.path_to_images
                               ?.filter((image) => image.path !== path)
                               .map((image, index) => ({...image, order: index + 1}))
                           return { ...thing, images: updatedImages }
                       }
                       return thing
                    }),
                }))
            },
            swapImages: (thing_id: number, index1: number, index2: number) => {
                set((state) => ({
                    things: state.things.map((thing) => {
                        if (thing.id === thing_id && thing.path_to_images) {
                            const images = [...thing.path_to_images]
                            if (index1 >= 0 && index1 < images.length && index2 >= 0 && index2 < images.length) {
                                const temp = images[index1]
                                images[index1] = images[index2]
                                images[index2] = temp

                                images[index1].order = index1 + 1;
                                images[index2].order = index2 + 1;
                            }
                            return {
                                ...thing,
                                path_to_images: images,
                            }
                        }
                        return thing;
                    }),
                }))
            }
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => {
                console.log('Storage has been rehydrated')
            },
        }
    )
)
