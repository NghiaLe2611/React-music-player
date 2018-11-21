import React from 'react';
import ReactDOM from 'react-dom';
import SongItem from './SongItem';
import $ from 'jquery';

//import Audio from 'react-audioplayer';

export default class App extends React.Component {
  constructor(props){
    super(props);

      var listSong = [
        { id: 1, name: 'Xin đừng lặng im', artist: 'Soobin Hoàng Sơn', url: 'mp3/XinDungLangIm.mp3', duration: '4:09'},
        { id: 2, name: 'Em gái mưa', artist: 'Hương Tràm', url: 'mp3/EmGaiMua.mp3', duration: '5:23'} ,
        { id: 3, name: '1234', artist: 'Chi Dân', url: 'mp3/1234.mp3', duration: '3:31'},
        { id: 4, name: 'Cơn mưa ngang qua', artist: 'Sơn Tùng MTP', url: 'mp3/ConMuaNgangQua.mp3', duration: '3:54'},
        { id: 5, name: 'Em của ngày hôm qua', artist: 'Sơn Tùng MTP', url: 'mp3/EmCuaNgayHomQua.mp3', duration: '3:52'},
        { id: 6, name: 'Rockabye', artist: 'Clean Bandit ft. Sean Paul & Anne-Marie', url: 'mp3/Rockabye.mp3', duration: '3:31'} 
        
        /*
        { id: 7, name: 'abc', artist: 'Chi Dân', url: 'mp3/12345.mp3', duration: '3:31'},
        { id: 8, name: 'def', artist: 'Chi Dân', url: 'mp3/12346.mp3', duration: '3:31'},
        { id: 9, name: 'gh', artist: 'Chi Dân', url: 'mp3/12347.mp3', duration: '3:31'},
        { id: 10, name: 'jkl', artist: 'Chi Dân', url: 'mp3/12348.mp3', duration: '3:31'},
        { id: 11, name: 'mno', artist: 'Chi Dân', url: 'mp3/12349.mp3', duration: '3:31'} */

      ];

      this.state={
        ListSong: listSong,
        playing: 'mp3/XinDungLangIm.mp3',
        duration: '4:09',
        vol: 5
      };

      this.handleClick = this.handleClick.bind(this);
      this.handlePause = this.handlePause.bind(this);
      this.handlePlay = this.handlePlay.bind(this);
      this.handlePrev = this.handlePrev.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.changeVol = this.changeVol.bind(this);
    }
  
  handleClick(e){
    e.preventDefault();
    let link = e.currentTarget.getAttribute('href');
    //console.log(link);

    this.setState({
      playing: link
    });

    let audio = document.getElementById('audio');
    let source = document.getElementById('audio-source');

    source.src = link;

    audio.load(); 
    audio.play(); 

    this.showDuration();
  }

  showDuration(){
    $('#audio').on('timeupdate', function(){
      let audio = document.getElementById('audio');
      
      //Get hours and minutes
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt((audio.currentTime / 60) % 60);
      //Add 0 if seconds less than 10
      if (s < 10) {
        s = '0' + s;
      }
      $('#current-time').html(m + ':' + s);	
      var value = 0;
      if (audio.currentTime > 0) {
        value = Math.floor((100 / audio.duration) * audio.currentTime);
      }
      $('#progress').css('width',value+'%');
      
      if(audio.currentTime >= audio.duration) {
        $('#next').trigger('click');
      }
  
    });
  }

  handlePause(){
    //console.log('pause');
    let audio = document.getElementById("audio"); 
    audio.pause(); 
    $('#pause').hide();
    $('#play').show();

    
    $('.playlist').css('animation-play-state', 'paused');
    
  }

  handlePlay(){
    //console.log('play');
    let audio = document.getElementById("audio"); 
    audio.play(); 
    $('#play').hide();
    $('#pause').show();

    //console.log(audio.duration);
    $('li.song-item').find('span.id').show().end().find('span.playing').hide();   
    $('li.song-item.active').find('span.id').hide().end().find('span.playing').show();
    this.showDuration();

    $('.playlist').css('animation', 'animatedBackground 20s linear infinite');
  }

