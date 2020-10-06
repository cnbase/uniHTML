<template>
  <div id="app">
    <div style="margin:5px auto;">
      <span style="font-weight: lighter">选择操作用户，绑定角色到→</span>
      <el-select v-model="role_ids" size="small" multiple placeholder="请选择角色">
        <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button @click="addUserRole" size="small" type="warring" style="margin-left: 10px;">执行绑定</el-button>
      <el-button @click="showAddUser" size="small" type="primary">新增用户</el-button>
    </div>
    <el-table
        :data="users"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        height="calc(100vh - 124px)"
        max-height="calc(100vh - 124px)"
        @selection-change="changeUserSelected"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="60">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="120"
      >
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称"
          width="120"
      >
      </el-table-column>
      <el-table-column
          label="头像"
          width="80"
      >
        <template slot-scope="scope">
          <el-avatar :size="40" :src="scope.row.avatar" v-if="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
          label="拥有的角色"
      >
        <template slot-scope="scope">
          <el-tag
              v-for="role in scope.row.roles"
              :key="role.id"
              closable
              size="small"
              @close="removeRole(scope.row.id,role)"
              style="margin: 0 2px;"
          >
            {{role.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="status_text"
          label="状态"
          width="80"
      >
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button @click="showPasswordEdit(scope.row)" type="text" size="small">修改密码</el-button>
          <el-button @click="showEditUser(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="removeUser(scope.row)" type="text" size="small">删除</el-button>
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
        title="新增/编辑用户"
        :visible.sync="editUserVisible"
        width="520px"
    >
      <el-form @submit.native.prevent label-width="100px">
        <el-form-item label="登录用户名">
          <el-input v-model="edit.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="edit.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="edit.avatar" placeholder="暂时仅支持网络头像"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="edit.status" :label="'1'">正常</el-radio>
          <el-radio v-model="edit.status" :label="'0'">停用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editUser" size="small">确 定</el-button>
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
  name: "User",
  data() {
    return {
      users: [],
      user_ids:[],
      roles:[],
      role_ids:[],
      pagination: {
        total: 0,
        size: 10,
        page: 1,
      },
      editUserVisible: false,
      edit: {
        id: 0,
        username: '',
        nickname: '',
        avatar: '',
        status: '1'
      },
    }
  },
  created() {
    this.checkLogin();
  },
  methods:{
    //选择用户
    changeUserSelected(rows) {
      let self = this;
      self.user_ids = [];
      if (rows.length > 0){
        rows.forEach(row => {
          self.user_ids.push(row.id);
        })
      }
    },
    //绑定角色
    addUserRole() {
      let self = this;
      if (self.role_ids.length === 0){
        self.$message.error('请选择至少一项角色');
        return;
      }
      if (self.user_ids.length === 0){
        self.$message.error('请选择至少一位用户');
        return;
      }
      let data = {
        token:Token.getToken(),
        user_ids:self.user_ids,
        role_ids:self.role_ids
      }
      Api.post('/user_add_role',data).then(function(res){
        if(res.code === 0){
          //成功
          self.$message.success(res.msg);
          self.loadPage();
          self.editUserVisible = false;
        } else {
          self.$message.error(res.msg);
        }
      }).catch(function (error){
        self.$message.error(error.message);
      })
    },
    //移除角色
    removeRole(user_id,role) {
      let self = this;
      self.$confirm("确定要移除该角色吗？","提示").then(function (){
        let data = {
          token:Token.getToken(),
          user_id:user_id,
          role_id:role.role_id
        }
        Api.post('/user_remove_role',data).then(function(res){
          if(res.code === 0){
            //成功
            self.$message.success(res.msg);
            self.loadPage();
            self.editUserVisible = false;
          } else {
            self.$message.error(res.msg);
          }
        }).catch(function (error){
          self.$message.error(error.message);
        })
      })
    },
    //修改登录密码
    showPasswordEdit(row) {
      let self = this;
      self.$prompt('请输入新密码','提示').then(function ({value}){
        let data = {
          token:Token.getToken(),
          user_id:row.id,
          password:value
        }
        Api.post('/user_change_password',data).then(function(res){
          if(res.code === 0){
            //成功
            self.$message.success(res.msg);
          } else {
            self.$message.error(res.msg);
          }
        }).catch(function (error){
          self.$message.error(error.message);
        })
      });
    },
    editUser() {
      let self = this;
      if (!self.edit.username){
        self.$message.error('请填写用户名');
        return;
      }
      let data = {
        token:Token.getToken(),
        ...self.edit,
      }
      Api.post('/user_edit',data).then(function(res){
        if(res.code === 0){
          //成功
          self.$message.success(res.msg);
          self.loadPage();
          self.editUserVisible = false;
        } else {
          self.$message.error(res.msg);
        }
      }).catch(function (error){
        self.$message.error(error.message);
      })
    },
    showAddUser (){
      let self = this;
      self.edit.id = 0;
      self.edit.username = '';
      self.edit.nickname = '';
      self.edit.avatar = '';
      self.edit.status = '1';
      self.editUserVisible = true;
    },
    showEditUser (row) {
      let self = this;
      self.edit.id = row.id;
      self.edit.username = row.username;
      self.edit.nickname = row.nickname;
      self.edit.avatar = row.avatar;
      self.edit.status = row.status;
      self.editUserVisible = true;
    },
    removeUser (row) {
      let self = this;
      self.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          token:Token.getToken(),
          user_id:row.id,
        }
        Api.post('/user_remove',data).then(function (res) {
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
      Api.post('/user',data).then(function (res){
        if (res.code === 0){
          self.users = res.data.users;
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