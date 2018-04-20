<template>
  <div class="crop-image" :style="{width:imageWidth,height:imageHeight,zIndex:zIndex,transform:transform}">
    <img src="" alt="" width="100%" height="100%" ref="canvasImage">
  </div>
</template>
<script>

export default {
  name: "crop-image",
  props: {
    zIndex: {
      type: Number
    },
    width:{
      type:String,
      default:"100%"
    },
    height:{
      type:String,
      default:"auto"
    }
  },
  data() {
    return {
      canvasImage:"",
      imageWidth:"100%",
      imageHeight:"auto",
      transform:"translate(0,0)"
    };
  },
  created(){
    this.imageWidth = this.width
    this.imageHeight = this.height
  },
  mounted(){
     this.canvasImage = this.$refs.canvasImage
     this.$emit('canvasImage',this)
  }
};
</script>
<style>
.crop-image {
  position: absolute;
  width: 100%;
  transition: all .2s ease-out;
}
</style>


