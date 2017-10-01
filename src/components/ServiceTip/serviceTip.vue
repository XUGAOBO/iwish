<template>
  <div class="serviceTip">
      <div v-for="(item, index) in dataSource" :key="index" class="item">
          <i class="el-icon-circle-check"></i>
          <span class="name">{{item.name}}</span>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          dataSource: [{
              key: '1',
              name: '极速退货'
          }, {
              key: '2',
              name: '正品保证'
          }, {
              key: '3',
              name: '七天退还'
          }]
      }
    },
    methods: {
      select(key) {
        this.$emit('changeType', key);
      }
    }
  }

</script>
