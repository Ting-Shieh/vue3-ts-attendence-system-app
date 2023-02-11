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
    <template #dateCell="{ data }">
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
import {useRouter} from 'vue-router'
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useStore()

const date = ref(new Date('2022-07-02'))
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

const renderDate = (d: string) => {
  return d.split('-')[2]
}
const renderTime = (d: string) => {
  // console.log(signsInfos.value.time)
  // console.log(Object.keys((signsInfos.value.time as { [index: string]: unknown })))
  const [, month, date] = d.split('-')
  const result = ((signsInfos.value.time as { [index: string]: unknown })[month] as { [index: string]: unknown })[date]
  // const result = (signsInfos.value.time as { [index: string]: unknown })
  if ( Array.isArray(result)){
    return result.join('-')
  } else {
    return result
  }
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
