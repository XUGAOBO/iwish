<template>
  <div class="home">
    <ClothesHeader />
    <div class="menu__item">
      <div v-for="(item, index) in menu" :key="index" class="menu__item--margin">
        <div @click="selectClothes(item)" class="img__container">
          <CoverImg :status="item.enable">
            <img :src="item.img" />
          </CoverImg>
        </div>
        <p class="menu__item--name">{{item.catename}}</p>
      </div>
    </div>
    <div class="menu__tip">选择一个种类开始定制吧</div>
  </div>
</template>
<script>
  import ClothesHeader from 'Components/Header/header.vue';
  import MaskPanel from 'Components/MaskPanel/maskPanel.vue';
  import CoverImg from 'Components/CoverImg/coverImg.vue';
  import {
    getMenuList
  } from 'Api/home.js';
  import cache from 'Utils/cache';
  import {
    LOCAL_KEY
  } from 'Utils/constants';
  export default {
    components: {
      ClothesHeader,
      MaskPanel,
      CoverImg
    },
    data() {
      return {
        menu: []
      }
    },
    methods: {
      selectClothes(item) {
        if (item.enable) { // 如果enable为true,则代表可以编辑
          cache.local.set(LOCAL_KEY.CLOTHES_ID, item.cateno);
          this.$router.push({
            path: '/clothes'
          })
        }
      }
    },
    created() {
      cache.local.clear();
      this.$store.dispatch('clearParams')
      getMenuList()
        .then(resp => {
          let data = resp;
          if (data && data.length > 0) {
            this.menu = data;
          }
        })
    }
  }

</script>
