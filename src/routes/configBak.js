export default {
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home'
        },
        // ----------------------- home ------------------------
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home/home/index')
        },
        {
            path: '/NFTS',
            name: 'NFTS',
            component: () => import('../views/Home/repily1/index')
        },
        {
            path: '/repily2',
            name: 'repily2',
            component: () => import('../views/Home/repily2/index')
        },
        {
            path: '/comment',
            name: 'comment',
            component: () => import('../views/Home/Comment/index')
        },
        // ------------------------- login -----------------------
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login')
        },
        {
            path: '/wallet',
            name: 'wallet',
            component: () => import('../views/login/wallet/login')
        },
        {
            path: '/email',
            name: 'email',
            component: () => import('../views/login/email/login')
        },
        //     ----------------------- profile ------------------------
        {
            path: '/me',
            name: 'me',
            component: () => import('../views/profile/me/index'),
            redirect: 'me/posts',
            children: [
                {
                    path: 'posts',
                    name: 'posts',
                    component: () => import('../views/profile/me/views/posts/Posts'),
                },
                {
                    path: 'NFTS',
                    name: 'NFTS',
                    component: () => import('../views/profile/me/views/NFTS/NFTS')
                }
            ]
        },
        {
            path: '/others',
            name: 'others',
            redirect: 'others/posts',
            component: () => import('../views/profile/others/index'),
            children: [
                {
                    path: 'posts',
                    name: 'otherPosts',
                    component: () => import('../views/profile/others/views/posts/Posts'),
                },
                {
                    path: 'NFTS',
                    name: 'otherNFTS',
                    component: () => import('../views/profile/others/views/NFTS/NFTS')
                }
            ]
        },
        {
            path: '/Settings',
            name: 'Settings',
            component: () => import('../views/Settings/index')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/Test')
        }
    ]
}
