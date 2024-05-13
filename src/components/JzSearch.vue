<template>
  <el-card class="searchWrap">
    <el-form :inline="true" :model="query">
      <el-form-item
        :label="item.label"
        v-for="item in config"
        :key="item.key"
        :label-width="item.labelWidth ? item.labelWidth : null"
      >
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs.style ? null : { width: '250px' }"
        >
          <el-option
            v-for="o in typeof item.options === 'function'
              ? item.options()
              : item.options"
            :key="o[item.optionAttrs.key]"
            :label="
              typeof item.optionAttrs.label === 'function'
                ? item.optionAttrs.label(o)
                : o[item.optionAttrs.label]
            "
            :value="
              typeof item.optionAttrs.value === 'function'
                ? item.optionAttrs.value(o)
                : o[item.optionAttrs.value]
            "
          />
        </el-select>
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs.style ? null : { width: '250px' }"
        />
        <!-- 时间范围选择 -->
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs.style ? null : { width: '250px' }"
        />
        <!-- 多级联动 -->
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs.style ? null : { width: '250px' }"
        />

        <!-- 插槽 在现有查询组件不满足需求时使用 -->
        <slot :name="item.key" v-if="item.type === 'slot'" />
        <!-- todo 后续可以新增不同类型的组件 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="isLoading"
          >搜索</el-button
        >
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
/**
 * config: [
 *      labelWidth: String， (非必填， 查询条件名称)
 *      name: String， (必填， 查询条件名称)
 *      key: String， (必填， 查询条件对应字段)
 *      type: String， (必填， 查询条件类型， type值为slot时候支持插槽)
 *      attrs: Object， (必填， element对应组件支持的参数，可以传入style，不传情况下默认宽度200px)
 *      options: Array， (非必填， element对应组件有option的必填)
 *      optionAttrs: Array， (非必填， element对应组件有option的必填)
 * ]
 * query: Object 存储查询条件值的对象
 * */
import { toRefs } from "vue";
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElOption,
  ElSelect,
  ElInput,
  ElDatePicker,
  ElCascader,
  ElButton,
} from "element-plus";

const JzSearch = {
  components: {
    ElCard,
    ElForm,
    ElFormItem,
    ElOption,
    ElSelect,
    ElInput,
    ElDatePicker,
    ElCascader,
    ElButton,
  },
  props: {
    config: {
      type: Array,
      default: [],
    },
    query: {
      type: Object,
      default: {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onSearch", "onReset"],
  setup(props, context) {
    const { config, query } = toRefs(props);
    const onSearch = () => {
      context.emit("onSearch", query.value);
    };
    const onReset = () => {
      context.emit("onReset");
    };
    return {
      config,
      query,
      onSearch,
      onReset,
    };
  },
};
export default JzSearch;
</script>

<style lang="less" scoped>
.searchWrap {
  ::v-deep(.el-form-item) {
    margin-bottom: 12px;
  }
  ::v-deep(.el-card__body) {
    padding: 20px 20px 8px 20px;
  }
}
</style>
