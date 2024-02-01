export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_loading":
      return { ...state, isAuthLoading: action.payload }
    case "set_user":
      return { ...state, user: action.payload }
    default:
      return state
  }
}
