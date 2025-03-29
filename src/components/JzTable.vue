<template>
  <component
    :is="componentName"
    class="tableWrap"
    v-adaptiveHeight:[{selfAdaptionConfig,componentName}]="isSelfAdaption"
  >
    <!-- 标题 -->
    <div class="tableTitleWrap">
      <div class="tableOperation" v-if="$slots.operation || isSetting">
        <slot name="operation"></slot>
      </div>
      <div class="setting" v-if="isSetting">
        <el-popover
          trigger="click"
          title="自定义列"
          placement="bottom-end"
          :popper-style="{ width: 'auto' }"
        >
          <template #reference>
            <el-button>
              <el-icon>
                <Setting style="width: 14px; height: 14px" />
              </el-icon>
            </el-button>
          </template>
          <div>
            <div v-for="item in config" :key="item.prop">
              <el-checkbox
                :model-value="item.isShow"
                :label="item.label"
                @change="(value) => checkboxChange(value, item.prop)"
              />
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <!-- 表格 -->
    <div class="tableBody">
      <el-table
        stripe
        v-bind="{ ...attrs, ...$attrs }"
        style="width: 100%"
        ref="table"
        :key="tableKey"
        @header-dragend="handleHeaderDragend"
      >
        <template
          v-for="(item, index) in config.filter((item) => item.isShow)"
          :key="index"
        >
          <slot
            class="slot"
            :name="item.prop"
            :slotProps="{ ...item }"
            v-if="item.type === 'slot'"
          ></slot>
          <!-- 支持三级表头 -->
          <template v-else>
            <el-table-column
              v-if="item.childrenCol && item.childrenCol.length"
              min-width="120"
              show-overflow-tooltip
              v-bind="item"
            >
              <template v-for="sub in item.childrenCol" :key="sub.prop">
                <el-table-column
                  v-if="sub.childrenCol && sub.childrenCol.length"
                  min-width="120"
                  show-overflow-tooltip
                  v-bind="sub"
                >
                  <el-table-column
                    v-for="ssub in sub.childrenCol"
                    :key="ssub.prop"
                    min-width="120"
                    show-overflow-tooltip
                    v-bind="ssub"
                  />
                </el-table-column>
                <el-table-column
                  v-else
                  min-width="120"
                  show-overflow-tooltip
                  v-bind="sub"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else
              min-width="120"
              show-overflow-tooltip
              v-bind="item"
            />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="paginationWrap">
      <el-pagination
        v-if="paginationConfig.pageIndex"
        v-model:currentPage="paginationConfig.pageIndex"
        v-model:page-size="paginationConfig.pageSize"
        :page-sizes="
          paginationConfig.pageSizes
            ? paginationConfig.pageSizes
            : [10, 20, 50, 100]
        "
        layout="total, sizes, prev, pager, next"
        :total="paginationConfig.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </component>
</template>

<script>
/**
 * config: Array 列表配置 对应el-table-column的参数
 * attrs: Object 列表参数 对应el-table的参数
 * paginationConfig: Object 对应el-pagination的参数
 * isSelfAdaption: 是否自适应高度
 * selfAdaptionConfig: {pageEl: '', elList: [], DValue: 0}
 *-- pageEl: 页面元素id
 *-- elList: 除了table以外其他元素的id
 *-- DValue: 差值
 * tableName: 表单的key，isSetting为true时生效，且必填
 * isSetting: 是否显示设置按钮
 * */
import { ref, onUnmounted, onBeforeMount, nextTick } from "vue";
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElButton,
  ElIcon,
  ElPopover,
  ElCheckbox,
} from "element-plus";
import { Setting } from "@element-plus/icons-vue";

