import axios from 'axios'
import {BASE_URL} from '@/config/api'
import router from '@/routes/index'
import {message} from 'element-ui'
import * as tokenTools from '@/utils/tokenTools.js'
import {getToken} from '@/utils/tokenTools.js'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? BASE_URL : '/api/',
    // baseURL: '/api',
    withCredentials: true,
    timeout: 50000, // 请求超时uploadBuildExcel
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': getToken()
    },
})

service.interceptors.request.use(config => {
    if (!config.headers.token && tokenTools.getToken()) {
        config.headers.token = tokenTools.getToken()
    }
    return config
})


service.interceptors.response.use(res => res, error => {
    const code = error.toString().match(/\s\d{3}(\s|$)/)?.[0]?.trim()
    if ([401, 402, 403].includes(Number(code))) {
        message({
            type: 'warning',
            message: 'please login'
        })
        tokenTools.setToken('')
        router.push({name: 'login'})
    }
})

export default service
