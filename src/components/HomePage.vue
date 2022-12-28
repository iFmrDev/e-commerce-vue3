<template>
  <div class="container-fluid p-3 shadow-sm" style="min-height: 50px; background-color: #f9f9f9;">
    <div class="row mb-3 align-items-center">
        <div class="col-sm-12 col-md-8 col-xl-8 align-items-center">
            <div class="btn-group dropstart">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    القسم -->  {{ activeCategory == '' ? 'جميع الأقسام' : activeCategory }}
                </button>
                <ul class="dropdown-menu">
                    <a class="dropdown-item active" href="#"  @click="updateActiveCategory">All</a> 
                    <a v-for="category, index in categories" class="dropdown-item" href="#" @click="updateActiveCategory" >{{category}}</a>                     
                </ul>
            </div>
        </div>
        <div class="col-sm-12 col-md-4 col-xl-4 ">
            <div class="d-flex justify-content-center align-items-center">
                <input v-model="search" class="mx-2 p-1 w-100" style="border: 1px solid #c2c2c2; border-radius: 5px;" type="text" placeholder="ابحث باسم المنتج" aria-label="بحث" />
                <a claas="btn btn-secondary m-0 " href="#"><font-awesome-icon icon="fa fa-search text-secondary h5 pt-1 px-2" /></a>
            </div>
        </div>
    </div>  
      <div class="row justify-content-center" >
        <div v-if="filteredData.length == 0 && search == '' ">
            <h4 class="text-center">الرجاء الإنتظار ...</h4>
        </div>
        <div v-if="filteredData.length == 0 && search != '' ">
            <h4 class="text-center">عفواً .. لا يوجد نتائج للبحث</h4>
        </div>
          <div class="col-sm-6 col-md-6 col-xl-3 mb-4" v-for="item, index in filteredData" >              
                <div class="card p-2">
                  <a href="#">
                      <div v-if="item.stock > 0" class="badge bg-success text-white position-absolute" style="top: 5px; right: 5px;">متوفر</div>
                      <div v-if="!item.stock > 0" class="badge bg-danger text-white position-absolute" style="top: 5px; right: 5px;">غير متوفر</div>
                      <img  :src="item.images[0]"  class="card-img-top mt-5" width="300" height="250"/>                        
                  </a>
                  <div class="card-body">
                        <h6 class="h6 card-title text-center bold">{{ item.title }}</h6>
                        <dev class="d-flex row align-content-center">
                            <p class="h5 text-center text-danger rounded bold">{{ item.price }} $</p>
                            <vue3-star-ratings class="mx-0 my-1 px-0 py-2" v-model="item.rating" starSize="18" inactiveColor="#fff" :showControl="false" :disableClick="true"/>
                        </dev>
                        <div class="d-grid gap-2">
                          <div class="row">
                              <div class="col text-center">
                                  <button type="button" class="btn btn-secondary" data-bs-toggle="collapse" :data-bs-target='"#card_" + index + "_detials"' :aria-controls='"card_" + index + "_detials"' aria-expanded="false" :aria-label='"card_" + index + "_detials"'>
                                      <i class="fas fa-list-check"></i> المواصفات
                                  </button>
                              </div>
                              <div class="col text-center">
                                  <button v-if="item.stock > 0" type="button" class="btn btn-danger" v-on:click="addProductToCart(item.id)" ><i class="fas fa-cart-shopping"></i> اضف للسلة</button>
                                  <button v-if="!item.stock > 0" type="button" disabled class="btn btn-danger" v-on:click="showSwal" ><i class="fas fa-cart-shopping"></i> اضف للسلة</button>
                              </div>
                          </div>
                          <div :id='"card_" + index '>
                            <div class="collapse" :id='"card_" + index + "_detials"' :data-bs-parent='"#card_" + index '>
                                <ul>
                                    <li>التفاصيل : {{ item.description }}</li>
                                    <li>العلامة التجارية : {{ item.brand }}</li>                                    
                                </ul>
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
import Swal from 'sweetalert2'
import Vue3StarRatings from "vue3-star-ratings";
export default{
  data() {
     return {
         cartItems: [],
         cartCount: 0,          
         search: '', 
         productsData: [],
         categories: [],
         activeCategory: '',                 
      }
  },
  mounted(){
    const api = 'https://dummyjson.com/products'
    this.axios.get(api).then((response) => {
        this.categories =  [...new Set(response.data.products.map(x => x.category))]
        this.productsData = response.data.products    
    })
  },
  methods:{
    showSwal()
    {
        if(this.$store.state.isLogin == true ){
            this.$store.commit('updateCartCount', 1)
            Swal.fire({            
                position: 'center',
                icon: 'success',
                title: 'سلة المشتريات',
                text:   "تم إضافة المنتج لسلة مشترياتك بنجاح",
                showConfirmButton: false,
                timer: 2500
            });
        }else{
            this.$router.push('/login');
        }
      
    },
    updateActiveCategory(e){
        this.activeCategory = e.target.text == 'All' ? '' : e.target.text
    },
    addProductToCart(id){
        let items = this.getCartItems()
        
        for (var product of this.productsData) {
            if (product.id == id){
                let found = false;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === id) {
                        items[i].qty++;
                        found=true;
                        break;
                    } 
                }
                if (found === false) {
                    product.qty = 1;
                    items.push(product);                    
                }         
                sessionStorage.setItem('cartItems', JSON.stringify(items));
                this.showSwal()
            }                        
        }
     
    },
    getCartItems(){
      return sessionStorage.cartItems != undefined? JSON.parse(sessionStorage.cartItems): []
    },
    removeCartItem(id){
      this.cartItems = this.cartItems.filter(function(el) { return el.id != id; })            
      sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    
  },
  
  computed: {
    filteredData() {
        return this.productsData.filter(item => {
            return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && item.category.toLowerCase().indexOf(this.activeCategory) > -1
        })
    },
    components: {
        Vue3StarRatings,
    },
  }
  
}

</script>