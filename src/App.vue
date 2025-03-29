<!-- search、table使用示例 -->
<template>
  <div class="pageExample" id="pageExample">
    <JzSearch
      :config="searchConfig"
      :query="query"
      @onSearch="onSearch"
      @onCancel="onCancel"
      id="pageExampleSearch"
    >
      <template v-slot:idNo>
        <el-input
          v-model="query.idNo"
          placeholder="请输入身份证"
          :style="{ width: '250px' }"
        />
      </template>
    </JzSearch>
    <JzTable
      componentName="div"
      :config="tableConfig"
      :attrs="tableAttrs"
      style="margin-top: 20px"
      @cell-click="cellClick"
      @pageSizeChange="pageSizeChange"
      @currentPageChange="currentPageChange"
      :isSetting="true"
      tableName="tableName"
      :is-self-adaption="true"
      :self-adaption-config="selfAdaptionConfig"
    >
      <template v-slot:operation>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">导出</el-button>
      </template>
      <template v-slot:address="slotScope">
        <el-table-column v-bind="slotScope.slotProps">
          <template #default="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
      </template>
      <template #operate="slotScope">
        <el-table-column v-bind="slotScope.slotProps">
          <template #default>
            <el-button type="primary">编辑</el-button>
            <el-button type="primary">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </JzTable>
  </div>
</template>

<script>
import { ref } from "vue";
import JzSearch from "../src/components/JzSearch";
import JzTable from "../src/components/JzTable";
// import { JzSearch, JzTable } from "../dist/search-table.es";
import { ElButton, ElInput, ElTableColumn } from "element-plus";

export default {
  name: "App",
  components: {
    JzSearch,
    JzTable,
    ElButton,
    ElInput,
    ElTableColumn,
  },
  setup() {
    const formatterName = (row, column, cellValue, index) => {
      return `${cellValue}+${index}`;
    };
    const selfAdaptionConfig = {
      pageEl: "pageExample",
      elList: ["pageExampleSearch"],
      dValue: 120,
    }; // 表格组件自适应参数
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
    const tableConfig = ref([
      { label: "日期", prop: "date" },
      { label: "地址11", prop: "address", type: "slot", width: 120 },
      {
        label: "姓名1234",
        prop: "name1",
        formatter: formatterName,
      },
      {
        label: "操作",
        prop: "operate",
        type: "slot",
        width: 120,
        fixed: "right",
      },
    ]);
    const paginationConfig = ref({
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    });
    const query = ref({
      insurance: "",
      name: "",
      idNo: "",
      daterange: [],
    });
    const onSearch = (data) => {
      // 请求查询接口逻辑
      console.log(data);
    };
    const onCancel = () => {
      // 清空查询条件
      query.value = {
        insurance: "",
        name: "",
        idNo: "",
        daterange: [],
      };
    };

    const cellClick = (row, column, cell, event) => {
      console.log(row, column, cell, event);
    };
    const tableAttrs = ref({
      border: true,
      data: [
        {
          date: "2016-05-03",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name1: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    });
    const pageSizeChange = (value) => {
      paginationConfig.value.pageSize = value;
    };
    const currentPageChange = (value) => {
      paginationConfig.value.currentPage = value;
    };
    return {
      searchConfig,
      query,
      onSearch,
      onCancel,
      tableConfig,
      tableAttrs,
      cellClick,
      paginationConfig,
      pageSizeChange,
      currentPageChange,
      selfAdaptionConfig,
    };
  },
};
</script>

<style lang="less">
html {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: "PingFang SC", miui, system-ui, -apple-system, BlinkMacSystemFont,
    Helvetica Neue, Helvetica, sans-serif;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  border: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  color: #323233;
  overflow-y: auto;
}
.pageExample {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}
</style>
