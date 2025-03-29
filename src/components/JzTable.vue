<template>
  <component
    :is="componentName"
    class="tableWrap"
    :id="`${tableName}TableWrap`"
  >
    <!-- 标题 -->
    <div class="tableTitleWrap" :id="`${tableName}TableTitleWrap`">
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
    <div class="tableBody" :id="`${tableName}TableBody`">
      <el-table
        stripe
        v-bind="{ ...attrs, ...$attrs }"
        style="width: 100%"
        ref="table"
        :key="`${tableName}${tableKey}`"
        @header-dragend="handleHeaderDragend"
        :max-height="tableHeight"
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
    <div class="paginationWrap" :id="`${tableName}PaginationWrap`">
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
import { ref, onUnmounted, onBeforeMount, onMounted, nextTick } from "vue";
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
      default: "",
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
    const table = ref(null);
    let resizeObserver = null;
    const tableKey = ref(1);
    const tableHeight = ref("auto");
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
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
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
    // 渲染后，自适应高度
    onMounted(() => {
      if (props.isSelfAdaption) {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            // 在这里处理尺寸变化的逻辑;
            // 整个页面的高度
            const { height } = entry.contentRect;
            const pageHeight = height;
            // 除了table以外其他元素的高度
            let elListHeight = 0;
            const elList = props.selfAdaptionConfig.elList || [];
            elList.forEach((el) => {
              elListHeight += document.getElementById(el).clientHeight;
            });
            // 其他差值
            const dValue = props.selfAdaptionConfig.dValue || 0;
            const tableTitleH = document.getElementById(
              `${props.tableName}TableTitleWrap`
            ).clientHeight; // 表格标题高度
            const paginationH = document.getElementById(
              `${props.tableName}PaginationWrap`
            ).clientHeight; // 分页高度
            const tableBody = document.getElementById(
              `${props.tableName}TableBody`
            );
            const elTable = tableBody
              .getElementsByClassName("el-table")[0]
              .getElementsByClassName("el-table__inner-wrapper")[0];
            const elTableHeaderH = elTable.getElementsByClassName(
              "el-table__header-wrapper"
            )[0].clientHeight; // 表头高度
            console.log(
              pageHeight,
              elListHeight,
              tableTitleH,
              elTableHeaderH,
              paginationH,
              dValue
            );
            tableHeight.value = `${
              pageHeight -
              elListHeight -
              tableTitleH -
              elTableHeaderH -
              paginationH -
              dValue
            }px`;
          }
        });
        resizeObserver.observe(
          document.getElementById(props.selfAdaptionConfig.pageEl)
        );
      }
    });
    return {
      handleSizeChange,
      handleCurrentChange,
      table,
      tableKey,
      checkboxChange,
      handleHeaderDragend,
      tableHeight,
    };
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
