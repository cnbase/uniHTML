import Vue from 'vue'
import App from './User.vue'

import '@/../node_modules/element-ui/lib/theme-chalk/index.css';
import '@/elementui/business_blue/theme/index.css'
import {
    Avatar, Button, Cascader, Dialog, Form, FormItem, Input,
    Message, MessageBox, Option, Pagination, Radio, Select, Table, TableColumn, Tag
} from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Cascader);
Vue.use(Avatar);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tag);

Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
