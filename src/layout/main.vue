<template>
  <div class="layout-main">
    <el-header class="header">
        <div class="title">活动后台</div>
    </el-header>
    <el-container class="container">
        <el-aside class="aside">
            <el-menu
                :default-active="this.$route.path"
                router
                class="el-menu-vertical-demo menu"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span> {{ item.navItem }}</span>
                </template>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view class="main-router"/>
        </el-main>        
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        { name: "/admin/user/index", navItem: "用户管理" },
        { name: "/admin/review/index", navItem: "活动审核" },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    height: 80px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-bottom: 10px;
    .title {
        height: 60px;
        font-size: 24px;
        font-weight: 500;
        line-height: 60px;
    }
}
.container {
    flex: 1;
    .aside {
        max-width: 200px;
        min-width: 150px;
    }
    .menu {
        min-height: calc(100% - 100px);
    }
    .main-router {
        padding: 0 20px;
    }
}
</style>
<style lang="scss">

</style>