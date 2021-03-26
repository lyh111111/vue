<template>
  <el-cascader v-model="values" :options="options" :props="props" :clearable="clearable">
    <template slot-scope="{ node, data }">
      <div @click="clickEvent(node, data)">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </div>
    </template>
  </el-cascader>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
      // 默认是多选，鼠标悬停展开下一级
        return { multiple: true, expandTrigger: 'hover', checkStrictly: true }
      }
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    values: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    clickEvent(node) {
      let values = []
      const { checked, indeterminate } = node
      if (checked) {
        // 全选 => 反选
        values = this.compareData(node, 0)
      } else if (indeterminate) {
        // 子级选择部分 => 全选
        values = this.compareData(node, 1)
      } else {
        // 未选择 => 全选
        values = this.compareData(node, 2)
      }
      this.values = [...values]
    },
    filterNode(list) {
      const arr = []
      if (!list.hasChildren) {
        return [list.path]
      }
      function _iterate(data) {
        data.forEach(({ hasChildren, path, children }) => {
          if (!hasChildren) {
            arr.push(path)
          }
          return _iterate(children)
        })
        return arr
      }
      return _iterate(list.children)
    },
    compareData(node, type) {
      const v = this.filterNode(node)
      let oldValue = this.values
      const arr = []
      // 未选择 => 全选
      if (type === 2) {
        return [...v, ...oldValue]
      }

      const newValue = v.join('##').split('##')
      oldValue = oldValue.join('##').split('##')
      // 全选 => 反选
      if (type === 0) {
        newValue.forEach(i => {
          const indexOf = oldValue.indexOf(i)
          if (indexOf > -1) {
            oldValue.splice(indexOf, 1)
          }
        })
      } else { // 子级选择部分 => 全选
        newValue.forEach(i => {
          const indexOf = oldValue.indexOf(i)
          if (indexOf < 0) {
            oldValue.push(i)
          }
        })
      }
      oldValue.forEach(o => {
        arr.push(o.split(','))
      })
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>