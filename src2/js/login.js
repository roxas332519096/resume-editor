window.login = {
    template: `
    <div class="login" v-cloak>
        <form class="form"  @submit.prevent="login">
            <h2>Login</h2>
            <div class="row">
                <label>
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon-user"></use>
                        </svg>
                    </span>
                    <input type="text" v-model="loginData.email" placeholder="Email">
                </label>
            </div>
            <div class="row">
                <label>
                <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ai-password"></use>
                </svg>
                </span>
                <input type="password" v-model="loginData.password" placeholder="Password">
                </label>
            </div>
            <div class="row">
                <button type="submit">登录</button>
            </div>
            <div class="row">
                    <router-link to="/signUp">注册</router-link>
            </div>
                <span class="close" @click="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-2guanbi"></use>
                    </svg>
                </span>
        </form>
    </div>
    `,
    data: function () {
        return {
            loginData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login: function () {
            AV.User.logIn(this.loginData.email, this.loginData.password)
                .then((user) => {
                    alert('登录成功')
                    this.$emit('login', user);
                    this.close();
                }, function (error) {
                    if (error.code === 210) {
                        alert('账号密码不匹配')
                    } else if (error.code === 211) {
                        alert('账号不存在')
                    }
                });
        },
        close(){
            app.$router.push('/')
        }
    }
}

Vue.component('login', window.login)