  handlePrev(){
    //console.log('prev');
    let audio = document.getElementById("audio");     
    let prev = $('li.song-item.active').prev();
    
    if(prev.length === 0){
      prev = $('ul.list li.song-item:last-child');
    }

    $('li.song-item').removeClass('active');
    prev.addClass('active');

    let current = prev.attr('data-src');

    this.setState({
      playing: current
    });

    this.showDuration();

    $('#play').hide();
    $('#pause').show();

    audio.load();
    audio.play();

    $('li.song-item').find('span.id').show().end().find('span.playing').hide();   
    $('li.song-item.active').find('span.id').hide().end().find('span.playing').show();

    $('.playlist').css('animation', 'animatedBackground 20s linear infinite');

    let liHeight = $('ul.list li.active').offset().top;
    let scrollHeight = $('ul.list').scrollTop();
    
    if(liHeight < 500){
      $('ul.list').scrollTop(scrollHeight - 40);
    }

    let last = $('ul.list li:last-child');
    if(last.hasClass('active')){
      $('ul.list').scrollTop(251);
    }

  }

  handleNext(){
    //console.log('next');
    let audio = document.getElementById("audio");     
    let next = $('li.song-item.active').next();
    
    if(next.length === 0){
      console.log('y');
      next = $('ul.list li.song-item:first-child');
    }

    $('li.song-item').removeClass('active');
    next.addClass('active');

    let current = next.attr('data-src');

    this.setState({
      playing: current
    });

    this.showDuration();

    $('#play').hide();
    $('#pause').show();

    audio.load();
    audio.play();

    $('li.song-item').find('span.id').show().end().find('span.playing').hide();   
    $('li.song-item.active').find('span.id').hide().end().find('span.playing').show();

    $('.playlist').css('animation', 'animatedBackground 20s linear infinite');
    
    let liHeight = $('ul.list li.active').offset().top;
    let scrollHeight = $('ul.list').scrollTop();
    
    //console.log(liHeight);
    
    if(liHeight >= 460){
      $('ul.list').scrollTop(scrollHeight + 40);
    }

    let first = $('ul.list li:first-child');
    if(first.hasClass('active')){
      $('ul.list').scrollTop(0);
    }

   
    
  }

  changeVol(e){
    let audio = document.getElementById("audio"); 
    this.setState({vol: e.target.value});
    audio.volume = parseFloat(this.state.vol / 10);
  }


  componentWillMount() {

    /*
    for(var i = 0; i < this.state.ListSong.length; i++) {
        //console.log(this.state.ListSong[i].url);
        if (this.state.ListSong[i].url === this.state.playing) {
            break;
            
        }
    }

    Object.keys(this.state.ListSong).map((item, i)=> {
         
      }
    ); */

    

  }

