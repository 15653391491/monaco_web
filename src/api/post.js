import request from '../common/axios'
import * as tokenTools from '@/utils/tokenTools.js'

export function AddPost(content, type, user_ids, image_url, video_url) {
    return request({
        url: '/article/add',
        method: 'post',
        data: {
            content,
            type,
            user_ids,
            image_url,
            video_url
        },
        headers: {
            token: tokenTools.getToken(),
            'Content-Type': 'application/json'
        }
    })
}