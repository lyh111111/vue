<template>
  <div class="custom-tree-container">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="getNode"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}
          <el-tooltip
            class="item"
            effect="light"
            :content="'经理人数:' + data.manager_count"
            placement="top-start"
          >
            <i class="el-icon-s-custom" style="margin-left: 10px;" />
          </el-tooltip>
        </span>

        <span v-if="data.pid == 0 && flag == '0'">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit-outline"
            style="position: absolute; left: 0; top: -28px;"
            @click="() => open(data)"
          >编辑</el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="编辑架构" :visible.sync="dialogFormVisible">
      <!--添加部门-->
      <el-dialog
        width="40%"
        title="部门"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          ref="deptForm"
          inline
          size="small"
          :model="deptForm"
          :rules="deptRules"
        >
          <el-form-item label="部门" prop="name">
            <el-input
              v-model="deptForm.name"
              maxlength="10"
              show-word-limit
              placeholder="请输入部门名称"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="innerVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addDept()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        width="40%"
        title="经理设置"
        :visible.sync="managerVisible"
        append-to-body
      >
        <el-form
          ref="managerForm"
          inline
          size="small"
          :model="managerForm"
          :rules="managerRules"
        >
          <el-form-item label="要设置经理的人员" prop="user_arr">
            <el-select
              v-model="managerForm.user_arr"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择人员"
            >
              <el-option
                v-for="item in userAll"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="managerVisible = false">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            :loading="managerLoading"
            @click="managerDept"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑架构-->
      <el-form>
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}
              <el-tooltip
                class="item"
                effect="light"
                :content="'经理人数:' + data.manager_count"
                placement="top-start"
              >
                <i class="el-icon-s-custom" style="margin-left: 10px;" />
              </el-tooltip>
            </span>
            <span>
              <el-button
                v-has="'dept_set_add'"
                type="text"
                size="mini"
                class="text-color"
                @click="() => append(data)"
              >添加</el-button>
              <el-button
                v-has="'dept_set_edit'"
                type="text"
                size="mini"
                class="text-color"
                @click="() => edit(data)"
              >编辑</el-button>
              <el-button
                v-has="'setup_manager'"
                type="text"
                size="mini"
                class="text-color"
                @click="() => editManager(data)"
              >经理设置</el-button>
              <el-button
                v-if="data.display != 1"
                v-has="'dept_set_del'"
                type="text"
                size="mini"
                class="text-color"
              >
                <el-popconfirm
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定要删除吗？"
                  @onConfirm="remove(node, data)"
                >
                  <span slot="reference">删除</span>
                </el-popconfirm>
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  setManager,
  getDeptList,
  createDept,
  updateDept,
  delDept,
  getManager
} from '@/api/dept'
import { getAllUsers } from '@/api/staff'
import { toTreeList } from '@/utils/tool'
import { debounce } from '@/utils/index'
export default {
  props: {
    flag: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      deptRules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
      },
      managerRules: {
        user_arr: [{ required: true, message: '请选择经理', trigger: 'blur' }]
      },
      data: [],
      userAll: [],
      dialogFormVisible: false,
      innerVisible: false,
      managerVisible: false,
      managerLoading: false,
      deptForm: {
        id: 0,
        name: '',
        parent_id: 0
      },
      formLabelWidth: '120px',
      managerForm: {
        user_arr: [],
        dept_arr: []
      }
    }
  },
  created() {
    this.getDeptList()
    this.getAllUsers()
  },
  methods: {
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    clearForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].clearValidate()
      }
    },
    // 根据部门搜索
    getNodeDebounce: debounce(function(data) {
      this.$emit('child-event', data)
    }, 500, true),
    getNode(data) {
      this.getNodeDebounce(data)
    },
    // 部门列表
    async getDeptList() {
      let res = await getDeptList()
      if (res && res.code == 200) {
        this.data = toTreeList(res.data, 'pid')
      }
    },
    // 员工列表
    async getAllUsers() {
      let res = await getAllUsers()
      if (res && res.code == 200) {
        this.userAll = res.data
      }
    },
    // 编辑架构弹窗
    open() {
      this.dialogFormVisible = true
    },
    // 添加/编辑 部门
    addDeptDebounce: debounce(function() {
      this.$refs['deptForm'].validate(valid => {
        if (valid) {
          // 添加
          if (this.deptForm.id == 0) {
            createDept({
              name: this.deptForm.name,
              parent_id: this.deptForm.parent_id
            })
              .then(response => {
                if (response.code == 200) {
                  this.innerVisible = false
                  this.$refs['deptForm'].resetFields()
                  this.$message.success('添加成功')
                  this.getDeptList()
                } else {
                  this.$message.error(response.msg)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
          } else {
            // 编辑
            updateDept(this.deptForm)
              .then(response => {
                if (response.code == 200) {
                  this.innerVisible = false
                  this.$refs['deptForm'].resetFields()
                  this.$message.success('编辑成功')
                  this.getDeptList()
                } else {
                  this.$message.error(response.msg)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
          }
        } else {
          return false
        }
      })
    }, 500, true),
    addDept() {
      this.addDeptDebounce()
    },
    // 添加部门弹框
    append(data) {
      this.innerVisible = true
      this.resetForm('deptForm')
      this.deptForm.id = 0
      this.deptForm.name = ''
      this.deptForm.parent_id = data.id
    },
    // 编辑部门弹框
    edit(data) {
      this.innerVisible = true
      this.resetForm('deptForm')
      this.deptForm.parent_id = data.pid
      this.deptForm.name = data.label
      this.deptForm.id = data.id
    },
    // 编辑经理设置
    async editManager(data) {
      this.resetForm('managerForm')
      this.managerForm.dept_arr = []
      this.managerVisible = true
      this.managerForm.dept_arr.push(data.id)
      let res = await getManager({ dept_id: data.id })
      if (res && res.code == 200) {
        this.managerForm.user_arr = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      }
    },
    managerDeptDebounce: debounce(function() {
      this.$refs['managerForm'].validate(async valid => {
        if (valid) {
          this.managerLoading = true
          let res = await setManager(this.managerForm)
          if (res && res.code == 200) {
            this.$message({
              showClose: true,
              message: '设置成功,数据权限在下次登录后有效~',
              type: 'success'
            })
            this.getDeptList()
            this.managerVisible = false
            this.managerLoading = false
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
            this.managerLoading = false
          }
          this.managerLoading = false
        }
      })
    }, 500, true),
    managerDept() {
      this.managerDeptDebounce()
    },
    // 删除部门
    removeDebounce: debounce(async function(data) {
      let res = await delDept({ id: data.id })
      if (res && res.code == 200) {
        this.$message.success('删除成功')
        this.getDeptList()
      } else {
        this.$message.error(res.msg)
      }
    }, 500, true),
    remove(node, data) {
      this.removeDebounce(data)
    }
  }
}
</script>

<style>
.text-color {
  color: #000;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-container {
  min-width: 300px;
  padding-top: 30px;
}
</style>