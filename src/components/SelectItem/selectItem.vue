<template>
  <span class="selectItem" @click="select(key)">
        <span  class="selectItem__wrapper" :class="selectStyle">
            <slot></slot>
        </span>
  </span>
</template>
<script>
  export default {
    props: ['dataSource', 'selectKey'],
    data() {
      return {
        style: 'selectItem__wrapper'
      }
    },
    computed: {
      key: function () {
        return this.dataSource.key
      },
      name: function () {
        return this.dataSource.name
      },
      selectStyle() {
        return {
          'selected': this.selectKey === this.key
        }
      }
    },
    methods: {
      select(key) {
        this.$emit('selectType', key);
      }
    }
  }

</script>
