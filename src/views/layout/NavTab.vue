<template>
  <div class="nav-wrap">
    <div class="nav-title">
      <strong>{{$route.meta.title}}</strong>
    </div>
    <div class="nav-tabs" ref="tabsNav">
      <div class="tabs-item" :class="{ 'acitve': item.active }" @click="handleClickTab(item)" v-for="(item, index) in navTabs.slice(0, this.tabMaxNum)" :key="item.tabId">
        {{item.tabName}}
        <i class="el-icon-close icon-close" @click.stop="handleCloseTab(index)" v-if="index"></i>
      </div>
      <div class="more">
        <div class="more-btn" @click="handleClickMore">
          <i class="icon el-icon-arrow-down"></i>
        </div>
        <ul class="more-dropdown-menu" v-show="moreStatus">
          <li @click.stop="handleClickMoreTab(index)" v-for="(item, index) in navTabs.slice(this.tabMaxNum)" :key="item.tabId">
            <span>{{item.tabName}}</span>
            <i class="el-icon-close icon-close" @click.stop="handleCloseTab(item, index)"></i>
          </li>
          <li @click.stop="handleClickDelAll">
            <span>关闭全部</span>
          </li>
          <li @click.stop="handleClickDelOther">
            <span>关闭其他</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      tabMaxNum: 1,
      moreStatus: false
    }
  },
  computed: {
    ...mapGetters({
      navTabs: 'navTab/getNavTabs'
    })
  },
  mounted() {
    // 初始化
    this.init();
    window.addEventListener('resize', this.init, false);
  },
  deactivated() {
    window.removeEventListener('resize', this.init, false);
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      // 计算标签最大显示个数
      this.calcTabMaxNum();
    },
    /**
     * 计算标签最大显示个数
     */
    calcTabMaxNum() {
      if (!this.$refs.tabsNav) {
        return false;
      }
      let tabsNav = this.$refs.tabsNav;
      let tabsItem = tabsNav.querySelectorAll('.tabs-item');
      let moreW = tabsNav.querySelector('.more').getBoundingClientRect().width;
      let navW = tabsNav.getBoundingClientRect().width - moreW;
      let itemW = tabsItem[0].getBoundingClientRect().width;
      // 设置最大值
      this.tabMaxNum = Math.floor(navW / itemW);
      this.$store.commit('navTab/setMaxTabVal', this.tabMaxNum);
    },
    /**
     * 点击标签
     */
    handleClickTab(item) {
      let { tabId, acitve } = item;
      if(acitve) return;
      this.hideMore();
      this.$store.dispatch('navTab/changeTab', { tabId });
    },
    /**
     * 点击更多
     */
    handleClickMore() {
      this.moreStatus = !this.moreStatus;
    },
    /**
     * 更多标签点击
     */
    handleClickMoreTab(index) {
      this.hideMore();
      this.$store.dispatch('navTab/handleMoreTab', { index });
    },
    /**
     * 关闭标签
     */
    handleCloseTab(index) {
      this.$store.dispatch('navTab/deleteTab', { index });
    },
    /**
     * 关闭全部
     */
    handleClickDelAll() {
      if(this.navTabs.length === 1) return;
      this.hideMore();
      this.$store.dispatch('navTab/deleteAllTab');
    },
    /**
     * 关闭其他
     */
    handleClickDelOther() {
      if(this.navTabs.length === 1) return;
      this.hideMore();
      this.$store.dispatch('navTab/deleteOtherTab');
    },
    /**
     * 隐藏更多列表
     */
    hideMore() {
      this.moreStatus = false;
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #fff;
  .nav-title {
    width: 140px;
    line-height: 40px;
    text-align: left;
    strong {
      margin-left: 15px;
      font-size: 18px;
      color: #212121;
    }
  }
  .nav-tabs {
    width: 100%;
    .tabs-item {
      position: relative;
      float: left;
      width: 180px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d9dee5;
      box-sizing: border-box;
      cursor: pointer;
      &.acitve {
        background-color: #fff;
        border-bottom: none;
        &::after {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          content: '';
          border-top: 2px solid #1783fb;
        }
      }
    }
    .more {
      position: relative;
      float: left;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d9dee5;
      box-sizing: border-box;
      cursor: pointer;
      z-index: 99;
      .more-dropdown-menu {
        position: absolute;
        top: 40px;
        right: 0;
        z-index: 10;
        max-height: 200px;
        margin: 0;
        padding: 10px 0 10px 0;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background-color: #fff;
        overflow-y: auto;
        z-index: 10000;
        li {
          position: relative;
          width: 140px;
          padding: 0 15px;
          text-align:left;
          list-style: none;
          user-select: none;
          cursor: pointer;
          &:hover {
            background-color: #f0f3f4;
          }
        }
      }
    }
    .icon-close {
      position: absolute;
      top: 12px;
      right: 15px;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>