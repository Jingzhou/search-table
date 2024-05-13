import JzSearch from "./src/components/JzSearch.vue";
import JzTable from "./src/components/JzTable.vue";
import "element-plus/dist/index.css";
const components = [JzSearch, JzTable];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (app) {
  // 遍历注册全局组件
  components.map((component) => app.use(component));
};

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
};

export { JzSearch, JzTable };
