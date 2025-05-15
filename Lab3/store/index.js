import { act, createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Alert } from "react-native";

const MyContext = createContext()
MyContext.displayName = "mycontext"
//dinh nghia reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                userLogin: action.value
            }
        case "LOGOUT":
            return {
                ...state,
                userLogin: null
            }
        default:
            return new Error("Action not found")
            break
    }
}
//
const MyContextControllerProvider = ({ children }) => {
   const initialState = {
        userLogin: null,
        services: [],
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    const value = useMemo(() => [controller, dispatch], [controller, dispatch])
        
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}
const useMyContextController = () => {
    const context = useContext(MyContext)
    if (context ==null) 
        return new Error("useMyContextController must inside in MyContextControllerProvider")
    
    return context
}
const USERS = firestore().collection("USERS")

const login = async (dispatch, email, password) => {
  try {
    console.log("🔑 Attempting login...");
    
    // Đăng nhập Authentication
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log("✅ Auth successful:", userCredential.user.uid);
    
    // Lấy thông tin từ Firestore
    const userDoc = await USERS.doc(email).get();
    console.log("📄 Firestore check result:", userDoc.exists ? "exists" : "not exists");
    
    if (!userDoc.exists) {
      throw new Error("User data not found in Firestore");
    }
    
    const userData = userDoc.data();
    console.log("👤 User role:", userData.role);
    
    dispatch({
      type: "USER_LOGIN",
      value: userData
    });
    
    console.log("✅ Login successful");
  } catch (e) {
    console.error("❌ Login error:", e.code, e.message);
    Alert.alert("Error", e.message);
  }
};
const logout = async (dispatch) => {
  try {
    console.log("🔒 Attempting logout...");
    await auth().signOut();
    dispatch({
      type: "LOGOUT"
    });
    console.log("✅ Logout successful");
  } catch (e) {
    console.error("❌ Logout error:", e.code, e.message);
    Alert.alert("Error", e.message);
  }
}







export { MyContextControllerProvider, useMyContextController, login, logout }
