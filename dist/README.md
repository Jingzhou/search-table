# search-table
### 基于element-plus封装的search、table组件 

## JzSearch、JzTable的使用
```
import {JzSearch, JzTable} from "jz-search-table";
export default {
  name: "App",
  components: {
    JzSearch,
    JzTable,
  },
}
```
## JzSearch的参数
```
<JzSearch
      :config="searchConfig"
      :query="query"
      @onSearch="onSearch"
      @onCancel="onCancel"
    >
      <template v-slot:idNo>
        <el-input
          v-model="query.idNo"
          placeholder="请输入身份证"
          :style="{ width: '250px' }"
        />
      </template>
</JzSearch>

config: [
     labelWidth: String， (非必填， 查询条件名称宽度)
     name: String， (必填， 查询条件名称)
     key: String， (必填， 查询条件对应字段)
     type: String， (必填， 查询条件类型， type值为slot时候支持插槽)
     attrs: Object， (必填， element对应组件支持的参数，可以传入style，不传情况下默认宽度200px)
     options: Array， (非必填， element对应组件有option的必填)
     optionAttrs: Array， (非必填， element对应组件有option的必填)
]
query: Object 存储查询条件值的对象
isLoading: Boolean 查询按钮的loading状态

const searchConfig = ref([
      {
        label: "状态",
        type: "select",
        key: "insurance",
        attrs: {
          placeholder: "请选择项目状态",
          clearable: true,
          style: { width: "250px" },
        },
        options: [
          { label: "启用", value: "1" },
          { label: "禁用", value: "2" },
        ],
        optionAttrs: { label: "label", value: "value", key: "value" },
      },
      {
        label: "姓名",
        type: "input",
        key: "name",
        attrs: { placeholder: "请输入姓名", clearable: true },
      },
      { label: "身份证", type: "slot", key: "idNo" },
      {
        label: "创建时间",
        type: "daterange",
        key: "daterange",
        attrs: {
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
          editable: false,
          type: "daterange",
        },
      },
 ]);
````
## JzTable的参数
```
<JzTable
      :config="tableConfig"
      :attrs="tableAttrs"
      :paginationConfig="paginationConfig"
      style="margin-top: 20px"
      title="示例列表"
      @cell-click="cellClick"
      @pageSizeChange="pageSizeChange"
      @currentPageChange="currentPageChange"
    >
      <template v-slot:operation>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">导出</el-button>
      </template>
      <template v-slot:address>
        <el-table-column label="地址">
          <template #default="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
      </template>
</JzTable>

title: String 列表标题
config: Array 列表配置 对应el-table-column的参数
attrs: Object 列表参数 对应el-table的参数
paginationConfig: Object 对应el-pagination的参数

const tableConfig = ref([
      { label: "日期", prop: "date", fixed: "right" },
      { label: "姓名", prop: "name", formatter: formatterName },
      { label: "地址", prop: "address", type: "slot" },
]);
const paginationConfig = ref({
      currentPage: 1,
      pageSize: 10,
      total: 100,
});
const tableAttrs = ref({
      border: true,
      data: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
});
```
