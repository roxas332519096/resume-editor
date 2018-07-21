Vue.component('sign-up',{
    template:`
    <div class="signUp" v-cloak>
    <form class="form"  @submit.prevent="signUp">
        <button type="button" @click="closeSignUp">关闭</button>
        <h2>注册</h2>
        <div class="row">
            <label>邮箱</label>
            <input type="text" v-model="signUpData.email">
        </div>
        <div class="row">
            <label>密码</label>
            <input type="password" v-model="signUpData.password">
        </div>
        <div class="row">
            <button type="submit">注册</button>
            <a href="#" @click="openLogin">登录</a>
        </div>
    </form>
    `,
    data:function(){
        return {
            signUpData:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        signUp:function(){
            let user = new AV.User();
            user.setUsername(this.signUpData.email);
            user.setPassword(this.signUpData.password);
            user.setEmail(this.signUpData.email);
            user.signUp().then((user) => {
                this.closeSignUp();
                alert('注册成功,请登录');
                this.openLogin();
            }, function (error) {
                if (error.code === 125) {
                    alert('请输入正确格式的邮箱地址')
                } else if (error.code === 203) {
                    alert('该邮箱地址已经被占用')
                }
            });
        },
        openLogin:function(){
            this.$emit('open')
        },
        closeSignUp:function(){
            this.$emit('close')
        }
    }
})