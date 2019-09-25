<template>  
  <el-row class="container">
    <el-col :span="24">
      <Header @collapse="collapseHandler" :isCollapse="isCollapse"></Header>
    </el-col>
    <el-col :span="24" class="main">
      <Menu :isCollapse="isCollapse"></Menu>
      <el-main class="content-container">
        <nav-tab :navTabs="navTabs"></nav-tab>
        <div class="main-content">
          <router-view v-if="!navTabs.length"></router-view>
          <div class="navTab-content" v-for="item in navTabs" :key="item.tabId" v-show="item.active">
            <keep-alive>
              <router-view :name="item.vName"></router-view>
            </keep-alive>
          </div>
        </div>
      </el-main>
    </el-col>
  </el-row>    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Layout",
  components: {
    Header: () => import('@/components/Header.vue'),
    Menu: () => import('@/components/Menu.vue'),
    NavTab: () => import('./NavTab.vue')
  },
  computed: {
    ...mapGetters({
      navTabs: 'navTab/getNavTabs'
    })
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapseHandler () {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less">
.container {
  position: absolute!important;
  top: 0;
  bottom: 0;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      width: 240px;
    }
    .content-container {
      overflow: hidden;
      overflow-y: scroll;
    }
  }
  .main-content {
    margin-top: 15px;
  }
}

.el-main {
  background-color: #f0f3f4;
  color: #333;
  text-align: center;
}

</style>
