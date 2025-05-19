










fetch('http://abquaoub.42.fr:4000/posts')
.then(res => res.json())
.then(data => {
  
  data.forEach(el => {
      posts(el.img_user , el.fullName , el.title , el.content , el.img);
  });
  
})
.catch(err => console.log(err))





fetch('http://abquaoub.42.fr:4000/users')
.then(res => res.json())
.then(data => {
  
  data.forEach(el => {
      invite1(el.img , el.fullName , el.username , el.id);
  });
  
})
.catch(err => console.log(err))


            

function posts(path_img_user , username , title , content , path)
{

    const postsContainer = document.getElementById("posts");
    
    const htmll = `
    <div  class="bg-white-400 border-1 border-gray-300 p-[20px] shadow-xl h-auto  gap-1 grid grid-rows-[70px_auto_70px] rounded-2xl  mt-[20px]">
    <div class=" flex items-center pl-3 ">
        <img src="${path_img_user}" alt="" class="w-12 h-12  rounded-full mr-[20px]">
        <div class="h-auto">
          <h3 class="font-mono">${username}</h3>
          <p class="text-gray-500">${title}</p>
        </div>
    </div>
    <div class=" grid h-auto">
      <p class="font-mono text-center m-auto pb-[5px] pt-[3px]">${content}</p>
      <img src="${path}" alt="" class="w-full h-[350px]   mx-auto">
      
    </div>
    <div class="grid grid-cols-[3fr_1fr] ">
      <div class=" flex items-center pl-[20px]">
        <!-- <img src="aa" class=" w-12 h-12  rounded-full profile_img"> -->
        <input type="text" placeholder="Write a short comment..."  class="w-[60%] h-[60%] p-2 border-[1px] rounded-4xl pl-[40px] ml-[30px]" />
      </div>
      <div class=" grid grid-cols-4 items-center justify-between pl-[40px] ">
        <i class="text-[30px] fas fa-share-alt text-green-400 text-xl"></i>
        <i class="text-[30px] fas fa-thumbs-up text-blue-400 text-xl"></i>
        <i class="text-[30px] fas fa-paper-plane text-gray-600 text-xl"></i>
      </div>
    </div>
  </div>
`
    
    postsContainer.innerHTML += htmll;
}
    



function invite1(img , fullname , username , id)
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











const img_profile = document.querySelectorAll('.profile_img');



fetch('http://abquaoub.42.fr:4000/user')
.then(res => res.json())
.then(data => {
  
  img_profile.forEach(el => {
  el.src = data.img;
  });
  
  
})
.catch(err => console.log(err))
