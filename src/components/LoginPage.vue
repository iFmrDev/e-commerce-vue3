<template>
    <div class="container-fluid">
        <div class="row d-flex justify-content-center" style="background-color: #f9f9f9; min-height: 580px;">
            
            <div class="col-sm-12 col-md-12 col-xl-8 mb-8 my-auto" >
                <div class="p-5 align-middle">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded">
                        <div class="card-header bg-transparent border-0 text-dark text-center">
                            <h3 class="text-success bold">تسجيل الدخول</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-12 col-xl-4 mb-4 my-auto">
                                    <img class="w-100 h-100" src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=1800" />
                                </div>

                                <div class="col-sm-12 col-md-12 col-xl-8 mb-8 my-auto">
                                    <form >
                                        <div class="row pt-3">
                                            <div class="col-sm-4">
                                                <label for="Email" class="text-muted bold" >البريد الإلكتروني</label>
                                            </div>
                                            <div class="col-sm-8">
                                                <input type="email" class="form-control" value="user@mail.com" id="Email" placeholder="ادخل البريد الإلكتروني" required>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-sm-4">
                                                <label for="Password" class="text-muted bold">كلمة المرور</label>
                                            </div>
                                            <div class="col-sm-8">
                                                <input type="Password" class="form-control" value="password" id="Password" placeholder="ادخل كمة المرور" required>
                                            </div>
                                        </div>
                                                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="row d-flex justify-content-center align-items-center">                                
                                <div class="col-sm-12 col-md-12 col-xl-6 mb-6 my-auto text-center">
                                    <small>هل نسيت كلمة المرور؟</small>
                                    <small><a href="#" class="mr-1">استعادة</a></small>
                                    
                                </div>
                                <div class="col-sm-12 col-md-12 col-xl-6 mb-6 my-auto text-center">
                                    <button class="btn btn-secondary w-75" v-on:click="login" >تسجيل الدخول</button>
                                </div>
                            </div>
                            
                        </div> 
                    </div>
                </div>
            </div>            
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'LoginPage',
        methods:{
            login(){
                this.$store.commit('loginStatus', true)
                this.$router.push('/');
            }
        }
        
    }
</script>