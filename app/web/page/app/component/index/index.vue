<template>
    <refresh-page :onLoading="onLoading" :isLoadAbel="isLoadAbel">
        <div class="album-list clearfix">
            <album v-for="(item, index) in albumList" :key="index" :cover="item.albumCover" :title="item.title" :albumId="item.albumId"></album>
            <div class="preview-img-list" style="display:none;">
                <img class="preview-img-item" v-for="(item, index) in album" :key="index" :src="item">
            </div>
        </div>
    </refresh-page>
</template>
<script>
    import Album from "../album";
    import RefreshPage from "../refreshpage";
    export default {
        data() {
            return {
                page: 1,
                pageSize: 60,
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
        mounted() {
        },
        methods: {
            appendAlbum() {
                return this.$store.dispatch('FETCH_ALBUM_LIST', {page: ++this.page, append: true});
            },
            refreshAlbum() {
                this.page = 1;
                this.$store.dispatch('FETCH_ALBUM_LIST', {page: this.page})
            },
            onLoading() {
                return this.appendAlbum();
            }
        }
    }
</script>
<style scoped lang="less">
    .album-list{
        overflow-y: auto;
    }
</style>
