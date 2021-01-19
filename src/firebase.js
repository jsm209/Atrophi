import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyATBq3xUS6qVDA621XJpNPw_9_e02CvqyE",
    authDomain: "auto-todo-list.firebaseapp.com",
    databaseURL: "https://auto-todo-list-default-rtdb.firebaseio.com",
    projectId: "auto-todo-list",
    storageBucket: "auto-todo-list.appspot.com",
    messagingSenderId: "933104461780",
    appId: "1:933104461780:web:f8cb5db2ca5137fa86d841",
    measurementId: "G-SVVYSSPRDQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase.database();