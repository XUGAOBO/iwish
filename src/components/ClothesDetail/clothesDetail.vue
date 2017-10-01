<template>
  <div class="clothesDetail" v-if="dataSource">
    <div class="top__content">
      <p class="content__price" v-if="dataSource.price">{{dataSource.price | formatPrice}}</p>
      <p class="content__brief">{{dataSource.brief}}</p>
    </div>
    <p class="description">{{dataSource.desc}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      dataSource: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
