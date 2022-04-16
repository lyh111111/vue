<template>
    <div>
        <el-container>
            <!-- 顶部菜单 -->
            <el-header>
              <HeadTop />
            </el-header>
            <el-container>
              <!-- 左边栏 -->
              <el-aside width="400px">
                <MenuList />
              </el-aside>
              <!-- 内容 -->
              <el-main>
                <router-view></router-view>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
import MenuList from '@/components/MenuList'
export default {
  components: {
    HeadTop,
    MenuList
  },
  data() {
    return {

    }
  }
}
</script>
<style>
.el-header {
    text-align: center;
    height: 60px;
    line-height: 60px;
}

.el-aside {
    color: #333;
    text-align: center;
    height: calc(100vh - 60px);
}

.el-main {
    color: #333;
    text-align: center;
    height: calc(100vh - 60px);
}
</style>
