<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="my login image">
    </div>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled" 
      :error="errors.phone"
      @btnClick="getVerifyCode"
       />
    <!-- 验证码 -->
    <InputGroup type="number" v-model="verifyCode" placeholder="验证码"
     :error="errors.code" />
     <!-- 用户服务协议 -->
     <div class="login_des">
       <p>
         新用户登录即注册，表示已同意
         <span>《用户服务协议》</span>
       </p>
     </div>
     <div class="login_btn">
       <button :disabled="isClick" @click="handlelogin">登录</button>
     </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup.vue"
export default {
 name:"Login",
 data(){
   return{
     phone:"",
     verifyCode:"",
     errors:{},
     btnTitle:"获取验证码",
     disabled:false,
   };
 },
 computed:{
   isClick(){
      if( !this.phone || !this.verifyCode) return true;
      else return false;
   }
   

 },
 methods:{
   handlelogin(){
     this.errors={};
     this.$axios.post("/api/posts/sms_back",{
       phone:this.phone,
       code:this.verifyCode
     }).then(res=>{
       console.log(res);
       localStorage.setItem("ele_login",true)
       this.$router.push("/")
     }).catch(err=>{
       this.errors={
         code:err.response.data.msg
       };
     })
   },
   getVerifyCode(){
     if(this.validatePhone()){
       //发生网络请求
       this.$axios.post("/api/posts/sms_send",{
        //  sid:"c0b9b6d14232bb4e4e5ad868167b39f9",
        //  token:"def7be2961a15268a6f62d8c6c328e3a",
        //  appid:"eccd88d8637a4d2e8eff9aa1d0d7512f",
        //  templateid:"605084",
          phone:this.phone
       }).then(res => {
         console.log(res);
          this.validateBtn();
       });
       
     }
 },
    validateBtn(){
      let time = 60;
      let timer = setInterval(()=>{
        if(time == 0){
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        }else{
          //倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      },1000)
    },
 validatePhone(){
   if(!this.phone){
     this.errors={
       phone:'手机号码不能为空'
     };
     return false
   }else if(!/^1[345678]\d{9}$/.test(this.phone)){
     this.errors = {
       phone:"请填写正确的验证码"
     };
     return false;
   }else{
     this.errors={};
     return true;
   }
 },
 },
 components:{
   InputGroup
 }
}
</script>
<style >
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>