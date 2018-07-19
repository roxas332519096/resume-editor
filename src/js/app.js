
let app = new Vue({
    el: "#app",
    data: {
        editing: false,
        loginVisible: false,
        signUpVisible: false,
        currentUser:{
            id:undefined,
            email:undefined
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
                this.signUpVisible = false;
                alert('注册成功,自动登录中');
                this.loginData = this.signUpData;
                this.login()
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
                    this.getCurrentUser(user);
                    this.getResume(user);
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
            let id = AV.User.current().id;
            let user = AV.Object.createWithoutData('User', id);
            user.set('resume', this.resume);
            user.save();
            alert('保存成功');
        },
        getResume:function(user){
            if(user.attributes.resume){
                this.resume = user.attributes.resume;
            }
        },
        getCurrentUser:function(user){
            this.currentUser.id = user.id;
            this.currentUser.email = user.attributes.email;
        }
    }
})

if(AV.User.current()){
    let currentUser = AV.User.current();
    app.getCurrentUser(currentUser);
    let query = new AV.Query('User');
    query.get(currentUser.id).then((user)=>{
        app.getResume(user);
    })
}
