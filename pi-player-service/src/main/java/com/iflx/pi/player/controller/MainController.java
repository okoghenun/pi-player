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
import com.iflx.pi.player.model.Greeting;
import com.iflx.pi.player.repository.PlayingSongsRepository;
import com.iflx.pi.player.util.PiPlayer;

@Controller
public class MainController {

	@Autowired PiPlayer player;
	@Autowired PlayingSongsRepository playingSongs;
	
	@MessageMapping("/hello")
    @SendTo("/player/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        return new Greeting("Hello, " + message.getName() + "!");
    }

	@MessageMapping("/pauseSong")
    @SendTo("/player/songPaused")
    public Greeting pause(HelloMessage message) throws Exception {
		player.pause();
        return new Greeting("current song paused");
    }
	
	@MessageMapping("/stopSong")
    @SendTo("/player/songStopped")
    public Greeting stop(HelloMessage message) throws Exception {
		player.resume();
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
		//broadcast event to all connected users
	/*	try{
			player.open(new File("141429035067104-Umbrella-Beach.mp3"));
			player.play();
		}catch(BasicPlayerException e){
			e.printStackTrace();
			return new Greeting(e.getMessage());
		}*/
        return message;
    }
}
