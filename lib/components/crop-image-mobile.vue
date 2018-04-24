<template>
  <div class="crop-container" >
    <crop-view :zIndex="layerZIndex+2" ref="corpView"/>
    <crop-image :zIndex="layerZIndex+1" @canvasImage="getImageData"/>
    <crop-layer :opacity="layerOpacity" :color="layerColor" :zIndex="layerZIndex" />
  </div>
</template>

<script>
import CropManage from "../manage";
import cropView from "./view";
import cropLayer from "./layer";
import cropImage from "./image";
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
    imageFile:{
      required:true
    },
    quality:{
      type:[Number,String],
      default:0.7
    },
    autoCompress:{
      type:Boolean,
      default:true
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
  mounted(){
   this.corpView = this.$refs.corpView.$el  
   CropManage.cropImageInit(this);
  },
  watch:{
     imageFile(val){
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
  position: absolute;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
}


</style>




