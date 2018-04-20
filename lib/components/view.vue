<template>
  <div class="crop-view" :style="{zIndex:zIndex}">
    <div class="crop-view-container" :style="containerStyle">
      <div class="crop-view-row">
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
      </div>
      <div class="crop-view-row">
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
      </div>
      <div class="crop-view-row">
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
        <div class="crop-view-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
 import CropManage from '../manage.js'
export default {
    name:"crop-view",
    props:{
       zIndex:{
           type:Number
       }
    },
  computed: {
    containerStyle() {
      let _width = CropManage.viewportWidth - 40
      return {
        width: `${_width}px`,
        height: `${_width}px`
      };
    }
  }
}
</script>
<style>
  .crop-view{
     position: absolute;
     top:0;
     left: 0;
     right: 0;
     bottom: 0;
     display: flex;
     justify-content: center;
     align-items: center;
  }
  .crop-view-container{
    border-top:1px solid #fff;
    border-left:1px solid #fff;
    display: flex;
    flex-direction: column;
  }
  .crop-view-row{
    display: flex;
    flex-grow:1;
    flex-shrink:1;
  }
  .crop-view-item{
    flex-grow:1;
    flex-shrink:1;
    border-right:1px solid #fff;
    border-bottom:1px solid #fff;
  }
</style>


