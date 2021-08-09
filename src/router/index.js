import vue from 'vue'
import Router from 'vue-router'
// import { setCookie, getCookie } from '@/utils/cookie'
// import { isAndroid, isIOS } from '@/utils/platform'
vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/sharedynamic', // 分享的详情页 ()
      name: 'sharedynamic',
      component: (resolve) => {
        require(['@/views/dynamic/index'], resolve)
      }
    },
    {
      path: '/sharetopic', // 分享活动页
      name: 'sharetopic',
      component: (resolve) => {
        require(['@/views/shareTopic/index'], resolve)
      }
    },
    {
      path: '/common_problem', // 常见问题
      name: 'common_problem',
      component: (resolve) => {
        require(['@/views/commonProblem/index'], resolve)
      }
    },
    {
      path: '/changePhoneNumber', // 更改手机号
      name: 'changePhoneNumber',
      component: (resolve) => {
        require(['@/views/commonProblem/changePhoneNumber/index'], resolve)
      }
    },
    {
      path: '/avatarProblem', // 更改手机号
      name: 'avatarProblem',
      component: (resolve) => {
        require(['@/views/commonProblem/avatarProblem/index'], resolve)
      }
    }, {
      path: '/privacy', // 隐私政策
      name: 'privacy',
      component: (resolve) => {
        require(['@/views/aboutus/privacy/index'], resolve)
      }
    },
    {
      path: '/useRule', // 使用协议
      name: 'useRuleIos',
      component: (resolve) => {
        require(['@/views/aboutus/useRule/ios'], resolve)
      }
    }
    // {
    //   path: '/sharedetail', // 分享的详情页 ()
    //   name: 'sharedetail',
    //   component: (resolve) => {
    //     require(['@/views/sharedetail/index'], resolve)
    //   }
    // }, {
    //   path: '/detail', // 详情页()
    //   name: 'detail',
    //   component: (resolve) => {
    //     require(['@/views/detail/index'], resolve)
    //   }
    // }, {
    //   path: '/aboutus', // 关于我们
    //   name: 'aboutus',
    //   component: (resolve) => {
    //     require(['@/views/aboutus/index'], resolve)
    //   }
    // }, {
    //   path: '/communityRule', // 社区规则
    //   name: 'communityRule',
    //   component: (resolve) => {
    //     require(['@/views/aboutus/communityRule/index'], resolve)
    //   }
    // }, {
    //   path: '/useRule', // 使用协议(安卓)
    //   name: 'useRule',
    //   component: (resolve) => {
    //     require(['@/views/aboutus/useRule/index'], resolve)
    //   }
    // }, {
    //   path: '/useRuleIos', // 使用协议(ios)
    //   name: 'useRuleIos',
    //   component: (resolve) => {
    //     require(['@/views/aboutus/useRule/ios'], resolve)
    //   }
    // }, {
    //   path: '/privacy', // 隐私政策
    //   name: 'privacy',
    //   component: (resolve) => {
    //     require(['@/views/aboutus/privacy/index'], resolve)
    //   }
    // }, {
    //   path: '/surprise', // 惊喜首页(没有用到)
    //   name: 'surprise',
    //   component: (resolve) => {
    //     require(['@/views/surprise/index'], resolve)
    //   }
    // }, {
    //   path: '/surprise/introduce', // 惊喜介绍 (没用到)
    //   name: 'introduce',
    //   component: (resolve) => {
    //     require(['@/views/surprise/introduce/index'], resolve)
    //   }
    // }, {
    //   path: '/surprise/raiders', // 惊喜-攻略页(没用到)
    //   name: 'raiders',
    //   component: (resolve) => {
    //     require(['@/views/surprise/raiders/index'], resolve)
    //   }
    // }, {
    //   path: '/power/detail', // 能量值明细(没用到)
    //   name: 'powerDetail',
    //   component: (resolve) => {
    //     require(['@/views/power/detail/index'], resolve)
    //   }
    // }, {
    //   path: '/power/raking', // 能量值排行榜(没用到)
    //   name: 'powerRaking',
    //   component: (resolve) => {
    //     require(['@/views/power/raking/index'], resolve)
    //   }
    // }, {
    //   path: '/credits/mine', // 我的积分
    //   name: 'creditsMine',
    //   component: (resolve) => {
    //     require(['@/views/credits/mine/index'], resolve)
    //   }
    // }, {
    //   path: '/credits/rule', // 我的积分
    //   name: 'creditsRule',
    //   component: (resolve) => {
    //     require(['@/views/credits/rule/index'], resolve)
    //   }
    // }, {
    //   path: '/gift/creditsGiftDetail', // 积分礼物详情
    //   name: 'creditsGiftDetail',
    //   component: (resolve) => {
    //     require(['@/views/gift/creditsGiftDetail/index'], resolve)
    //   }
    // }, {
    //   path: '/sharePersonalPage', // 分享出去的个人主页
    //   name: 'sharePersonalPage',
    //   component: (resolve) => {
    //     require(['@/views/sharePersonalPage/index'], resolve)
    //   }
    // }, {
    //   path: '/lotteryDetail', // 抽奖明细页 (没用到)
    //   name: 'lotteryDetail',
    //   component: (resolve) => {
    //     require(['@/views/lotteryDetail/index'], resolve)
    //   }
    // }, {
    //   path: '/empty', // 抽奖明细页
    //   name: 'empty',
    //   component: (resolve) => {
    //     require(['@/views/empty'], resolve)
    //   }
    // }, {
    //   path: '/sharelottery', // 分享抽奖页
    //   name: 'sharelottery',
    //   component: (resolve) => {
    //     require(['@/views/sharelottery/index'], resolve)
    //   }
    // }, {
    //   path: '/shareactivity', // 分享活动页
    //   name: 'shareactivity',
    //   component: (resolve) => {
    //     require(['@/views/shareActivity/index'], resolve)
    //   }
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   // 进入页面之前，判断url有没有uid,有uid的页面，去抓token
//   if (to.query.uid && to.query.uid != getCookie('uid')) {
//     setCookie('uid', to.query.uid)
//     vue.$vux.toast.text('请在移动端22浏览')
//     let token = getCookie('token')
//     // 本地没有token，走交互获取
//     if (!token) {
//       vue.$vux.toast.text('请在移111动端浏览')
//       if (isAndroid()) {
//         let token = window.glamor.refreshAt()
//         setCookie('token', token)
//       } else if (isIOS()) {
//         vue.$device.JsBridge.callHandler('htmlCallAt', {}, (data) => {
//           let token = data
//           setCookie('token', token)
//         })
//       } else {
//         vue.$vux.toast.text('请在移动端浏览')
//       }
//     }
//   }
//   next()
// })

export default router
