<template>
  <el-descriptions
    direction="vertical"
    :column="9"
    border
  >
    <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
    <el-descriptions-item
    v-for="(value, key) in DetailKey"
    :key="key"
    :label="value">{{detailValue[key]}}</el-descriptions-item>
    <el-descriptions-item label="操作">
      <el-button type="primary" size="small" plain @click="goToException">查看詳情</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="考勤狀態">
      <el-tag :type="detailState.type" size="small">{{ detailState.text }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  <el-calendar v-model="date">
    <template #header>
      <el-button type="primary" @click="singOnLine">在線簽到</el-button>
      <el-space>
        <el-button plain>{{year}}年</el-button>
        <el-select v-model="month" @change="handleChange">
          <el-option
            v-for="item in 12"
            :key="item"
            :value="item"
            :label="`${item}月`"
          />
        </el-select>
      </el-space>
    </template>
    <template #date-cell="{ data }">
      <div class="">
        {{ renderDate(data.day) }}
      </div>
      <div class="show-time">
        {{ renderTime(data.day) }}
      </div>
    </template>
  </el-calendar>
</template>
<script lang="ts" setup>
import { toZero } from '@/utils/commons'
import {useRouter} from 'vue-router'
import { ref, reactive, computed, watchEffect } from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useStore()

const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)
const signsInfos = computed(() => store.state.signs.infos)
const usersInfos = computed(() => store.state.users.infos)

enum DetailKey {
  normal = '正常出勤',
  absent = '曠工',
  miss = '漏打卡',
  late = '遲到',
  early = '早退',
  lateAndEarly = '遲到並早退'
}
enum DetailKeyCN {
  normal = '正常出勤',
  absent = '旷工',
  miss = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退'
}
const detailValue = reactive({
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0
})
const detailState = reactive({
  type: 'success' as 'success' | 'danger',
  text: '正常' as '正常' | '異常'
})
watchEffect((reset) => {
  const detailMonth = ((signsInfos.value.detail as {[index: string]: unknown})[toZero(month.value)] as {[index: string]: unknown});
  // console.log(detailMonth)
  for(const key in detailMonth) {
    // console.log(detailMonth[key])
    switch (detailMonth[key]) {
      case DetailKeyCN.normal: 
        detailValue.normal++
        break;
      case DetailKeyCN.absent: 
        detailValue.absent++
        break;
      case DetailKeyCN.miss: 
        detailValue.miss++
        break;
      case DetailKeyCN.late: 
        detailValue.late++
        break;
      case DetailKeyCN.early: 
        detailValue.early++
        break;
      case DetailKeyCN.lateAndEarly: 
        detailValue.lateAndEarly++
        break;
    }
  }
  // 考勤狀態
  for(const key in detailValue){
    if(key !== 'normal' && detailValue[key as keyof typeof detailValue] !== 0){
      detailState.type = 'danger'
      detailState.text = '異常'
    }
  }
  reset(()=> {
    detailState.type = 'success'
    detailState.text = '正常'
    for(const key in detailValue) {
      detailValue[key as keyof typeof detailValue] = 0
    }
  })
})
const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
const goToException = () => {
  router.push({
    path: '/exception',
    query: { month: month.value }
  })
}

const renderDate = (d: string) => {
  return d.split('-')[2]
}
const renderTime = (d: string) => {
  // // console.log(Object.keys((signsInfos.value.time as { [index: string]: unknown })))
  const [, res_month, res_date] = d.split('-')
  // const result = ((signsInfos.value.time as {[index: string]: unknown})[res_month] as {[index: string]: unknown})[res_date]
  
  // if ( Array.isArray(result)){
  //   return result.join('-')
  // } else {
  //   return ['test', 'test2']
  // }
  
  return signsInfos.value.time
}
const singOnLine = () => {
  store
    .dispatch('signs/putTime', { userid: usersInfos.value._id })
    .then((res) => {
      if(res.data.errcode === 0) {
        store.commit('signs/updateInfos', res.data.infos)
        ElMessage.success('簽到成功')
      }
    })
}
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin: 10px;
}
.el-select{
  width: 80px;
}
.show-time {
  text-align: center;
  line-height: 40px;
  white-space: nowrap; // 多餘的隱藏
  text-overflow: ellipsis; // ...
  overflow: hidden;
}
</style>
