import { toRefs, resolveComponent, openBlock, createBlock, withCtx, createVNode, createElementBlock, Fragment, renderList, createCommentVNode, mergeProps, renderSlot, createTextVNode, ref, onUnmounted, onBeforeMount, nextTick, resolveDirective, withDirectives, createElementVNode } from 'vue';
import { ElCard, ElForm, ElFormItem, ElOption, ElSelect, ElInput, ElDatePicker, ElCascader, ElButton, ElTable, ElTableColumn, ElPagination, ElIcon, ElPopover, ElCheckbox } from 'element-plus';
import { Setting } from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

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

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_date_picker = resolveComponent("el-date-picker");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "searchWrap" }, {
    default: withCtx(() => [
      createVNode(_component_el_form, {
        inline: true,
        model: _ctx.query
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.config, (item) => {
            return (openBlock(), createBlock(_component_el_form_item, {
              label: item.label,
              key: item.key,
              "label-width": item.labelWidth ? item.labelWidth : null
            }, {
              default: withCtx(() => [
                createCommentVNode(" 选择框 "),
                (item.type === 'select')
                  ? (openBlock(), createBlock(_component_el_select, mergeProps({
                      key: 0,
                      modelValue: _ctx.query[item.key],
                      "onUpdate:modelValue": $event => ((_ctx.query[item.key]) = $event),
                      ref_for: true
                    }, item.attrs, {
                      style: item.attrs.style ? null : { width: '250px' }
                    }), {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(typeof item.options === 'function'
              ? item.options()
              : item.options, (o) => {
                          return (openBlock(), createBlock(_component_el_option, {
                            key: o[item.optionAttrs.key],
                            label: 
              typeof item.optionAttrs.label === 'function'
                ? item.optionAttrs.label(o)
                : o[item.optionAttrs.label]
            ,
                            value: 
              typeof item.optionAttrs.value === 'function'
                ? item.optionAttrs.value(o)
                : o[item.optionAttrs.value]
            
                          }, null, 8 /* PROPS */, ["label", "value"]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "style"]))
                  : createCommentVNode("v-if", true),
                createCommentVNode(" 输入框 "),
                (item.type === 'input')
                  ? (openBlock(), createBlock(_component_el_input, mergeProps({
                      key: 1,
                      modelValue: _ctx.query[item.key],
                      "onUpdate:modelValue": $event => ((_ctx.query[item.key]) = $event),
                      ref_for: true
                    }, item.attrs, {
                      style: item.attrs.style ? null : { width: '250px' }
                    }), null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "style"]))
                  : createCommentVNode("v-if", true),
                createCommentVNode(" 时间范围选择 "),
                (item.type === 'daterange')
                  ? (openBlock(), createBlock(_component_el_date_picker, mergeProps({
                      key: 2,
                      modelValue: _ctx.query[item.key],
                      "onUpdate:modelValue": $event => ((_ctx.query[item.key]) = $event),
                      ref_for: true
                    }, item.attrs, {
                      style: item.attrs.style ? null : { width: '250px' }
                    }), null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "style"]))
                  : createCommentVNode("v-if", true),
                createCommentVNode(" 多级联动 "),
                (item.type === 'cascader')
                  ? (openBlock(), createBlock(_component_el_cascader, mergeProps({
                      key: 3,
                      modelValue: _ctx.query[item.key],
                      "onUpdate:modelValue": $event => ((_ctx.query[item.key]) = $event),
                      ref_for: true
                    }, item.attrs, {
                      style: item.attrs.style ? null : { width: '250px' }
                    }), null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "style"]))
                  : createCommentVNode("v-if", true),
                createCommentVNode(" 插槽 在现有查询组件不满足需求时使用 "),
                (item.type === 'slot')
                  ? renderSlot(_ctx.$slots, item.key, { key: 4 })
                  : createCommentVNode("v-if", true),
                createCommentVNode(" todo 后续可以新增不同类型的组件 ")
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "label-width"]))
          }), 128 /* KEYED_FRAGMENT */)),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                onClick: _ctx.onSearch,
                loading: _ctx.isLoading
              }, {
                default: withCtx(() => [
                  createTextVNode("搜索")
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick", "loading"]),
              createVNode(_component_el_button, { onClick: _ctx.onReset }, {
                default: withCtx(() => [
                  createTextVNode("重置")
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"])
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["model"])
    ]),
    _: 3 /* FORWARDED */
  }))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".searchWrap[data-v-ce561170] [data-v-ce561170] .el-form-item {\n  margin-bottom: 12px;\n}\n.searchWrap[data-v-ce561170] [data-v-ce561170] .el-card__body {\n  padding: 20px 20px 8px 20px;\n}\n";
styleInject(css_248z$1);

JzSearch.render = render$1;
JzSearch.__scopeId = "data-v-ce561170";
JzSearch.__file = "src/components/JzSearch.vue";

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
};

const _hoisted_1 = { class: "tableTitleWrap" };
const _hoisted_2 = {
  key: 0,
  class: "tableOperation"
};
const _hoisted_3 = {
  key: 1,
  class: "setting"
};
const _hoisted_4 = { class: "tableBody" };
const _hoisted_5 = {
  key: 0,
  class: "paginationWrap"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Setting = resolveComponent("Setting");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_popover = resolveComponent("el-popover");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_card = resolveComponent("el-card");
  const _directive_adaptiveHeight = resolveDirective("adaptiveHeight");

  return withDirectives((openBlock(), createBlock(_component_el_card, { class: "tableWrap" }, {
    default: withCtx(() => [
      createCommentVNode(" 标题 "),
      createElementVNode("div", _hoisted_1, [
        (_ctx.$slots.operation || _ctx.isSetting)
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "operation")
            ]))
          : createCommentVNode("v-if", true),
        (_ctx.isSetting)
          ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(_component_el_popover, {
                trigger: "click",
                title: "自定义列",
                placement: "bottom-end"
              }, {
                reference: withCtx(() => [
                  createVNode(_component_el_button, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(_component_Setting, { style: {"width":"14px","height":"14px"} })
                        ]),
                        _: 1 /* STABLE */
                      })
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: withCtx(() => [
                  createElementVNode("div", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.config, (item) => {
                      return (openBlock(), createElementBlock("div", {
                        key: item.prop
                      }, [
                        createVNode(_component_el_checkbox, {
                          "model-value": item.isShow,
                          label: item.label,
                          onChange: (value) => _ctx.checkboxChange(value, item.prop)
                        }, null, 8 /* PROPS */, ["model-value", "label", "onChange"])
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ])
                ]),
                _: 1 /* STABLE */
              })
            ]))
          : createCommentVNode("v-if", true)
      ]),
      createCommentVNode(" 表格 "),
      createElementVNode("div", _hoisted_4, [
        (openBlock(), createBlock(_component_el_table, mergeProps({ stripe: "" }, { ..._ctx.attrs, ..._ctx.$attrs }, {
          style: {"width":"100%"},
          ref: "table",
          key: _ctx.tableKey,
          onHeaderDragend: _ctx.handleHeaderDragend
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.config.filter((item) => item.isShow), (item, index) => {
              return (openBlock(), createElementBlock(Fragment, { key: index }, [
                (item.type === 'slot')
                  ? renderSlot(_ctx.$slots, item.prop, {
                      key: 0,
                      class: "slot",
                      slotProps: { ...item }
                    })
                  : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createCommentVNode(" 支持三级表头 "),
                      (item.childrenCol && item.childrenCol.length)
                        ? (openBlock(), createBlock(_component_el_table_column, mergeProps({
                            key: 0,
                            "min-width": "120",
                            "show-overflow-tooltip": "",
                            ref_for: true
                          }, item), {
                            default: withCtx(() => [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(item.childrenCol, (sub) => {
                                return (openBlock(), createElementBlock(Fragment, {
                                  key: sub.prop
                                }, [
                                  (sub.childrenCol && sub.childrenCol.length)
                                    ? (openBlock(), createBlock(_component_el_table_column, mergeProps({
                                        key: 0,
                                        "min-width": "120",
                                        "show-overflow-tooltip": "",
                                        ref_for: true
                                      }, sub), {
                                        default: withCtx(() => [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(sub.childrenCol, (ssub) => {
                                            return (openBlock(), createBlock(_component_el_table_column, mergeProps({
                                              key: ssub.prop,
                                              "min-width": "120",
                                              "show-overflow-tooltip": "",
                                              ref_for: true
                                            }, ssub), null, 16 /* FULL_PROPS */))
                                          }), 128 /* KEYED_FRAGMENT */))
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */))
                                    : (openBlock(), createBlock(_component_el_table_column, mergeProps({
                                        key: 1,
                                        "min-width": "120",
                                        "show-overflow-tooltip": "",
                                        ref_for: true
                                      }, sub), null, 16 /* FULL_PROPS */))
                                ], 64 /* STABLE_FRAGMENT */))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */))
                        : (openBlock(), createBlock(_component_el_table_column, mergeProps({
                            key: 1,
                            "min-width": "120",
                            "show-overflow-tooltip": "",
                            ref_for: true
                          }, item), null, 16 /* FULL_PROPS */))
                    ], 64 /* STABLE_FRAGMENT */))
              ], 64 /* STABLE_FRAGMENT */))
            }), 128 /* KEYED_FRAGMENT */))
          ]),
          _: 3 /* FORWARDED */
        }, 16 /* FULL_PROPS */, ["onHeaderDragend"]))
      ]),
      createCommentVNode(" 分页 "),
      (_ctx.paginationConfig.pageIndex)
        ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createVNode(_component_el_pagination, {
              currentPage: _ctx.paginationConfig.pageIndex,
              "onUpdate:currentPage": _cache[0] || (_cache[0] = $event => ((_ctx.paginationConfig.pageIndex) = $event)),
              "page-size": _ctx.paginationConfig.pageSize,
              "onUpdate:pageSize": _cache[1] || (_cache[1] = $event => ((_ctx.paginationConfig.pageSize) = $event)),
              "page-sizes": 
          _ctx.paginationConfig.pageSizes
            ? _ctx.paginationConfig.pageSizes
            : [10, 20, 50, 100]
        ,
              layout: "total, sizes, prev, pager, next",
              total: _ctx.paginationConfig.total,
              onSizeChange: _ctx.handleSizeChange,
              onCurrentChange: _ctx.handleCurrentChange
            }, null, 8 /* PROPS */, ["currentPage", "page-size", "page-sizes", "total", "onSizeChange", "onCurrentChange"])
          ]))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  })), [
    [_directive_adaptiveHeight, _ctx.isSelfAdaption, _ctx.selfAdaptionConfig]
  ])
}

var css_248z = ".tableWrap[data-v-af0a3944] .tableTitleWrap[data-v-af0a3944] {\n  display: flex;\n  justify-content: space-between;\n}\n.tableWrap[data-v-af0a3944] .tableTitleWrap[data-v-af0a3944] .setting[data-v-af0a3944] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.tableWrap[data-v-af0a3944] .tableBody[data-v-af0a3944] {\n  margin-top: 10px;\n}\n.tableWrap[data-v-af0a3944] .paginationWrap[data-v-af0a3944] {\n  float: right;\n  margin: 10px 0;\n}\n";
styleInject(css_248z);

JzTable.render = render;
JzTable.__scopeId = "data-v-af0a3944";
JzTable.__file = "src/components/JzTable.vue";

const components = [JzSearch, JzTable];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (app) {
  // 遍历注册全局组件
  components.map(component => app.use(component));
};
var index = {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
};

export { JzSearch, JzTable, index as default };
