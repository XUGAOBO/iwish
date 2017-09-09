<template>
  <div class="coverImg">
      <slot></slot>
    <p :class="{'item__img--cover': !status}" :style="{'display': status ? 'none': ''}">
      <span>{{tip}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    props: {
      status: {
        type: Boolean,
        default: true
      },
      tip: {
        type: String,
        default: '敬请期待'
      }
    }
  }

</script>
