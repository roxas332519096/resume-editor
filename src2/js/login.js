Vue.component('login',{
    template:`
    <div class="login" v-cloak>
        <form class="form"  @submit.prevent="login">
                <h2>登录</h2>
            <div class="row">
                <label>邮箱</label>
                <input type="text" v-model="loginData.email">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" v-model="loginData.password">
            </div>
                <button type="submit">登录</button>
        </form>
        <a href="#" @click="openSignUp">注册</a>
        <button type="button" @click="closeLogin">关闭</button>
    </div>
    `,
    data:function(){
        return {
            loginData:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        login:function(){
            AV.User.logIn(this.loginData.email, this.loginData.password)
            .then((user) => {
                this.closeLogin();
                console.log(user)
                this.$emit('login',user);
            }, function (error) {
                if (error.code === 210) {
                    alert('账号密码不匹配')
                } else if (error.code === 211) {
                    alert('账号不存在')
                }
            });
        },
        closeLogin(){
            this.$emit('close')
        },
        openSignUp(){
            this.$emit('open')
        }
    }
})