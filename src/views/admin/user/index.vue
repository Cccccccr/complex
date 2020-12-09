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
        <span class="title" style="marginright: 8px">用户邮箱</span>
        <el-input
          v-model="form.email"
          placeholder="请输入用户邮箱"
          size="normal"
          clearable
        ></el-input>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">用户名</span>
        <el-input
          v-model="form.name"
          placeholder="请输入用户名"
          size="normal"
          clearable
        ></el-input>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">用户手机号</span>
        <el-input
          v-model="form.phone"
          placeholder="请输入用户手机号"
          size="normal"
          clearable
        ></el-input>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">评论权限</span>
        <el-select
          v-model="form.commitAuth"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span class="title" style="marginright: 8px">发布活动权限</span>
        <el-select
          v-model="form.activityAuth"
          placeholder="请选择"
          clearable
          filterable
        >
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
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="用户ID">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="电话号码">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="评论行为分">
          <template slot-scope="scope">
            {{ scope.row.commitScore }}
          </template>
        </el-table-column>
        <el-table-column label="评论权限">
          <template slot-scope="scope">
            <div>
              {{ getStatus(scope.row.commitAuth) }}
            </div>
            <div>
              <el-button
                type="text"
                @click="
                  manageAuth(
                    scope.row,
                    AuthTypeEnum.commit,
                    scope.row.commitAuth === AuthEnum.access
                      ? AuthEnum.reject
                      : AuthEnum.access
                  )
                "
                >{{
                  scope.row.commitAuth === AuthEnum.access ? "禁止" : "允许"
                }}</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布活动行为分">
          <template slot-scope="scope">
            {{ scope.row.activityScore }}
          </template>
        </el-table-column>
        <el-table-column label="发布活动权限">
          <template slot-scope="scope">
            {{ getStatus(scope.row.activityAuth) }}
            <div>
              <el-button
                type="text"
                @click="
                  manageAuth(
                    scope.row,
                    AuthTypeEnum.activity,
                    scope.row.activityAuth === AuthEnum.access
                      ? AuthEnum.reject
                      : AuthEnum.access
                  )
                "
                >{{
                  scope.row.activityAuth === AuthEnum.access ? "禁止" : "允许"
                }}</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="userDelete(scope.row)"
              >删除</el-button
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
import { AuthEnum, AuthTypeEnum } from "@views/commonData";
import { getDate } from "@/utils/util";

export default {
  data() {
    return {
      form: {
        userId: "",
        email: "",
        name: "",
        phone: "",
        commitAuth: "",
        activityAuth: "",
      },
      currentPage: 1,
      total: 0,
      statusOptions: [
        { value: AuthEnum.access, label: "有权限" },
        { value: AuthEnum.reject, label: "无权限" },
      ],
      AuthEnum,
      AuthTypeEnum,
      getDate,
    };
  },
  created() {
    this.getUserList({
      reqJson: this.getReqJson(),
    });
  },
  computed: {
    ...mapState("userManage", ["userList", "count"]),
  },
  methods: {
    ...mapActions("userManage", ["getUserList", "deleteUser", "authManage"]),
    search() {
      this.getUserList({
        reqJson: this.getReqJson(),
        context: this,
      });
    },
    handleSizeChange(value) {},
    handleCurrentChange(value) {},
    getReqJson() {
      const form = this.form;
      const res = {};
      Object.keys(form).forEach((item) => {
        const numberArr = ["userId", "commiyAuth", "activityAuth"];
        if (form[item]) {
          res[item] = ~numberArr.indexOf(item)
            ? Number(form[item])
            : form[item];
        }
      });
      return res;
    },
    reset() {
      Object.keys(this.form).forEach((item) => {
        this.form[item] = "";
      });
    },
    userDelete(row) {
      const { userId } = row;
      if (userId) {
        this.deleteUser({
          reqJson: {
            userId,
          },
          context: this,
        })
          .then((res) => {
            this.$message.success(`删除用户成功`);
            this.search();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    manageAuth(row, authType, authStatus) {
      const { userId } = row;
      if (userId && authType && authStatus) {
        this.authManage({
          reqJson: {
            userId,
            authType,
            authStatus,
          },
          context: this,
        })
          .then((res) => {
            this.$message.success(`修改权限成功`);
            this.search();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    getStatus(status) {
      let res = "未知权限";
      switch (status) {
        case AuthEnum.access:
          res = "有权限";
          break;
        case AuthEnum.reject:
          res = "无权限";
          break;
        default:
          break;
      }
      return res;
    },
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
    min-width: 100px;
  }
}
.main {
  margin-top: 24px;
}
.pagination {
  margin-top: 16px;
}
</style>