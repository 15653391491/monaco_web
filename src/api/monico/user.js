import request from '../../common/axios'

/**
 * 粉丝列表
 */
export function followingList(data) {
    return request({
        url: 'user/followingList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 关注人列表
 */
export function followersList(data) {
    return request({
        url: 'user/followersList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 获取两个用户的相同粉丝
 */
export function commonFans(data) {
    return request({
        url: 'user/commonFans',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 根据用户ID获取粉丝列表
 */
export function getFollowingList(data) {
    return request({
        url: 'user/getFollowingList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 根据用户ID获取关注人列表
 */
export function getFollowersList(data) {
    return request({
        url: 'user/getFollowersList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
