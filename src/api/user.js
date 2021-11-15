import request from '@/common/axios'

// 关注人列表
export function getFollowers() {
    return request({
        url: 'user/followersList',
        method: 'get',
    }).then(res => res?.data?.data?.list)
}

// 粉丝列表
export function getFollowingList() {
    return request({
        url: 'user/followingList',
        method: 'get',
    }).then(res => res?.data?.data?.list)
}

// 提交邀请码
export function submitInviteCode(code) {
    return request({
        url: '/account/checkInviteCode',
        method: 'post',
        data: {
            code,
        },
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.data || {})
}

// 获取自己拥有的邀请码
export function getInviteCodes() {
    return request({
        url: '/user/getInviteCodes',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data?.data || [])
}

