import request from '../common/axios'
import * as tokenTools from '@/utils/tokenTools.js'

export function getWalletMessage(address) {
    return request({
        url: '/wallet/getMessageToSign',
        method: 'get',
        params: {
            address
        },
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.data?.data?.message)
}

export function signature(address, signature) {
    return request({
        url: '/wallet/verifySignature',
        method: 'post',
        data: {
            address,
            signature
        },
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.data?.data || {})
}

export function getNft() {
    return request({
        // url: '/wallet/getNFTAssets',
        url: '/wallet/test',
        method: 'get',
        params: {
            uid: tokenTools.getUid()
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data?.data?.nft_platform_list || [])
}

// 获取我关注的人
export function getFollowing() {
    return request({
        url: '/account/getFollowing',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data?.data || [])
}

// 获取我关注的人
export function getNFTRankingList() {
    return request({
        url: '/account/getNFTRankingList',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data?.data || [])
}