<template>
  <div class="order">
    <ClothesHeader />
    <div class="order__wrapper">
      <div class="order__img">
        <img :src="selectImg()" />
      </div>
    </div>
    <ServiceTip />
    <h3 class="order__type--title">选择图案</h3>
    <div class="order__item">
      <div class="order__item--container">
        <SelectItem v-for="(item, index) in selectItemList" :dataSource="item" :key="index" :selectKey="selectKey" @selectType="selectClothesType(item)">
          <CoverImg :status="item.enable" tip="暂无">
            <img :src="item.imgUrl" class="container__img" />
          </CoverImg>
        </SelectItem>
      </div>
    </div>
    <div class="order__pay" @click="pay">立即支付</div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import ClothesHeader from 'Components/Header/header.vue';
  import SelectItem from 'Components/SelectItem/selectItem.vue';
  import CoverImg from 'Components/CoverImg/coverImg.vue';
  import ServiceTip from 'Components/ServiceTip/serviceTip.vue';
  import {
    LOCAL_KEY
  } from 'Utils/constants';
  import cache from 'Utils/cache';
  import {
    goIndex,
    goDiy
  } from 'Utils/tools';
  import {
    getDiyInfo,
    orderWithDiyPay
  } from 'Api/order.js';
  export default {
    components: {
      SelectItem,
      ClothesHeader,
      CoverImg,
      ServiceTip
    },
    data() {
      return {
        selectItemList: [],
        defaultImg: {}
      };
    },
    computed: mapState({
      clothesParam: state => state.clothes.clothesParam,
      clothesImg: state => state.clothes.clothesImg,
      selectKey() {
        return this.clothesParam['partternId']
      }
    }),
    methods: {
      selectImg() {
        let img = this.clothesImg['partternId'];
        if (!img) {
          img = this.defaultImg['partternId'];
        }
        return img
      },
      hasClothesId() {
        let clothesId = cache.local.get(LOCAL_KEY.CLOTHES_ID);
        if (!clothesId) { // 如果没有衣服id,则需要跳转到首页
          goIndex();
          return;
        }
        return clothesId;
      },
      hasDiyId() {
        let diyId = cache.local.get(LOCAL_KEY.DIY_ID);
        if (!diyId) { // 如果没有衣服id,则需要跳转到首页
          goDiy();
          return;
        }
        return diyId;
      },
      hasFabricId() {
        let fabricId = cache.local.get(LOCAL_KEY.FABRIC_ID);
        if (!fabricId) { // 如果没有衣服id,则需要跳转到首页
          goIndex();
          return;
        }
        return fabricId;
      },
      pay() {
        let fabricNo = this.clothesParam['2'],
          sizeNo = this.clothesParam['3'],
          patternNo = cache.local.get(LOCAL_KEY.PATTERN_ID);
        orderWithDiyPay(fabricNo, sizeNo, patternNo)
          .then(resp => {
            window.location.href = `https://${resp}`;
          })
      },
      selectClothesType(item) {
        if (item.enable) {
          let po = {
            partternId: item.key
          }
          cache.local.set(LOCAL_KEY.PATTERN_ID, item.key);
          this.$store.dispatch('selectClothesType', po);
          this.$store.dispatch('selectClothesImg', {
            partternId: item.imgUrl
          })
        }
      }
    },
    created() {
      let clothesId = this.hasClothesId();
      let diyId = this.hasDiyId();
      let fabricId = this.hasFabricId();
      getDiyInfo(clothesId, fabricId, diyId)
        .then(resp => {
          let data = resp || [];
          this.selectItemList = data.map((item, index) => {
            if (index === 0) {
              this.defaultImg['partternId'] = item.itemImg;
            }
            return {
              key: item.itemNo, // 图案id
              imgUrl: item.itemImg, // 衣服样式的图片
              name: item.itemName, // 衣服样式的名称
              enable: item.enable
            }
          })
        })
    }
  };

</script>
