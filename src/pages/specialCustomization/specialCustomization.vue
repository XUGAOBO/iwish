<template>
  <div class="specialCustomization">
    <ClothesHeader />
    <!--
    <span class="diy__previous" @click="previous"></span>
    -->
    <h3 class="specialCustomization__title">其他个性化定制 (任选一种)</h3>
    <div class="specialCustomization__item">
      <div v-for="(item, index) in selectItemList" :key="index" class="specialCustomization__item--margin">
        <div @click="getDiyId(item.key, item)">
          <CustomizationItem :dataSource="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CustomizationItem from 'Components/CustomizationItem/customizationItem.vue'
  import ClothesHeader from 'Components/Header/header.vue'
  import {
    LOCAL_KEY,
    DATA_ERROR_EXCEPTION
  } from 'Utils/constants';
  import {
    getDiyTypes
  } from 'Api/clothes';
  import cache from 'Utils/cache';
  export default {
    components: {
      CustomizationItem,
      ClothesHeader
    },
    data() {
      return {
        selectItemList: []
      }
    },
    methods: {
      getDiyId(diyId, item) {
        if (item.enable) {
          let oldDiyId = cache.local.get(LOCAL_KEY.DIY_ID);
          if (diyId !== oldDiyId) {
            this.$store.dispatch('clearClothesImg')
          }
          cache.local.set(LOCAL_KEY.DIY_ID, diyId);
          this.$router.push({
            path: '/order'
          })
        }
      },
      previous() {
        this.$router.push({
          path: '/clothes'
        })
      }
    },
    mounted() {
      let styleNo = cache.local.get(LOCAL_KEY.STYLE_ID);
      let fabricNo = cache.local.get(LOCAL_KEY.FABRIC_ID);
      getDiyTypes(styleNo, fabricNo)
        .then(resp => {
          let data = resp || [];
          data.forEach((item) => {
            this.selectItemList.push({
              key: item.itemNo,
              imgUrl: item.itemImg,
              name: item.itemName,
              enable: item.enable
            })
          })
        })
        .catch(error => {
          this.$toast({
            show: true,
            duration: 2000,
            message: DATA_ERROR_EXCEPTION
          });
        })
    }
  }

</script>
