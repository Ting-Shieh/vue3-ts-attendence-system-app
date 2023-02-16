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
    <el-table :data="pageCheckList" style="width:100%;" border>
      <el-table-column prop="applicantname" label="申請人" width="120"></el-table-column>
      <el-table-column prop="reason" label="審批事由" width="150"></el-table-column>
      <el-table-column prop="time" label="時間">
        <template #default="scope">
          {{ scope.row.time.join('-') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="備註"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="success" size="small" icon="check" @click="handlePutApply(scope.row._id, '已通过')" circle />
          <el-button type="danger" size="small" icon="close" @click="handlePutApply(scope.row._id, '未通过')" circle />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="狀態" width="120"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="checkList.length"
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
import { ElMessage } from 'element-plus'

const store =useStore()
const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')
const pageSize = ref(10)
const pageCurrent = ref(1)
const usersInfos = computed(() => store.state.users.infos)
const checkList = computed(() => store.state.checks.checkList.filter(
  (item) => 
  (item.state === approverType.value || approverType.value === defaultType) &&
  ((item.note as string).includes(searchWord.value))
))
const pageCheckList = computed(() => checkList.value.slice(
  (pageCurrent.value-1)*pageSize.value,
  (pageCurrent.value*pageSize.value)
))

const handleDialogOpen = () => {
  console.log('')
}
const handlePageChange = (page: number) => {
  pageCurrent.value = page
}
const handlePutApply = (_id: string, state: '已通过'|'未通过') => {
  store.dispatch('checks/putApply', {_id, state}).then(res=>{
    if(!res.data.errorcode){
      store
        .dispatch('checks/getApply', { approverid: usersInfos.value._id })
        .then((res) => {
          if (res.data.errcode === 0) {
            store.commit('checks/updateCheckList', res.data.rets)
          }
        })
      ElMessage.success('審批成功')
    }
  })
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
