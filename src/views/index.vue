<template>
  <el-button @click="show = true">打开菜单</el-button>
  <!-- <apps-menu v-model="show"></apps-menu> -->
  <bs-button></bs-button>
</template>
<script>
export default {
  name: "Demo",
  data() {
    return {
      show: false,
    };
  },
};
</script>