window.onload=function(){

    var uuid = '38903ab4-9fe0-4003-b595-7f1b87efb86e'; //每個人固定的
    //var token 這裡沒有打算放實際的token
    var apiPath = 'https://course-ec-api.hexschool.io/'; //站點路徑,固定的

    // axios.defaults.headers['Authorization']=`Bearer ${token}`; //這行超級重要,因為是驗證透過此來做驗證
    // axios 設定說明：https://github.com/axios/axios#config-defaults
    //"Authorization: Bearer {token}"

    var backend={
        data:[],
        getData(){
            // var api=`${apiPath}api/${uuid}/admin/ec/products`; // 商品-->後台-->Product list
            var api=`${apiPath}api/${uuid}/ec/products`; // 商品-->前台-->Product list
            var vm=this;
            
            console.log('getData');
            console.log(api);

            axios.get(api)
            .then(function(res){
                var nowData=res.data.data;
                // console.log(vm);
                // console.log(res);
                // console.log(nowData);

                nowData.forEach(function(el){
                    vm.data.push(el);
                    // console.log(this);
                    console.log(vm.data); //不可以直接console.log(data); 因為forEach內的函式是simple call 會直接指到global;
                });

                vm.showAll();

                
            })
        },
        showAll(){
            var insert="";
            console.log(this);
            console.log(this.data);

            for(var i=0;i<this.data.length;i++){
                insert=insert+`<div class="col-12 col-md-4 backendBorder">
                    <img class="img-fluid backendImg" src="${this.data[i].imageUrl}" alt="${i}">

                    <div class="text-left backendImgContent">
                        <div class="title">${this.data[i].title}</div>
                        <div class="category">${this.data[i].category}</div>
                        <div class="price">
                            <h3 class="nowPrice">${this.data[i].price} NT</h3>
                            <span class="originPrice">${this.data[i].origin_price}</span>
                        </div>
                    </div>
                </div>`;
            }
            // console.log(insert);
            document.getElementById("backendItem").innerHTML=insert;
        }   
    }

    backend.getData(); //後執行
    // backend.showAll(); //先執行(所以你取不到資料!!! 因為是axios後執行)



    function patchData() {  //需要修改後台資料再開啟即可

        console.log('patchData');
        
        var test_id=""; //input the ID
        var api=`${apiPath}api/${uuid}/admin/ec/product/${test_id}`; // 商品-->後台-->Product list
        console.log(api);
        
        var patchdata={
          category: '東京',
        }
  
        axios.patch(api,patchdata)  //跳出401是驗證資料(因為後台方法是需要驗證的,所以要補上驗證,且要夾在headers裡面)
          .then(function(res){  
              console.log(res);  //post到後台後,資料庫會自己為新增的item加一個ID,之後以便刪除及修改
          })  
  
      }

    //   patchData();

}