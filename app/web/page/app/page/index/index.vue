<template>
    <refresh-page :onLoading="onLoading" :isLoadAbel="isLoadAbel" :onRefresh="onRefresh" ref="refreshPage">
        <div class="album-list clearfix">
            <album v-for="(item, index) in albumList" :key="index" :cover="item.albumCover" :title="item.title" :albumId="item.albumId"></album>
            <div class="preview-img-list" style="display:none;">
                <img class="preview-img-item" v-for="(item, index) in album" :key="index" :src="item">
            </div>
        </div>
    </refresh-page>
</template>
<script>
    import Album from "../../component/album";
    import RefreshPage from "../../component/refreshpage";
    export default {
        data() {
            return {
                page: 1,
                pageSize: 30,
            }
        },
        components: {
            Album,
            RefreshPage
        },
        computed: {
            albumList() {
                return this.$store.state.albumList;
            },
            album() {
                return this.$store.state.album;
            },
            albumListTotal() {
                return this.$store.state.albumListTotal;
            },
            isLoadAbel() {
                return this.page * this.pageSize < this.albumListTotal;
            }
        },
        preFetch({ state, dispatch, commit }) {
            return Promise.all([
                dispatch('FETCH_ALBUM_LIST', {page: this.page})
            ])
        },
        mounted() { //强制刷新
            this.$bus.$on('refresh', () => {
                this.$refs.refreshPage && this.$refs.refreshPage.forceRefresh();
            });
            if(this.albumList.length === 0) {
                this.refreshAlbum();
            }
        },
        methods: {
            appendAlbum() { //添加到相册列表
                return this.$store.dispatch('FETCH_ALBUM_LIST', {page: ++this.page, append: true});
            },
            refreshAlbum() { //刷新相册列表
                this.page = 1;
                return this.$store.dispatch('FETCH_ALBUM_LIST', {page: this.page})
            },
            onLoading() {
                return this.appendAlbum();
            },
            onRefresh() {
                return this.refreshAlbum();
            }
        }
    }
</script>
<style scoped lang="less">
    .album-list{
        overflow-y: auto;
        background-color: #f7f7f7;
        min-height: 100vh;
    }
</style>
