const Index = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/index/index.vue'))
  }, 'index')
}

const Clothes = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/clothes/clothes.vue'))
  }, 'clothes')
}
const SpecialCustomization = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/specialCustomization/specialCustomization.vue'))
  }, 'special-customization')
}
const Order = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/order/order.vue'))
  }, 'order')
}
const UploadInfo = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/uploadInfo/uploadInfo.vue'))
  }, 'uploadInfo')
}
const ClothesManage = resolve => {
  require.ensure([], () => {
    resolve(require('../pages/clothesManage/clothesManage.vue'))
  }, 'clothesManage')
}

export default [{
  name: 'index',
  path: '/',
  meta: {
    title: '定制衣服'
  },
  component: Index
}, {
  name: 'clothes',
  path: '/clothes',
  meta: {
    title: '定制衣服'
  },
  component: Clothes
}, {
  name: 'special-customization',
  path: '/special-customization',
  meta: {
    title: '定制衣服'
  },
  component: SpecialCustomization
}, {
  name: 'order',
  path: '/order',
  meta: {
    title: '定制衣服'
  },
  component: Order
}, {
  name: 'uploadInfo',
  path: '/uploadInfo',
  meta: {
    title: '上传信息'
  },
  component: UploadInfo
}, {
  name: 'clothesManage',
  path: '/clothesManage',
  meta: {
    title: '衣服维护'
  },
  component: ClothesManage
}, {
  path: '*',
  redirect: '/'
}]
