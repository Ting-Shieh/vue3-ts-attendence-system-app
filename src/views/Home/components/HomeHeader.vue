<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在線考勤系統</span>
    <el-dropdown>
      <el-badge class="home-header-badge">
        <el-icon :size="20"><Bell /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>暫無消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space class="home-header-space">
        <el-avatar size="small" :src="(head as string)" />
        {{ name }}
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>個人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const head = computed(() => store.state.users.infos.head)
const name = computed(() => store.state.users.infos.name)

const handleLogout = () => {
  store.commit('users/clearToken')
  setTimeout(() => {
    window.location.replace('/login')
  }, 300)
}
</script>
<style lang="scss" scoped>
.home-header {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 34px;

  .home-header-logo{
    .icon-vue, .icon-icon-test, .icon-typescript {
        margin-right: 5px;
        font-size: inherit;
      }
      .icon-vue{
        color: green;
      }
      .icon-icon-test{
        color: #deb887;
      }
      .icon-typescript{
        color: blue;
      }
  }
  .home-header-title{
    margin-left: 30px;
    font-size: 18px;
    font-weight: 700;
    margin-right: auto;
  }
  // .home-header-badge{
  //   margin-left: 20px;
  // }
  .home-header-space{
    margin-left: 20px;
  }
}
</style>
