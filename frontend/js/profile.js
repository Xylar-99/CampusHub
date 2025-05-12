

const username = document.getElementById("username");
    const url = 'http://abquaoub.42.fr:3000/user';


fetch(url)
.then(res => res.json())
.then(data => {
    username.textContent = data.username;
})
.catch(err => console.log(err))