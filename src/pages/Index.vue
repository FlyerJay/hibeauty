<template>
    <div class="page-container">
        <div class="page index-page" flex="dir:top">
            <div class="page-content" >
                <scroller>
                    <div class="album-list clearfix">
                        <div class="album-item" v-for="(item,index) in albumList" v-tap="viewAlbum.bind(this,item)">
                            <album :item="item"></album>
                        </div>
                    </div>
                    <div class="load-cotainer" v-if="pageSize * page < totalCount">
                        <div class="loading" flex="dir:left cross:center main:center" v-if="loading">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                        <div class="load-more" v-tap="loadMore" v-else="loading">加载更多</div>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>
<script>
    import Album from '../components/Album';
    import Scroller from  '../components/Scroller';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return{
                albumList:[],
                page:1,
                pageSize:20,
                totalCount:0,
                loading:false,
            }
        },
        components:{
            Album,
            Scroller
        },
        updated:function(){
            if(this.$children[0].active){
                this.$children[0].mySroller.scrollTo(0,this.$children[0].scrollerInfo.y);
            }
        },
        methods:{
            getAlbum:function(){
                Tool.get('album',{
                    page:this.page,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.albumList = data.data.list;
                        this.totalCount = data.pageinfo.totalCount;

                    }
                })
            },
            viewAlbum:function(item){
                this.$router.push({path:'/gallery',query:item})
            }, 
            loadMore:function(){
                this.page ++;
                this.loading = true;
                Tool.get('album',{
                    page:this.page,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.albumList = this.albumList.concat(data.data.list);
                        this.totalCount = data.pageinfo.totalCount;
                        this.loading = false;
                    }
                })
            }      
        },
        created:function(){
            this.getAlbum();
        }
    }
</script>
<style lang="less" scoped>
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #fff;
            height:100%;
            overflow: auto;
            .album-list{
                padding:0.3rem;
                .album-item{
                    height:10rem;
                    width:49%;
                    float:left;
                    margin-bottom:0.3rem;
                    &:nth-child(2n){
                        margin-left:2%;
                    }
                }
            }
            .load-cotainer{
                height:1.5rem;
                background-color:#fff;
                line-height:1.5rem;
                .load-more{
                    width:100%;
                    text-align:center
                }
            }
        }
    }
</style>