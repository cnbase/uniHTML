import Vue from 'vue'
import App from './RoleAuth.vue'

import '@/../node_modules/element-ui/lib/theme-chalk/index.css';
import '@/elementui/business_blue/theme/index.css'
import {
    Button, Cascader, Checkbox, Dialog, Form, FormItem, Input,
    Message, MessageBox, Pagination, Radio, Table, TableColumn
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
Vue.use(Checkbox);
Vue.use(Cascader);

Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
