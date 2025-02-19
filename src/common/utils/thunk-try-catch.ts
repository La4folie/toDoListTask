import { AppDispatch, AppRootStateType } from "app/store"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/appSlice"

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }))
  }
}
