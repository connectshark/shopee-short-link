<template>
  <div class="btn" @click="callBack" :class="type">{{name}}</div>
</template>

<script>
export default {
  props: {
    callBack: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  display: inline-block;
  width: 70px;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  &:hover{
    opacity: .8;
  }
}
.submit{
  background-color: #0FCAF0;
}
.clear{
  background-color: #6C757D;
}
.copy{
  background-color: #198753;
}
</style>