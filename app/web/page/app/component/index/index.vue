<template>
</template>
<script>
    export default {
        computed: {
            albumList() {
                return this.$store.state.albumList;
            }
        },
        preFetch({ state, dispatch, commit }) {
            return Promise.all([
                dispatch('FETCH_ALBUM_LIST', {page: 1, pageSize: 20})
            ])
        }
    }
</script>