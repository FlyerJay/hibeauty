<template>
    <img class="album" :src="'http://www.snowyet.cc/static/images/' + cover" :alt="title">
</template>
<script>
export default {
    props: ['albumId', 'cover', 'title'],
    data () {
        return {
            staticURI: "http://www.snowyet.cc/static/images/"
        }
    }
}
</script>
<style scoped lang="less">
    @import "../../../../asset/style/mixin-px.less";
    .album{
        float: left;
        width: 33%;
        .px2rem(margin-top, 5);
        &:nth-child(3n + 2), &:nth-child(3n) {
            margin-left: 0.5%;
        }
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            .px2rem(margin-top, 0);
        }
    }
</style>

