<template>
  <div>
    <div class="container">
      <div class="card w-50" style="margin: 50px auto">
        <div class="card-header">
          <h5>update Task {{ product.name }}</h5>
        </div>
        <div class="card-body">
          <div class="alert alert-success success" style="display: none"></div>
          <div class="alert alert-danger globalerrors" style="display: none"></div>
          <form v-on:submit.prevent="addproduct">
            <div class="form-group">
              <label for="exampleInputEmail1">Product name</label>
              <input type="text" v-model="product.name" class="form-control" />
              <div class="alert alert-danger errors name" style="display:none" ></div>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Description</label>
              <input type="text" v-model="product.notes" class="form-control" />
              <div class="alert alert-danger errors notes" style="display:none" ></div>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">price</label>              
              <input
                type="number"
                v-model="product.price"
                class="form-control"
              />
              <div class="alert alert-danger errors price" style="display:none" ></div>
            </div>
            <button type="submit" class="btn btn-primary">add product</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      product: {
        name: "",
        price: 0,
        notes: "",
      },
      erorrs: [],
      result: "",
    };
  },
  methods: {
    destroyMsg(){
        document.querySelector('div.success').style.display="none";
        document.querySelector('div.price').style.display="none"
        document.querySelector('div.name').style.display="none"
        document.querySelector('div.notes').style.display="none"
    },
    getProducts() {
      this.destroyMsg();
      let url = `http://3.18.75.167/public/api/product/${this.id}`;
      console.log(url);
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
          //   console.log(data);
          if (data.response == 200) {
            this.product = {
              name: data.data.name,
              price: data.data.price,
              notes: data.data.notes,
            };
          } else {
            this.erorrs += data.message;
            document.querySelector("div.globalerrors").style.display = "block";
            document.querySelector("div.globalerrors").innerText=this.erorrs;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addproduct() {
      this.destroyMsg();
      var url = `http://3.18.75.167/public/api/product/update/${this.id}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: this.product.name,
          price: this.product.price,
          notes: this.product.notes,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.response == 201) {
            this.result = data.message;
            document.querySelector("div.success").style.display = "block";
            document.querySelector("div.success").innerText=data.message;

            setTimeout(()=>{
            this.$router.push('/');
            },3000);

          }else{
                    this.errors=JSON.parse(data.message)
                    if(this.errors.price){
                        document.querySelector('div.price').style.display="block"
                        document.querySelector('div.price').innerText=this.errors.price
                    }
                    if(this.errors.name){
                        document.querySelector('div.name').style.display="block"
                        document.querySelector('div.name').innerText=this.errors.name
                    }
                    if(this.errors.notes){
                        document.querySelector('div.notes').style.display="block"
                        document.querySelector('div.notes').innerText=this.errors.notes
                    }
                }
        });
        
    },
  },
  mounted() {
    this.destroyMsg();
    this.errors=[],
    this.result=""
    this.getProducts();
    
  },
};
</script>

<style></style>
