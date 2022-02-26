// import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api/token`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	}
}
