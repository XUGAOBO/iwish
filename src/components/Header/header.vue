<template>
<div></div>
<!--
    <div class="top-header">
        <header v-if="!inApp">
            <a href="javascript:window.history.go(-1);" class="i-goback" clstag="pageclick|keycount|201606272|banner_back"></a>
            <span class="title">{{ $route.meta && $route.meta.title }}</span>
        </header>
    </div>
    -->
</template>
<script>
export default {
    data() {
        return {
            style: 'selectItem__wrapper'
        }
    }
}
</script>
<style lang="less" scoped>
@charset "uft-8";
.top-header {
  height: .88rem;
  overflow: hidden;
}

header {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  height: .88rem;
  z-index: 99;
  background-color: #f8f8f8;
  overflow: hidden;
  .i-goback {
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: .88rem;
    background-size: .28rem .48rem;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAwCAYAAAACYxrZAAAAAXNSR0IArs4c6QAAAKpJREFUWAntmGEKwCAIhWV3aIfcdbf7uNdIiCDph/ZnTxAJo+c+hUUiiaaqJ/yBV7sSpUQg0ItV0ZImSLEQtMRIjC4BDoiLZzVJjKuk3H3E6OJZTQJjgdu1IP1PTbHVzsz3be0ZyjhaKTovKSHTvvJGrJY7mVY/hOqEUtSAxEbijeU5nEa8A5DYJfHG8hxOI94BSOzyd3j33GmtSQ0vRQ1IbATe/kXxe758ATJPPNcd3bUDAAAAAElFTkSuQmCC);
    background-position: .16rem .2rem;
  }
  .title {
    display: block;
    margin: 0 1.28rem;
    height: .88rem;
    line-height: .88rem;
    font-size: .3rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

