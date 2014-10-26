package com.iflx.pi.player.util;

import javazoom.jlgui.basicplayer.BasicPlayer;

import org.springframework.stereotype.Component;

//import javazoom.jlgui.basicplayer.BasicPlayer;

@Component
public class PiPlayer extends BasicPlayer{
	
	public boolean isPlaying(){
		return this.getStatus() == BasicPlayer.PLAYING;
	}
	
	public boolean isPaused(){
		return this.getStatus() == BasicPlayer.PAUSED;
		
	}
	
	public boolean isStopped(){
		return this.getStatus() == BasicPlayer.STOPPED;
	}

}
