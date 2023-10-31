import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: {
    _id: "65368ecba3b4e2fd64925668",
    username: "jane2",
    email: "jane@gmail.com2",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    isAdmin: false,
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider value={{
            user:state.user, 
            isFetching:state.isFetching, 
            error:state.error,
            dispatch,
        }}    
        >
            {children}
        </AuthContext.Provider>
    )
}