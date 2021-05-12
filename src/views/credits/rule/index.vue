  <!-- 积分规则 -->
<template>
  <div class="rule" >
    <pageHeader title="积分规则"></pageHeader>

    <main id="main">
      <div class="howGotIntegral" v-for="(item, index) in howGot" :key="index">
        <h1>{{item.theme}}</h1>
        <ul>
          <li v-for="(it, num) in  item.child" :key="num">
              <h2>{{it.header}}</h2>
              <p v-for="i in it.list" :key="i.title">
                <span>{{i.title}}</span>
                <b>+{{i.addNum}}</b>
              </p>
          </li>
        </ul>
      </div>

      <div class="positiveInteraction howGotIntegral" >
        <!--<h1>header</h1>-->
        <ul>
          <li >
            <h2>社区积极互动</h2>
            <section>
              <span>每日签到</span>
            </section>
            <p>
              <span>第1天签到</span>
              <b>+5</b>
            </p>
            <p>
              <span>第2天签到</span>
              <b>+10</b>
            </p>
            <p>
              <span>第3天签到</span>
              <b>+15</b>
            </p>

            <nav>注： 中断则从第一天获取积分规则计算</nav>

            <section>
              <span>喜欢一次</span>
              <b>+1</b>
            </section>
            <nav>注： 中断则从第一天获取积分规则计算</nav>
            <section>
              <span>评论一条</span>
              <b>+2</b>
            </section>
            <nav>注： 每日最多可+10积分</nav>
            <section>
              <span>每日新增粉3个及以上</span>
              <b>+10</b>
            </section>
          </li>
        </ul>
      </div>

      <div class="howUseIntegral"  v-for="item in howUse" :key="item.header">
        <h1 >{{item.header}}</h1>
        <ul>
          <li v-for="(it, num) in item.child" :key="num+8">
            <h2>{{it.title}} </h2>
            <p v-for="(content, n) in it.list" :key="n">{{content.content}}</p>
          </li>
        </ul>
      </div>

      <div class="howUseIntegral isFailure" v-for="item in isFailure" :key="item.header">
        <h1>{{item.header}}</h1>
        <ul>
          <li v-for="(it, num) in item.child" :key="num">
            <p v-for="(content, n) in it.list" :key="n">{{content.content}}</p>
          </li>
        </ul>
      </div>

      <footer id="footer">本页内容仅供参考，最终解释权归上海开果传媒科技有限公司</footer>

    </main>
  </div>
</template>

<script>
import pageHeader from '../../../components/pageHeader'
export default {
  components: {
    pageHeader
  },
  data () {
    return {
      howGot: [
        {
          theme: '如何获取积分？',
          child: [
            {
              header: '注册成功',
              list: [
                {
                  title: '新用户注册成功',
                  addNum: 20
                }
              ]
            },
            {
              header: ' 完善个人主页',
              list: [
                {
                  title: '首次填写所有个人主页信息',
                  addNum: 20
                }
              ]
            },
            {
              header: '发布优质内容',
              list: [
                {
                  title: '首次发视频',
                  addNum: 20
                },
                {
                  title: '发布内容优质被加精',
                  addNum: 300
                }
              ]
            }
          ]
        }
      ],
      howUse: [
        {
          header: '如何使用积分？',
          child: [
            {
              title: '参与抽奖',
              list: [
                {
                  content: '进入「惊喜」中心，使用积分参与【积分抽奖】，赢取品质包包。'
                }
              ]
            },
            {
              title: '兑换礼品 ',
              list: [
                {
                  content: '进入「惊喜」中心，使用积分进行【兑换礼品】。'
                }
              ]
            },
            {
              title: '参与官方活动',
              list: [
                {
                  content: '进入「活动」频道，使用积分报名参加光芒官方线下活动，部分活动现场签到可给予相应积分奖励。（以当期活动说明为准）'
                }
              ]
            }
          ]
        }
      ],
      positiveInteraction: [
        {
          header: '积极社区互动',
          child: [
            {
              title: '每日签到',
              list: [
                {
                  content: '第1天签到',
                  addNum: 5,
                  type: 'default'
                },
                {
                  content: '第2天签到',
                  addNum: 10
                },
                {
                  content: '第3天签到',
                  addNum: 15
                }
              ],
              warning: '中断则从第一天获取积分规则计算'
            },
            {
              title: '喜欢一次',
              list: [],
              warning: '中断则从第一天获取积分规则计算'
            },
            {
              title: '每日签到',
              list: [
                {
                  content: '第1天签到',
                  addNum: 5,
                  type: 'default'
                },
                {
                  content: '第2天签到',
                  addNum: 10
                },
                {
                  content: '第3天签到',
                  addNum: 15
                }
              ],
              warning: '中断则从第一天获取积分规则计算'
            }
          ]
        }
      ],
      isFailure: [
        {
          header: '积分是否会失效？',
          child: [
            {
              list: [
                {
                  content: '积分有效期为5年，自积分入账年起至第五个公历年的\n' +
                    '12月31日止，逾期积分将自动失效。 按照积分入账先\n' +
                    '后顺序，优先消耗先入账的积分。\n' +
                    '例：2018年12月31日（含）前发放的积分统一从2018\n' +
                    '年12月31日开始计算有效期，2023年12月31日之后过\n' +
                    '期失效。'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
#main{
  .howGotIntegral{
    padding-top: 190px;
    h1{
      font-size: 20px;
      color: #2A2A2A;
      letter-spacing: 0;
      padding-left: 18px;
      font-weight: 500;
    }
    ul{
      margin-top: 12px;
      li{
        /*height: 81px;*/
        padding: 20px 15px 20px 18px;
        border-bottom: 1px solid #E6E6E6;
        h2{
          font-size: 15px;
          color: #2A2A2A;
          position: relative;
          padding-left: 12.5px;
          margin-bottom: 20px;
          &::before{
            content: '';
            position: absolute;
            width: 5px;
            height: 16px;
            background: #ED2A33;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        section{
          font-size: 14px;
          color: #2A2A2A;
          margin-left: 12px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
          b{
            font-weight: normal;
          }
        }
        p{
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #2A2A2A;
          padding-left: 12.5px;
          b{
            font-size: 14px;
            color: #2A2A2A;
            font-weight: normal;
          }
        }
        nav{
          font-size: 12px;
          color: #999999;
          margin-left: 12px;
          margin-top: 10px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .howUseIntegral{
    border-top: 15px solid #F6F6F6;
    border-bottom: 15px solid #F6F6F6;
    padding-top: 40px;
    h1{
      font-size: 20px;
      color: #2A2A2A;
      letter-spacing: 0;
      padding-left: 18px;
      font-weight: 500;
      /*padding-left: 18px;*/
    }
    ul{
      li{
        padding: 20px 15px 20px 18px;
        border-bottom: 1px solid #E6E6E6;
        h2{
          font-size: 15px;
          color: #2A2A2A;
          position: relative;
          padding-left: 12.5px;
          margin-bottom: 20px;
          &::before{
            content: '';
            position: absolute;
            width: 5px;
            height: 16px;
            background: #ED2A33;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        p{
          font-size: 14px;
          color: #2A2A2A;
          padding-left: 12.5px;
        }
      }
    }
  }

  .isFailure{
    border: none;
    ul{
      li{
        border: none;
      }
    }

  }

  .positiveInteraction{
    padding-top: 20px;
  }

  #footer{
    font-size: 11px;
    color: #999999;
    text-align: center;
    margin-top: 60px;
    padding-bottom: 20px;
  }
}
</style>
