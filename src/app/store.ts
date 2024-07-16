import { configureStore } from "@reduxjs/toolkit"
import { appPath, appReducer } from "app/appSlice"
import { tasksPath, tasksReducer } from "../features/todolistsList/tasksSlice"
import { todolistsPath, todolistsReducer } from "../features/todolistsList/todolistsSlice"

export const store = configureStore({
  reducer: {
    [tasksPath]: tasksReducer,
    [todolistsPath]: todolistsReducer,
    [appPath]: appReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
