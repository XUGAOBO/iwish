<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="no" label="编号" width="150">
    </el-table-column>
    <el-table-column prop="name" label="名称" width="150">
    </el-table-column>
    <el-table-column prop="imgUrl" label="图片" width="200">
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    methods: {
      handleClick() {
        console.log(1);
      }
    },
    data() {
      return {
        tableData: [{
          no: '2016-05-03',
          name: '王小虎',
          imgUrl: '上海'
        }]
      }
    }
  }

</script>
