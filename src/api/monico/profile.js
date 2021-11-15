import request from '../../common/axios'

/**
 * 个人信息详细
 */
export function detail(data) {
    return request({
        url: 'user/detail',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 已登录通过ID获取个人信息
 */
export function getUser(data) {
    return request({
        url: 'user/getUser',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 修改个人信息
 */
export function updateDetail(data) {
    return request({
        url: 'user/updateDetail',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
