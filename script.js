const apiKey = 'AIzaSyAgpjV_EjXynIFZfcvKQXLNZouTVPq6CQ8';

function fetchVideos(query) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            const videos = data.items;
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = '';

            videos.forEach(video => {
                const videoId = video.id.videoId;
               const channelid=video.id.channelId;
                const videoTitle = video.snippet.title;
                const videoThumbnail = video.snippet.thumbnails.medium.url;
                const thumbnailElement = document.createElement('div');
                if(channelid!=null){
                    // https://www.googleapis.com/youtube/v3/channels?id=${channelid}&key=AIzaSyAgpjV_EjXynIFZfcvKQXLNZouTVPq6CQ8
                thumbnailElement.innerHTML = `
                    <a href="https://www.youtube.com/channel/${channelid}" target="_blank">
                        <img src="${videoThumbnail}" alt="${videoTitle}">
                        <h2>${videoTitle}</h2>
                    </a>
                `;
                }else{
                thumbnailElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${videoThumbnail}" alt="${videoTitle}">
                        <h2>${videoTitle}</h2>
                    </a>
                `;
                }
                videoContainer.appendChild(thumbnailElement);
            });
        })
        .catch(error => console.log(error));
}


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const searchQuery = searchInput.value;
    if (searchQuery !== '') {
        fetchVideos(searchQuery);
    }
});


fetchVideos('tamil songs');