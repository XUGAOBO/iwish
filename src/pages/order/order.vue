<template>
  <div class="order">
    <ClothesHeader />
    <div class="order-container">
      <div class="order__wrapper">
        <div class="order__img">
          <img :src="selectImg()" />
        </div>
      </div>
      <ClothesDetail :dataSource="selectDiyStyle()" />
      <ServiceTip />
      <h3 class="order__type--title">选择样式</h3>
      <div class="order__item">
        <div class="order__item--container">
          <SelectItem v-for="(item, index) in diyStyleList" :dataSource="item" :key="index" :selectKey="selectKey" @selectType="selectClothesType(item, localKey.DIY_STYLE_ID)">
            <CoverImg :status="item.enable" tip="暂无">
              <img :src="item.imgUrl" class="container__img" />
            </CoverImg>
          </SelectItem>
        </div>
      </div>
      <h3 class="order__type--title" v-if="selectItemList && selectItemList.length > 0">选择图案</h3>
      <div class="order__item">
        <div class="order__item--container">
          <SelectItem v-for="(item, index) in selectItemList" :dataSource="item" :key="index" :selectKey="selectPatternKey" @selectType="selectClothesType(item, localKey.PATTERN_ID)">
            <CoverImg :status="item.enable" tip="暂无">
              <img :src="item.imgUrl" class="container__img" />
            </CoverImg>
          </SelectItem>
        </div>
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
  import ClothesDetail from 'Components/ClothesDetail/clothesDetail.vue';
  import {
    LOCAL_KEY
  } from 'Utils/constants';
  import cache from 'Utils/cache';
  import {
    goIndex,
    goDiy
  } from 'Utils/tools';
  import {
    getPattern,
    getDiyStyle,
    orderWithDiyPay
  } from 'Api/order.js';
  export default {
    components: {
      SelectItem,
      ClothesHeader,
      CoverImg,
      ServiceTip,
      ClothesDetail
    },
    data() {
      return {
        selectItemList: [],
        defaultImg: {},
        diyStyleInfo: {},
        diyStyleList: [],
        localKey: LOCAL_KEY
      };
    },
    computed: mapState({
      clothesParam: state => state.clothes.clothesParam,
      clothesImg: state => state.clothes.clothesImg,
      selectKey() {
        return this.clothesParam[LOCAL_KEY.DIY_STYLE_ID]
      },
      selectPatternKey() {
        return this.clothesParam[LOCAL_KEY.PATTERN_ID]
      },
      btnStyle() {
        let diyStyleNo = cache.local.get(LOCAL_KEY.DIY_STYLE_ID),
          patternNo = cache.local.get(LOCAL_KEY.PATTERN_ID);
        return {
          'disabled': diyStyleNo && patternNo
        }
      }
    }),
    methods: {
      selectDiyStyle() {
        let styleId = cache.local.get(LOCAL_KEY.DIY_STYLE_ID)
        return this.diyStyleInfo[styleId] || {}
      },
      selectImg() {
        let img = this.clothesImg[LOCAL_KEY.DIY_STYLE_ID];
        if (!img) {
          img = this.defaultImg[LOCAL_KEY.DIY_STYLE_ID];
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
      shoToast(message) {
        this.$toast({
          show: true,
          duration: 2000,
          message: message
        });
      },
      pay() {
        let fabricNo = this.clothesParam['2'],
          sizeNo = this.clothesParam['3'],
          diyStyleNo = cache.local.get(LOCAL_KEY.DIY_STYLE_ID),
          patternNo = cache.local.get(LOCAL_KEY.PATTERN_ID);
        if (!diyStyleNo || !patternNo) {
          this.shoToast('请完善信息~');
          return;
        }
        orderWithDiyPay(fabricNo, sizeNo, diyStyleNo, patternNo)
          .then(resp => {
            window.location.href = `https://${resp}`;
          })
      },
      selectClothesType(item, type) {
        if (type === LOCAL_KEY.DIY_STYLE_ID || item.enable) {
          let po = {
            [type]: item.key
          }
          cache.local.set(type, item.key);
          this.$store.dispatch('selectClothesType', po);
          if (type === LOCAL_KEY.DIY_STYLE_ID) {
            cache.local.set(LOCAL_KEY.PATTERN_ID, '');
            this.$store.dispatch('selectClothesType', {
              [LOCAL_KEY.PATTERN_ID]: ''
            });
            this.$store.dispatch('selectClothesImg', {
              [type]: item.imgUrl
            })
            let styleId = cache.local.get(LOCAL_KEY.STYLE_ID);
            let fabricId = cache.local.get(LOCAL_KEY.FABRIC_ID);
            let diyId = cache.local.get(LOCAL_KEY.DIY_ID);
            let diyStyleId = cache.local.get(LOCAL_KEY.DIY_STYLE_ID);
            getPattern(styleId, fabricId, diyId, diyStyleId)
              .then(resp => {
                let data = resp || [];
                this.selectItemList = data.map((partternItem, index) => {
                  return {
                    key: partternItem.itemNo, // 图案id
                    imgUrl: partternItem.itemImg, // 衣服样式的图片
                    name: partternItem.itemName, // 衣服样式的名称
                    enable: partternItem.enable
                  }
                })
              })
          }
        }
      }
    },
    created() {
      let styleId = cache.local.get(LOCAL_KEY.STYLE_ID);
      let diyId = this.hasDiyId();
      let fabricId = this.hasFabricId();
      getDiyStyle(styleId, fabricId, diyId)
        .then(resp => {
          let data = resp || [];
          this.diyStyleList = data.map((item, index) => {
            if (index === 0) {
              this.defaultImg[LOCAL_KEY.DIY_STYLE_ID] = item.itemImg;
            }
            this.diyStyleInfo[item.itemNo] = {
              price: item.sellPrice, // 价格
              brief: item.itemName, // 简述
              desc: item.itemMsg // 详细描述
            };
            return {
              key: item.itemNo,
              imgUrl: item.itemImg, // 衣服样式的图片
              name: item.itemName // 衣服样式的名称
              // enable: item.enable // 是否可以选中
            }
          })
        });
    }
  };

</script>
