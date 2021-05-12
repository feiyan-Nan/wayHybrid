<template>
  <div id="app">
    <transition name="myfade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less">
@import './styles/global';
html, body {
  width: 100%;
  height: 100%;
}
[v-cloak]{ display:none; }
#app {
  height: 100%;
  width: 100%;
  touch-action: none;
  font-family: "PingFangSC-Regular", "Avenir", Helvetica, Arial, sans-serif;
  /*// 解决iOS滑动页面底端抖动*/
  // -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ::-webkit-scrollbar {
    width: 0em;
  }
  ::-webkit-scrollbar:horizontal {
    height: 0em;
  }
}
img{
  width: 100%;
}
.myfade{
  position: absolute;
  left:0;
  right: 0;
}
.myfade-enter-active {
  transition: all 500ms ease;
}
.myfade-leave-active {
  transition: all 100ms cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.myfade-enter, .myfade-leave-to{
  left:0;
  right: 0;
  opacity: 0;
}
</style>
