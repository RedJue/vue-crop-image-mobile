<template>
  <div id="app">
    <div class="cropBar">
    <div class="showImage">
      <img :src="imageCorpUrl" alt="" width="100%" height="100%">
    </div>  
     <button @click="uploadImage" class="upload">上传图片</button>
     <button @click="cropImage" class="corpBtn">裁剪</button>
    </div>
    <input type="file" @change="fileCb" class="uploadInput" ref="uploadInput"> 
    <div class="cropComp">
        <crop-image-mobile 
        :imageFile="file"
        :layerZIndex="20170424"
        :layerOpacity="1"
        layerColor="#000"
        :autoCompress="false"
        :quality="0.7"
        ref="cropImageMobile" />  
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      file: "",
      imageCorpUrl: ""
    };
  },
  methods: {
    fileCb(e) {
      this.file = e.target.files[0];
    },
    cropImage() {
      this.$refs.cropImageMobile.cropImage(url => (this.imageCorpUrl = url));
    },
    uploadImage() {
      this.$refs.uploadInput.click();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
.uploadInput {
  display: none;
}
.corpBtn,
.upload {
  border: 1px solid #1ba5fa;
  background-color: #1ba5fa;
  border-radius: 4px;
  width: 100px;
  height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 2;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.showImage {
  width: 80px;
  height: 80px;
  border: 1px solid red;
  top: 10px;
  left: 5%;
}
.cropBar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
}
.cropComp {
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
}
</style>
