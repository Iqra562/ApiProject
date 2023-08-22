// store api url in variable //
const apiBasedURL = "https://jsonplaceholder.typicode.com";
// id of table body //
const  tableBody = document.getElementById('todos-listing');
const createPostFormElement  =document.getElementById('create-post-form');
// tableBody.innerHTML += "abd"
// Function to get posts api from url
const getApi =  function(){
fetch(`${apiBasedURL}/posts`)
.then(function(response){
 return response.json();
}).then(function(data){
// console.log(data);
if(Array.isArray(data)){
    data.forEach(function(singleData){
// console.log(singleData,'eachdata');
const tableRow = document.createElement("tr");
tableRow.innerHTML = `
<td id="post_id">${singleData.id}</td>
          <td>${singleData.userId}</td>
          <td>${singleData.title}</td>
          <td>${singleData.body}</td>
          <td>
            <a class="btn btn-primary edit-btn"  data-post-id="${singleData.id}"  data-toggle="modal" href="#edit-post">Edit</a>
          </td>
          <td><a href="#" class="btn btn-danger delete-btn" data-post-id="${singleData.id}" >Delete</a></td>
`
// console.log(tableRow)
tableBody.append(tableRow)
    })
}}).catch(function(error){
console.error(error,'error')
})
};
getApi();

createPostFormElement.addEventListener('submit',function(event){
      event.preventDefault();
    const postTitleInputField =   document.getElementById('post_title');
    const postBodyInputField = document.getElementById('post_body');
    const createPostBTN = document.getElementById('post-create-btn');
    if(!postTitleInputField.value || !postBodyInputField.value){
      alert('fill out all input fields');
       return;
    };
    const formBody = {
      title :postTitleInputField.value,
      body  :postBodyInputField.value,
          }
      fetch(`${apiBasedURL}/posts`,{
        headers :{
          'Content-Type': 'application/json',
        },
        method: "POST",
        body : JSON.stringify(formBody),
      })
      .then(function(response){
  return response.json();
      })
      .then(function(data){
        postTitleInputField.value="";
        postBodyInputField.value="";
        $("#create-todo").modal("hide");

      })
    
      .catch(function(error){
   console.log(error)
      })
    })
// delete function 
tableBody.addEventListener('click',function(event){
 event.preventDefault();
//  console.log(event.target)
const currentElement  =  event.target;
// console.log(currentElement.classList.contains("delete-btn"));

if(currentElement.classList.contains("delete-btn")){
  // console.log(currentElement.dataset.postId);
  const deleteId= currentElement.dataset.postId;
  if(confirm("Are you sure?")){
    fetch(`${apiBasedURL}/posts/${deleteId}`,{
      method : "DELETE",
      
    }).then(function(response){
           getApi();
    }).catch(function(error){
      console.log(error);
    })      

  }
}
if(currentElement.classList.contains("edit-btn")){
const editBtnId = currentElement.dataset.postId;
fetch(`${apiBasedURL}/posts/${editBtnId}`)
.then(function(response){
  return response.json();
})
.then(function(data){
// console.log(data,"data")
const editPostTitleInput = document.getElementById("edit_post_title");
const editPostBodyInput = document.getElementById("edit_post_body");
editPostTitleInput.value = data.title;
editPostBodyInput.value = data.body;
// hidden input field
const hiddenInputField = document.getElementById("edit_post_id");
hiddenInputField.value = editBtnId;

})
.catch(function(error){
  console.log(error) 
})
}
})
const submitEditForm = document.getElementById("edit-post-form");
submitEditForm.addEventListener('submit',function(event){
event.preventDefault();
// alert('hello')
const editPostTitleInput = document.getElementById("edit_post_title");
const editPostBodyInput = document.getElementById("edit_post_body");
const hiddenInputField = document.getElementById("edit_post_id").value;
const formBody = {
  title:editPostTitleInput.value,
  body:editPostBodyInput.value

};
fetch(`${apiBasedURL}/posts/${hiddenInputField}`,{
  headers:{
    "Content-Type":"application/json",
  },
  method:"PUT",
  body:JSON.stringify(formBody),
})
.then(function(response){
return response.json();
})
.then(function(data){
$("#edit-post").modal("hide");
getApi();
// alert('correct')
})
.catch(function(error){
  console.log(error);
})
})