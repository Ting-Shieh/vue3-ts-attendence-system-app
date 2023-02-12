<template>
  <div class="apply-title">
    <el-button type="primary">新增審批</el-button>
    <el-space class="">
      <el-input placeholder="請輸入搜索關鍵字"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="待審批"></el-radio-button>
        <el-radio-button label="已通過"></el-radio-button>
        <el-radio-button label="未通過"></el-radio-button>
      </el-radio-group>
    </el-space>
  </div>
  <div class="apply-table">
    <el-table :data="applyList" style="width:100%;" border>
      <el-table-column prop="applicantname" label="申請人" width="150"></el-table-column>
      <el-table-column prop="reason" label="審批事由" width="150"></el-table-column>
      <el-table-column prop="time" label="時間"></el-table-column>
      <el-table-column prop="note" label="備註"></el-table-column>
      <el-table-column prop="approvername" label="審批人" width="150"></el-table-column>
      <el-table-column prop="state" label="狀態" width="150"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const approverType = ref('全部')
const applyList = computed(() => store.state.checks.applyList)
</script>
<style lang="scss" scoped>
.apply-title{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table{
  margin: 20px;
}
</style>
