import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBjcwQK3xOVupyFgsTfE2fUJ7ym5pS_J5E",
    authDomain: "manu-project-49512.firebaseapp.com",
    databaseURL: "https://manu-project-49512-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "manu-project-49512",
    storageBucket: "manu-project-49512.appspot.com",
    messagingSenderId: "278805227025",
    appId: "1:278805227025:web:1efe1d5e47787623ea73b0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
