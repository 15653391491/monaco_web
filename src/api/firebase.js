import request from '@/common/axios'
import * as tokenTools from '@/utils/tokenTools.js'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDt_YAnnTEub05ur-rgYKmbwyomoIK0-Dw',
    authDomain: 'monaco-dev-ed51d.firebaseapp.com',
    projectId: 'monaco-dev-ed51d',
    storageBucket: 'monaco-dev-ed51d.appspot.com',
    messagingSenderId: '677901982137',
    appId: '1:677901982137:web:6f270543438b7bd0897e68'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

async function init() {
    const token = await createCustomToken()
    const auth = getAuth(app)
    signInWithCustomToken(auth, token).catch((error) => {
        console.log(error)
    })
}

init()

export function uploadImage(file, onProcess, onSuccess, onError) {
    const imageRef = ref(storage, 'images/' + uuidv4() + file.name)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProcess && onProcess(process)
    }, error => {
        console.log('firebase upload error', error)
        onError && onError(error)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
            onSuccess && onSuccess(url)
        })
    })

    return uploadTask
}

export function uploadVideo(file, onProcess, onSuccess, onError) {
    const imageRef = ref(storage, 'videos/' + file.name)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProcess && onProcess(process)
    }, error => {
        console.log('firebase upload error', error)
        onError && onError(error)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
            onSuccess && onSuccess(url)
        })
    })

    return uploadTask
}

// 拿到 firebase 登录凭证去登录。
export function createCustomToken() {
    return request({
        url: '/account/createCustomToken',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'token': tokenTools.getToken()
        }
    }).then(res => res?.data?.data)
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}


