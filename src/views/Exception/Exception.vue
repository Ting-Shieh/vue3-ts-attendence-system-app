<template>
  <div class="exception-title">
    <el-button type="primary">異常處理</el-button>
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
      <el-empty v-if="false" description="暫無異常考勤" />
      <el-timeline v-else>
        <el-timeline-item
          placement="top"
          timestamp="2022/02/14"
        >
          <el-card>
            <el-space>
              <h4 class="">曠工</h4>
              <p class="">考勤資訊：暫無打卡紀錄</p>
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
      <el-empty v-if="false" description="暫無申請審批" />
      <el-timeline v-else>
        <el-timeline-item
          placement="top"
          timestamp="事假"
        >
          <el-card>
            <h4 class="">曠工</h4>
            <p class="apply-info">考勤資訊：暫無打卡紀錄</p>
            <p class="apply-info">考勤資訊：暫無打卡紀錄</p>
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
import {ref} from 'vue'
const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)
const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
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
