<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <home-aside></home-aside>
      </el-aside>
      <el-main>
        <home-breadcrumb></home-breadcrumb>
        <home-main></home-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import HomeAside from './components/HomeAside.vue'
import HomeBreadcrumb from './components/HomeBreadcrumb.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeMain from './components/HomeMain.vue'
</script>
<style lang="scss" scoped>
.el-header{
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
}
.el-aside{
  box-shadow: 2px 0px 8px 0px rgb(29 35 41 / 5%);
}
.el-main{
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}
</style>
