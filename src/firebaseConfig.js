// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from
    "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
    "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTRGa5BZoc46VpUy8VmeJqi18zoM2XGq0",
    authDomain: "lpe2024-1.firebaseapp.com",
    projectId: "lpe2024-1",
    storageBucket: "lpe2024-1.appspot.com",
    messagingSenderId: "79897033714",
    appId: "1:79897033714:web:5b9c4714a4a100f549c96b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logout,
};