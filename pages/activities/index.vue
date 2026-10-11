<template><BeautyScreen ref="screen" page="activities" :query="query"/></template>
<script>
import BeautyScreen from '../../components/BeautyScreen.vue'
import { shareToFriend, shareToTimeline } from '../../common/wechat-share.js'
export default { components:{BeautyScreen}, data(){return {query:{},ready:false}}, onLoad(query){this.query=query},onReady(){this.ready=true},onShow(){if(this.ready)this.$nextTick(()=>this.$refs.screen?.refresh())},
// #ifdef MP-WEIXIN
onShareAppMessage(){return shareToFriend('activities',this.$refs.screen)},
onShareTimeline(){return shareToTimeline('activities',this.$refs.screen)}
// #endif
}
</script>
