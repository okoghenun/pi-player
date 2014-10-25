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
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {

        return new Greeting("Hello, " + message.getName() + "!");
    }

	public @ResponseBody String play(){
		return null;
		
	}
 	
}
