# vue-crop-image-mobile

a mobile end cropping plug-in is based on vue.

## Introduction

vue-crop-image-mobile is a lightweight mobile end clipping plug-in.it is based on [Vue.js](https://github.com/vuejs/vue),and very easy to use.  Support UMD,so not only for vue templates, but also for HTML.

## npm

Link: [https://www.npmjs.com/package/vue-crop-image-mobile](https://www.npmjs.com/package/vue-crop-image-mobile)

```bash
$ npm install vue-crop-image-mobile --save
```
## yarn

```bash
$ yarn add vue-crop-image-mobile --save
```

## CDN

Link: [https://unpkg.com/vue-crop-image-mobile@version/dist/crop-image-mobile.js](https://unpkg.com/vue-crop-image-mobile@version/dist/crop-image-mobile.js) (version is important)

## Usage

use in Vue-template.

```javascript
import Vue from 'vue'
import cropImageMobile from 'vue-crop-image-mobile'
Vue.use(cropImageMobile)
```

It's used in template like this.

```Html
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
```

use in HTML.

```Html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>vue-crop-image-mobile</title>
  </head>
  <body>
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
            :image-file="file" 
            :layer-zIndex="20170424" 
            :layer-opacity="1" 
            layer-color="#000" 
            :auto-compress="false" 
            :quality="0.7"
                ref="cropImageMobile" />
        </div>
    </div>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/crop-image-mobile/dist/crop-image-mobile.js"></script>
</body>
<script>
    new Vue({
        el: '#app',
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
    })
</script>
</html>
```

## rendering

<img src="https://github.com/RedJue/vue-crop-image-mobile/blob/master/example/screenshot/screenshot1.gif" width="281" height="500"/> <img src="https://github.com/RedJue/vue-crop-image-mobile/blob/master/example/screenshot/screenshot2.gif" width="281" height="500"/>