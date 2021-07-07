<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="租户id，0为系统用户" prop="tenantid">
      <el-input v-model="dataForm.tenantid" placeholder="租户id，0为系统用户"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="dataForm.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="用户密码MD5加密" prop="psw">
      <el-input v-model="dataForm.psw" placeholder="用户密码MD5加密"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="用户邮箱"></el-input>
    </el-form-item>
    <el-form-item label="创建人，0为初始化" prop="creator">
      <el-input v-model="dataForm.creator" placeholder="创建人，0为初始化"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createtime">
      <el-input v-model="dataForm.createtime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="用户状态，1启用，0禁用" prop="flag">
      <el-input v-model="dataForm.flag" placeholder="用户状态，1启用，0禁用"></el-input>
    </el-form-item>
    <el-form-item label="最后登录时间" prop="logintime">
      <el-input v-model="dataForm.logintime" placeholder="最后登录时间"></el-input>
    </el-form-item>
    <el-form-item label="更新者id" prop="updateuser">
      <el-input v-model="dataForm.updateuser" placeholder="更新者id"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updatetime">
      <el-input v-model="dataForm.updatetime" placeholder="更新时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          tenantid: '',
          name: '',
          psw: '',
          email: '',
          creator: '',
          createtime: '',
          flag: '',
          logintime: '',
          updateuser: '',
          updatetime: ''
        },
        dataRule: {
          tenantid: [
            { required: true, message: '租户id，0为系统用户不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '用户密码MD5加密不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '用户邮箱不能为空', trigger: 'blur' }
          ],
          creator: [
            { required: true, message: '创建人，0为初始化不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          flag: [
            { required: true, message: '用户状态，1启用，0禁用不能为空', trigger: 'blur' }
          ],
          logintime: [
            { required: true, message: '最后登录时间不能为空', trigger: 'blur' }
          ],
          updateuser: [
            { required: true, message: '更新者id不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/coreuser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.tenantid = data.coreuser.tenantid
                this.dataForm.name = data.coreuser.name
                this.dataForm.psw = data.coreuser.psw
                this.dataForm.email = data.coreuser.email
                this.dataForm.creator = data.coreuser.creator
                this.dataForm.createtime = data.coreuser.createtime
                this.dataForm.flag = data.coreuser.flag
                this.dataForm.logintime = data.coreuser.logintime
                this.dataForm.updateuser = data.coreuser.updateuser
                this.dataForm.updatetime = data.coreuser.updatetime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/coreuser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'tenantid': this.dataForm.tenantid,
                'name': this.dataForm.name,
                'psw': this.dataForm.psw,
                'email': this.dataForm.email,
                'creator': this.dataForm.creator,
                'createtime': this.dataForm.createtime,
                'flag': this.dataForm.flag,
                'logintime': this.dataForm.logintime,
                'updateuser': this.dataForm.updateuser,
                'updatetime': this.dataForm.updatetime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
