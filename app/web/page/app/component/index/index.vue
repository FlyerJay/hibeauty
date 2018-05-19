<template>
    <div class="album-list clearfix">
        <album v-for="(item, index) in albumList" :key="index" :cover="item.albumCover" :title="item.title" :albumId="item.albumId"></album>
        <div class="preview-img-list" style="display:none;">
            <img class="preview-img-item" v-for="(item, index) in album" :key="index" :src="item">
        </div>
    </div>
</template>
<script>
    import Album from "../album";
    export default {
        data() {
            return {
                page: 1,
            }
        },
        components: {
            Album
        },
        computed: {
            albumList() {
                return this.$store.state.albumList;
            },
            album() {
                return this.$store.state.album;
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
                this.$store.dispatch('FETCH_ALBUM_LIST', {page: ++this.page, append: true});
            },
            refreshAlbum() {
                this.page = 1;
                this.$store.dispatch('FETCH_ALBUM_LIST', {page: this.page})
            }
        }
    }
</script>
<style scoped lang="less">
    .album-list{
        overflow-y: auto;
    }
</style>
