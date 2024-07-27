import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { savePostToDb } from ".";
import { storage } from "../firebase/config";

export const createPost = async (post: {}, file: any, user: {}) => {
    try {
        const storageRef = ref(storage, `${file[0].name}`);
        console.log(file[0].name)
         await uploadBytes(storageRef, file[0]).then(() => {
             savePostToDb(user, post, file).then(() => {
            }).catch((error) => console.log(error))
        })
    } catch (error) {
        console.log(error)
    }
}
export const getFileURL = async (file: any) => {
    try {
        const storageRef = ref(storage, `${file[0].name}`);
        let imageURL
         await getDownloadURL(storageRef).then((url)=>{
             imageURL = url
        })
        return imageURL
    } catch (error) {0 
        console.log(error)
    }
}