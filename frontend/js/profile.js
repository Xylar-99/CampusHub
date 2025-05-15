

let url = 'http://abquaoub.42.fr:4000/posts';


fetch(url)
.then(res => res.json())
.then(data => {
  
  data.forEach(element => {
    posts(element.profile , element.fullName , element.title , element.content , element.img)
  });
  
})
.catch(err => console.log(err))




url = 'http://abquaoub.42.fr:4000/friends';

fetch(url)
.then(res => res.json())
.then(data => {
  
  data.forEach(element => {
      invite(element.img , element.fullName , element.username , element.id);
  });
  
})
.catch(err => console.log(err))





function posts(path_img_user , username , title , content , path)
{

    const postsContainer = document.getElementById("posts");
    
    const htmll = `
    <div class="square" >
      <div class="profile">
        <img src="${path_img_user}" alt="image">
        <div class="user">
          <h5>${username}</h5>
          <p>${title}</p>
        </div>
      </div>
      
      <div class="content">
      <p>${content}</p>
      <img src="${path}" alt="">
    </div> 
        
     <div class="comment">
      <div class="comment-profile">
        <img src="${path_img_user}" alt="images for post">
        <textarea name="comment" id="comment" placeholder="Write your comment..." ></textarea>
      </div>
      <div class="icon-comment">
        <a href="#"><i class="fas fa-user"></i> </a>
        <a href="#"><i class="fas fa-user"></i> </a>
        <a href="#"><i class="fas fa-user"></i> </a>
      </div>

    </div>  


  </div>
`
    
    // Get the parent container
    postsContainer.innerHTML += htmll;
}
    


function invite(img , fullname , username , id)
{
    const invite = document.getElementById("invite");

    const codehtml = `<section>
      <img src="${img}" alt="">
      <div>

        <h4>${fullname}</h4>
        <p>${username}</p>
      </div>
      <form class="user" action="/invite" method="POST">
        <input type="hidden" name="userId" value="${id}">
        <button class="invite-button" type="submit"><i class="fas fa-user-plus"></i></button>
      </form>
    </section>`;

    invite.innerHTML += codehtml;

}

