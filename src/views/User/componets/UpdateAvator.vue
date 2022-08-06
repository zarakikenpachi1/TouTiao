<template>
  <div class="update-avator">
    <img :src="photo" alt="" class="img" ref="image" />
    <footer>
      <span @click="$parent.$parent.isShowAvator = false">取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadAvator() {
      // 获取裁剪后的图像file对象（查看文档）
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传',
          forbidClick: true
        })
        try {
          // 发送请求
          const { data } = await uploadAvator(blob)
          console.log(data)
          // 更改父组件头像
          this.$emit('update-avator', data.data.photo)
          // 关闭弹层
          this.$parent.$parent.isShowAvator = false
          this.$toast.success('图片上传成功')
        } catch (e) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
