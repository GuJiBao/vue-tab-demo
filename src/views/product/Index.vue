<template>
  <div class="main-wrap">
    <el-table :data="tableData" @row-click="handleRowClick" style="width: 100%">
      <el-table-column prop="title" label="名称" width="180"></el-table-column>
      <el-table-column prop="intro" label="介绍"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          date: "2019-09-25",
          title: "杯子",
          intro: "一只漂亮的杯子~~"
        },
        {
          id: 1,
          date: "2019-09-25",
          title: "自行车",
          intro: "可以骑的自行车~~"
        },
        {
          id: 2,
          date: "2019-09-25",
          title: "文具盒",
          intro: "可以装铅笔用的文具盒~~"
        },
        {
          id: 3,
          date: "2019-09-25",
          title: "笔记本",
          intro: "记笔记用的本子~~"
        }
      ]
    };
  },
  methods: {
    handleRowClick(row) {
      let { id, title, intro } = row;
      this.$store.dispatch('navTab/addTab', {
        tabId: 'detail_' + id,
        tabName: title,
        vName: 'detail',
        pParams: {
          title,
          intro
        }
      })
    }
  }
};
</script>