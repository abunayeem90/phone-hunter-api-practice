const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}
    `);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    // 1. 
    const phoneContainer = document.getElementById('phone-container');
    //5. clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // console.log(phones.length);

    // display show all button if there are more than 12
    const showAllConatainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllConatainer.classList.remove('hidden')
    }
    else{
        showAllConatainer.classList.add('hidden')
    }
    // console.log('is Show All', isShowAll)
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }    
    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="text-center text-2xl font-bold"> $999</p>

          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpiner(false);

}

//
const handleShowDetail = async (id) =>{
    // console.log('Clicked show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDeailContainer = document.getElementById('show-deail-container');
    showDeailContainer.innerHTML = `
    <img class="m-auto p-2" src="${phone?.image}" alt="" />
    <p> <span class="font-bold text-lg">Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold text-lg">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold text-lg">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>

    <p><span class="font-bold text-lg">Memory : </span>${phone?.mainFeatures?.memory}</P>
    <p><span class="font-bold text-lg">Slug : </span>${phone?.slug || 'No Sulg found'}</P>
    <p><span class="font-bold text-lg">Release data : </span>${phone?.releaseDate || 'No Release Date found'}</P>
    <p><span class="font-bold text-lg">Brand : </span>${phone?.brand || 'No Brand found'}</P>
    
    <p><span class="font-bold text-lg">GPS : </span>${phone.others?.GPS || 'No GPS'}</p>
    `
    // another system to append
    // <p><span>GPS : </span>${phone.others?.GPS ? phone.others.GPS: 'No GPS avaible in this device'}</p>

    // show the modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// handle search recap
// const handleSearch2 = () =>{
//     toggleLoadingSpiner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpiner = (isLoading) =>{
    const loadingSpiner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpiner.classList.remove('hidden');

    }
    else{
        loadingSpiner.classList.add('hidden');

    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true)
}

// loadPhone();