import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.init';
const auth = getAuth(app)
export const AuthContext = createContext();

const UserContexts = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    // providers -------------
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider()

    // signUp  with email and password
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //signup with google accounts

    const googleSignUp = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // signup with github account 

    const gitSignUp = () => {
        setLoading(true)
        return signInWithPopup(auth, gitProvider)
    }



    //log in
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // log out 

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // password reset

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // auth state 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        };
    }, [])



    const authInfo = { user, signUp, signIn, googleSignUp, gitSignUp, logOut, forgotPassword, loading };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContexts;