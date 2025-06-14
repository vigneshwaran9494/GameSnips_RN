import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from 'react';
import Toast from "react-native-toast-message";

export const useLoginHooks = () => {
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUserData } = useAuth();

    /**
     * Login with phone number
     * @param phoneNumber - The phone number to login with
     * @returns The confirmation result
     */
    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Attempting to sign in with:', email, password);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            return userCredential.user;
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Login failed",
                text2: error.message,
            });
            setLoading(false);
            setError(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Logout the user
     */
    const handleLogout = async () => {
        AsyncStorage.clear();
        await signOut(auth);
        router.replace('/(auth_screens)/LoginScreen');
    }



    return {
        handleLogin,
        handleLogout,
        loading,
        error
    }
};