export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/index'),
            redirect: 'login',
            children: [
                {
                    path: 'Settings',
                    name: 'Settings',
                    component: () => import('../views/index/Middle/Settings/Settings')
                },
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('../views/index/Middle/Home/Middle')
                },
                {
                    path: 'postDetail',
                    name: 'postDetail',
                    component: () => import('../views/index/Middle/PostDetail/Middle')
                },
                {
                    path: 'replyDetail',
                    name: 'replyDetail',
                    component: () => import('../views/index/Middle/replyDetail/Middle')
                },
                {
                    path: 'followList',
                    name: 'followList',
                    component: () => import('../views/index/Middle/followList/Middle')
                },
                {
                    path: 'topicDetail',
                    name: 'topicDetail',
                    component: () => import('../views/index/Middle/topicDetail/Middle')
                },
                {
                    path: 'discover',
                    name: 'discover',
                    component: () => import('../views/index/Middle/Discover/Middle')
                },
                {
                    path: 'invitationCode',
                    name: 'invitationCode',
                    component: () => import('../views/index/Middle/invitationCode/Middle')
                },
                {
                    path: 'others',
                    name: 'others',
                    component: () => import('../views/index/Middle/others/Middle'),
                    redirect: 'others/posts',
                    children: [
                        {
                            path: 'posts',
                            name: 'otherPosts',
                            component: () => import('../views/index/Middle/others/views/posts/Posts'),
                        },
                        {
                            path: 'NFTS',
                            name: 'otherNFTS',
                            component: () => import('../views/index/Middle/others/views/NFTS/NFTS')
                        }
                    ]
                },
                {
                    path: 'me',
                    name: 'me',
                    component: () => import('../views/index/Middle/me/Middle'),
                    redirect: 'me/posts',
                    children: [
                        {
                            path: 'posts',
                            name: 'posts',
                            component: () => import('../views/index/Middle/me/views/posts/Posts'),
                        },
                        {
                            path: 'NFTS',
                            name: 'NFTS',
                            component: () => import('../views/index/Middle/me/views/NFTS/NftMessages')
                        }
                    ]
                },
            ]
        },
        // // ------------------------- login -----------------------
        {
            path: '/login',
            name: 'login',
            redirect: 'login/loginHome',
            component: () => import('../views/login/index'),
            children: [{
                path: 'loginHome',
                name: 'loginHome',
                component: () => import('../views/login/home/LogMode')
            }, {
                path: 'wallet',
                name: 'wallet',
                component: () => import('../views/login/wallet/LogMode')
            }, {
                path: 'email',
                name: 'email',
                component: () => import('../views/login/email/LogMode')
            }, {
                path: 'verify',
                name: 'verify',
                component: () => import('../views/login/verificationCode/LogMode')
            }, {
                path: 'password',
                name: 'password',
                component: () => import('../views/login/Password/LogMode')
            }]
        },
        {
            path: '/msg',
            name: 'msg',
            component: () => import('../views/msg/index')
        },
        //    --------------------- test ---------------------
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/Test')
        },
    ]
}
