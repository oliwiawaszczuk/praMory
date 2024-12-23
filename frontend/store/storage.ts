import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Palace} from '../types/Palace';
import {Room} from "../types/Room";
import {ImagePalacePin} from "../types/ImagePin";
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
    // addPinRoomToPalace: (id: number, imagePalacePin: ImagePalacePin) => void

    things: Thing[]
    addThing: (room: Thing) => void
    removeThing: (id: number) => void
    updateThing: (room: Thing) => void
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
                set((state) => ({
                    palaces: state.palaces.filter((palace) => palace.id !== id),
                    rooms: state.rooms.filter((room) => room.palace_id !== id ),
                }))
            },
            updatePalace: (newPalace: Palace) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) =>
                        palace.id === newPalace.id ? newPalace : palace
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

        // MODIFICATION ROOMS
            addRoom: (newRoom: Room) => {
                set((state) => ({
                    rooms: [...state.rooms, newRoom],
                }))
            },
            removeRoom: (id: number) => {
                set((state) => ({
                    rooms: state.rooms.filter((room) => room.id !== id ),
                    palaces: state.palaces.map((palace) => {
                        if (palace.pins)
                            palace.pins = palace.pins.filter((pin) => pin.room_id !== id)
                        return palace
                    })
                }))
            },
            updateRoom: (newRoom: Room) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === newRoom.id ? newRoom : room
                    ),
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
                    things: state.things.filter((thing) => thing.id !== id ),
                    rooms: state.rooms.map((room) => {
                        if (room.pins)
                            room.pins = room.pins.filter((pin) => pin.thing_id !== id)
                        return room
                    })
                }))
            },
            updateThing: (newThing: Thing) => {
                set((state) => ({
                    things: state.things.map((thing) =>
                        thing.id === newThing.id ? newThing : thing
                    ),
                }))
            },
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
