<template>
    <div class="album-list clearfix">
        <album v-for="(item, index) in albumList" :key="index" :cover="item.albumCover" :title="item.title"></album>
    </div>
</template>
<script>
    import Album from "../album";
    export default {
        components: {
            Album
        },
        computed: {
            albumList() {
                return this.$store.state.albumList;
            }
        },
        preFetch({ state, dispatch, commit }) {
            return Promise.all([
                dispatch('FETCH_ALBUM_LIST', {page: 1})
            ])
        },
        beforeMount() {
        }
    }
</script>
<style scoped lang="less">
    .album-list{
        overflow-y: auto;
    }
</style>
