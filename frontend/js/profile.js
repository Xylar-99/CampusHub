

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


            
          
fetch('http://abquaoub.42.fr:4000/user')
.then(res => res.json())
.then(data => {
  
  user_logout(data.img , data.fullName , "programmer");

  document.getElementById('img-profile').src = data.img;

})
.catch(err => console.log(err))








function user_logout(img , fullname , username)
{
  const user_log = document.getElementById('user-logout');
  const loghtml  = `<img src="${img}" alt="image">
                    <div class="user1">
                      <h3>${fullname}</h3>
                      <p>${username}</p>
                    </div>`;
          
  
  user_log.innerHTML += loghtml;
          
  }
        





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
    
    postsContainer.innerHTML += htmll;
}
    


function invite(img , fullname , username , id)
{
    const invite = document.getElementById("invite");

    const codehtml = `<div class="border-b-1 border-t-1 border-gray-300 pl-[20px]  h-[90px] mb-[15px] justify-center  grid grid-cols-[1fr_1fr_3fr] items-center ">
        <img src="${img}" alt="" class=" w-12 h-12  rounded-full ">
        <div>
          <h3 class="text-[15px]">${fullname}</h3>
          <p class="text-gray-500">@${username}</p>
        </div>
        <form action="/invite" method="post">

          <input type="hidden" value="${id}">
          <button type="submit" class="flex justify-center  items-center">
            <i class="fas fa-user-plus  ml-[100px] text-[25px] text-green-800"></i>
          </button>
        </form>
          
      </div>`;

    invite.innerHTML += codehtml;

}

