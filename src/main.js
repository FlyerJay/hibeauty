import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './js/jquery.js';
import 'flex.css';//主要使用flex.css布局，避免各种滚动条的计算
import 'normalize.css';
import './style/base.css';
import './style/iconfont.less';
import Tool from './utils/Tool';
import './utils/Tap';
const FastClick = require('fastclick')
Vue.use(MintUI);

$(function(){
	FastClick.attach(document.body)//移动端添加fastClick支持
})

document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
$(window).on("resize",function(){//当窗口发生变化时更新基础字体大小
  document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
})

router.beforeEach((to,from,next)=>{
  const pageStack = store.getters.pageStack;
  const toIndex = getIndex(pageStack, to.path);
  const toPath = to.path;
  const toName = to.name;
  Tool.clearRequestPool();//切换页面的时候把上一个页面的请求全部中断掉
  if(toIndex == -1){
    store.commit('SET_MODE','push');
    store.commit('PUSH_PAGE',{path:toPath,index:pageStack.length,name:toName});
    goFoward(to,from,next);
  }else if(toIndex === -2){
    store.commit('SET_MODE','pop');
    store.commit('CLEAR_PAGE');//保证把前面的页面全部弹出页面栈
    next();
  }else if(toIndex === -3){//防止一个页面两次入栈
    return;
  }else{//把页面弹出栈
    store.commit('SET_MODE','pop');
    store.commit('POP_PAGE',pageStack.length - toIndex - 1);
    goBack(to,from,next);
  }
})

function goBack(to,from,next){
  if(to.name == 'register'){//防止登录过后返回时回到注册页或登录页
    router.go(-2)
    next();
  }else if(to.name == 'login' && from != 'register'){
    router.go(-1)
    next();
  }else{
    next();
  }
}

function goFoward(to,from,next){
    next();
}

function getIndex (list,path){
  if(path == '/' || path == '/maintainset' || !path){
    return -2;
  }
  for(var i = 0; i < list.length; i++){
    if(path == list[i].path){
      break;
    }
  }
  if(i == list.length-1){
    return -3;
  }else if(i<list.length){
    return i;
  }
  return -1;
}

new Vue({
  el: '#pagecontainer',
  router,
  store,
  template: '<App/>',
  components: { App }
})
