<template>
  <div class="crop-container" :style="containerStyle">
    <crop-view :zIndex="layerZIndex+2" ref="corpView"/>
    <crop-image :zIndex="layerZIndex+1" @canvasImage="getImageData"/>
    <crop-layer :opacity="layerOpacity" :color="layerColor" :zIndex="layerZIndex" />
  </div>
</template>

<script>
import CropManage from "../manage.js";
import cropView from "./view.vue";
import cropLayer from "./layer.vue";
import cropImage from "./image.vue";
export default {
  name: "crop-image-mobile",
  props: {
    layerOpacity: {
      type: Number,
      default: 1
    },
    layerColor: {
      type: String,
      default: "#000"
    },
    layerZIndex: {
      type: Number,
      default: 999
    },
    height: {
      type: String
    },
    imageFile:{
      require:true
    }
  },
  components: {
    cropLayer,
    cropView,
    cropImage
  },
  data() {
    return {
      viewportHeight: "auto",
      viewportWidth:"auto",
      imageInstance:null,
      imageNode:null,
      imageCorpUrl:'',
      offsetX:0,
      offsetY:0,
      scale:1
    };
  },
   computed: {
    containerStyle() {
      return {
        height: this.viewportHeight
      };
    }
  },
  created() {
    this.viewportHeight = this.height
      ? this.height
      : `${CropManage.viewportHeight}px`
    this.viewportWidth =`${CropManage.viewportWidth}px`  
  },
  mounted(){
   this.corpView = this.$refs.corpView.$el  
   CropManage.cropImageInit(this);
  },
  watch:{
     imageFile(){
       CropManage.cropImageInit(this);
     }
  },
  methods:{
    getImageData(instance){
       this.imageInstance = instance
    },
    cropImage(cb){
      CropManage.cropImage(this,cb)
    }
  }
};
</script>
<style>
.crop-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
</style>