const JzTable = {
  components: {
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElButton,
    ElIcon,
    Setting,
    ElPopover,
    ElCheckbox,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    config: {
      type: Array,
      default: [],
    },
    attrs: {
      type: Object,
      default: {},
    },
    paginationConfig: {
      type: Object,
      default: {},
    },
    isSelfAdaption: {
      type: Boolean,
      default: false,
    },
    selfAdaptionConfig: {
      type: Object,
      default: { pageEl: "", elList: [], DValue: 0 },
    },
    tableName: {
      type: String,
      default: null,
    },
    isSetting: {
      type: Boolean,
      default: false,
    },
    componentName: {
      type: String,
      default: "el-card",
    },
  },
  emits: ["pageSizeChange", "currentPageChange", "selectChange"],
  setup(props, context) {
    const table = ref();
    const tableKey = ref(1);
    const handleSizeChange = (value) => {
      context.emit("pageSizeChange", value);
    };
    const handleCurrentChange = (value) => {
      context.emit("currentPageChange", value);
    };
    // 复选框改变
    const checkboxChange = async (value, prop) => {
      props.config.forEach(async (item) => {
        if (item.prop === prop) {
          item.isShow = value;
        }
      });
      localStorage.setItem(
        props.tableName,
        JSON.stringify(
          props.config.map((item) => {
            return {
              prop: item.prop,
              isShow: item.isShow,
              width: item.width,
            };
          })
        )
      );
      // 强制重新渲染表格（慎用）
      await nextTick();
      tableKey.value++;
    };
    // 表头拖拽改变宽度
    const handleHeaderDragend = async (newWidth, oldWidth, column) => {
      props.config.forEach(async (item) => {
        if (item.prop === column.property) {
          item.width = newWidth;
        }
      });
      localStorage.setItem(
        props.tableName,
        JSON.stringify(
          props.config.map((item) => {
            return {
              prop: item.prop,
              isShow: item.isShow,
              width: item.width,
            };
          })
        )
      );
      // 强制重新渲染表格（慎用）
      await nextTick();
      tableKey.value++;
    };
    // 销毁前
    onUnmounted(() => {
      window.onresize = null;
    });
    // 渲染前，获取缓存中的配置
    onBeforeMount(() => {
      // 可以自定义列
      nextTick(() => {
        if (props.isSetting && props.tableName) {
          const localConfig =
            JSON.parse(localStorage.getItem(props.tableName)) || [];
          // 缓存中没有，使用默认配置
          if (!localConfig.length) {
            props.config.forEach((item) => {
              item.isShow = true;
            });
          } else {
            // 缓存中有，使用缓存中的配置
            props.config.forEach((item) => {
              const config = localConfig.find((i) => i.prop === item.prop);
              if (config) {
                item.isShow = config.isShow;
                item.width = config.width;
              } else {
                item.isShow = true;
              }
            });
          }
          // 缓存
          localStorage.setItem(
            props.tableName,
            JSON.stringify(
              props.config.map((item) => {
                return {
                  prop: item.prop,
                  isShow: item.isShow,
                  width: item.width,
                };
              })
            )
          );
        } else {
          // 不可以自定义列，直接返回配置
          props.config.forEach((item) => {
            item.isShow = true;
          });
        }
      });
    });
    return {
      handleSizeChange,
      handleCurrentChange,
      table,
      tableKey,
      checkboxChange,
      handleHeaderDragend,
    };
  },
  directives: {
    adaptiveHeight: {
      mounted(el, binding) {
        if (!binding.value) return;
        // 整个页面的高度
        const selfAdaption = () => {
          const pageHeight = binding.arg.selfAdaptionConfig.pageEl
            ? document.getElementById(binding.arg.selfAdaptionConfig.pageEl)
                .clientHeight
            : 0;
          // 除了table以外其他元素的高度
          let elListHeight = 0;
          const elList = binding.arg.selfAdaptionConfig.elList || [];
          elList.forEach((el) => {
            elListHeight += document.getElementById(el).clientHeight;
          });
          // 其他差值
          const dValue = binding.arg.selfAdaptionConfig.dValue || 0;
          const cardBody =
            binding.arg.componentName === "el-card"
              ? el.getElementsByClassName("el-card__body")[0]
              : el;
          console.log(el);
          const tableTitleH =
            cardBody.getElementsByClassName("tableTitleWrap")[0].clientHeight;
          const paginationH =
            cardBody.getElementsByClassName("paginationWrap")[0].clientHeight;
          const tableBody = cardBody.getElementsByClassName("tableBody")[0];
          const elTable = tableBody.getElementsByClassName("el-table")[0];
          elTable.style.overflowY = "auto";
          elTable.style.maxHeight = `${
            pageHeight - elListHeight - tableTitleH - paginationH - dValue
          }px`;
        };
        selfAdaption();
        window.onresize = () => selfAdaption();
      },
    },
  },
};
export default JzTable;
</script>

<style lang="less" scoped>
.tableWrap {
  .tableTitleWrap {
    display: flex;
    justify-content: space-between;
    .setting {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .tableBody {
    margin-top: 10px;
  }
  .paginationWrap {
    float: right;
    margin: 10px 0;
  }
}
</style>
