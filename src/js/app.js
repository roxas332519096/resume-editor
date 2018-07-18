var app = new Vue({
    el:"#app",
    data: {
        editing: false,
        resume: {
            name: '姓名',
            gender: '男',
            birthday: '1990年1月',
            jobTitle: '前端工程师',
            phone: '13700000000',
            email: 'example@example.com'
        }
    },
    methods: {
        editdata:function(key,val){
            this.resume[key] = val
        },
        OnClickSave:function(){
            let currentUser = AV.User.current()
            if(!currentUser){
                this.showLogin()
            }else{
                this.saveResume()
            }
        },
        showLogin:function(){
            console.log('please sign in now!')
        },
        saveResume:function(){

        }
    }
})
