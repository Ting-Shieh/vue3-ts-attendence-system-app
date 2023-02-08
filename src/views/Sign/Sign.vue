<template>
  <el-descriptions
    direction="vertical"
    :column="9"
    border
  >
    <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
    <el-descriptions-item label="正常出勤"></el-descriptions-item>
    <el-descriptions-item label="曠工"></el-descriptions-item>
    <el-descriptions-item label="漏打卡"></el-descriptions-item>
    <el-descriptions-item label="遲到"></el-descriptions-item>
    <el-descriptions-item label="早退"></el-descriptions-item>
    <el-descriptions-item label="遲到並早退"></el-descriptions-item>
    <el-descriptions-item label="操作">
      <el-button type="primary" size="small" plain>查看詳情</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="考勤狀態">
      <el-tag type="danger" size="small">異常</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  <el-calendar v-model="date">
    <template #header>
      <el-button type="primary">在線簽到</el-button>
      <el-space>
        <el-button plain>{{year}}年</el-button>
        <el-select v-model="month">
          <el-option
            v-for="item in 12"
            :key="item"
            :value="item"
            :label="`${item}月`"
          />
        </el-select>
      </el-space>
    </template>
  </el-calendar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin: 10px;
}
.el-select{
  width: 80px;
}
</style>
