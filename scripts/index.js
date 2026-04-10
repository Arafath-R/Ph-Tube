const activeBtn = () => {
    const activeBtns = document.getElementsByClassName('active');
    for (let btn of activeBtns) {
        btn.classList.remove('active')
    }

}
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('videos-container').classList.add('hidden')
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('videos-container').classList.remove('hidden')
}


const handleCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await response.json();
    displayCategories(data.categories);
}

const handleTuggleCategories = async (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    activeBtn();

    const clickedBtn = document.getElementById(`btn-${id}`)
    clickedBtn.classList.add('active')

    displayVideos(data.category);
}

const handleAllVideos = async (inp = '') => {
    showLoader()
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inp}`);
    const data = await response.json();
    activeBtn()
    document.getElementById('btn-all').classList.add('active')
    displayVideos(data.videos);
}

const handleVideoDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayVideoDetailsModal(data.video);
}
// {
//   "status": true,
//   "message": "Successfully fetched the video with video id 'aaac'",
//   "video": {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//         "profile_name": "Kevin Hart",
//         "verified": false
//       }
//     ],
//     "others": {
//       "views": "1.1K",
//       "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
//   }
// }
const displayVideoDetailsModal = (details) => {

    const videoDetailsModal = document.getElementById('video_details');
    videoDetailsModal.showModal();
    videoDetailsModal.innerHTML = `
    <div class="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                    <img src="${details.thumbnail}" alt="img" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${details.title}</h2>
                    <p>${details.description}</p>
                    <div class="card-actions justify-center pt-5">
                         <img class="rounded-full" src="${details.authors[0].profile_picture}" alt="img" />
                         <h2 class="card-title">${details.authors[0].profile_name}</h2>
                    </div>
                    <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-square btn-sm">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </form>
                    </div>
                </div>
            </div>
    `
    hideLoader()
}

const displayCategories = (categories) => {
    // 1. Hold the container
    const catagoryConatainer = document.getElementById('category-container')
    // 2. loop operation on array of object
    categories.forEach(cat => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="handleTuggleCategories(${cat.category_id})" class="btn hover:text-white hover:bg-red-400">${cat.category}</button>
        `
        catagoryConatainer.appendChild(div)
    });
    hideLoader()
}

const displayVideos = (videos) => {
    // 1. Hold the container
    const videosConatainer = document.getElementById('videos-container')

    videosConatainer.innerHTML = ``;
    // check if there is any videos
    if (videos.length == 0) {
        videosConatainer.innerHTML = `
        <div class="col-span-full pt-20">
           <img class="mx-auto" src="Assests/Icon.png" alt="">
           <h1 class="text-5xl text-center font-bold pt-10">Oops!! Sorry, There is no <br>content here</h1>
    </div>
        `
        hideLoader()
        return
    }

    // 2. loop operation on array of object
    videos.forEach(video => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="relative">
        <img class="w-full h-[200px] rounded-lg" src="${video.thumbnail}" alt="">
        <span class="p-0.5 bg-black text-white text-sm absolute bottom-2 right-2 rounded">3hrs 56 min ago</span>
        </div>
        <div class="flex gap-4 pt-5 px-0">
        <div class="avatar">
        <div class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ">
        <img src="${video.authors[0].profile_picture}" />
        </div>
        </div>
        <div class="w-[300px]">
        <h3 class="font-bold">${video.title}</h3>
        <p class="flex gap-1 items-center">${video.authors[0].profile_name}
            ${video.authors[0].verified == true ? `
                <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png">
                ` : ``}
        </p>
        <p>${video.others.views} views</p>
    </div>
    </div>
    <button onclick="handleVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>

    `
        videosConatainer.appendChild(div)
    });
    hideLoader()
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    const input = e.target.value
    handleAllVideos(input)
})

handleCategories()
handleAllVideos()
