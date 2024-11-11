import { create } from "zustand";


const CurrentState = (set,get) => ({
    userState: 0,
    setUserState: () => set((state) => ({userState: state.userState + 1}))
})

const useUserState = create(CurrentState)

export default useUserState;