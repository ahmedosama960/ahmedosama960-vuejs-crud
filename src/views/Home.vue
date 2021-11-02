<template>

  <div class="container  mt-3">
        
        <div class="card">
            <div class="card-header">
                <h5> All products <a class="" href></a>
                <router-link  class="btn btn-primary float-right" :to="{name:'product.add'}">Add new Product</router-link></h5>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name </th>
                            <th scope="col">price</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Created at</th>
                            <th scope="col">updated at</th>
                            <th scope="col">operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="product in products" :key="product.id">
                            <td>{{product.name}}</td>
                            <td>{{product.price}}</td>
                            <td>{{product.notes}}</td>
                            <td>{{product.created_at}}</td>
                            <td>{{product.updated_at}}</td>

                            <td>
                              
                              <router-link :to="{name:'product.delete',params:{id:product.id}}" ><i class="fas fa-trash-alt fa-2x" style="color:var(--danger)"></i></router-link>
                              <router-link :to="{name:'product.edit',params:{id:product.id}}" :product="product"><i class="fas fa-edit fa-2x" style="color:var(--info)"></i></router-link>
                            </td>
                            </tr>      
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  name: "Home",
  components: {
  },
   data() {
    return {
      products: [],
      errors:'',
    }
    },
  methods:{
    getProducts() {
      let url = "http://3.18.75.167/public/api/product";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.products = data.data;
          
        })
        .catch((err) => {
          console.error(err);
        });
    }

  },
  mounted(){
this.getProducts();
  }
};
</script>

<style scoped>
td a:first-child >i {
margin-right: 15px;
}

</style>