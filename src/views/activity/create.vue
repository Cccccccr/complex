<template>
  <div class="create-activity">
    <el-header class="header">
      <div>创建我的活动</div>
    </el-header>
    <el-main class="main">
      <div class="form-box">
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="活动地点" prop="place">
            <el-input
              v-model.trim="form.place"
              maxlength="40"
              placeholder="请输入活动地点"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="活动时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetimerange"
              size="normal"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              class="date-pciker"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动详情" prop="content" size="normal">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              v-model.trim="form.content"
              maxlength="150"
              placeholder="请输入活动详情"
              size="normal"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    let checkPlace = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("地点不能为空"));
      } else {
        cb();
      }
    };
    let checkTime = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("活动时间不能为空"));
      } else {
        cb();
      }
    };
    let checkContent = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("活动内容不能为空"));
      } else {
        cb();
      }
    };
    return {
      form: {
        place: "",
        time: "",
        content: "",
      },
      rules: {
        place: [{ validator: checkPlace, trigger: "blur" }],
        time: [{ validator: checkTime, trigger: "blur" }],
        content: [{ validator: checkContent, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions("activity", ["createActivity"]),
    onSubmit() {
      this.$refs.form.validate(vaild => {
        if(vaild) {
          const { place, content, time } = this.form;
          const reqJson = {
            createTime: Date.now(),
            startTime: new Date(time[0]).getTime(),
            endTime: new Date(time[1]).getTime(),
            place,
            content,
          };
          console.log(reqJson);
          this.createActivity({
            reqJson,
            context: this,
          })
          .then(res => {
            if(res) {
              this.$message.success('创建活动成功');
              this.$router.push('/user/activity/index'); // 要去审核中的活动页面
            }
          })
          .catch(err => {
            console.error(err);
          });
        }
      }); 
    },
    cancle() {
      this.$router.go(-1);
    }
  },
};
</script>

<style lang='scss' scoped>
.create-activity {
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  font-size: 22px;
  text-align: left;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
}
.main {
  flex: 1;
  background: rgba(0, 0, 0, 0.02);
}
.date-pciker {
  float: left;
}
.form-box{
  padding: 24px 200px;
}
</style>