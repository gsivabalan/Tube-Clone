// Replace 'YOUR_API_KEY' with your actual YouTube API key
const apiKey = 'AIzaSyAgpjV_EjXynIFZfcvKQXLNZouTVPq6CQ8';

// Fetch videos from YouTube API
function fetchVideos(query) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Process the video data and generate thumbnails dynamically
            const videos = data.items;
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = ''; // Clear previous video thumbnails

            videos.forEach(video => {
                const videoId = video.id.videoId;
               const channelid=video.id.channelId;
                const videoTitle = video.snippet.title;
                const videoThumbnail = video.snippet.thumbnails.medium.url;

                // Create a thumbnail element
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

// Handle form submission
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const searchQuery = searchInput.value;
    if (searchQuery !== '') {
        fetchVideos(searchQuery);
    }
});

// Call the fetchVideos function to fetch and display default videos
fetchVideos('tamil songs');