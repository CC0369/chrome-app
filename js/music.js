const tracks = [
    {
        id: '1',
        title : 'Dream (Feat. YOUHA, TRADE L)',
        artist : 'Minit',
        src : 'music/dream.mp3',
        cover : 'img/dream.jpg'
    },
    {
        id: '2',
        title : 'nostalgia',
        artist : 'JUNNY, JAY B',
        src : 'music/nostalgia.mp3',
        cover : 'img/nostalgia.jpg'
    },
    {
        id: '3',
        title : 'Reflection (Stripped)',
        artist : 'Avokid, Minit',
        src : 'music/reflection.mp3',
        cover : 'img/reflection.jpg'
    },
    {
        id: '4',
        title : 'Walk Me Home',
        artist : 'Said The Sky, ILLENIUM, Chelsea Cutler',
        src : 'music/walkmehome.mp3',
        cover : 'img/walkmehome.jpg'
    }
];

const player = document.querySelector('.player');
const audio = player.querySelector('.player__audio');
const audioSource = audio.querySelector("source");
const songPanel = player.querySelector('.song-panel');
const songTitle = player.querySelector('.song-info__title');
const songArtist = player.querySelector('.song-info__artist');
const backButton = player.querySelector('.backward');
const playButton = player.querySelector('.play');
const forwardButton = player.querySelector('.forward');
const spinner = player.querySelector('.spinner');
const spinnerDisc = player.querySelector('.spinner__disc');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

let playing = false;
let trackSwitch = false;

const togglePlay = () => {
    const method = audio.paused ? 'play' : 'pause';
    playing = audio.paused ? true : false;
    audio[method]();
};

const toggleSongPanel = () => {
    if (!trackSwitch) {
        spinnerDisc.classList.toggle('scale');
        songPanel.classList.toggle('playing');
        playButton.classList.toggle('playing');
    }
};

const startSpin = () => {
    spinner.classList.add('spin');
};

const stopSpin = () => {
    const spin = document.querySelector('.spin');
    spin.addEventListener("animationiteration", () => {
        if (!playing) {
            spin.style.animation = 'none';
            spinner.classList.remove('spin');
            spin.style.animation = '';
        }
    }, {
        once: true
    });
};

const handleProgress = () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.flexBasis = `${percent}`;

    if (percent === 100) {
        trackSwitch = true;
        handleForwardButton();
    }
};

const handleBackButton = () => {
    if (audio.currentTime <= 3) {
        const currentTrackId = parseInt(audioSource.dataset.trackid);
        const previousTrackId = currentTrackId === 1 ? '10' : (currentTrackId - 1).toString();
        const previousTrack = tracks.find(o => o.id === previousTrackId);
        changeTrack(previousTrack);
    } else {
        audio.currentTime = 0;
    }
};

const handleForwardButton = () => {
    const currentTrackId = parseInt(audioSource.dataset.trackid);
    const nextTrackId = currentTrackId === 10 ? '1' : (currentTrackId + 1).toString();
    const nextTrack = tracks.find(o => o.id === nextTrackId);
    changeTrack(nextTrack);
};

const changeTrack = (track) => {
    if (playing) trackSwitch = true;
    audioSource.setAttribute('src', track.src);
    audioSource.dataset.trackid = track.id;
    songTitle.innerHTML = track.title;
    songArtist.innerHTML = track.artist;
    spinnerDisc.style.backgroundImage = `url(${track.cover})`;
    audio.load();
    if (playing) {
        audio.addEventListener('canplay', () => {
            audio.play();
        }, {
            once:true
        });
        audio.addEventListener('play', () => {
            trackSwitch = false;
        }, {
            once: true
        });
    }
};

function scrub(event) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}

audio.addEventListener('play', startSpin);
audio.addEventListener('play', toggleSongPanel);
audio.addEventListener('pause', stopSpin);
audio.addEventListener('pause', toggleSongPanel);
audio.addEventListener('timeupdate', handleProgress);

backButton.addEventListener('click', handleBackButton);
playButton.addEventListener('click', togglePlay);
forwardButton.addEventListener('click', handleForwardButton);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

