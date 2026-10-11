<template><BeautyScreen ref="screen" page="product" :query="query"/></template>
<script>
import BeautyScreen from '../../components/BeautyScreen.vue'
import { shareToFriend, shareToTimeline } from '../../common/wechat-share.js'
export default { components:{BeautyScreen}, data(){return {query:{},ready:false}}, onLoad(query){this.query=query},onReady(){this.ready=true},onShow(){if(this.ready)this.$nextTick(()=>this.$refs.screen?.refresh())},
// #ifdef MP-WEIXIN
onShareAppMessage(){return shareToFriend('product',this.$refs.screen)},
onShareTimeline(){return shareToTimeline('product',this.$refs.screen)}
// #endif
}
</script>
