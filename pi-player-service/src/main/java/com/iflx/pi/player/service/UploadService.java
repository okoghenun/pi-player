package com.iflx.pi.player.service;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class UploadService {
	
	private final SimpMessageSendingOperations messagingTemplate;
	
	@Autowired
	public UploadService(SimpMessageSendingOperations messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	public void sendUploadPing(Principal principal){
		this.messagingTemplate.convertAndSendToUser(principal.getName(), "/queue/uploadSong", "please upload with id 12344");
	}

}
