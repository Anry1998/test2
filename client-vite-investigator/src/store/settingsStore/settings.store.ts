import { create } from "zustand"


export type SettingsStore = {
    appThemeLight: boolean 
    toggleAppTheme: () => void
    setAppTheme: (value: boolean) => void
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
    appThemeLight: false,
    
    toggleAppTheme: () => {
        set(() => ({appThemeLight: !get().appThemeLight})) 
    },

    setAppTheme: () => {
        set((value) => ({appThemeLight: !!value})) 
    },
}))