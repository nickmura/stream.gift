import { create } from "zustand";

/* Modal States */
// Wallet Modal
interface ModalStore {
    modal: string;
    options: any;
    loading: boolean;
    setModal: (type: string, options: any) => void;
    setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modal: "", // Modal Key
    options: {},
    loading: false,
    setModal: (type, options = {}) => set(() => ({
        modal: type,
        options: options,
    })),
    setLoading: (loading) => set(() => ({ loading }))
}));

/* Account States */
// Twitch Account
interface TwitchStore {
    
}