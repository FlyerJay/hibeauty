/**
 * @author flyerjay
 */
import Vue from 'vue';

const Util = {
    tapInfo:{
        x1:null,
        y1:null,
        x2:null,
        y2:null,
        detalX:0,
        detalY:0,
        time:0,
        lastTime:0,
    },
    isPc(){
        var UA = navigator.userAgent;
        var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
        for (var i = 0;i < agents.length;i++){
            if(UA.indexOf(agents[i]) > 0){
                return false;
            }
        }
        return true;
    },
    onTouchStart(e){
        if(new Date().getTime() - this.tapInfo.lastTime < 250) return false;//tap在0.2后才能再次触发，避免在翻页的时候出现连续点击导致页面出错
        var touches = e.touches[0];
        this.tapInfo.x1 = touches.pageX;
        this.tapInfo.y1 = touches.pageY;
        this.tapInfo.time = new Date().getTime();
    },
    onTouchEnd(e){
        var touches = e.changedTouches[0];
        this.tapInfo.x2 = touches.pageX;
        this.tapInfo.y2 = touches.pageY;
        var time = new Date().getTime() - this.tapInfo.time;
        var absX = Math.abs(this.tapInfo.x2 - this.tapInfo.x1);
        var absY = Math.abs(this.tapInfo.y2 - this.tapInfo.y1);
        if(absX < 20 && absY < 20 && time < 200){//严格点击判断条件，避免多次点击的坑
            this.tapInfo.lastTime = new Date().getTime();
            return true;
        }
        return false;
    },
}

const Tap = {
    bind:function(el,binding){
        el.handler = function(e){
            var value = binding.value;
            if(!value && el.href && !binding.modifiers.prevent){
                return window.location = el.href;
            }
            if(typeof value === 'function'){
                value.call(this,value);
            }else{
                console.error('v-tap only support function params now')
            }
        }
        if(Util.isPc()){
            el.addEventListener('click',function(e){
                if (binding.modifiers.stop)
                    e.stopPropagation();
                if (binding.modifiers.prevent)
                    e.preventDefault();
                el.handler(e)
                
            },false)
        }else{
            el.addEventListener('touchstart',(e)=>{
                if (binding.modifiers.stop)
                    e.stopPropagation();
                if (binding.modifiers.prevent)
                    e.preventDefault();
                Util.onTouchStart(e);
            },false);
            el.addEventListener('touchend',(e)=>{
                e.preventDefault();
                var flag = Util.onTouchEnd(e)
                if(flag){
                    el.handler(e)
                }else{
                    return false;
                }
            },false);
        }
    },
    unbind:function(el){
        el.handler = function(){}
        el.addEventListener('touchstart',function(){},false);
        el.addEventListener('touchend',function(){},false);
    }
}

Vue.directive('tap',Tap);