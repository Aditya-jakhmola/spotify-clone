console.log("Welcome to Sportify");

// Initialize the variable
let songIndex=0;
let audioElement= new Audio('img/songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"At Peace",filePath:"img/songs/1.mp3",coverPath:"img/covers/cover1.jpg"},
    {songName:"Galat Karam",filePath:"img/songs/2.mp3",coverPath:"img/covers/cover2.jpg"},
    {songName:"DEHSHAT HO",filePath:"img/songs/3.mp3",coverPath:"img/covers/cover3.jpg"},
    {songName:"Maharani",filePath:"img/songs/4.mp3",coverPath:"img/covers/cover4.jpg"},
    {songName:"Prarthana",filePath:"img/songs/5.mp3",coverPath:"img/covers/cover5.jpg"},
    {songName:"SHUTDOWN",filePath:"img/songs/6.mp3",coverPath:"img/covers/cover6.jpg"},
    {songName:"Nanchaku",filePath:"img/songs/7.mp3",coverPath:"img/covers/cover7.jpg"},
    {songName:"Angad",filePath:"img/songs/8.mp3",coverPath:"img/covers/cover8.jpg"},
    {songName:"MR. RAMBO",filePath:"img/songs/9.mp3",coverPath:"img/covers/cover9.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

function updateIconsForCurrentSong(isPlaying) {
    masterPlay.src = isPlaying ? 'img/pause.png' : 'img/play.png';
    makeAllPlays(); // resets all songItemPlay to play2.png
    document.getElementsByClassName('songItemPlay')[songIndex].src = isPlaying ? 'img/pause.png' : 'img/play.png';
}


//audio.Element.play();

//handle Play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        updateIconsForCurrentSong(true); // Set both to "pause"
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        updateIconsForCurrentSong(false); // Set both to "play"
        gif.style.opacity = 0;
    }
});




//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myprogressbar.value=progress; 
});

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.src = 'img/play.png';
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex) {
            if (!audioElement.paused) {
                audioElement.pause();
                updateIconsForCurrentSong(false);
                gif.style.opacity = 0;
            } else {
                audioElement.play();
                updateIconsForCurrentSong(true);
                gif.style.opacity = 1;
            }
        } else {
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updateIconsForCurrentSong(true);
            gif.style.opacity = 1;
        }
    });
});




songItems.forEach((element, i) => {
    element.getElementsByClassName('songItemPlay')[0].id = i ;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {  // fix upper limit
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = 'img/pause.png';
    makeAllPlays(); // reset all play icons
    document.getElementsByClassName('songItemPlay')[songIndex].src = 'img/pause.png'; // highlight current
});


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = 'img/pause.png';
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].src = 'img/pause.png';
});

audioElement.addEventListener('ended', () => {
    // Move to next song; wrap back to first if at the end
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = 'img/pause.png';

    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].src = 'img/pause.png';
});

