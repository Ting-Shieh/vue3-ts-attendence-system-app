<template>
  <div class="apply-title">
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
  <div class="apply-table">
    <el-table :data="pageApplyList" style="width:100%;" border>
      <el-table-column prop="applicantname" label="申請人" width="120"></el-table-column>
      <el-table-column prop="reason" label="審批事由" width="150"></el-table-column>
      <el-table-column prop="time" label="時間">
        <template #default="scope">
          {{ scope.row.time.join('-') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="備註"></el-table-column>
      <el-table-column prop="approvername" label="審批人" width="120"></el-table-column>
      <el-table-column prop="state" label="狀態" width="120"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="applyList.length"
      :page-size="pageSize"
      @current-change="handlePageChange"
      small
      background
    ></el-pagination>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="新增審批"
    width="500px"
    :before-close="handleDialoClose"
  >
    <el-form
      ref="applyFormRef"
      :model="applyForm"
      :rules="applyFormRules"
      label-width="80px"
    >
      <el-form-item
        label="審批人"
        prop="approvername"
      >
        <el-select
          v-model="applyForm.approvername"
          placeholder="請選擇審批人"
        >
          <el-option
            v-for="item in approver"
            :key="(item._id as string)"
            :value="(item._id as string)"
            :label="(item.name as string)" />
        </el-select>
      </el-form-item>
      <el-form-item label="審批事由" prop="reason">
        <el-select
          v-model="applyForm.reason"
          placeholder="請選擇審批事由"
        >
          <el-option value="年假" label="年假" />
          <el-option value="事假" label="事假" />
          <el-option value="病假" label="病假" />
          <el-option value="外出" label="外出" />
          <el-option value="補簽卡" label="補簽卡" />
        </el-select>
      </el-form-item>
      <el-form-item label="時間" prop="time">
        <el-date-picker
          v-model="applyForm.time"
          type="datetimerange"
          range-separator="~"
          start-placeholder="起始日期"
          end-placeholder="結束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="備註" prop="note">
        <el-input
          v-model="applyForm.note"
          type="textarea"
          :autosize="{minRows: 4, maxRows:6}"
          placeholder="請輸入備註"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="resetForm(applyFormRef)">取消</el-button>
      <el-button type="primary" @click="submitForm(applyFormRef)">送出</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/store'
import type {DateModelType, FormInstance, FormRules} from 'element-plus'
import moment from 'moment'
import { ElMessage } from 'element-plus'
interface ApplyForm {
  applicantid: string,
  applicantname: string,
  reason: string,
  time: [DateModelType, DateModelType],
  note: string,
  approverid: string,
  approvername: string
}

const store = useStore()

const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')
const pageSize = ref(10)
const pageCurrent = ref(1)
const dialogVisible = ref(false)
const applyFormRef = ref<FormInstance>()
const applyForm = reactive<ApplyForm>({
  applicantid: '',
  applicantname: '',
  reason: '',
  time: ['',''],
  note: '',
  approverid: '',
  approvername: ''
})
const validatorTime = (
    rule: unknown,
    value: [DateModelType, DateModelType],
    callback: (arg?: Error) => void
  ) => {
  if (!value[0] && !value[1]) {
    callback(new Error('請選擇請假時間'))
  } else {
    callback()
  }
}
const applyFormRules = reactive<FormRules>({
  approvername: [
    { required: true, message: '請輸入審批人', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '請選擇請假事由', trigger: 'blur' }
  ],
  time: [
    { validator: validatorTime, trigger: 'blur' }
  ],
  note: [
    { required: true, message: '請添加審批備註', trigger: 'blur' }
  ]
})
const usersInfos = computed(() => store.state.users.infos)
const approver = computed(() => usersInfos.value.approver as {[index: string]: unknown}[])

const applyList = computed(() => store.state.checks.applyList.filter(
  (item) => 
  (item.state === approverType.value || approverType.value === defaultType) &&
  ((item.note as string).includes(searchWord.value))
))
const pageApplyList = computed(() => applyList.value.slice(
  (pageCurrent.value-1)*pageSize.value,
  (pageCurrent.value*pageSize.value)
))

const handlePageChange = (page: number) => {
  pageCurrent.value = page
}
const handleDialogOpen = () => {
  dialogVisible.value = true
}
const handleDialoClose = () => {
  dialogVisible.value = false
}
const submitForm = (formEl:FormInstance|undefined) => {
  if(!formEl) return
  formEl.validate(valid => {
    if (valid) {
      // console.log(applyForm)
      applyForm.applicantid = usersInfos.value._id as string
      applyForm.applicantname = usersInfos.value.name as string
      applyForm.approverid = (approver.value.find(v => v.name === applyForm.approvername) as {[index:string]: unknown})._id as string
      applyForm.time[0] = moment(applyForm.time[0]).format('YYYY-MM-DD hh:mm:ss')
      applyForm.time[1] = moment(applyForm.time[1]).format('YYYY-MM-DD hh:mm:ss')
      store
        .dispatch('checks/postApply', applyForm)
        .then(res => {
          if (res.data.errorcode === 0) {
            // 添加之後頁面更新
            store
              .dispatch('checks/getApply', { applicantid: usersInfos.value._id })
              .then((res) => {
                if (res.data.errcode === 0) {
                  store.commit('checks/updateApplyList', res.data.rets)
                }
              })
            ElMessage.success('新增審批成功')
            resetForm(applyFormRef.value)
            handleDialoClose()
          }
        })
      
    } else {
      dialogVisible.value = false
      return false
    }
  })
}
const resetForm= (formEl:FormInstance|undefined) => {
  if(!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.apply-title{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table{
  margin: 20px;
  .el-pagination{
    float: right;
    margin: 10px;
  }
}
</style>
