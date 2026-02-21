const handleDrawing = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/category/1005");
    const data = await res.json();
    displayDrawingVideos(data.category);

}

const displayDrawingVideos = (videos) => {

    if (videos.length != 0) {
        // 1. Hold the container
        const drawingVideosConatainer = document.getElementById('drawing-videos-container')
        // 2. loop operation on array of object
        videos.forEach(video => {
            const div = document.createElement('div')
            // div.classList.add('')
            div.innerHTML = `
           <div>
    <img class="w-full h-[200px] rounded-lg" src="${video.thumbnail}" alt="">
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
            <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png">
        </p>
        <p>${video.others.views} views</p>
    </div>
</div>
    `
            drawingVideosConatainer.appendChild(div)
        });
    }
    else {
        const drawingVideosConatainer = document.getElementById('drawing-videos-container');
        const div = document.createElement('div');
        div.innerHTML = `
            <img class="mx-auto" src="Assests/Icon.png" alt="">
            <h1 class="text-5xl text-center font-bold pt-16">Oops!! Sorry, There is no <br>content here</h1>
    `
        drawingVideosConatainer.appendChild(div);
    }
}
// handleDrawing();
