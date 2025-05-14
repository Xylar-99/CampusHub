

const url = 'http://abquaoub.42.fr:4000/posts';


fetch(url)
.then(res => res.json())
.then(data => {

    data.forEach(element => {
        
        posts(element.profile , element.fullName , element.title , element.content , element.img)
    });

})
.catch(err => console.log(err))









function posts(path_img_user , username , title , content , path)
{

    const postsContainer = document.getElementById("postsContainer");
    
    const htmll = ` <div class="h1">
    <img src="${path_img_user}" alt="">
    
    <div class="title">
    <h5>${username}</h5>
    <p>${title}</p>
    </div>
    
    </div>
    
    <div class="content">
    <p>${content}</p>
    <img src="${path}" class="mask">
    </div>`
    
    // Get the parent container
    postsContainer.innerHTML += htmll;
}
    

