<template>
    <div class="page-container">
        <div class="page page-gallery">
            <nav-bar title="相册"/>
            <div class="page-content">
                <div class="preview-img-list">
                    <img class="preview-img-item" v-for="item,index in items" :src="item.src" v-if="items.length > 0 && index < 1" @click="$photoswipe.open(index, items)">
                </div>
            </div>
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
                serverPath:'http://115.29.150.218/static/images/',
                items: [],
            }
        },
        components:{
            NavBar,
        },
        methods:{
            getImageList:function(){
                Tool.get('album/'+this.albumInfo.albumId,{},(data)=>{
                    if(data.code == 200){
                        data.data.list.forEach((v,i)=>{
                            if(i > 0){
                                this.items.push({
                                    src: this.serverPath + v.picUrl,
                                    w: 100,
                                    height: 200,
                                })
                            }
                        })
                        this.$nextTick(()=>{
                            this.$photoswipe.open(0, this.items);
                        })
                    }
                })
            },
        },
        mounted: function(){
            
        },
        activated:function(){
            this.albumInfo = this.$route.query;
            this.getImageList();
        },
        deactivated:function(){
            this.items = [];
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
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>