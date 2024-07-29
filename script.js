const itemForm =document.getElementById('item-form')
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const items=itemList.querySelectorAll('li');
const filter=document.getElementById('filter');
const clear=document.getElementById('clear');
const formBtn= itemForm.querySelector('button');
let editmode=false;


//event listners
itemForm.addEventListener('submit',addItemsToDom);
itemList.addEventListener('click',removeItemFromDom);
filter.addEventListener('input',filterItemsInDom);
clear.addEventListener('click',clearItemsinDom);
document.addEventListener('DOMContentLoaded',addLocalStorageToDom);




//callback function
function addItemsToDom(e){
    e.preventDefault();
    
    const itemInputValue =itemInput.value.trim();

    const items=itemList.querySelectorAll('li');

    let isDuplicate=false;
    items.forEach(item=>{
        if(item.textContent.toLowerCase().trim()===itemInputValue.toLowerCase().trim()){
          isDuplicate=true;  
        }
        
    })
    
    if (isDuplicate) {
        alert('This item is already in the list.');
        return; // Exit if a duplicate is found
    }else if(itemInputValue===''){
        alert('please enter a value');
        return ;
    }

    if(editmode){
        const itemToedit=itemList.querySelector('.edit-mode');
        removeItemFromLocalStorage(itemToedit.textContent.trim());
        itemToedit.classList.remove('edit-mode');
        itemToedit.remove();
        editmode=false;
    }

   
    const newItem= document.createElement('li');

    const newButton=document.createElement('button');
    newButton.classList='remove-item btn-link text-red';

    const icon =document.createElement('i');
    icon.classList='fa-solid fa-xmark';

   
    newItem.appendChild(document.createTextNode(itemInputValue));
    newItem.appendChild(newButton);
    newButton.appendChild(icon);
    itemList.appendChild(newItem);
 
    addItemToLocalStorage(itemInputValue);

 itemInput.value=''

   formBtn.style.backgroundColor = '#333';
   formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    
    ui();
}

function removeItemFromDom(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        const item = e.target.parentElement.parentElement;
        const itemText = item.textContent.trim(); // Fix to get text content correctly
        item.remove();
        removeItemFromLocalStorage(itemText); // Ensure this function is correct
    }else{
       setItemToEdit(e.target);
    }
    ui();
}

function filterItemsInDom(e) {
    const filterValue = e.target.value.toLowerCase(); 
    const items = itemList.querySelectorAll('li');
    
    items.forEach(item => {
        const itemText = item.textContent.toLowerCase(); 
        if (itemText.includes(filterValue)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    ui();
}
function clearItemsinDom(e){
    e.preventDefault();
    const items = itemList.querySelectorAll('li');
    items.forEach(item=>{
        item.remove()
    })
    localStorage.removeItem('items')
    ui();
}
function addLocalStorageToDom(e) {
    const itemsInStorage = getItemsFromLocalStorage();
    itemsInStorage.forEach(itemText => {
        const newItem = document.createElement('li');
        newItem.textContent = itemText;

        const newButton = document.createElement('button');
        newButton.classList.add('remove-item', 'btn-link', 'text-red');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-xmark');

        newButton.appendChild(icon);
        newItem.appendChild(newButton);
        itemList.appendChild(newItem);
    });

    ui();
}

//other function
function setItemToEdit(item) {
    editmode = true;

    // Reset styles for all items
    itemList.querySelectorAll('li').forEach(i => {
         // Reset to original color
        i.classList.remove('edit-mode')
        
    });

    // Set the clicked item to edit mode
    item.classList.add('edit-mode');
    formBtn.innerHTML = 'Update';
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent.trim();
}
//local sotrage
function addItemToLocalStorage(item) {
    const itemsInStorage = getItemsFromLocalStorage();
    itemsInStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsInStorage));
}

function getItemsFromLocalStorage() {
    let itemsInStorage;
    if (localStorage.getItem('items') === null) {
        itemsInStorage = [];
    } else {
        itemsInStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsInStorage;
}

function removeItemFromLocalStorage(itemText) {
    let itemsInStorage = getItemsFromLocalStorage();
    itemsInStorage = itemsInStorage.filter(storedItem => storedItem !== itemText);
    localStorage.setItem('items', JSON.stringify(itemsInStorage));
}


//utilities


function ui(){
    const items = itemList.querySelectorAll('li');
    if (items.length > 0) {
        filter.style.display = 'block';
        clear.style.display = 'block';
    } else {
        filter.style.display = 'none';
        clear.style.display = 'none';
    }

    
   
}

ui();