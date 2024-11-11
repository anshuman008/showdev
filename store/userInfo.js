import { create } from "zustand";


const User = (set,get) => ({
    userInfo: {},
    loading: false,
    error: false,
    setLoading: (val) => set(() => ({loading:val})),
    setError: (val) => set(() => ({error:val})),
    setUser: (userData) => set(()  => ({userInfo: userData})),
    getUser: ()  => get().userInfo
})

const useUserInfo = create(User)

export default useUserInfo;