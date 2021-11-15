const KeyUserToken = 'userToken'
const KeyWalletAddress = 'walletAddress'
const KeyUID = 'uid'

export function getToken() {
    return localStorage.getItem(KeyUserToken)
}

export function setToken(value) {
    if (typeof value !== 'string') {
        throw Error('can\'t set token to ' + typeof value)
    }
    localStorage.setItem(KeyUserToken, value)
}

export function getWalletAddress() {
    return localStorage.getItem(KeyWalletAddress)
}

export function setWalletAddress(value) {
    if (typeof value !== 'string') {
        throw Error('can\'t set walletAddress to ' + typeof value)
    }
    localStorage.setItem(KeyWalletAddress, value)
}

export function setUid(value) {
    if (typeof value !== 'string') {
        throw Error('can\'t set uid to ' + typeof value)
    }
    localStorage.setItem(KeyUID, value)
}

export function getUid() {
    return localStorage.getItem(KeyUID)
}