import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Palace} from '../types/Palace';

interface StorageInterface {
    palaces: Palace[];
    addPalace: (palace: Palace) => void;
}

export const storage = create<StorageInterface>()(
    persist(
        (set) => ({
            palaces: [],
            addPalace: (newPalace: Palace) => {
                set((state) => ({
                    palaces: [...state.palaces, newPalace],
                }));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => {
                console.log('Storage has been rehydrated');
            },
        }
    )
);
