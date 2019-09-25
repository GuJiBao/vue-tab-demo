<template>
  <el-aside class="menu" :class="isCollapse ? 'menu-collapsed' : 'menu-expanded'">
    <!-- 导航 -->
    <el-menu
      default-active="/product"
      class="el-menu-vertical-demo"
      background-color="#033e6b"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      @select="handleSelect"
    > 
      <el-menu-item index="/product">
        <i class="fa fa-newspaper-o" aria-hidden="true"></i>
        <span slot="title">产品</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <i class="fa fa-newspaper-o" aria-hidden="true"></i>
        <span slot="title">新闻</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  props: ["isCollapse"],
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  }
};
</script>

<style lang="less">
.menu {
    .el-menu--collapse {
        width: 60px;
        box-sizing: border-box;
    }
    .el-menu-item.is-active {
        color: #DEAD25!important;
        font-weight: bold;
        background-color: rgb(2, 50, 86)!important;
    }
    .el-menu-item-group__title {
      display: none;
    }
    .is-opened .el-submenu__title {
        background-color: rgb(2, 50, 86)!important;
        i {
            color: #fff;
        }
    }
    .el-menu {
        height: 100%;
        .fa {
            margin-right: 8px;
            font-size: 16px;
            color: #fff;
            vertical-align: middle;
        }
    }
}
.menu-expanded {
    width: 240px!important;
}
.menu-collapsed {
    width: 60px!important;
}
</style>
