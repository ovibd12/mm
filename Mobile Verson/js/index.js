// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/3.3.21/plyr.min.js
// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            tracks = [{
                "track": 1,
                "name": "Radio Foorti (88.0FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiofoorti.stream/icecast.audio"
            }, {
                "track": 2,
                "name": "ABC Radio (89.2FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/abcradio.stream/icecast.audio"
            }, {
                "track": 3,
                "name": "Radio Today (89.6FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiotoday.stream/icecast.audio"
            }, {
                "track": 4,
                "name": "Dhaka FM (90.4FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/dhakafm.stream/icecast.audio"
            }, {
                "track": 5,
                "name": "Radio Dhoni (91.2FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiodhoni.stream/icecast.audio"
            }, {
                "track": 6,
                "name": "Peoples  Radio (91.6FM)",
                "duration": "LIVE",
                "file": "http://s3.myradiostream.com/14498/listen.mp3"
            },{
                "track": 7,
                "name": "Radio Shadhin (92.4FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radioshadhin.stream/icecast.audio"
            },{
                "track": 8,
                "name": "Radio Bhumi (92.8FM)",
                "duration": "LIVE",
                "file": "https://radiobhumilive.radioca.st/;stream.mp3"
            },{
                "track": 9,
                "name": "Radio Next (93.2FM)",
                "duration": "LIVE",
                "file": "http://live.radionext.fm:9000/;"
            }, {
                "track": 10,
                "name": "Radio Amber (102.4FM)",
                "duration": "LIVE",
               "file": "https://radio.jagobd.com:444/radio/radioamber.stream/icecast.audio"
            }, {
                "track": 11,
                "name": "Radio Dhol (94.0FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiodhol.stream/icecast.audio"
            }, {
                "track": 12,
                "name": "Jago FM (94.4FM)",
                "duration": "LIVE",
                "file": "http://128.199.184.111:12496/;stream/1"
            }, {
                "track": 13,
                "name": "City FM (96.0FM)",
                "duration": "LIVE",
                "file": "http://67.222.138.242:9300/;stream.ogg"
            }, {
                "track": 14,
                "name": "Spice FM (96.4FM)",
                "duration": "LIVE",
                "file": "http://162.254.149.187:9300/;"
            }, {
                "track": 15,
                "name": "Radio Ekattor (98.4FM)",
                "duration": "LIVE",
                "file": "http://162.254.149.187:9302/;stream/1;"
            }, {
                "track": 16,
                "name": "Bangladesh Betar (100.0FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/betarfm.stream/icecast.audio"
            }, {
                "track": 17,
                "name": "ColoursFm (101.6FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/coloursfm.stream/icecast.audio"
            },{
                "track": 18,
                "name": "Radio Aamar (88.4FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radioamar.stream/icecast.audio"
            },{
                "track": 19,
                "name": "Radio Capital FM (94.8FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiocapitalfm.stream/icecast.audio"
            },{
                "track": 20,
                "name": "Radio Din Raat (93.6FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/radiodinrath.stream/icecast.audio" 
            },{
                "track": 21,
                "name": "Al-Quran Radio(100.9FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/al-quran-radio.stream/icecast.audio"
            },{
                "track": 22,
                "name": "Bangla Radio FM (95.2FM)",
                "duration": "LIVE",
                "file": "https://radio.jagobd.com:444/radio/banglaradio-fm.stream/icecast.audio" 
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = tracks[id].file;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        loadTrack(index);
    } else {
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
