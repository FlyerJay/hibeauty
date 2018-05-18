<template>
    <div class="album" flex="dir:top box:mean">
        <div class="cover" flex="dir:top box:mean">
            <img v-lazy="serverPath+item.albumCover" alt="">
        </div>
        <div class="title">{{item.albumName}}</div>
    </div>
</template>
<script>
    export default {
        data () {
            return{
                serverPath:'http://www.snowyet.cc/static/images/'
            }
        },
        props:{
            item:{
                type:Object,
                default:function(){
                    return {};
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .album{
        width:100%;
        height:100%;
        position:relative;
        border:1px solid #cfcfcf;
        box-shadow:1px 1px 3px #ccc;
        .title{
            background-color:black;
            opacity:0.6;
            color:#fff;
            font-size:0.51rem;
            padding:0.1rem 0.2rem;
            position:absolute;
            bottom:0;
            height:1.2rem;
        }
    }
</style>