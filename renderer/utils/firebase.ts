import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD3boGyKmFfPF8UT-vlrtUUNMI5Cfk4x6k",
  authDomain: "notely-26622.firebaseapp.com",
  projectId: "notely-26622",
  storageBucket: "notely-26622.appspot.com",
  messagingSenderId: "518816767614",
  appId: "1:518816767614:web:7bbe3bfaa3c9a83ed1422f",
}

console.log(firebaseConfig)

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
