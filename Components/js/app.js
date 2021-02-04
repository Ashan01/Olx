let database = firebase.database().ref("sellIteam");
var container_1 = document.getElementById("container_1");
var files = [];

function myImg() {
   var reader;

   var input = document.createElement("input");
   input.type = "file";

   input.onchange = (e) => {
      files = e.target.files;
      reader = new FileReader();
      reader.onload = function () {
         document.getElementById("myImg").src = reader.result;
      };

      reader.readAsDataURL(files[0]);
   };
   input.click();
}

function Submit() {
   var key = database.push().key;
   let inpPrice = document.getElementById("inpPrice").value;
   let inpDesc = document.getElementById("inpDesc").value;
   let inpCity = document.getElementById("inpCity").value;

   var uploadTask = firebase
      .storage()
      .ref("images1/" + "imageName" + key + ".png")
      .put(files[0]);

   uploadTask.on("state_changed", function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
         database.child(key).set({
            inpPrice_1: inpPrice,
            inpDesc_1: inpDesc,
            inpCity_1: inpCity,
            key,
            ImageUrl_1: downlaodURL,
         });
      });
   });
}

database.on("child_added", function (data) {
   console.log(data.val().inpCity_1);
   let box = document.createElement("div");
   box.setAttribute("class", "products_Iteams col-lg-3 col-md-5 col-sm-5 col-5 p-0 m-3");
   container_1.appendChild(box);

   let img_Div = document.createElement("div");
   img_Div.setAttribute("class", "products_img");

   let img = document.createElement("img");
   img.setAttribute("src", data.val().ImageUrl_1);
   img_Div.appendChild(img);

   let priceDiv = document.createElement("div");
   priceDiv.setAttribute("class", "products_price pl-2");
   let Rs = document.createElement("h5");
   let rsTextNode = document.createTextNode("Rs:" + data.val().inpPrice_1);
   Rs.appendChild(rsTextNode);
   priceDiv.appendChild(Rs);

   let descDiv = document.createElement("div");
   let descElement = document.createElement("p");
   descElement.setAttribute("class", "products_desc pl-2");

   let descTextNode = document.createTextNode(data.val().inpDesc_1);
   descElement.append(descTextNode);
   descDiv.appendChild(descElement);

   let cityDiv = document.createElement("div");
   let cityElement = document.createElement("p");
   cityElement.setAttribute("class", "products_city pt-3 pl-2");

   let cityDivTextNode = document.createTextNode(data.val().inpCity_1);
   cityElement.append(cityDivTextNode);
   cityDiv.appendChild(cityElement);

   box.appendChild(img_Div);
   box.appendChild(priceDiv);
   box.appendChild(descDiv);
   box.appendChild(cityDiv);
});
