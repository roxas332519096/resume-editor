
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
        shareLink:undefined,
        shareVisible:false,
        changestyleVisible:false,
        color:'blue',
        preview:false,
        resume: {
            name: '姓名',
            gender: '性别',
            birthday: '出生年月',
            jobTitle: '意向职位',
            phone: '13700000000',
            email: 'example@example.com',
            skills: [
                {
                    name: '请填写技能名称',
                    description: '请填写技能描述'
                },
                {
                    name: '请填写技能名称',
                    description: '请填写技能描述'
                },
                {
                    name: '请填写技能名称',
                    description: '请填写技能描述'
                },
                {
                    name: '请填写技能名称',
                    description: '请填写技能描述'
                },
            ],
            experiences:[
                {
                    name:'请填写公司名称',
                    time:'1990年1月-1990年2月',
                    timeEnd:'请填写结束时间',
                    jobTitle:'请填写职位名称',
                    description:'请填写描述信息'
                }
            ],
            productions:[
                {
                    name:'请填写项目名称',
                    keywords:'请填写项目关键字',
                    linkView:'请填写项目预览链接',
                    link:'请填写项目代码链接',
                    description:'请填写项目描述'
                },
                {
                    name:'请填写项目名称',
                    keywords:'请填写项目关键字',
                    linkView:'请填写项目预览链接',
                    link:'请填写项目代码链接',
                    description:'请填写项目描述'
                },
            ],
        }
    },
    methods: {
        editdata: function (key,val,index,key2) {
            if(index){
                this.resume[key][index][key2] = val;
            }else{
                this.resume[key] = val;
            }
        },
        save: function () {
            if (!this.currentUser.id) {
                this.loginVisible = true;
            } else {
                this.saveResume()
            }
        },
        logIn: function (user) {
            this.getCurrentUser(user);
            this.getResume(user);
            this.getShareLink(user);
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
            Object.assign(this.resume,user.attributes.resume)
        },
        getCurrentUser:function(user){
            this.currentUser.id = user.id;
            this.currentUser.email = user.attributes.email;
        },
        add:function(item){
            if(item === 'skills'){
                this.resume[item].push({
                    name:'请填写技能名称',
                    description:'请填写技能描述'
                })
            }else if(item === 'experiences'){
                this.resume[item].push({
                    name:'请填写公司名称',
                    time:'1990年1月-1990年2月',
                    jobTitle:'请填写职位名称',
                    description:'请填写描述信息'
                })
            }else if(item === 'productions'){
                this.resume[item].push({
                    name:'请填写项目名称',
                    keywords:'请填写项目关键字',
                    linkView:'请填写项目预览链接',
                    link:'请填写项目代码链接',
                    description:'请填写项目描述'
                })
            }
        },
        remove:function(item,index){
            this.resume[item].splice(index,1);
        },
        getShareLink:function(user){
            this.shareLink = location.origin + location.pathname + '?user_id' + user.id
        },
        showShareLink:function(){
            if (!this.currentUser.id) {
                this.loginVisible = true;
            } else {
                this.shareVisible = true;
            }
        },
        escPreviewMode() {
            this.preview = false;
        },
        print(){
            window.print()
        },
        changeStyle(color){
            this.color = color;
        }
    },
})


if(AV.User.current()){
    let currentUser = AV.User.current();
    app.getCurrentUser(currentUser);
    let query = new AV.Query('User');
    query.get(currentUser.id).then((user)=>{
        app.getResume(user);
        app.getShareLink(user)
    })
}

let search = location.search;
let shareUserid = search.slice(8);
if(shareUserid){
    app.preview = true;
    let query = new AV.Query('User');
    query.get(shareUserid).then((user)=>{
        setTimeout(()=>{
            app.getResume(user)
        },300)
    })    
}

window.addEventListener('scroll',() => {
    let nav = document.querySelector('nav')
    if(window.scrollY > 0){
        nav.classList.add('sticky');
    }else{
        nav.classList.remove('sticky');
    }
})