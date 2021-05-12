<template>
  <div class="root" ref="root">
    <div class="top">
      <div class="left">
        <p class="name">Glamor大奖</p>
        <p class="time">2018.11.7-11.21</p>
      </div>
      <div class="raking">
        <div class="img-wrap">
          <img src="../../assets/zan@3x.png" alt="">
        </div>
        1158<sub>名</sub>
      </div>
    </div>
    <div class="main">
      <div class="banner">
        <div class="root-img">
          <img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg" alt="">
        </div>
        <div class="cover-img">
          <img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg" alt="">
        </div>
        <div class="mask"></div>
      </div>
      <div class="title">膜拜电动助力车E-Bike</div>
      <div class="intro">身随心“动”，加速就是动动指头的事</div>
      <div class="task-progress">
          <div class="left">
            <div class="img-wrap">
              <img src="../../assets/zan@3x.png" alt="">
            </div>
          </div>
          <div class="process-wrap">
            <div class="tips">500/1500</div>
            <div class="outer-wrap">
              <div class="inner-wrap"></div>
            </div>
          </div>
          <div class="right">
            <div class="btn">做任务</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.root.offsetHeight)
    })
  }
}
</script>

<style lang="less" scoped>
  .root{
    padding: .373333rem;
    height: 10.24rem;
    background: #f1f1f1;
    .top{
      overflow: hidden;
      height: .96rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        padding-left: 10px;
        border-left: 3px solid #000;
        .name{
          font-size: 18px;
          line-height: 25px;
          color: #000;
        }
        .time{
          font-size: 12px;
          line-height: 12px;
          color: #000;
        }
      }
      .raking{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        .img-wrap{
          width: 20px;
          height: 20px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        sub {
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .main{
      margin-top: 10px;
      .banner{
        position: relative;
        .root-img{
        }
        .cover-img{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 11;
          opacity: 0.6;
        }
        img{
          width: 100%;
        }
      }
      .title{
        margin-top: .426667rem;
        font-size: 16px;
        color: #000;
        line-height: 16px;
      }
      .intro{
        margin-top: 12px;
        line-height: 12px;
        font-size: 12px;
        color: #7b7b7b;
      }
      .task-progress{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          .img-wrap{
            width: 20px;
            height: 20px;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .process-wrap{
          height: 20px;
          width: 5.266667rem;
          .tips{
            flex: 0 0 50px;
            font-size: 12px;
            color: #7b7b7b;
            margin-bottom: 2px;
          }
          .outer-wrap{
            background: rgba(185, 164, 185, 0.2);
            width: 100%;
            height: 6px;
            border-radius: 5px;
            .inner-wrap{
              width: 60%;
              height: 100%;
              border-radius: 5px;
              background-image: linear-gradient(-90deg, #B6A9F6 0%, #A7EDF6 100%);
            }
          }
        }
        .right{
          border-left: 1px solid #d8d8d8;
          padding-left: 20px;
          .btn{
            width: 55px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            color: #b2b9f6;
            border: 1px solid #B2B9F6;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>

