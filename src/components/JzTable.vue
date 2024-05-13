<template>
  <el-card
    class="tableWrap"
    v-adaptiveHeight:[selfAdaptionConfig]="isSelfAdaption"
  >
    <div class="tableTitle" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="tableTitleWrap">
      <div class="tableOperation" v-if="$slots.operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="tableBody">
      <el-table
        stripe
        v-bind="{ ...attrs, ...$attrs }"
        style="width: 100%"
        ref="table"
      >
        <template v-for="item in config" :key="item.prop">
          <slot
            class="slot"
            :name="item.prop"
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
    <div v-if="paginationConfig.pageIndex" class="paginationWrap">
      <el-pagination
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
  </el-card>
</template>

<script>
/**
 * title: String 列表标题
 * config: Array 列表配置 对应el-table-column的参数
 * attrs: Object 列表参数 对应el-table的参数
 * paginationConfig: Object 对应el-pagination的参数
 * */
import { ref } from "vue";
import { ElCard, ElTable, ElTableColumn, ElPagination } from "element-plus";

const JzTable = {
  components: { ElCard, ElTable, ElTableColumn, ElPagination },
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
  },
  emits: ["pageSizeChange", "currentPageChange", "selectChange"],
  setup(props, context) {
    const table = ref();
    const handleSizeChange = (value) => {
      context.emit("pageSizeChange", value);
    };
    const handleCurrentChange = (value) => {
      context.emit("currentPageChange", value);
    };
    return {
      handleSizeChange,
      handleCurrentChange,
      table,
    };
  },
  directives: {
    adaptiveHeight: {
      mounted(el, binding) {
        if (!binding.value) return;
        // 整个页面的高度
        const selfAdaption = () => {
          const pageHeight = binding.arg.pageEl
            ? document.getElementById(binding.arg.pageEl).clientHeight
            : 0;
          // 除了table以外其他元素的高度
          let elListHeight = 0;
          const elList = binding.arg.elList || [];
          elList.forEach((el) => {
            elListHeight += document.getElementById(el).clientHeight;
          });
          // 其他差值
          const dValue = binding.arg.dValue || 0;
          const cardBody = el.getElementsByClassName("el-card__body")[0];
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
  unmounted() {
    window.onresize = null;
  },
};
export default JzTable;
</script>

<style lang="less" scoped>
.tableWrap {
  .tableTitleWrap {
    display: flex;
    justify-content: space-between;
    .tableTitle {
      height: 32px;
      line-height: 32px;
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
