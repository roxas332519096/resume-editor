window.signUp = {
    template: `
    <div class="signUp" v-cloak>
        <form class="form"  @submit.prevent="signUp">
            <h2>Sign Up</h2>
            <div class="row">
                <label>
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon-user"></use>
                        </svg>
                    </span>
                <input type="text" v-model="signUpData.email" placeholder="Email">
            </label>
            </div>
            <div class="row">
                <label>
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-ai-password"></use>
                        </svg>
                        </span>
                    <input type="password" v-model="signUpData.password" placeholder="Password">
                </label>
            </div>
            <div class="row">
                <button type="submit">注册</button>
            </div>
            <div class="row">
                <router-link to="/login">登录</router-link>
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
            signUpData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signUp: function () {
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
        close(){
            app.$router.push('/')
        }
    }
}

Vue.component('sign-up', window.signUp)