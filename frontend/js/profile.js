

const fullName = document.getElementById("fullName");
const bio = document.getElementById("bio");
const loc = document.getElementById("location");
const avatar = document.getElementById("avatar");


const url = 'http://abquaoub.42.fr:4000/user';


fetch(url)
.then(res => res.json())
.then(data => {
    
    fullName.textContent = data.fullName;
    bio.textContent = data.bio;
    loc.textContent = data.location;
    avatar.src = data.img;

})
.catch(err => console.log(err))