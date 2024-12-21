import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Palace} from '../types/Palace';
import {Room} from "../types/Room";
import {ImagePalacePin} from "../types/ImagePin";

interface StorageInterface {
    palaces: Palace[]
    rooms: Room[]

    addPalace: (palace: Palace) => void
    removePalace: (id: number) => void
    updatePalaceTitle: (id: number, newTitle: string) => void
    updatePalaceImage: (id: number, newImagePath: string) => void
    updatePalaceNote: (id: number, newNote: string) => void
    addPinRoomToPalace: (id: number, imagePalacePin: ImagePalacePin) => void

    addRoom: (room: Room) => void
    removeRoom: (id: number) => void
    updateRoomName: (id: number, newName: string) => void
    updateRoomImage: (id: number, newImagePath: string) => void
    updateRoomNote: (id: number, newNote: string) => void
    updateRoomSnip: (id: number, newSnip: string) => void
}

export const storage = create<StorageInterface>()(
    persist(
        (set) => ({
            palaces: [],
            rooms: [],

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
            updatePalaceTitle: (id: number, newTitle: string) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) =>
                        palace.id === id ? { ...palace, title: newTitle } : palace
                    ),
                }))
            },
            updatePalaceImage: (id: number, newImagePath: string) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) =>
                        palace.id === id ? { ...palace, path_to_image: newImagePath } : palace
                    ),
                }))
            },
            updatePalaceNote: (id: number, newNote: string) => {
                set((state) => ({
                    palaces: state.palaces.map((palace) =>
                        palace.id === id ? { ...palace, note: newNote } : palace
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
                        if (palace.pins) {
                            palace.pins = palace.pins.filter((pin) => pin.room_id !== id)
                        }
                        return palace
                    })
                }))
            },
            updateRoomName: (id: number, newName: string) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === id ? { ...room, name: newName } : room
                    ),
                }))
            },
            updateRoomImage: (id: number, newImagePath: string) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === id ? { ...room, path_to_image: newImagePath } : room
                    ),
                }))
            },
            updateRoomNote: (id: number, newNote: string) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === id ? { ...room, note: newNote } : room
                    ),
                }))
            },
            updateRoomSnip: (id: number, newSnip: string) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === id ? { ...room, snip: newSnip } : room
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
