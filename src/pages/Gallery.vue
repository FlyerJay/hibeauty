<template>
    <div class="page-container">
        <div class="page page-gallery">
            <nav-bar
                :title="(index+1)+'/'+(imageList.length)"
            />
            <x-scroller>
                <div class="page-content">
                    <div class="image-container">
                        <img :src="serverPath + imageList[index].picUrl" alt="" v-if="imageList.length > 0">
                    </div>
                </div>
            </x-scroller>
        </div>
        <div class="toolbar" flex="dir:left box:mean cross:center">
            <div class="prev"><i class="iconfont icon-back" v-tap="prev"></i></div>
            <div class="picture-index" flex="dir:left main:center"></div>
            <div class="next" flex="dir:left main:right"><i class="iconfont icon-go" v-tap="next"></i></div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import XScroller from '../components/XScroller';
    export default{
        data () {
            return {
                title:'hiBeauty',
                albumInfo:{},
                serverPath:'http://www.flyerjay.date/static/images/',
                index:0,
                imageList:[],
            }
        },
        components:{
            NavBar,
            XScroller,
        },
        methods:{
            getImageList:function(){
                Tool.get('album/'+this.albumInfo.albumId,{},(data)=>{
                    if(data.code == 200){
                        this.imageList = data.data.list;
                        this.imageList.splice(0,1);
                    }
                })
            },
            prev:function(){
                if(this.index>0){
                    this.index--;
                }else{
                    this.index = this.imageList.length - 1;
                }
            },
            next:function(){
                if(this.index<this.imageList.length-1){
                    this.index++
                }else{
                    this.index = 0;
                }
            }
        },
        activated:function(){
            this.albumInfo = this.$route.query;
            this.getImageList();
        },
        deactivated:function(){
            this.imageList = [];
            this.index = 0;
        }
        
    }
</script>
<style lang="less" scoped>
    .page-container{
        position:relative;
        background-color:#000;
        .toolbar{
            position:absolute;
            height:2rem;
            width:100%;
            top:50%;
            margin-top:-1rem;
            z-index:2;
            .iconfont{
                font-size:1.5rem;
                color:rgba(255,255,255,0.5);
                background-color:rgba(0,0,0,0.2);
                border-radius:1.5rem;
                height:1.5rem;
                display:block;
                width:1.5rem;
                &:before{
                    position:relative;
                    top:-0.1rem;
                    left:-0.1rem;
                }
                &.icon-go:before{
                    left:0.1rem;
                }
            }
            .picture-index{
                font-size:0.8rem;
                color:rgba(0,0,0,0.5);
            }
        }
    }
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #000;
            .image-container{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                width:100%;
                img{
                    width:100%;
                }
            }
        }
    }
</style>