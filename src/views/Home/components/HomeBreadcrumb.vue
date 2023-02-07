<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
    >{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const breadcrumbs = computed(() => route.matched)
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
