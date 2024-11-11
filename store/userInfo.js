import { create } from "zustand";


const User = (set,get) => ({
    userInfo: {},
    loading: false,
    error: false,
    setLoading: (loading) => set((val) => ({loading:val})),
    setError: (error) => set((val) => ({error:val})),
    setUser: (userData) => set(()  => ({userInfo: userData})),
    getUser: ()  => get().userInfo
})

const useUserInfo = create(User)

export default useUserInfo;