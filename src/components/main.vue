<template>
  <div class="main-container main-layout">
      <el-main height="" class="main">
        <router-view></router-view>
      </el-main>      
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.main-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background: rgba(0, 0, 0, 0.02);
}
.main {
    max-width: 1000px;
}
</style>