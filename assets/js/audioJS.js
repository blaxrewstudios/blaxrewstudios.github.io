var onSeekClick = false;
var muted = false;
var link = "";

function ChangeTrack(album, title, artist_s, src) {
    switch (album) {
        case "Just Happy :)":
            document.getElementById("cover").src = "assets/img/Music/folder.jpg"
            break;
        case "The Weird One":
            document.getElementById("cover").src = "assets/img/Music/the_weird_one.png"
            break;
    }

    link = src;
    document.getElementById("songTitle").innerText = title;
    document.getElementById("songArtist").innerText = artist_s;
    Play();
}

function Play() {
    try {
        var x = document.getElementById("myAudio");
        x.onplaying = function () {
            var pli = document.getElementById("stop-icon");
            var sp = document.getElementById("load");
            sp.style.display = "none";
            pli.style.display = "block";
        };
        x.onplay = function () {
            var pli = document.getElementById("stop-icon");
            var sp = document.getElementById("load");
            sp.style.display = "block";
            pli.style.display = "none";
        };
        if (!x.canPlayType) window.alert("Nope, your browser is too stupid!");
        if (x.currentSrc != link) {
            x.src = link;
            x.load();
        }
        x.play();
        x.volume = document.getElementById("volume").value;
        UpdateVol(x.volume);
        document.getElementById("stop").style.display = "block";
        document.getElementById("play").style.display = "none";
    }
    catch (e) {
        window.alert(e);
    }
}

function Stop() {
    try {
        var x = document.getElementById("myAudio");
        x.pause();
        document.getElementById("stop").style.display = "none";
        document.getElementById("play").style.display = "block";
    }
    catch (e) {
        window.alert(e);
    }
}

function Seek(value) {
    var x = document.getElementById("myAudio");
    x.currentTime = x.duration * (value / 1000);
}

function ChangeVol(value) {
    var x = document.getElementById("myAudio");
    UpdateVol(value);
    x.volume = value;
}

function OnSeekClick() {
    onSeekClick = !onSeekClick;
}

var update_loop = setInterval(Main, 1);

Main();

function Main() {
    var t = document.getElementById("timeA");
    var ts = document.getElementById("timeStamp");
    var x = document.getElementById("myAudio");

    if (!onSeekClick)
        t.value = (x.currentTime / x.duration) * 1000;

    var d_min = Math.trunc(x.duration / 60);
    var d_sec = Math.trunc(x.duration - 60 * d_min);

    var c_min = Math.trunc(x.currentTime / 60);
    var c_sec = Math.trunc(x.currentTime - 60 * c_min);

    if (!Number.isNaN(d_min) && !Number.isNaN(d_sec) && !Number.isNaN(c_min) && !Number.isNaN(c_sec))
        ts.innerHTML = pad(c_min) + ":" + pad(c_sec) + " | " + pad(d_min) + ":" + pad(d_sec);
    else {
        ts.innerHTML = "00:00 | 00:00"
    }

    if (x.ended) {
        document.getElementById("stop").style.display = "none";
        document.getElementById("play").style.display = "block";
    }
}

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function OnMute() {
    var x = document.getElementById("myAudio");
    x.muted = !x.muted;
    UpdateVol(document.getElementById("volume").value);
}

function UpdateVol(value) {
    var x = document.getElementById("myAudio");

    var low = document.getElementById("low-volume");
    var up = document.getElementById("up-volume");
    var off = document.getElementById("off-volume");
    var muted = document.getElementById("muted-volume");

    if (!x.muted) {
        if (muted.style.display == "block") muted.style.display = "none";
        if (value <= 0.66 && value > 0) {
            low.style.display = "block";
            up.style.display = "none";
            off.style.display = "none";
        }
        else if (value > 0.66) {
            low.style.display = "none";
            up.style.display = "block";
            off.style.display = "none";
        }
        else if (value == 0) {
            low.style.display = "none";
            up.style.display = "none";
            off.style.display = "block";
        }
    }
    else {
        low.style.display = "none";
        up.style.display = "none";
        off.style.display = "none";
        muted.style.display = "block";
    }
}