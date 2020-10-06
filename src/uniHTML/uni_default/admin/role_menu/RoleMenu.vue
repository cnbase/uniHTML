<template>
  <div id="app">
    <div style="margin:5px auto;">
      <span style="font-weight: lighter;margin-right: 10px;">为 【{{ role.name }}】 分配菜单</span>
      <el-button @click="save" size="small" type="primary">保存</el-button>
      <span style="color: red;font-size: 12px;margin-left: 10px;">注：每个页面需要单独保存</span>
    </div>
    <el-table
        ref="multipleTable"
        :data="menus"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        height="calc(100vh - 124px)"
        max-height="calc(100vh - 124px)"
    >
      <el-table-column type="select" width="55" :key="'checkAll'+checkNo">
        <template slot="header">
          <el-checkbox :checked="selectedAllStatus" @change="selectAll($event,null)"></el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="exp" width="55">
        <template slot="header">
          <i class="el-icon-d-caret"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="title"
          label="菜单名称"
          width="280"
      >
      </el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="80">
      </el-table-column>
      <el-table-column
          label="图标"
          width="80">
        <template slot-scope="scope">
          <i :class="scope.row.icon" v-if="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="url"
          label="URL"
      >
      </el-table-column>
      <el-table-column
          prop="status_text"
          label="状态"
          width="100"
      >
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
  </div>
</template>

<script>
import Config from "@/config";
import Login from "../../utils/login"
import Token from "@/utils/token";
import Api from "@/uniCore/api"
import uniUrl from "@/utils/uniUrl";

export default {
  name: "RoleMenu",
  data() {
    return {
      role_id:uniUrl.get("role_id")?uniUrl.get("role_id"):0,
      role:{},
      menus: [],
      pagination: {
        total: 0,
        size: 10,
        page: 1,
      },
      allSelectedIds:[],
      selectedAllStatus:false,
      checkNo:0,
      selected:[],
    }
  },
  created() {
    let self = this;
    self.$nextTick(function (){
      self.checkLogin();
    })
  },
  methods:{
    selectAll(val,rows) {
      let self = this;
      console.log(val)
      console.log(rows)
      if (val){
        //全选
        if (!rows){
          self.menus.map(row => {
            row.checked = true;
            if (typeof row.children !== 'undefined' && row.children.length > 0){
              self.selectAll(true,row.children);
            }
          })
        } else {
          rows.map(row => {
            row.checked = true;
            if (typeof row.children !== 'undefined' && row.children.length > 0){
              self.selectAll(true,row.children);
            }
          })
        }
      } else {
        //全取消
        if (!rows){
          self.menus.map(row => {
            row.checked = false;
            if (typeof row.children !== 'undefined' && row.children.length > 0){
              self.selectAll(false,row.children);
            }
          })
        } else {
          rows.map(row => {
            row.checked = false;
            if (typeof row.children !== 'undefined' && row.children.length > 0){
              self.selectAll(false,row.children);
            }
          })
        }
      }
    },
    getSelected(rows) {
      let self = this;
      return new Promise(function (resolve, reject){
        if ((rows instanceof Array) && rows.length > 0){
          let children = [];
          rows.map(row => {
            if (row.checked){
              self.selected.push(row.id);
            }
            if (typeof row.children !== 'undefined' && row.children.length > 0){
              row.children.map(child => {
                children.push(child);
              })
            }
          })
          if (children.length > 0) {
            self.getSelected(children).then(function (){
              resolve();
            }).catch(function (){
              reject();
            });
          } else {
            resolve();
          }
        } else {
          reject();
        }
      });
    },
    async save() {
      let self = this;
      self.selected = [];
      await self.getSelected(self.menus).then(function (){
        console.log(self.selected);
        let data = {
          token:Token.getToken(),
          role_id:self.role_id,
          selected:self.selected
        }
        Api.post('/role_menu_save',data).then(function (res) {
          if (res.code === 0){
            self.$message.success(res.msg);
            self.loadPage();
          } else {
            self.$message.error(res.msg);
          }
        }).catch(function (error){
          self.$message.error(error.message);
        })
      }).catch(function (){
        console.log('不是一个数组');
      });
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
        role_id:self.role_id,
        ...self.pagination,
      }
      Api.post('/role_menu',data).then(function (res){
        if (res.code === 0){
          self.role = res.data.role;
          self.menus = res.data.menus?res.data.menus:[];
          self.pagination.total = res.data.total;
          self.pagination.page = res.data.page;
          self.pagination.size = res.data.size;
          self.allSelectedIds = res.data.allSelectedIds?res.data.allSelectedIds:[];
          self.selectedAllStatus = res.data.selectedAllStatus;
          self.checkNo++;
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