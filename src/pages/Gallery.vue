<template>
    <div class="page-container">
        <div class="page page-gallery" flex="dir:top box:first">
            <nav-bar
                :title="albumInfo.albumName"
            />
            <div class="page-content" flex="dir:top">
                <div class="image-container" flex="dir:top">
                    <img :src="serverPath + imageList[index].picUrl" alt="" v-if="imageList.length > 0">
                </div>
            </div>
        </div>
        <div class="toolbar" flex="dir:left box:mean cross:center">
            <div class="prev" @click="prev"><i class="iconfont icon-back"></i></div>
            <div class="picture-index" flex="dir:left main:center">{{index+1}}/{{imageList.length}}</div>
            <div class="next" @click="next" flex="dir:left main:right"><i class="iconfont icon-go"></i></div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
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
            NavBar
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
            this.albumInfo = this.$route.params;
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
        .toolbar{
            position:absolute;
            height:2rem;
            width:100%;
            bottom:0;
            z-index:2;
            .iconfont{
                font-size:1.5rem;
                color:rgba(255,255,255,0.5);
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
            background-color: #fff;
            height:100%;
            overflow: auto;
            .image-container{
                width:100%;
                height:100%;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>