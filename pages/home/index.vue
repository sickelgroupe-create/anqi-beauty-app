<template><BeautyScreen ref="screen" page="home" :query="query"/></template>
<script>
import BeautyScreen from '../../components/BeautyScreen.vue'
import { shareToFriend, shareToTimeline } from '../../common/wechat-share.js'
export default { components:{BeautyScreen}, data(){return {query:{},ready:false}}, onLoad(query){if(query.scene&&!query.invite)query.invite=decodeURIComponent(query.scene);this.query=query},onReady(){this.ready=true},onShow(){uni.hideTabBar({fail:()=>{}});if(this.ready)this.$nextTick(()=>this.$refs.screen?.refresh())},
// #ifdef MP-WEIXIN
onShareAppMessage(){return shareToFriend('home',this.$refs.screen)},
onShareTimeline(){return shareToTimeline('home',this.$refs.screen)}
// #endif
}
</script>

