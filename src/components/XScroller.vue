<template>
    <div class="wrapper" ref='wrapper'>
        <div class="x-scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import '../js/iscroll.zoom.js';
    export default{
        data () {
            return {
                mySroller:{},
                scrollerInfo:{
                    y:0,
                },
                active:false,
            }
        },
        props:{
            refMark:{
                type:String,
                default:''
            }
        },
        methods:{
            isPc:function(){
                var UA = navigator.userAgent;
                var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
                for (var i = 0;i < agents.length;i++){
                    if(UA.indexOf(agents[i])){
                        return false;
                    }
                }
                return true;
            }
        },
        updated:function(){
            var self = this;
            this.mySroller = new IScroll(this.$el,{
                zoom: true,
                mouseWheel: true,
                wheelAction: 'zoom',
                scrollX: true,
                scrollY: true,
            })
            this.active = true;
        },
        beforeDestroy:function(){
            this.mySroller = {};//卸载组件
        }
    }
</script>
<style lang="less" scoped>
    .wrapper{
        overflow:hidden;
        width:100%;
        height:100%;
        .x-scroller{
            width:101%;
            height:101%;
        }
    }
</style>