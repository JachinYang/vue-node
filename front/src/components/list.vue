<template>
    <div>
      <!--<el-row :gutter="20">-->
        <!--<el-col :span="24"><div class="grid-content bg-purple"></div></el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="20">-->
        <!--<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>-->
        <!--<el-col :span="16"><div class="grid-content bg-purple"></div></el-col>-->
      <!--</el-row>-->
        <div style="margin: 10px 0;">
            <el-button type="primary" @click="dialogSwitch = true;">新增用户</el-button>
        </div>
        <el-dialog title="新增用户" :visible="dialogSwitch" width="60%" class="dialog">
            <el-form :model="form">
                <el-form-item label="姓名" label-width="60px">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="60px">
                    <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" label-width="60px">
                    <el-input v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item label="地址" label-width="60px">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button @click="dialogSwitch = false;">取消</el-button>
                <el-button @click="submit">确定</el-button>
            </footer>
        </el-dialog>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogSwitch: false,
                tableData: [
                    {
                        name: '',
                        age: null,
                        address: '',
                        gender: '',
                    }
                ],
                form: {
                    name: '张三',
                    gender: '男',
                    age: 23,
                    address: '四川成都',
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                this.$http.get('//localhost:3000/api/user-list')
                    .then(result => {
                        this.tableData = result.data;
                        console.log(result)
                    });
            },
            submit(){
                console.log(this.form)
                this.$http.post('//localhost:3000/api/user-list', this.form)
                    .then(result => {
                        this.dialogSwitch = false;
                        this.getData();
                        console.log(result)
                    })
            }
        }
    }
</script>
<style>
.dialog{
    text-align: left;
}
</style>
