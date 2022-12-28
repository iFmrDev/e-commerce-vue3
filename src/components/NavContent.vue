<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center" id="navbarCollapse">
                <div>                                 
                  <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-home" class="" /> الرئيسية</RouterLink>
                  <RouterLink v-if="!$store.state.isLogin" to="/login"><font-awesome-icon icon="fa-solid fa-right-to-bracket" /> تسجيل الدخول</RouterLink>
                  <RouterLink v-if="$store.state.isLogin"  @click="logOut" to="/"><font-awesome-icon icon="fa-solid fa-right-to-bracket " /> تسجيل الخروج</RouterLink>
                  <RouterLink v-if="$store.state.isLogin"  @click="openModalCart()" to="#" data-bs-toggle="modal" data-bs-target="#bayModal"><span class="badge rounded-pill bg-warning">{{ $store.state.cartCount }}</span><font-awesome-icon icon="fa-solid fa-cart-shopping text-danger" />سلة المشتريات</RouterLink>                  
                  <RouterLink to="/about"><font-awesome-icon icon="fa-solid fa-circle-exclamation" /> حول</RouterLink>  
                </div>
               
            </div>
        </div>
    </nav>
      
    <b-modal  id="bayModal" v-model="modalShow" size="xl" hide-header hide-footer>
        <div  class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-md-between">
                    <h1 class="w-100 modal-title fs-5 text-center text-success bold " id="bayModalLabel">سلة المشتريات</h1>
                    <button  @click="closeModalCart()" type="button" class="btn-close m-0 p-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>اسم المنتج</th>
                                <th>صورة المنتج</th>
                                <th>المبلغ</th>
                                <th>الكمية</th>
                                <th>الاجمالي</th>
                                <th>الضريبة 15%</th>
                                <th>المبلغ المستحق</th>
                                <th>الإجراء</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="item, i in cartItems">                                
                                <td>{{i + 1}}</td>
                                <td>{{item.title}}</td>
                                <td><img :src="item.images[0]" class="" width="80" height="90" /></td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ item.price * item.qty }}</td>
                                <td>{{ parseFloat(item.price * item.qty * 0.15).toFixed(2) }}</td>
                                <td>{{ parseFloat(item.price * item.qty + item.price * item.qty * 0.15).toFixed(2) }}</td>
                                <td><a href="#" @click="removeCartItem(item.id)" class="text-danger px-3 py-1"><font-awesome-icon icon="fa-solid fa-remove " /></a></td>
                            </tr>                            
                        </tbody>

                        <tfoot class="bg-light">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="bold">الإجمالي</td>
                                <td class="bold">$ {{ getTotal()  }} </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="modal-footer border-0">
                    <button @click="closeModalCart()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                    <button type="button" class="btn btn-primary">اتمام الشراء</button>
                </div>
            </div>
        </div>
  </b-modal>

</template>
<style scoped>
    *{
        font-family: "Cairo";
        direction: rtl;
    }
    
    table  thead  tr  th, table  tfoot  tr  td{
        text-align: center;
        font-weight: bold;
        color: rgb(60, 58, 65);
    }
    td{
        text-align: center;
        font-weight: 400;
    }
</style>
<script>
    export default{
    data() {
        return {         
            modalShow: false,  
            cartItems : [] ,                              
        };
    },
    methods: {
        logOut() {
            this.$store.commit('loginStatus', false)
        },        
        openModalCart(){
            this.loadCartItem()
            if (this.cartItems.length > 0){
                this.modalShow = true;                
            }
        },
        closeModalCart(){            
            this.modalShow = false;            
        },
        loadCartItem(){
            this.cartItems = sessionStorage.cartItems != undefined? JSON.parse(sessionStorage.cartItems): []           
        },
        removeCartItem(id){            
            this.cartItems = this.cartItems.filter(function(el) { return el.id != id; })            
            sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            this.$store.commit('updateCartCount', -1)
            this.closeModalCart()
            this.openModalCart()
        },
        getTotal(){            
            let total = 0
            for (const item of this.cartItems) {                
                total += item.price * item.qty + item.price * item.qty * 0.15                
            }
            return  parseFloat(total).toFixed(2)
        },                
    },
    mounted() {
        this.loadCartItem()                     
    },
}

</script>