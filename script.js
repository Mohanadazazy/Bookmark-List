var bookmarkName = document.getElementById("BookmarkName")
var websiteUrl = document.getElementById("WebsiteUrl")
var tablebody = document.getElementById("Tablebody")
var boxAlert = document.getElementById("box")
var bookmarkList =[];
var storage = JSON.parse(localStorage.getItem("Bookmarklist"))
if(storage != null){
    bookmarkList = JSON.parse(localStorage.getItem("Bookmarklist"))
}
displayBookmark();
function add(){
    isValid();
    if(validateBookmark()){
        var bookmark ={
            siteName: bookmarkName.value,
            siteUrl: websiteUrl.value,
        }
        bookmarkList.push(bookmark)
        localStorage.setItem("Bookmarklist",JSON.stringify(bookmarkList))
        console.log(bookmarkList);
        displayBookmark()
        clear()
    }
}

function clear(){
    bookmarkName.value="";
    websiteUrl.value="";
}

function displayBookmark(){
    container=""
    for(var i = 0 ; i < bookmarkList.length ; i++ ){
        container +=` <tr>
                      <td>${i+1}</td>
                      <td>${bookmarkList[i].siteName}</td>
                      <td><a href="${bookmarkList[i].siteUrl}" target="_blank"><button class="btn btn-warning text-white"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
                      <td><button onclick="deleteBookmark(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                      </tr>
                    `
    }
    tablebody.innerHTML = container;
}

function deleteBookmark(idx){
    bookmarkList.splice(idx,1)
    displayBookmark();
    console.log(bookmarkList);
    localStorage.setItem("Bookmarklist",JSON.stringify(bookmarkList))
}

function validateBookmark(){
    return(/^https\:\/\/(w{3}\.)?[\w]{2,15}.(com|net|edu)$/.test(websiteUrl.value)&&/^[A-Z][\w]{2,15}$/.test(bookmarkName.value))
}

function isValid(){

    if(!(/^[A-Z][\w]{2,15}$/.test(bookmarkName.value))){
        boxAlert.classList.remove("d-none")
        bookmarkName.classList.add("is-invalid")
        bookmarkName.classList.remove("is-valid")
    }else{
        // boxAlert.classList.add("d-none")
        bookmarkName.classList.remove("is-invalid")
        bookmarkName.classList.add("is-valid")
    }

    if(!(/^https\:\/\/(www.)?[\w]{2,15}.(com|net|edu)$/.test(websiteUrl.value))){
        boxAlert.classList.remove("d-none")
        websiteUrl.classList.add("is-invalid")
        websiteUrl.classList.remove("is-valid")
    }else{
        // boxAlert.classList.add("d-none")
        websiteUrl.classList.remove("is-invalid")
        websiteUrl.classList.add("is-valid")
    }

}

function closeBox(){
    boxAlert.classList.add("d-none")
}