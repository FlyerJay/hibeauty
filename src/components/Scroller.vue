<template>
    <div class="wrapper" ref='wrapper'>
        <div class="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import '../js/iscroll';
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
            if(!$.isEmptyObject(this.mySroller)){
                this.mySroller.on('scrollEnd',function(){});
                this.mySroller = {};
            }
            this.mySroller = new IScroll(this.$el,{
                probeType: 2,
                scrollX: true,
                scrollY: true,
                mouseWheel: true,
                isPullToRefresh: true,
                click:true,
                tap:true,
            })
            this.active = true;
            this.mySroller.on('scrollEnd',function(e){
                self.scrollerInfo.y = this.y;
            })
        },
        beforeDestroy:function(){
            this.mySroller = {};//卸载组件
            this.mySroller.on('scrollEnd',function(){});
            this.scrollerInfo.y = 0;
        }
    }
</script>
<style lang="less" scoped>
    .wrapper{
        overflow:hidden;
        width:100%;
        height:100%;
    }
</style>