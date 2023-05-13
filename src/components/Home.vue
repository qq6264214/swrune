<template>
<el-container class="total-container">
    <!-- <el-header class="t-header">
        <h2>本软件主要用于自用粗略筛选符文神器，搭配Summoners-War-Exporter获取的json进行使用</h2>
    </el-header>
    <el-container> -->
        <el-aside width="180px" > 
            <el-menu
        :default-active="onRoutes" 
        router
        class="el-menu-vertical-demo"   
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b" 
        style="height: 100vh;"
        > 
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="    float: left;" >
            <i class="el-icon-star-on"></i>
        {{ item.navItem }}
        </el-menu-item>
        </el-menu>
        </el-aside>

        <el-main>
            <router-view></router-view>
        </el-main>
    <!-- </el-container> -->
</el-container>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '1',
        navList:[
            {name:'/rune',navItem:'符文筛选'},
            {name:'/artifact',navItem:'神器筛选'},
            {name:'/rta',navItem:'RTA'},
        ]
        
      };
    },
    mounted(){
        // debugger
        // if(this.$router.path !== '/artifact'){
        //    this.$router.push('/rune')
        
        // }
    },
    computed:{
        onRoutes(){
            return this.$route.path
        }
    },
}
</script>
<style  scoped>
.t-header{
    background-color:#545c64
}


</style>>
