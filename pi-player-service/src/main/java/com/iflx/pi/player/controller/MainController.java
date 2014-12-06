package com.iflx.pi.player.controller;

import java.io.File;

import javazoom.jlgui.basicplayer.BasicPlayerException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import com.iflx.pi.player.message.AddSongMessage;
import com.iflx.pi.player.message.HelloMessage;
import com.iflx.pi.player.message.SongEvent;
import com.iflx.pi.player.model.Greeting;
import com.iflx.pi.player.model.PlayingSong;
import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.repository.PlayingSongsRepository;
import com.iflx.pi.player.repository.SongRepository;
import com.iflx.pi.player.util.PiPlayer;

@Controller
public class MainController {

	@Autowired PiPlayer player;
	@Autowired PlayingSongsRepository playingSongs;
	@Autowired
	SongRepository songRepository;
	
	@MessageMapping("/hello")
    @SendTo("/player/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        return new Greeting("Hello, " + message.getName() + "!");
    }

	@MessageMapping("/pauseSong")
    @SendTo("/player/songPaused")
    public SongEvent pause() throws Exception {
		player.pause();
		PlayingSong currentSong = playingSongs.findByCurrent(1);
		SongEvent songEvent = new SongEvent();
		songEvent.setIsPlaying(0);
		songEvent.setSongId(currentSong.getClientSongId());
		return songEvent;
    }
	@MessageMapping("/resumeSong")
    @SendTo("/player/songResume")
    public SongEvent resume() throws Exception {
		player.resume();
		PlayingSong currentSong = playingSongs.findByCurrent(1);
		SongEvent songEvent = new SongEvent();
		songEvent.setIsPlaying(1);
		songEvent.setSongId(currentSong.getClientSongId());
		return songEvent;
		
    }
	
	@MessageMapping("/stopSong")
    @SendTo("/player/songStopped")
    public Greeting stop(HelloMessage message) throws Exception {
		player.stop();
        return new Greeting("Current song stopped");
    }
	
	@MessageMapping("/removeSong")
    @SendTo("/player/songRemoved")
    public Greeting removeSong(HelloMessage message) throws Exception {
		player.resume();
        return new Greeting("Current song stopped");
    }
	@MessageMapping("/addSong")
    @SendTo("/player/songAdded")
    public AddSongMessage addSong(AddSongMessage message) throws Exception {
		//capture details of song to be added
		//add the list to the db
		//check if playlist is empty
		if(playingSongs.count() < 5 ){
			//ask user to upload the song
		}	
		Song song = new Song(message.getTitle(),"","admin","CCHUB-SAT-JAM",message.getAlbum(),message.getArtist(),message.getYear(),message.getGenre(),message.getDuration(),message.getId());
		songRepository.save(song);
		
        return message;
    }
	
	@MessageMapping("/playSong")
    @SendTo("/player/songPlaying")
    public SongEvent PlaySong() {
		PlayingSong currentSong = playingSongs.findByCurrent(1);
		SongEvent songEvent = new SongEvent();
		if(currentSong!= null){
			songEvent.setIsPlaying(1);
			songEvent.setSongId(currentSong.getClientSongId());
			try{
				player.open(new File(currentSong.getFilePath()));
				player.play();
			}catch(BasicPlayerException e){
				e.printStackTrace();
				songEvent.setIsPlaying(0);
				return songEvent;
				
			}
			
		}
		return songEvent;
		
		
    }
	
	
}
