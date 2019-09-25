<template>
  <el-header class="header">
    <div :class="isCollapse ? 'logo logo-collapse-width' : 'logo logo-width'">{{isCollapse ? '' : sysName}}</div>
    <div class="tool" @click="$emit('collapse')">
      <i class="fa fa-navicon icon" aria-hidden="true"></i>
    </div>
    
  </el-header>
</template>

<script>

export default {
  name: "Header",
  props: ["isCollapse"],
  data() {
    return {
      sysName: "DEMO",
      userInfo: {}
    };
  },
  created() {
  },
  methods: {
    
  }
};
</script>

<style lang="less">
.header {
  padding: 0;
  background-color: #033e6b;
  overflow: hidden;
  .logo {
    float: left;
    height: 60px;
    padding-left: 25px;
    line-height: 60px;
    transition: width 0.3s;
    font-size: 24px;
    color: #fff;
    box-sizing: border-box;
    &-width {
      width: 240px;
    }
    &-collapse-width {
      width: 60px;
    }
  }
  .tool {
    float: left;
    margin: 18px 0 0 20px;
    .icon {
      font-size: 22px;
      color: #fff;
      cursor: pointer;
    }
  }
  .userinfo {
    float: right;
    margin-right: 25px;
    &-inner {
      display: inline-block;
      margin-top: 10px;
      line-height: 40px;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        border-radius: 20px;
        vertical-align: middle;
      }
    }
  }
}
</style>
