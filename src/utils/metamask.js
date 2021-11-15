import MetaMaskOnboarding from '@metamask/onboarding'
import { utils } from 'ethers'
import { message } from 'element-ui'

let accounts = []
const onboarding = new MetaMaskOnboarding()
const CHAINIDS = [1, 3, 4, 42]

function showMessage(msg, type) {
  message({
    message: msg,
    type: type || 'warning'
  })
}

export function startOnboarding() {
  onboarding.startOnboarding()
}

export function stopOnboarding() {
  onboarding.stopOnboarding()
}

export function isInstalled() {
  return MetaMaskOnboarding.isMetaMaskInstalled()
}

export async function connect() {
  try {
    return await window?.ethereum?.request({
      method: 'eth_requestAccounts',
    })
  } catch (error) {
    if (error.code === 4001) {
      showMessage(error.message)
    }
  }
}

export async function personalSign(msgToSign) {
  const from = accounts[0]
  const msg = utils.hexlify(utils.toUtf8Bytes(msgToSign))
  let result = ''
  try {
    result = await window?.ethereum?.request({
      method: 'personal_sign',
      params: [msg, from],
    })
  } catch (err) {
    showMessage(err.message)
  }
  return result
}

export function isConnected() {
  return window?.ethereum?.isConnected()
}

export async function getAccount() {
  accounts = await window?.ethereum?.request({
    method: 'eth_accounts',
  })
  return accounts[0]
}

export async function getChainId() {
  const chainIdHex = await window.ethereum?.request({ method: 'eth_chainId' })
  const chainId = parseInt(chainIdHex, 16)
  return chainId
}

export async function checkChainId() {
  if (typeof window.ethereum === 'undefined') {
    return false
  }
  const chainId = await getChainId()
  if (!CHAINIDS.includes(chainId)) {
    showMessage('Please connect to the appropriate Ethereum network.')
    return false
  }
  return true
}


window?.ethereum?.on('accountsChanged', (newAccounts) => {
  accounts = newAccounts
})

window?.ethereum?.on('chainChanged', () => {
  window.location.reload()
})