  componentDidMount() {

    let audio = document.getElementById("audio"); 
    //audio.autoplay = true;



    if(audio.autoplay === true){
      
      setTimeout(function(){ 
        $('#play').hide();
        $('#pause').show();
        $('.playlist').css('animation', 'animatedBackground 20s linear infinite');
      }, 500);
      
      this.showDuration();
      
    }


    //Choose song
    let _this = this;
    $('li.song-item a').click(function () {
      //console.log('click');
      $('span.id').show();
      $('span.playing').hide();

      $(this).parent().siblings('span.id').hide();
      $(this).parent().siblings('span.playing').show();


      $('li.song-item').removeClass('active');
      $(this).parent().parent('li.song-item').addClass('active');
      
      $('#play').hide();
      $('#pause').show();

      let dur = $(this).closest('li').attr('data-duration');
      //console.log(dur);

      _this.setState({
        duration:  dur
      });

      $('.playlist').css('animation', 'animatedBackground 20s linear infinite');

      let liHeight = $('ul.list li.active').offset().top;
      let scrollHeight = $('ul.list').scrollTop();
      
      console.log(liHeight);
      
      if(liHeight > 400){
        $('ul.list').scrollTop(scrollHeight + 20);
      }
      
    });
    
    //Volume Control
    $('#volume').change(function(){
      audio.volume = parseFloat(this.value / 10);
    });

    $('i.fa-volume-up').click(function(){
      
      $(this).hide();
      $('i.fa-volume-off').show();
      audio.volume = 0;
      $('#volume')[0].value = 0;
      
    });

    //Pause Button
    $('i.fa-volume-off').click(function(){
      $(this).hide();
      $('i.fa-volume-up').show();
      audio.volume = !audio.muted;
      $('#volume')[0].value = !$('#volume')[0].value;
    });

    
    $("#progressBar").mouseup(function(e){
      var leftOffset = e.pageX - $(this).offset().left;
      var songPercents = leftOffset / $('#progressBar').width();
      audio.currentTime = songPercents * audio.duration;
    });

    

  }

  render() {
    /*
    var play = {
      "playlist": [
        {
          "name": "Xin dung lang im",
          "src": "mp3/XinDungLangIm.mp3"      
        },
        {
          "name": "Em gai mua",
          "src": "mp3/EmGaiMua.mp3"
        }
      ]
    }; */
  

    return (      
      <div className="music-player">
        <h1 className="header">Music player</h1>
        <div className="playlist">
          <audio controls id="audio">
                <source src={this.state.playing} type="audio/mp3" id="audio-source"/>
                Your browser does not support the audio element.
              </audio>

              <div id="tracker">
                  <div id="progressBar">
                    <span id="progress"></span>
                  </div>   
              </div>

              <div id="buttons">
                <button id="prev" onClick={this.handlePrev}>
                  <i className="fa fa-step-backward" aria-hidden="true"></i>
                </button>
                <button id="play" onClick={this.handlePlay}>
                  <i className="fa fa-play" aria-hidden="true"></i>
                </button>
                <button id="pause" onClick={this.handlePause}>
                  <i className="fa fa-pause" aria-hidden="true"></i>
                </button>
                <button id="stop">
                  <i className="fa fa-stop" aria-hidden="true"></i>
                </button>
                <button id="next" onClick={this.handleNext}>
                  <i className="fa fa-step-forward" aria-hidden="true"></i>
                </button>
                <span className="volume">
                  <i className="fa fa-volume-up" aria-hidden="true"></i>
                  <i className="fa fa-volume-off" aria-hidden="true"></i>
                  <input id="volume" type="range" min="0" max="10" value={this.state.vol} step="1" onChange={this.changeVol}/>
                </span>

                <span id="current-time"></span>&nbsp;|&nbsp;<span>{this.state.duration}</span>

                <div className="other">
                  <button id="kara">
                    <i className="fa fa-microphone" aria-hidden="true"></i>
                  </button>
                  <span className="kbs">128kbps</span>
                  <button id="repeat">
                    <i className="fa fa-repeat" aria-hidden="true"></i>
                  </button>
                </div>
                

              </div>
          {/* <div className="playlist-container">
          </div> */}
          
        </div>

        <ul className="list">
            {
              this.state.ListSong.map((item, i ) =>
                <SongItem key={i}
                  id={item.id} name={item.name} url={item.url} artist={item.artist} duration={item.duration}
                  handleClick={this.handleClick}
                  playing={this.state.playing}
                />
              )
            }
          </ul>
      </div>
    );
  }
}


/* <Audio
  width={600}
  height={300}
  playlist={play.playlist}
  // store a reference of the audio component
  ref={audioComponent => { this.audioComponent = audioComponent; }}
  style={{
    boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.2)',
    width: '400px',
    height: '60px'
  }}
/> */