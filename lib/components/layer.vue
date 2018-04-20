<template>
  <div class="crop-layer" :style="layerStyle"></div>
</template>
<script>
export default {
  name: "crop-layer",
  props: {
    opacity: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: "#000"
    },
    zIndex: {
      type: Number
    }
  },
  computed: {
    layerStyle() {
      return {
        opacity: this.opacity,
        backgroundColor: this.color,
        zIndex: this.zIndex
      };
    }
  }
};
</script>
<style>
 .crop-layer{
     position: absolute;
     top:0;
     left: 0;
     right: 0;
     bottom: 0;
 }
</style>
