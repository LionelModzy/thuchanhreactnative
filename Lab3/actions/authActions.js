import auth from '@react-native-firebase/auth';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/authConstants';

export const login = (email, password, navigation) => async (dispatch) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    });
    navigation.navigate('Home');
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
    alert(error.message);
  }
};

export const register = (email, password, navigation) => async (dispatch) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: userCredential.user,
    });
    navigation.navigate('Home');
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message,
    });
    alert(error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth().signOut();
    dispatch({ type: 'LOGOUT' });
  } catch (error) {
    console.error(error);
  }
};