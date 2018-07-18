
var app = new Vue({
    el: "#app",
    data: {
        editing: false,
        loginVisible: false,
        signUpVisible: false,
        currentUser:{
            id:'',
            email:''
        },
        resume: {
            name: '姓名',
            gender: '男',
            birthday: '1990年1月',
            jobTitle: '前端工程师',
            phone: '13700000000',
            email: 'example@example.com'
        },
        signUpData: {
            email: '',
            password: ''
        },
        loginData: {
            email: '',
            password: ''
        },
    },
    methods: {
        editdata: function (key, val) {
            this.resume[key] = val
        },
        save: function () {
            if (!this.currentUser.id) {
                this.loginVisible = true;
            } else {
                this.saveResume()
            }
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.signUpData.email);
            user.setPassword(this.signUpData.password);
            user.setEmail(this.signUpData.email);
            user.signUp().then((user) => {
                this.loginVisible = true;
                this.signUpVisible = false;
                alert('注册成功')
            }, function (error) {
                if (error.code === 125) {
                    alert('请输入正确格式的邮箱地址')
                } else if (error.code === 203) {
                    alert('该邮箱地址已经被占用')
                }
            });
        },
        login: function () {
            AV.User.logIn(this.loginData.email, this.loginData.password)
                .then((user) => {
                    this.loginVisible = false;
                    this.resume = user.attributes.resume
                    this.currentUser = {
                        id:user.id,
                        email:user.attributes.email
                    }
                    alert('登录成功')
                }, function (error) {
                    if (error.code === 210) {
                        alert('账号密码不匹配')
                    } else if (error.code === 211) {
                        alert('账号不存在')
                    }
                });
        },
        logOut: function () {
            AV.User.logOut();
            this.currentUser = {
                id:'',
                email:''
            }
            alert('登出成功')
        },
        saveResume: function () {
            let id = AV.User.current().id
            let user = AV.Object.createWithoutData('User', id);
            user.set('resume', this.resume);
            user.save();
            alert('保存成功');
        }
    }
})

if(AV.User.current()){
    let currentUser = AV.User.current()
    app.currentUser.id = currentUser.id;
    app.currentUser.email = currentUser.attributes.email;
    app.resume = currentUser.attributes.resume;
}
