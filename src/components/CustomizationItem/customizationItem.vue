<template>
  <div class="customizationItem">
    <div class="diy__imgContainer">
      <CoverImg :status="enable" tip="暂无">
        <img :src="imgUrl" class="diy__img" />
      </CoverImg>
    </div>
    <p class="customizationItem__name">{{name}}</p>
  </div>
</template>
<script>
  import CoverImg from 'Components/CoverImg/coverImg.vue';
  export default {
    props: ['dataSource'],
    components: {
      CoverImg
    },
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
      },
      enable: function () {
          return this.dataSource.enable
      }
    }
  }

</script>
