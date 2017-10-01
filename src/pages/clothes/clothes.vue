<template>
  <div class="clothes">
    <ClothesHeader />
    <div class="wrapper">
      <div class="main__img">
        <img :src="selectImg()" />
      </div>
      <div class="clothes__type">
        <SelectType v-for="(item, index) in selectTypeList" :dataSource="item" :key="index" @changeType="changeClothesType">
          <img :src="imgUrl(item)" class='img__deselect' />
        </SelectType>
      </div>
    </div>
    <div>
      <ServiceTip />
    </div>
    <div v-if=" selectType === '1' ">
      <div>
        <span class="clothes__type--title">款式</span>
      </div>
      <div class="clothes__item">
        <div class="container">
          <SelectItem v-for="(item, index) in styleImgList" :dataSource="item" :key="index" :selectKey="selectKey" @selectType="selectClothesType(item)">
            <CoverImg :status="item.enable" tip="暂无">
              <img :src="item.imgUrl" class="container__img" />
            </CoverImg>
          </SelectItem>
        </div>
      </div>
    </div>
    <div v-if=" selectType === '2' ">
      <div>
        <span class="clothes__type--title">材质</span>
      </div>
      <div class="clothes__item">
        <div class="container">
          <SelectItem v-for="(item, index) in speciesImgList" :dataSource="item" :key="index" :selectKey="selectKey" @selectType="selectClothesType(item)">
            <CoverImg :status="item.enable" tip="暂无">
              <img :src="item.imgUrl" class="container__img" />
            </CoverImg>
          </SelectItem>
        </div>
      </div>
    </div>
    <div v-if=" selectType === '3' ">
      <div>
        <span class="clothes__type--title">尺码</span>
      </div>
      <div class="clothes__item">
        <div class="container">
          <SelectItem v-for="(item, index) in sizeList" :dataSource="item" :key="index" :selectKey="selectKey" @selectType="selectClothesType(item)">
            <CoverImg :status="item.enable" tip="暂无">
              <div class="container__size">{{item.name}}</div>
            </CoverImg>
          </SelectItem>
        </div>
      </div>
    </div>
    <div class="clothes__next">
      <p class="pay" @click="pay">立即支付</p>
      <p class="empty__block"></p>
      <p class="next" @click="nextStep">下一步</p>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import ClothesHeader from 'Components/Header/header.vue';
  import SelectType from 'Components/SelectType/selectType.vue';
  import SelectItem from 'Components/SelectItem/selectItem.vue';
  import CoverImg from 'Components/CoverImg/coverImg.vue';
  import ServiceTip from 'Components/ServiceTip/serviceTip.vue';
  import {
    getClothes,
    getClothesFabric
  } from 'Api/clothes';
  import {
    orderPay
  } from 'Api/order';
  import {
    LOCAL_KEY,
    DATA_ERROR_EXCEPTION,
    DATA_INCOMPLETE__EXCEPTION
  } from 'Utils/constants';
  import cache from 'Utils/cache';
  import {
    goIndex
  } from 'Utils/tools';
  export default {
    components: {
      SelectType,
      SelectItem,
      ClothesHeader,
      CoverImg,
      ServiceTip
    },
    computed: mapState({
      clothesParam: state => state.clothes.clothesParam,
      clothesImg: state => state.clothes.clothesImg,
      selectKey() {
        return this.clothesParam[this.selectType]
      }
    }),
    data() {
      return {
        selectType: '1',
        dataSource: [],
        selectTypeList: [{
          key: '1',
          imgName: 'style',
          name: '款式'
        }, {
          key: '2',
          imgName: 'fabric',
          name: '面料'
        }, {
          key: '3',
          imgName: 'size',
          name: '尺码'
        }],
        styleImgList: [], // 款式
        speciesImgList: [], // 材质
        sizePo: {},
        sizeList: [],
        defaultImg: {}
      };
    },
    methods: {
      imgUrl: function (item) {
          let img = item.key === this.selectType ? `${item.imgName}_select` : item.imgName;
        return require(`../../../static/${img}.png`)
      },
      selectImg() {
        let img = this.clothesImg[this.selectType];
        if (!img) {
          img = this.defaultImg[parseInt(this.selectType)];
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
      nextStep() {
        let clothesId = this.hasClothesId();
        let styleId = cache.local.get(LOCAL_KEY.STYLE_ID);
        let fabricId = cache.local.get(LOCAL_KEY.FABRIC_ID);
        let sizeId = cache.local.get(LOCAL_KEY.SIZE_ID);
        if (styleId && fabricId && sizeId) {
          this.$router.push({
            name: 'special-customization',
            params: {
              clothesId: clothesId
            }
          });
        } else {
          this.shoToast(DATA_INCOMPLETE__EXCEPTION)
        }
      },
      changeClothesType(key) { // 切换类型
        let styleId = cache.local.get(LOCAL_KEY.STYLE_ID);
        let fabricId = cache.local.get(LOCAL_KEY.FABRIC_ID);
        if (key === '3' && !fabricId) {
          this.shoToast('请选择材质~');
          return;
        }
        if (key === '2' && !styleId) {
          this.shoToast('请选择款式~');
          return;
        }
        this.selectType = key;
        if (this.selectType === '2') {
          let clothesId = this.hasClothesId();
          getClothesFabric(clothesId, styleId)
            .then(resp => {
              let data = resp || [];
              if (data.length > 0) {
                this.speciesImgList = [];
                this.sizePo = {};
                data.map((item, index) => {
                  if (index === 0) {
                    this.defaultImg['2'] = item.itemImg;
                    this.defaultImg['3'] = item.itemImg;
                  }
                  this.speciesImgList.push({
                    key: item.fabricNo,
                    imgUrl: item.itemImg, // 衣服样式的图片
                    name: item.itemName // 衣服样式的名称
                  });

                  let size = item.size,
                    sizeList = []; // 每个款式对应的尺寸集合
                  if (size) {
                    size.split(',').map((item) => {
                      sizeList.push({
                        key: item,
                        name: item
                      })
                    })
                  }
                  Object.assign(this.sizePo, {
                    [item.fabricNo]: sizeList
                  })
                })
              } else {
                this.shoToast(DATA_ERROR_EXCEPTION);
              }
            })
        }
      },
      selectClothesType(item) {
        if ((item.hasOwnProperty('enable') && item.enable) || !item.hasOwnProperty('enable')) {
          switch (this.selectType) {
            case '1':
              cache.local.set(LOCAL_KEY.STYLE_ID, item.key)
              break;
            case '2':
              cache.local.set(LOCAL_KEY.FABRIC_ID, item.key)
              break;
            case '3':
              cache.local.set(LOCAL_KEY.SIZE_ID, item.key)
              break
            default:
              return ''
          }
          if (this.selectType === '2') {
            cache.local.set(LOCAL_KEY.FABRIC_ID, item.key);
          }
          this.$store.dispatch('selectClothesType', {
            [this.selectType]: item.key
          });
          this.$store.dispatch('selectClothesImg', {
            [this.selectType]: item.imgUrl
          })
        }
      },
      pay() {
        let fabricNo = this.clothesParam['2'],
          sizeNo = this.clothesParam['3'];
        if (fabricNo && sizeNo) {
          orderPay(fabricNo, sizeNo)
            .then(resp => {
              window.location.href = `https://${resp}`;
            })
        } else {
          this.shoToast(DATA_INCOMPLETE__EXCEPTION)
        }
      },
      shoToast(message) {
        this.$toast({
          show: true,
          duration: 2000,
          message: message
        });
      }
    },
    watch: {
      selectType(val) {
        if (val === '3') {
          this.sizeList = this.sizePo[this.clothesParam['2']];
        }
      }
    },
    created() {
      let clothesId = this.hasClothesId();
      getClothes(clothesId)
        .then(resp => {
          let data = resp || [];
          if (data.length > 0) {
            this.dataSource = data;
            this.styleImgList = data.map((item, index) => {
              if (index === 0) {
                this.defaultImg['1'] = item.img;
              }
              return {
                key: item.styleNo,
                imgUrl: item.img, // 衣服样式的图片
                name: item.styleName, // 衣服样式的名称
                enable: item.enable // 是否可以选中
              }
            })
          } else {
            this.shoToast(DATA_ERROR_EXCEPTION);
          }
        })
    }
  };

</script>
