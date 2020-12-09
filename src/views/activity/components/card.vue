<template>
  <div class="activity-card">
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <div slot="header" class="header">
        <div class="user-name">{{ activityData.userName }}</div>
        <div>
          <el-button
            v-if="userId === activityData.userId"
            icon="el-icon-delete"
            type="text"
            size="mini"
            @click="deleteActivity"
            >删除</el-button
          >
        </div>
      </div>
      <div class="card-body">
        <div class="content">{{ activityData.content }}</div>
        <div class="date">活动时间：{{ getDate(activityData.start) }} - {{ getDate(activityData.end) }}</div>
        <div class="place">地点：{{ activityData.place }}</div>
        <div class="options">
            <el-button
            icon="el-icon-thumb"
            type="text"
            size="mini"
            @click="likeClick"
            >{{ like ? '已点赞' : '点赞' }}</el-button
          >
            <el-button
            :icon="favorite ? 'el-icon-star-on' : 'el-icon-star-off'"
            type="text"
            size="mini"
            @click="favoriteClick"
            >{{ favorite ? '已收藏' : '收藏' }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { AddAndDeleteEnum } from "@views/commonData";
import { getDate } from "@/utils/util";

export default {
  name: "activity-card",
  props: {
    activityData: Object
  },
  data() {
    return {
        like: false,
        favorite: false,
        getDate,
    };
  },
  computed: {
    ...mapState("user", ["userId"])
  },
  created() {},
  methods: {
    ...mapActions('activity', ['activityLike', 'activityFavorite', 'activityDetele']),
    likeClick() {
        this.activityLike({
            reqJson: {
                activityId: this.activityData.activityId,
                date: Date.now(),
                type: !this.like ? AddAndDeleteEnum.add : AddAndDeleteEnum.delete, 
            }
        })
        .then(res => {
            this.like = !this.like;
            if(this.like) {
                this.$message.success('点赞成功');
            }
        })
        .catch(err => {
            console.error(err);
        });
    },
    favoriteClick() {
        this.activityLike({
            reqJson: {
                activityId: this.activityData.activityId,
                date: Date.now(),
                type: !this.favorite ? AddAndDeleteEnum.add : AddAndDeleteEnum.delete, 
            }
        })
        .then(res => {
            this.favorite = !this.favorite;
            if(this.favorite) {
                this.$message.success('收藏成功');
            }
        })
        .catch(err => {
            console.error(err);
        });
    },
    deleteActivity() {
        this.activityDetele({
            reqJson: {
                activityId: this.activityData.activityId,
            }
        })
        .then(res => {
            this.$message.success('删除成功');
            try {
                this.$parent.search();
            } catch (err) {
                console.error(err);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-name {
    line-height: 28px;
  }
}
.card-body {
    text-align: left;
    .date, .place {
        font-size: 10px;
        margin-top: 8px;
    }
    .options {
        display: flex;
        justify-content: flex-end;
    }
}
.btn-common {
  height: 24px;
}
</style>
<style lang="scss">
.activity-card {
  .el-card__header {
    padding: 8px 20px;
  }
}
</style>
