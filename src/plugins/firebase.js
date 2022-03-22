
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBc-d6wDh68WwyTEU8CHcq8JFg6GHWjHdI",
    authDomain: "projeto-beta-01.firebaseapp.com",
    projectId: "projeto-beta-01",
    storageBucket: "projeto-beta-01.appspot.com",
    messagingSenderId: "997009779460",
    appId: "1:997009779460:web:780a7a0584c816148ebe51"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const classeCollection = db.collection('classificações')
const produtosCollection = db.collection('produtos')


export {
    db , auth , classeCollection, produtosCollection
}