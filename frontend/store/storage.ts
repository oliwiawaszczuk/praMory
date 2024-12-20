import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Palace} from '../types/Palace';
import {Room} from "../types/Room";

interface StorageInterface {
    palaces: Palace[]
    rooms: Room[]
    addPalace: (palace: Palace) => void
    removePalace: (id: number) => void
    addRoom: (room: Room) => void
    removeRoom: (id: number) => void
    updateRoomName: (id: number, newName: string) => void
    updatePalaceTitle: (id: number, newTitle: string) => void
    updatePalaceImage: (id: number, newImagePath: string) => void
    updatePalaceNote: (id: number, newNote: string) => void
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

        // MODIFICATION ROOMS
            addRoom: (newRoom: Room) => {
                set((state) => ({
                    rooms: [...state.rooms, newRoom],
                }))
            },
            removeRoom: (id: number) => {
                set((state) => ({
                    rooms: state.rooms.filter((room) => room.id !== id ),
                }))
            },
            updateRoomName: (id: number, newName: string) => {
                set((state) => ({
                    rooms: state.rooms.map((room) =>
                        room.id === id ? { ...room, name: newName } : room
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
