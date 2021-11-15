import request from '../../common/axios'
import * as tokenTools from '@/utils/tokenTools.js'

/**
 * 所有文章列表
 */
export function getAllArticleList(data) {
    return request({
        url: 'article/allArticleList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 获取说有文章列表
 */
export function nextReview(data) {
    return request({
        url: 'topic/nextReview',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}


/**
 * 获取话题
 * @param data
 */
export function getTipic(data) {
    return request({
        url: 'topic/topic',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 获取话题
 * @param data
 */
export function topicList(data) {
    return request({
        url: 'topic/topicList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 获取用户列表
 * @param data
 */
export function getReply(data) {
    return request({
        url: 'topic/reply',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 文章所用到的话题
 * @param data
 */
export function getArticleTopic(data) {
    return request({
        url: 'topic/articleTopic',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': tokenTools.getToken()
        }
    })
}

/**
 * 已登录文章评论列表
 * @param data
 */
export function getReview(data) {
    return request({
        url: 'topic/getReview',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 未登录文章评论列表
 * @param data
 */
export function firstArticleList(data) {
    return request({
        url: 'article/firstArticleList',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 未登录文章评论列表
 * @param data
 */
export function allArticleList(data) {
    return request({
        url: 'article/allArticleList',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 未登录文章评论列表
 * @param data
 */
export function influentials(data) {
    return request({
        url: 'user/influentials',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}


/**
 * 点赞
 * @param data
 */
export function likeReview(data) {
    return request({
        url: 'topic/likeReview',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 发布文章
 * @param data
 */
export function add(data) {
    return request({
        url: 'article/add',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 文章评论或回复评论
 * @param data
 */
export function replyReview(data) {
    return request({
        url: 'topic/replyReview',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 分享
 * @param data
 */
export function share(data) {
    return request({
        url: 'article/share',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 复制链接
 * @param data
 */
export function copyUrl(data) {
    return request({
        url: 'article/copyUrl',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 自己文章列表
 * @param data
 */
export function articleList(data) {
    return request({
        url: 'article/articleList',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 关注或取消关注
 * @param data
 */
export function followUser(data) {
    return request({
        url: 'user/followUser',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 删除文章
 * @param data
 */
export function articleDel(data) {
    return request({
        url: 'article/articleDel',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 删除评论或回复
 * @param data
 */
export function commentsDel(data) {
    return request({
        url: 'article/commentsDel',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 删除评论或回复
 * @param data
 */
export function articleDetail(data) {
    return request({
        url: 'article/articleDetail',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 根据评论ID获取评论详情
 * @param data
 */
export function commentsDetail(data) {
    return request({
        url: 'article/commentsDetail',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
