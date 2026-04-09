document.addEventListener("DOMContentLoaded", function(){

console.log("Script Loaded");

const btn = document.getElementById("registerBtn");

if(!btn){
alert("Register button not found");
return;
}

/* CLICK EVENT */

btn.addEventListener("click", async function(){

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

/* VALIDATION */

if(!name || !email || !password){
showMessage("⚠ Please fill all fields");
return;
}

btn.disabled = true;
btn.innerText = "Creating Account...";

try{

const result = await registerUser({
name:name,
email:email,
password:password
});

/* SUCCESS */

if(result.success){

showMessage("✅ Account Created Successfully");

setTimeout(function(){

location.href="login.html";

},1500);

}else{

showMessage("❌ "+(result.message || "Registration failed"));

btn.disabled=false;
btn.innerText="Register";

}

}catch(error){

console.error(error);

showMessage("⚠ Server error. Try again.");

btn.disabled=false;
btn.innerText="Register";

}

});

});

/* MESSAGE UI */

function showMessage(text){

let box = document.getElementById("msgBox");

if(!box){

box = document.createElement("div");

box.id="msgBox";

box.style.position="fixed";
box.style.bottom="20px";
box.style.left="50%";
box.style.transform="translateX(-50%)";
box.style.background="#111827";
box.style.padding="12px 20px";
box.style.borderRadius="10px";
box.style.border="1px solid #22c55e";
box.style.color="#22c55e";
box.style.fontWeight="bold";
box.style.boxShadow="0 0 10px rgba(34,197,94,.5)";
box.style.animation="fadeMsg .3s ease";

document.body.appendChild(box);

}

box.innerText=text;

setTimeout(()=>{

box.remove();

},3000);

}
