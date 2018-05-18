<template>
    <div class="page index-page">

    </div>
</template>
<script>
    import Album from '../album';
    export default {
        data () {
            return{
                page: 1,
                pageSize: 20,
                totalCount: 0,
                loading: false,
                items: [],
                serverPath: 'http://www.snowyet.cc/static/images/',
            }
        },
        computed: {
            albumList() {
                return this.$store.state.albumList;
            }
        },
        components:{
            Album
        },
        preFetch({ state, dispatch, commit }) {
            return Promise.all([
                dispatch('FETCH_ALBUM_LIST', {page: this.page, pageSize: this.pageSize})
            ])
        },
        mounted() {
            console.log(this.albumList);
        },
        methods: {

        },
    }
</script>
<style lang="less" scoped>

</style>