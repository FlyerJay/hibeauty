<template>
    <div class="collection">
        <bottom-tab></bottom-tab>
    </div>
</template>
<script>
import BottomTab from "../../component/bottomtab";
import RefreshPage from "../../component/refreshpage";
export default {
    components: {
        BottomTab,
        RefreshPage
    }
}
</script>
<style scoped lang="less">
    .collection{
        min-height: 100%;
        background-color: #f1f1f1;
    }
</style>


