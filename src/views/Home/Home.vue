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
</style>
