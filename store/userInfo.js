import { create } from "zustand";


const User = (set,get) => ({
    userInfo: {},
    setUser: (userData) => set(()  => ({userInfo: userData})),
    getUser: ()  => get().userInfo
})

const useUserInfo = create(User)

export default useUserInfo;