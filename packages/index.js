import MainAppsMenu from "./MainAppsMenu";
import BsButton from "./BsButton";

// 当使用Vue.use(plugin)安装插件时，
// 实际上就是在调用这里暴露出的对象的
// install方法，因此务必确保这里带有install方法
const install =  function(Vue){
	if (install.installed) return;
	Vue.component(MainAppsMenu.name,MainAppsMenu);
	Vue.component(BsButton.name,BsButton);
}
export default { install }
