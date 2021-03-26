<template>
  <div>
    <div class="head-info">
      <HeadTop />
    </div>
    <div class="left-menu">
      <MenuList />
    </div>
    <div class="right-main">
      <router-view></router-view>
    </div>
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
