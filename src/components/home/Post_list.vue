<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <!--                <el-tabs v-model="activeName" @tab-click="handleClick">-->
        <!--                    <el-tab-pane label="最新主题" name="latest">-->
        <!--                        //bulma中的media属性，还有article-->
        <article v-for="(item, index) in postList" :key="index" class="media">
          <!--                            //左边部分,头像-->
          <div class="media-left">
            <figure  class="image is-square">
              <img :src="`https://tse3-mm.cn.bing.net/th/id/OIP-C.nP8TWRSOpLPJf5-dXNPAiwHaEn?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7`" style="border-radius: 5px;">
            </figure>
          </div>
          <!--                            //文章主体-->
          <div class="media-content">
            <div class="">
              <p class="ellipsis is-ellipsis-1">
                <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                  <!-- //跳转到何处，文章详情，对应路由中的那个-->
                  <router-link :to="{name:'PostContent',params:{post_id:item.post_id}}">
                    <p class="is-size-6" id="txt">
                      测试<!-- 后面要改成{{item.title}}-->
                    </p>
                  </router-link>
                </el-tooltip>
              </p>
              <p style="text-align: left;font-size: 13px">
                这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息
                这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息 这是文章的描述信息
                <!--后面这里要改成{{item.description}}  -->
              </p>

            </div>
            <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
              <div class="level-left">
                <div class="level-left">
                  <!--                                            //作者名称-->
                  <!--                                            <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">-->
                  <!--                                               李四-->
                  {{item.username}}
                  <!--                                            </router-link>-->
                  &nbsp;
                  <span class="mr-1">
                                            发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                                           </span>
                  &nbsp;
                  <!--标签-->
                  <span v-for="(tag, index) in item.tags" :key="index" class=" is-success is-light mr-1">
                                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                                                      {{ "#" + tag.name }}
                                        </router-link>
                                         </span>

                  <span class="is-hidden-mobile">浏览次数:{{ item.view_count }}</span>
                </div>
              </div>
            </nav>
          </div>
          <!--//右半部分-->
          <div class="media-right" />
        </article>
      </div>
    </el-card>

    <!--分页-->
    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[5,10,15,20]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
import { getList } from '@/api/post'
import dayjs from "dayjs";

export default {
  name: 'TopicList',
  data() {
    return {
      postList: [
        {post_id:0, user_id:0,title:'',createTime:Date,username:'',view_count:0,tag:'',description:''}
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      postName: ''
    }
  },
  created() {
    this.init()
    this.loadPost()
  },
  methods: {
    dayjs,
    init() {
      getList(this.page.current, this.page.size).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.postList = data.data//获取到的文章
      })
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + "/user/findPost", {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {
          postName: this.postName
        }
      }).then(res=>{
        console.log(res)
        if (res.data.code === 200) {
          this.total = res.data.total;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    // 当前每页的条数改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.current = 1;
      this.page.size = val;
      this.loadPost();
    },
    //切换到其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.current = val;
      this.loadPost();
    }
  }
}
</script>

<style scoped>
#txt{
  text-align: left;
}
.is-square {
  width: 75px;
  height: 75px;
}
</style>