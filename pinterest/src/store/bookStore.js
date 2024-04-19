import { create } from 'zustand'

export const useBookStore = create((set) => ({
    value: 'otter',
    updateValue: (newValue) => set({ value: newValue }),


}))

