<template>
  <div class="selectType" @click="select(key)">
    <div class="img__size">
      <img :src="imgUrl" />
      <!--
      <p class="selectType__name">{{name}}</p>
        -->
    </div>
  </div>
</template>
<script>
  export default {
    props: ['dataSource'],
    data() {
      return {

      }
    },
    computed: {
      key: function () {
        return this.dataSource.key
      },
      imgUrl: function () {
        return require(`../../../static/${this.dataSource.imgName}.png`)
      },
      name: function () {
        return this.dataSource.name
      }
    },
    methods: {
      select(key) {
        this.$emit('changeType', key);
      }
    }
  }

</script>
