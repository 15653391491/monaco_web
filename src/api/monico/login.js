import request from '../../common/axios'

/**
 * 邮箱登录
 * @param data
 */
export function login(data) {
    return request({
        url: 'login/login',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 注册
 * @param data
 */
export function userRegister(data) {
    return request({
        url: 'login/userRegister',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 修改密码
 * @param data
 */
export function updatePassword(data) {
    return request({
        url: 'login/updatePassword',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 忘记密码
 * @param data
 */
export function forgetPassword(data) {
    return request({
        url: 'login/forgetPassword',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 设置密码
 * @param data
 */
export function setPassword(data) {
    return request({
        url: 'account/setPassword',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/json'}
    })
}

/**
 * 设置密码
 * @param data
 */
export function sendResetLink(data) {
    return request({
        url: 'account/sendResetLink',
        method: 'get',
        params: data,
    })
}
