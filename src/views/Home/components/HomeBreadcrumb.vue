<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.el-breadcrumb{
  background: #fff;
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 30px;
}
</style>
