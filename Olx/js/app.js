let database = firebase.database().ref("sellIteam");
let key;
var container_1 = document.getElementById("container_1");
var uploadTask;

async function myImg() {
   var files = [];
   var reader;

   key = database.push().key;

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

   uploadTask = firebase
      .storage()
      .ref()
      .child("images/" + "imageName" + ".png")
      .put(files[0]);

   uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
      database.child(key).set({
         ImageUrl_1: downlaodURL,
      });
   });
}

// function Submit() {
//    let inpPrice = document.getElementById("inpPrice").value;
//    let inpDesc = document.getElementById("inpDesc").value;
//    // let inpCity = document.getElementById("inpCity").value;

//    database.child(key).update({
//       inpPrice_1: inpPrice,
//       inpDesc_1: inpDesc,
//       // inpCity_1: inpCity,
//       key,
//    });
// }
// database.on("child_added", function (data) {
//    let box = document.createElement("div");
//    box.setAttribute("class", "card col");
//    container_1.appendChild(box);

//    let img = document.createElement("img");
//    img.setAttribute("src", data.val().ImageUrl_1);
//    img.setAttribute("class", "card-img-top");

//    let div_1 = document.createElement("div");
//    div_1.setAttribute("class", "card-body");

//    let Rs = document.createElement("h4");
//    Rs.setAttribute("class", "Rs card-title");

//    let rsTextNode = document.createTextNode(data.val().inpPrice_1);
//    Rs.appendChild(rsTextNode);

//    let desc = document.createElement("p");
//    desc.setAttribute("class", "card-text");

//    let descTextNode = document.createTextNode(data.val().inpDesc_1);
//    desc.append(descTextNode);

//    div_1.appendChild(Rs);
//    div_1.appendChild(desc);

//    let div_2 = document.createElement("div");
//    div_2.setAttribute("class", "card-footer");

//    // let city = document.createElement("small");
//    // let inpCity = document.createTextNode(data.val().inpCity_1);
//    // city.appendChild(inpCity);

//    // div_2.appendChild(city);

//    box.appendChild(img);
//    box.appendChild(div_1);
//    box.appendChild(div_2);
// });
