<template>
  <div>
    <router-view></router-view>
    <TabBar :data="tabbarData" />
  </div>
</template>
<script>
import TabBar from "../components/TabBar.vue"
export default {
name:"index",
data(){
  return{
    tabbarData:[
      {title:'首页',icon:"home",path:"/home"},
      {title:'订单',icon:"file-text-o",path:"/order"},
      {title:'我的',icon:"user",path:"/me"}
    ]

  }
},
components:{
  TabBar
}
}
</script>
<style >
.index{
  width: 100%;
  height: calc(100%-45px);
}
</style>