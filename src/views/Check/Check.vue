<template>
  <div class="check-title">
    <el-button type="primary" @click="handleDialogOpen">新增審批</el-button>
    <el-space class="">
      <el-input v-model="searchWord" placeholder="請輸入搜索關鍵字"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部">全部</el-radio-button>
        <el-radio-button label="待审批">待審批</el-radio-button>
        <el-radio-button label="已通过">已通過</el-radio-button>
        <el-radio-button label="未通过">未通過</el-radio-button>
      </el-radio-group>
    </el-space>
  </div>
  <div class="check-table">
    <el-table :data="checkList" style="width:100%;" border>
      <el-table-column prop="applicantname" label="申請人" width="120"></el-table-column>
      <el-table-column prop="reason" label="審批事由" width="150"></el-table-column>
      <el-table-column prop="time" label="時間">
        <template #default="scope">
          {{ scope.row.time.join('-') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="備註"></el-table-column>
      <el-table-column label="操作" width="120">
        
      </el-table-column>
      <el-table-column prop="state" label="狀態" width="120"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="10"
      :page-size="pageSize"
      @current-change="handlePageChange"
      small
      background
    ></el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import {useStore} from '@/store'

const store =useStore()
const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')
const pageSize = ref(10)
const pageCurrent = ref(1)
const checkList = computed(() => store.state.checks.checkList)

const handleDialogOpen = () => {
  console.log('')
}
const handlePageChange = (page: number) => {
  pageCurrent.value = page
}
</script>
<style lang="scss" scoped>
.check-title{
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.check-table{
  margin: 20px;
  .el-pagination{
    float: right;
    margin: 10px;
  }
}
</style>
