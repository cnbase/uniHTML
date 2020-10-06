<template>
  <div id="app">
    <div style="margin:5px auto;">
      <el-button @click="showAddAuth" size="small" type="primary">新增权限</el-button>
    </div>
    <el-table
        :data="auths"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        height="calc(100vh - 124px)"
        max-height="calc(100vh - 124px)"
    >
      <el-table-column prop="exp" width="55">
        <template slot="header">
          <i class="el-icon-d-caret"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="title"
          label="权限名称"
          width="280"
      >
      </el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="url"
          label="URL"
      >
      </el-table-column>
      <el-table-column
          prop="sort_no"
          label="排序"
          width="60"
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
          width="100">
        <template slot-scope="scope">
          <el-button @click="showEditAuth(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="removeAuth(scope.row)" type="text" size="small">删除</el-button>
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
        title="新增/编辑权限"
        :visible.sync="dialogVisible"
        width="520px"
    >
      <el-form @submit.native.prevent label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="edit.title" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="edit.url" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-cascader
              v-model="edit.pre_ids"
              :options="auths"
              :clearable="true"
              :props="{ expandTrigger: 'hover',value:'id',label:'title',checkStrictly:true }"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="edit.sort_no" placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="edit.status" :label="'1'">正常</el-radio>
          <el-radio v-model="edit.status" :label="'0'">停用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editAuth" size="small">确 定</el-button>
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
  name: "Auth",
  data() {
    return {
      auths:[],
      pagination:{
        total:0,
        size:10,
        page:1,
      },
      dialogVisible:false,
      edit:{
        id:0,
        title:'',
        url:'',
        pre_ids:[],
        sort_no:0,
        status:'1'
      }
    }
  },
  created() {
    this.checkLogin();
  },
  methods:{
    editAuth() {
      let self = this;
      if (!self.edit.title){
        self.$message.error('请填写权限名称');
        return;
      }
      let data = {
        token:Token.getToken(),
        ...self.edit,
      }
      Api.post('/edit_auth',data).then(function(res){
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
    showAddAuth (){
      let self = this;
      self.edit.id = 0;
      self.edit.title = '';
      self.edit.url = '';
      self.edit.pre_ids = [];
      self.edit.sort_no = 0;
      self.edit.status = '1';
      self.dialogVisible = true;
    },
    showEditAuth (row) {
      let self = this;
      self.edit.id = row.id;
      self.edit.title = row.title;
      self.edit.url = row.url;
      self.edit.pre_ids = row.pre_ids;
      self.edit.sort_no = row.sort_no;
      self.edit.status = row.status;
      self.dialogVisible = true;
    },
    removeAuth (row) {
      let self = this;
      self.$confirm('此操作将永久删除该权限及其子权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          token:Token.getToken(),
          id:row.id,
        }
        Api.post('/remove_auth',data).then(function (res) {
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
      Api.post('/auth',data).then(function (res){
        if (res.code === 0){
          self.auths = res.data.auths;
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