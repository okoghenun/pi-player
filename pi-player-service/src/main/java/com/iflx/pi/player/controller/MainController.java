package com.iflx.pi.player.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import com.iflx.pi.player.model.Greeting;
import com.iflx.pi.player.model.HelloMessage;
import com.iflx.pi.player.util.PiPlayer;

@Controller
public class MainController {

	@Autowired PiPlayer player;
	
	@MessageMapping("/hello")
    @SendTo("/player/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        return new Greeting("Hello, " + message.getName() + "!");
    }

	@MessageMapping("/pause")
    @SendTo("/player/pauseCurrent")
    public Greeting pause(HelloMessage message) throws Exception {
        return new Greeting("current song paused");
    }
	
	@MessageMapping("/stop")
    @SendTo("/player/stopCurrent")
    public Greeting stop(HelloMessage message) throws Exception {
        return new Greeting("Current song stopped");
    }
	
	@MessageMapping("/addSong")
    @SendTo("/player/addSong")
    public Greeting addSong(HelloMessage message) throws Exception {
		//capture details of song to be added
		//add the list to the db
		//broadcast event to all connected users
        return new Greeting("New Song added!");
    }
}
