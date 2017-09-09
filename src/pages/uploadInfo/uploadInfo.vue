<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px;margin: 0 auto">
      <el-form-item label="编号">
        <el-input v-model="form.no" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload class="upload-demo" drag action="/iwish/img/upload" multiple :before-upload="beforeUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {
    fileUpload
  } from 'Api/upload';
  import {
    DATA_ERROR_EXCEPTION
  } from 'Utils/constants';
  export default {
    data() {
      return {
        form: {
          no: '',
          name: '',
          desc: '',
          img: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!', this.form);
        fileUpload(this.form)
          .then(resp => {
            console.error('resp', resp);
          })
          .catch(error => {
            this.$toast({
              show: true,
              duration: 2000,
              message: DATA_ERROR_EXCEPTION
            });
          })
      },
      beforeUpload(file) {
        console.error('file------', file);
        this.form.img = file;
        return false;
      }
    }
    // onSuccess(response, file, fileList) {
    //   console.error('resfdsadafsdsa', response, file, fileList);
    // }
  }

</script>
