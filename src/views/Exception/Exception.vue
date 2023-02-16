<template>
  <div class="exception-title">
    <el-button type="primary" @click="goToApply">異常處理</el-button>
    <el-space>
    <el-button type="primary" plain>{{ year }}年</el-button>
      <el-select v-model="month" @change="handleChange">
        <el-option
          v-for="item in 12"
          :key="item"
          :value="item"
          :label="`${item}月`"
        />
      </el-select>
    </el-space>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="!detailMonth.length" description="暫無異常考勤" />
      <el-timeline v-else>
        <el-timeline-item
          v-for="item in detailMonth"
          :key="item[0]"
          placement="top"
          :timestamp="`${year}/${month}/${item[0]}`"
        >
          <el-card>
            <el-space>
              <h4 class="">{{ item[1] }}</h4>
              <p class="">考勤資訊：{{ renderTime(item[0]) }}</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          placement="top"
          timestamp="2022/02/15"
        >
          <el-card>
            asaf
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if="!applyListMonth.length" description="暫無申請審批" />
      <el-timeline v-else>
        <el-timeline-item
          v-for="item in applyListMonth"
          :key="(item._id as string)"
          :placement="(item.reason as string)"
          timestamp="事假"
        >
          <el-card>
            <h4 class="">{{ item.state }}</h4>
            <p class="apply-info">申請日期：{{ (item.time as string[])[0] }} - {{ (item.time as string[])[1] }}</p>
            <p class="apply-info">申請詳情：{{ item.note }}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          placement="top"
          timestamp="2022/02/15"
        >
          <el-card>
            asaf
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import {ref, watch, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { toZero } from '@/utils/commons'

const route = useRoute()
const router = useRouter()
const store = useStore()

const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(Number(route.query.month) || date.value.getMonth() + 1)
const signsInfos = computed(() => store.state.signs.infos)
const applyListMonth = computed(() => store.state.checks.applyList.filter((v) => {
  const startTime = (v.time as string[])[0].split(' ')[0].split('-')
  const endTime = (v.time as string[])[1].split(' ')[0].split('-')
  return startTime[1] <= toZero(month.value) && endTime[1] >= toZero(month.value)
}))
const ret = ((signsInfos.value.detail as {[index: string]: unknown})[toZero(month.value)]as {[index: string]: unknown})
const detailMonth = computed(() => Object.entries(ret).filter(v => v[1] !== '正常出勤').sort())
console.log(ret, 'ret')
// key:[key,value]
console.log(Object.entries(ret))
// console.log(Object.entries(ret).filter(v => v[1] !== '正常出勤').sort())

const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
const goToApply = () => {
  router.push({
    path: '/apply'
  })
}
const renderTime = (d: string) => {
  const ret = ((signsInfos.value.time as {[index: string]: unknown})[toZero(month.value)] as {[index: string]: unknown})[d]
  if (Array.isArray(ret)) {
    return ret.join('-')
  } else {
    return '暫無打卡紀錄'
  }
}
watch(month, () => {
  // 不用跳轉，當前頁改參數而已
  router.push({
    query: { month: month.value}
  })
})
</script>
<style lang="scss" scoped>
.el-select{
  width: 80px;
}
.exception-title{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.el-timeline{
  margin: 20px;
}
.apply-info{
  margin: 20px;
}
</style>
