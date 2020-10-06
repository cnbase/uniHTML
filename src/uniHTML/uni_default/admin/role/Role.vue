<template>
  <div id="app">
    <div style="margin:5px auto;">
      <el-button @click="showAddRole" size="small" type="primary">新增角色</el-button>
    </div>
    <el-table
        :data="roles"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        height="calc(100vh - 124px)"
        max-height="calc(100vh - 124px)"
    >
      <el-table-column
          prop="id"
          label="ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="name"
          label="角色名称"
      >
      </el-table-column>
      <el-table-column
          prop="status_text"
          label="状态"
          width="100"
      >
      </el-table-column>
      <el-table-column
          label="操作"
          width="210">
        <template slot-scope="scope">
          <el-button @click="goMenu(scope.row)" type="text" size="small">分配菜单</el-button>
          <el-button @click="goAuth(scope.row)" type="text" size="small">分配权限</el-button>
          <el-button @click="showEditRole(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="removeRole(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="pagination.page"
        :page-size="pagination.size"
        :total="pagination.total"
        :hide-on-single-page="true"
        style="text-align: right"
    >
    </el-pagination>
    <el-dialog
        title="新增/编辑角色"
        :visible.sync="dialogVisible"
        width="520px"
    >
      <el-form @submit.native.prevent label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="edit.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="edit.status" :label="'1'">正常</el-radio>
          <el-radio v-model="edit.status" :label="'0'">停用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editRole" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Config from "@/config";
import Login from "../../utils/login"
import Token from "@/utils/token";
import Api from "@/uniCore/api"

export default {
  name: "Role",
  data() {
    return {
      roles: [],
      pagination: {
        total: 0,
        size: 10,
        page: 1,
      },
      dialogVisible: false,
      edit: {
        id: 0,
        name: '',
        status: '1'
      }
    }
  },
  created() {
    this.checkLogin();
  },
  methods:{
    goMenu(row) {
      if (window.parent !== window && typeof window.parent.uniOpenTab === 'function'){
        //iframe载入
        window.parent.uniOpenTab('分配菜单 - '+row.name,'/role_menu.html?role_id='+row.id);
      } else {
        //直接新窗口打开
        window.open('/role_menu.html?role_id='+row.id,'_blank')
      }
    },
    goAuth(row) {
      if (window.parent !== window && typeof window.parent.uniOpenTab === 'function'){
        //iframe载入
        window.parent.uniOpenTab('分配权限 - '+row.name,'/role_auth.html?role_id='+row.id);
      } else {
        //直接新窗口打开
        window.open('/role_auth.html?role_id='+row.id,'_blank')
      }
    },
    editRole() {
      let self = this;
      if (!self.edit.name){
        self.$message.error('请填写角色名称');
        return;
      }
      let data = {
        token:Token.getToken(),
        ...self.edit,
      }
      Api.post('/edit_role',data).then(function(res){
        if(res.code === 0){
          //成功
          self.$message.success(res.msg);
          self.loadPage();
          self.dialogVisible = false;
        } else {
          self.$message.error(res.msg);
        }
      }).catch(function (error){
        self.$message.error(error.message);
      })
    },
    showAddRole (){
      let self = this;
      self.edit.id = 0;
      self.edit.name = '';
      self.edit.status = '1';
      self.dialogVisible = true;
    },
    showEditRole (row) {
      let self = this;
      self.edit.id = row.id;
      self.edit.name = row.name;
      self.edit.status = row.status;
      self.dialogVisible = true;
    },
    removeRole (row) {
      let self = this;
      self.$confirm('此操作将永久删除该角色及其关联菜单和权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          token:Token.getToken(),
          id:row.id,
        }
        Api.post('/remove_role',data).then(function (res) {
          if (res.code === 0){
            self.$message.success(res.msg);
            self.loadPage();
          } else {
            self.$message.error(res.msg);
          }
        }).catch(function (error){
          self.$message.error(error.message);
        })
      }).catch(() => {});
    },
    changePage(page) {
      let self = this;
      self.pagination.page = page;
      self.loadPage();
    },
    loadPage() {
      let self = this;
      let data = {
        token:Token.getToken(),
        ...self.pagination,
      }
      Api.post('/role',data).then(function (res){
        if (res.code === 0){
          self.roles = res.data.roles;
          self.pagination.total = res.data.total;
          self.pagination.page = res.data.page;
          self.pagination.size = res.data.size;
        } else {
          self.$message.error(res.msg);
        }
      }).catch(function (error){
        self.$message.error(error.message);
      })
    },
    checkLogin() {
      let self = this;
      Login.checkLogin().then(function (res){
        if (res.code !== 0){
          self.$message.error(res.msg);
          setTimeout(function (){
            window.location.href = Config.getPageUrl('/login.html');
          },500);
        } else {
          self.loadPage();
        }
      }).catch(function (error){
        self.$message.error(error.message);
        setTimeout(function (){
          window.location.href = Config.getPageUrl('/login.html');
        },500);
      });
    }
  }
}
</script>

<style scoped>

</style>