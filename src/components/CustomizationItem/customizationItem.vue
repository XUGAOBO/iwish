<template>
  <div class="customizationItem">
    <div class="diy__imgContainer">
      <img :src="imgUrl" class="diy__img" />
    </div>
    <p class="customizationItem__name">{{name}}</p>
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
        return this.dataSource.imgUrl
      },
      name: function () {
        return this.dataSource.name
      }
    }
  }

</script>
