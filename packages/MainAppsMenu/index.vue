<template>
  <el-drawer :model-value="visible" title="我的应用" direction="ltr" size="50%">
    <div style="" class="apps-menu-content">
      <div class="apps-menu-history" v-if="historyMenus.length > 0">
        <h3>最近访问</h3>
        <span
          class="adminui-apps-menu-item"
          v-for="(item, index) of historyMenus"
          :key="index"
          @click="doJumpTo(item)"
          >{{ item.appName }}</span
        >
      </div>
      <div class="apps-menu-all">
        <h3>所有应用</h3>
        <span
          class="adminui-apps-menu-item"
          v-for="(item, index) of menus"
          :key="index"
          @click="doJumpTo(item)"
          >{{ item.appName }}</span
        >
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name:'MainAppsMenu',

  data() {
    return {
      visible: false,
      menus: [], 
      historyMenus: [], 
    };
  },
  watch: {
    value(val) {
      if (this.visible != val) {
        this.visible = val;
      }
    },
  },
  mounted() {
    this.menus = this.$TOOL.data.get("ENTER_MENU") || [];
    this.historyMenus = this.$TOOL.data.get("HISTOTY_MENU") || [];
  },
  methods: {
    doJumpTo(menu) {
      this.$TOOL.history(menu); //访问链接加入最近访问储存在localstorage
      this.historyMenus = this.$TOOL.data.get("HISTOTY_MENU") || []; //更新最近访问数据
      console.log( "HISTOTY_MENU",this.$TOOL.data.get("HISTOTY_MENU"))
      window.location.replace(menu.baseRouter + "/"); //跳转页面
    },
  },
};
</script>
<style lang="scss" >
.apps-menu-content {
  display: flex;
  width: 100%;
  height: 100%;
  h3 {
    padding-bottom: 10px;
  }
}
.apps-menu-history,
.apps-menu-all {
  margin: 10px 10px 10px 20px;
}
.apps-menu-history {
  width: 130px;
}
.apps-menu-all {
  flex: 1;
}
.adminui-apps-menu-item{
	$bgColor:var(--el-color-primary);
	margin: 10px 25px 10px 0;
	padding: 6px 10px;
	width: 120px;
	// background-color: rgba($bgColor , 0.2);
	border: 1px solid var(--el-color-primary);
	color: var(--el-color-primary);
	border-radius: 4px;
	display: inline-block;
	cursor: pointer;
	box-sizing: border-box;
	&:hover {
	  border: 1px solid var(--el-color-primary);
	  background-color: var(--el-color-primary) !important;
	  color: #fff;
	}
}
</style>