import Vue from 'vue';
import Vuex from 'vuex';
import Tool from '../utils/Tool'
Vue.use(Vuex)

const subscribeDefault = {
    carInfo:{
        plate:'',
        seriesName:'',
        vehicleTypeId:'',
    },
    time:'',
    showTime:'',
    fcmc:'',
    storeInfo:{
        id:'',
        storeName:'',
    },
    mile:'',
    contact:'',
    phone:'',
    description:''
}

const store = new Vuex.Store({
    state:{
        pageStack:[],
        mode:'push',
    },
    mutations:{
        SET_MODE:function(state,mode){
            state.mode = mode;
        },
        PUSH_PAGE:function(state,page){
            state.pageStack.push(page);
        },
        INSERT_PAGE:function(state,page,index){//往栈中插入一个页面。
            state.pageStack.splice(index,0,page);
        },
        POP_PAGE:function(state,number = 0){
            for(var i=0;i<number;i++){
                 state.pageStack.pop();
            }
        },
        CLEAR_PAGE:function(state){
            state.pageStack = [{name:'/',index:0}];
        },
        LOAD_DOWN:function(state){
            state.load = false;
        },
        LOADING:function(state){
            state.load = true;
        }
    },
    getters:{
        pageStack:function(state, getters){
            return state.pageStack;
        },
        prepage:function(state,getters){
            return state.pageStack[state.pageStack.length - 2];
        }
    },
    actions:{
        loadDown:function({commit,dispatch}){
            commit('LOAD_DOWN');
        },
        loading:function({commit,dispatch}){
            commit('LOADING');
        }
    },
    plugins:[
        (function(){
            return store => {
                store.subscribe(mutation=>{
                    if(mutation.type == 'LOADING'){
                        //console.log('数据加载中');
                    }
                    if(mutation.type == 'LOAD_DOWN'){//监听数据加载是否完成，可以写一些依赖于数据加载的方法
                        //console.log('本页数据加载完成');
                    }
                })
            }
        })()
    ]
})

export default store;