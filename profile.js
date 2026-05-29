/* =========================
CONFIG
========================= */

const API =
"https://YOUR_APPS_SCRIPT_URL/exec"

/* =========================
USER
========================= */

let user =
JSON.parse(
localStorage.getItem("user")
|| "null"
)

if(!user){

user = {
email:"demo@creatorhub.com"
}

}

/* =========================
ELEMENTS
========================= */

const profileImage =
document.getElementById(
"profileImage"
)

const coverImage =
document.getElementById(
"coverImage"
)

const creatorName =
document.getElementById(
"creatorName"
)

const creatorBio =
document.getElementById(
"creatorBio"
)

const nameInput =
document.getElementById(
"nameInput"
)

const phoneInput =
document.getElementById(
"phoneInput"
)

const websiteInput =
document.getElementById(
"websiteInput"
)

const instagramInput =
document.getElementById(
"instagramInput"
)

const youtubeInput =
document.getElementById(
"youtubeInput"
)

const telegramInput =
document.getElementById(
"telegramInput"
)

const twitterInput =
document.getElementById(
"twitterInput"
)

const countryInput =
document.getElementById(
"countryInput"
)

const stateInput =
document.getElementById(
"stateInput"
)

const cityInput =
document.getElementById(
"cityInput"
)

const bioInput =
document.getElementById(
"bioInput"
)

/* =========================
LOAD PROFILE
========================= */

window.onload = () => {

loadProfile()

}

/* =========================
LOAD PROFILE
========================= */

async function loadProfile(){

try{

const res =
await fetch(

API +

"?action=profile&email=" +

encodeURIComponent(
user.email
)

)

const data =
await res.json()

if(!data.success)
return

const p =
data.user

/* HEADER */

creatorName.innerHTML =
p.name || "Creator"

creatorBio.innerHTML =
p.bio ||
"Professional Creator"

document.getElementById(
"countryText"
).innerHTML =
p.country || ""

document.getElementById(
"stateText"
).innerHTML =
p.state || ""

document.getElementById(
"cityText"
).innerHTML =
p.city || ""

/* IMAGES */

if(p.profile_image){

profileImage.src =
p.profile_image

}

if(p.cover_image){

coverImage.src =
p.cover_image

}

/* STATS */

document.getElementById(
"totalBooks"
).innerHTML =
p.total_books || 0

document.getElementById(
"totalOrders"
).innerHTML =
p.total_orders || 0

document.getElementById(
"totalProfit"
).innerHTML =
"₹" +
(
p.total_profit || 0
)

document.getElementById(
"walletBalance"
).innerHTML =
"₹" +
(
p.wallet_balance || 0
)

document.getElementById(
"creatorLevelCard"
).innerHTML =
p.creator_level ||
"Beginner"

document.getElementById(
"statusCard"
).innerHTML =
p.status ||
"Active"

/* FORM */

nameInput.value =
p.name || ""

phoneInput.value =
p.phone || ""

websiteInput.value =
p.website || ""

instagramInput.value =
p.instagram || ""

youtubeInput.value =
p.youtube || ""

telegramInput.value =
p.telegram || ""

twitterInput.value =
p.twitter || ""

countryInput.value =
p.country || ""

stateInput.value =
p.state || ""

cityInput.value =
p.city || ""

bioInput.value =
p.bio || ""

}catch(err){

console.log(err)

}

}

/* =========================
SAVE PROFILE
========================= */

document.getElementById(
"saveBtn"
).onclick =
saveProfile

async function saveProfile(){

try{

const payload = {

action:
"update_profile",

email:
user.email,

name:
nameInput.value,

phone:
phoneInput.value,

website:
websiteInput.value,

instagram:
instagramInput.value,

youtube:
youtubeInput.value,

telegram:
telegramInput.value,

twitter:
twitterInput.value,

country:
countryInput.value,

state:
stateInput.value,

city:
cityInput.value,

bio:
bioInput.value,

profile_image:
window.profileImageUrl
||
profileImage.src,

cover_image:
window.coverImageUrl
||
coverImage.src

}

const res =
await fetch(API,{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
payload
)

})

const data =
await res.json()

if(data.success){

alert(
"Profile Saved Successfully"
)

loadProfile()

}else{

alert(
"Save Failed"
)

}

}catch(err){

console.log(err)

alert(
"Server Error"
)

}

}

/* =========================
PROFILE IMAGE
========================= */

document.getElementById(
"changeProfileBtn"
).onclick = () => {

document.getElementById(
"profileUpload"
).click()

}

document.getElementById(
"profileUpload"
).onchange =
function(){

const file =
this.files[0]

if(!file)
return

const reader =
new FileReader()

reader.onload =
function(e){

profileImage.src =
e.target.result

window.profileImageUrl =
e.target.result

}

reader.readAsDataURL(
file
)

}

/* =========================
COVER IMAGE
========================= */

document.getElementById(
"changeCoverBtn"
).onclick = () => {

document.getElementById(
"coverUpload"
).click()

}

document.getElementById(
"coverUpload"
).onchange =
function(){

const file =
this.files[0]

if(!file)
return

const reader =
new FileReader()

reader.onload =
function(e){

coverImage.src =
e.target.result

window.coverImageUrl =
e.target.result

}

reader.readAsDataURL(
file
)

}

/* =========================
SOCIAL LINKS
========================= */

function updateSocialLinks(p){

document.getElementById(
"instagramLink"
).href =
p.instagram || "#"

document.getElementById(
"youtubeLink"
).href =
p.youtube || "#"

document.getElementById(
"telegramLink"
).href =
p.telegram || "#"

document.getElementById(
"twitterLink"
).href =
p.twitter || "#"

}
