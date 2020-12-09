<template>
  <div>
    <div class="container">
      <el-header class="header">
        <div class="title">校园活动资讯平台</div>
        <div>
          <el-button type="text" size="default" @click="goCreate"
            >创建我的活动</el-button
          >
        </div>
      </el-header>
      <div class="main">
        <div
          v-for="(item, index) in activityList"
          :key="item.createactivityId + String(index)"
          class="card-container"
        >
          <activity-card :activityData="item"></activity-card>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="count"
          :page-sizes="[10, 20, 50, 100]"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ReviewStatusEnum } from "@views/commonData";
import ActivityCard from "./components/card";

export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  created() {
    console.log("activity/index create");
    this.search();
  },
  computed: {
    ...mapState("activity", ["activityList", "count"]),
  },
  methods: {
    ...mapActions("activity", ["getActivityList"]),
    search() {
      this.getActivityList({
        reqJson: { status: ReviewStatusEnum.access },
      });
    },
    goCreate() {
      this.$router.push("/user/activity/create");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  max-width: 1000px;
  overflow-y: scroll;
}
.header {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  justify-content: space-between;
  .title {
    height: 60px;
    font-size: 24px;
    font-weight: 500;
    line-height: 60px;
  }
}
.main {
  z-index: 1;
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.card-container {
  margin: 16px 0 0 0;
  width: 70%;
}
.pagination {
  margin: 24px 0 36px 0;
}
::-webkit-scrollbar {display:none}
</style>