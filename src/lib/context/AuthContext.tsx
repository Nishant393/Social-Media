import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase/config';
import { Avatars, Client } from 'appwrite';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc} from 'firebase/firestore';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthanticated: false,
    // setUser: () => { },
    // setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext(INITIAL_STATE);


function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading,setIsLoading] = useState(false)
    const [isAuthanticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()


    const getAuthUser = async (users: any) => {
        const docRef = doc(firestore, 'users', users.uid);
        const currentUser = (await getDoc(docRef)).data();
        if (currentUser) {
            const avatarUrl = new Avatars(new Client()).getInitials(currentUser.name).toString()
            setUser({
                id: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                email: currentUser.email,
                imageUrl: avatarUrl,
                bio: currentUser.bio
            })

        }
    }

    const checkAuthUser = async () => {
        try {
            onAuthStateChanged(auth, (users) => {
                if (users) {
                    getAuthUser(users)
                    setIsAuthenticated(true)
                    
                    localStorage.setItem('firebase:host:social-2a5cf-default-rtdb.firebaseio.com',"jdjhkuhakjahkuhuosdhoufho;")
                    return true
                } else {
                    localStorage.setItem('firebase:host:social-2a5cf-default-rtdb.firebaseio.com',"[]")
                    console.log("No user is signed in.");
                }
            });

            console.log(user)
            setIsLoading(false)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        if (
            localStorage.getItem('firebase:host:social-2a5cf-default-rtdb.firebaseio.com') === '[]' ||
            localStorage.getItem('firebase:host:social-2a5cf-default-rtdb.firebaseio.com') === null) {
            navigate('/sign-in')
        }
        checkAuthUser()
    }, [])

    const values = {
        user,
        isLoading,
        isAuthanticated,
        checkAuthUser
    }
    return (

        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)