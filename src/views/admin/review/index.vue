<template>
  <div>
    <div class="search-box">
      <div class="search-item">
        <span class="title" style="marginright: 8px">用户ID</span>
        <el-input
          v-model="form.userId"
          placeholder="请输入用户id"
          size="normal"
          clearable
        ></el-input>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">活动ID</span>
        <el-input
          v-model="form.activityId"
          placeholder="请输入活动id"
          size="normal"
          clearable
        ></el-input>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">活动状态</span>
        <el-select v-model="form.status" placeholder="请选择" clearable filterable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="activityList" style="width: 100%">
        <el-table-column label="活动ID">
          <template slot-scope="scope">
            {{ scope.row.activityId }}
          </template>
        </el-table-column>
        <el-table-column label="用户ID">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column label="活动内容">
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ getDate(scope.row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            {{ getDate(scope.row.start) }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            {{ getDate(scope.row.end) }}
          </template>
        </el-table-column>
        <el-table-column label="活动状态">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-if="scope.row.status === ReviewStatusEnum.review" slot-scope="scope">
            <el-button
              type="text"
              @click="review(scope.row, ReviewStatusEnum.access)"
              >通过</el-button
            >
            <el-button
              type="text"
              @click="review(scope.row, ReviewStatusEnum.reject)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        :page-sizes="[10, 20, 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ReviewStatusEnum } from "@views/commonData";
import { getDate } from '@/utils/util';

export default {
  data() {
    return {
      form: {
        userId: '',
        activityId: '',
        status,
      },
      statusOptions: [
        { value: ReviewStatusEnum.review, label: "审核中" },
        { value: ReviewStatusEnum.access, label: "审核通过" },
        { value: ReviewStatusEnum.reject, label: "审核拒绝" },
      ],
      currentPage: 1,
      total: 0,
      ReviewStatusEnum,
      getDate
    };
  },
  created() {
    this.getActivityList({});
  },
  computed: {
    ...mapState("adminActivity", ["activityList", "count"]),
  },
  methods: {
    ...mapActions("adminActivity", ["getActivityList", "reviewActivity"]),
    search() {},
    reset() {
      Object.keys(this.form).forEach(item => {
        this.form[key] = '';
      });
    },
    handleSizeChange(value) {},
    handleCurrentChange(value) {},
    review(row, status) {
      const { activityId } = row;
      if(activityId && status) {
        this.reviewActivity({
          reqJson: {
              activityId,
              status,
            },
            context: this,
        })
        .then(res => {
          this.$message.success(`${status === ReviewStatusEnum.access ? '通过' : '拒绝'}成功`);
          this.getActivityList({});
        })
        .catch(err => {});
      }
    },
    getStatus(status) {
      for(let i = 0; i < this.statusOptions.length; i++) {
        if(this.statusOptions[i].value === status) {
          return this.statusOptions[i].label;
          break;
        }
      }
      return '未知审核状态';
    }
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  margin-top: 48px;
  display: flex;
  flex-wrap: wrap;
}
.search-item {
  margin-right: 16px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    text-align: left;
    min-width: 80px;
  }
}
.main {
  margin-top: 24px;
}
.pagination {
  margin-top: 16px;
}
</style>