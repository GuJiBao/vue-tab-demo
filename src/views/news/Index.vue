<template>
  <div class="main-wrap">
    <el-table :data="tableData" @row-click="handleRowClick" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
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
          title: "今天天气怎么样？",
          content: "今天天气很晴朗，适合出游~~"
        },
        {
          id: 1,
          date: "2019-09-25",
          title: "明天要下雨了吗？",
          content: "明天天气很好，不会下雨~~"
        },
        {
          id: 2,
          date: "2019-09-25",
          title: "股市咋样？",
          content: "股市上涨了~~"
        },
        {
          id: 3,
          date: "2019-09-25",
          title: "你在干嘛",
          content: "我在记笔记~~"
        }
      ]
    };
  },
  methods: {
    handleRowClick(row) {
      let { id, title, content } = row;
      this.$store.dispatch('navTab/addTab', {
        tabId: 'detail_' + id,
        tabName: title,
        vName: 'detail',
        pParams: {
          title,
          content
        }
      })
    }
  }
};
</script>