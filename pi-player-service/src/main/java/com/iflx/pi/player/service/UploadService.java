package com.iflx.pi.player.service;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.iflx.pi.player.message.ProgressEvent;
import com.iflx.pi.player.message.SongEvent;

@Service
public class UploadService {
	
	private final SimpMessageSendingOperations messagingTemplate;
	
	@Autowired
	public UploadService(SimpMessageSendingOperations messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	public void sendPlayPing(SongEvent event){
		this.messagingTemplate.convertAndSend("/player/songPlaying",event );
	}
	
	public void sendProgressUpdate(ProgressEvent event){
		this.messagingTemplate.convertAndSend("/player/songProgress",event );
	}
	
	

}
