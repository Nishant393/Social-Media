
import { INewUser } from "../../types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase/config";
import { ID } from "appwrite";
import {  collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getFileURL } from "./storageApi";


export const createNewUser = async (user: INewUser) => {
    try {
        setDoc(doc(firestore, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });
        console.log(user)
        let newUser
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                newUser = userCredential.user;
                console.log('newUser' + newUser)
                setDoc(doc(firestore, "users", newUser.uid), {
                    id: newUser.uid,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    imageUrl: '',
                    bio: ''
                });
                return newUser
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
                return error
            })


        return newUser

    } catch (error) {
        return error
    }
}

export const signInAccount = async (user: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
        const user = userCredential.user;
        return user
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        console.log('sign Failed !')
        return error
    });
}

export const getCurrentUser = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.uid);

        } else {
            // No user is signed in
            console.log("No user is signed in.");
        }
    });
}

export const signOutFn = async () => {

    try {
        signOut(auth).then(() => {
            localStorage.removeItem('firebase:host:social-2a5cf-default-rtdb.firebaseio.com')
            console.log("here")

        }).catch((error) => {
            console.error("Error signing out:", error);
        });
        return true
    } catch (error) {
        console.log(error)
    }
}

export const savePostToDb = async (user: any, post: any, file: any) => {
    const imageURL = await getFileURL(file)
    const id =await ID.unique()
    setDoc(doc(firestore, "posts",id), {
        id:id,
        caption: post.caption,
        creator: user,
        likes: [],
        files: {
            fileName: file[0].name,
            URL: imageURL,
            uploadTime: file[0].lastModifiedDate,
        },
        location: post.location,
        tags: post.tags,
    });
}

export const getExplorePost = async () => {
    try {
        const postsRef = await collection(firestore, 'posts');
        const q = await query(postsRef, orderBy("caption", "desc"), limit(10))
        const querySnapshot = await getDocs(q)
        const data = await querySnapshot.docs.map((doc) => doc.data());

        // if (!posts) throw Error
        return await data;
    } catch (error) {
        console.log(error)
    }

}

export const getAllUserPost = async () => {
    try {
        const postsRef = await collection(firestore, 'users');
        const q = await query(postsRef, orderBy("name", "desc"), limit(10))
        const querySnapshot = await getDocs(q)
        const data = await querySnapshot.docs.map((doc) => doc.data());

        // if (!posts) throw Error
        console.log(data)
        return await data;
    } catch (error) {
        console.log(error)
    }

}

export const getRecentPost = async (user:any) => {
    const postsRef = collection(firestore, 'posts');
    const querySnapshot = await getDocs(postsRef);
    const posts: any[] = [];
    const post: any[] = [];
    console.log(user)

    await querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
    });

    if (!posts) throw Error
    console.log(posts)
    posts.forEach((e) => {
        // console.log(user?.id)
        if (e?.creator?.id === user) {
            post.push({ id: e.creator?.id, ...e });
        }
    })
    // console.log("post",post)

    return await post;
}


export const getUserById = async (id:string)=>{
    try {
        const userRef = await doc(firestore , "users" , id )
        const data=await getDoc(userRef)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async (id: string) => {
    const postsRef = doc(firestore, 'posts', id);
    const document = (await getDoc(postsRef)).data();
    return document
}

export const getPost = async (id: string) => {
    getPostById(id)
}

export async function likePost(postId: string, LikesArray: []) {
    try {
        const querySnapshot = await doc(firestore, 'posts', postId);
        await updateDoc(querySnapshot, { likes: LikesArray })
        console.log('update')
    } catch (error) {
        console.error('Error updating post caption:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
}

export async function checkIsLiked(userId:any, postId:string) {
    try {
        const postRef = await doc(collection(firestore, 'posts'), postId);
        const postDoc = await getDoc(postRef);
        const likes = postDoc.data()?.likes || [];
        return likes.includes(userId)
    } catch (error) {
        console.log(error)
    }
}

export const savedPost = async (user: any, Post: any) => {
    try {
        setDoc(doc(firestore, "saved", Post.id), {
            creator: user.id,
            post: Post,
        });
    } catch (error) {
        console.log(error)
    }
}

export const getSavedPost = async (user: any) => {
    try {
        const usersRef = collection(firestore, 'saved');

        const activeQuery = query(usersRef, where('creator', '==', user.id))
        const querySnapshot = await getDocs(activeQuery);
        const activeUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Convert docs to objects
        console.log('Active users:', activeUsers);
        return activeUsers
    } catch (error) {
        console.log(error)
    }
}

export const deleteSavedPost = async (id: any) => {
    try {
        await deleteDoc(doc(firestore, "saved", id));
        console.log('delete doc successFull !')
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (id: any) => {
    try {
        await deleteDoc(doc(firestore, "posts", id));
        console.log('delete doc successFull !')
    } catch (error) {
        console.log(error)
    }
}

export const checkIsSaved = async (user: any, Post: any) => {
    try {
        const usersRef = collection(firestore, 'saved');

        const activeQuery = query(usersRef, where('creator', '==', user.id))
        const querySnapshot = await getDocs(activeQuery);
        const activeUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Convert docs to objects
        console.log('Active users:', activeUsers);
        const check = activeUsers.filter((doc) => {
            return doc.id === Post.id
        })

        return check
    } catch (error) {
        console.log(error)
    }
}
