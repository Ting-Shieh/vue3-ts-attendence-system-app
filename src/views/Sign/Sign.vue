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
      <el-button type="primary">在線簽到</el-button>
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
  </el-calendar>
</template>
<script lang="ts" setup>
import {useRouter} from 'vue-router'
import { ref, reactive } from 'vue'
const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)
const router = useRouter()
enum DetailKey {
  normal = '正常出勤',
  absent = '曠工',
  miss = '漏打卡',
  late = '遲到',
  early = '早退',
  lateAndEarly = '遲到並早退'
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
const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
const goToException = () => {
  router.push('/exception')
}
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin: 10px;
}
.el-select{
  width: 80px;
}
</style>
