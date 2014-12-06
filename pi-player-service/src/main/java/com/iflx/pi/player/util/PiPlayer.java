package com.iflx.pi.player.util;

import java.io.File;
import java.util.Map;

import javazoom.jlgui.basicplayer.BasicController;
import javazoom.jlgui.basicplayer.BasicPlayer;
import javazoom.jlgui.basicplayer.BasicPlayerEvent;
import javazoom.jlgui.basicplayer.BasicPlayerException;
import javazoom.jlgui.basicplayer.BasicPlayerListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.iflx.pi.player.message.ProgressEvent;
import com.iflx.pi.player.message.SongEvent;
import com.iflx.pi.player.model.PlayingSong;
import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.repository.PlayingSongsRepository;
import com.iflx.pi.player.repository.SongRepository;
import com.iflx.pi.player.service.UploadService;

//import javazoom.jlgui.basicplayer.BasicPlayer;

@Component
public class PiPlayer extends BasicPlayer implements BasicPlayerListener{
	
	
	@Autowired PlayingSongsRepository playingSongs;
	@Autowired SongRepository songRepository;
	@Autowired UploadService eventService;
	
	public PiPlayer(){
		this.addBasicPlayerListener(this);
	}
	
	public boolean isPlaying(){
		return this.getStatus() == BasicPlayer.PLAYING;
	}
	
	public boolean isPaused(){
		return this.getStatus() == BasicPlayer.PAUSED;
		
	}
	
	public boolean isStopped(){
		return this.getStatus() == BasicPlayer.STOPPED;
	}
	
	@Override
	public void opened(Object arg0, Map arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void progress(int bytesread, long microseconds, byte[] pcmdata, Map properties) {
		// TODO Auto-generated method stub
		long valueInSeconds = microseconds/1000000;
		PlayingSong currentSong = playingSongs.findByCurrent(1);
		//String duration = currentSong.getClientSongId();
		Song song = songRepository.findBySongId(currentSong.getClientSongId());
		String duration = song.getDuration();
		
		if(duration != null){
			long dur = Long.valueOf(duration.substring(0,duration.indexOf(".")));
			double percent = ((double)valueInSeconds/dur) * 100;
			ProgressEvent ee = new ProgressEvent();
			ee.setPercentage(percent);
			eventService.sendProgressUpdate(ee);
			//System.out.println(">>>>>>>>>>>>>>>>>Progresss>>>>>>>>>>>>>>>>>>>>>> : "+percent);
		}
		
		
		
	}

	@Override
	public void setController(BasicController arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void stateUpdated(BasicPlayerEvent event) {
		if(event.getCode() == 3){
		
			//song complete
			PlayingSong currentSong = playingSongs.findByCurrent(1);
			PlayingSong nextSong = playingSongs.findByIndexInList(currentSong.getIndexInList()+1);
			if(nextSong != null){
				try{
					this.open(new File(nextSong.getFilePath()));
					this.play();
					//update playlist
					currentSong.setCurrent(0);
					nextSong.setCurrent(1);
					playingSongs.save(currentSong);
					playingSongs.save(nextSong);
				}catch(BasicPlayerException e){
					e.printStackTrace();
				}
				
			}
			
		}else if(event.getCode() == 2){
			
			//played
			//song complete
			PlayingSong currentSong = playingSongs.findByCurrent(1);
			SongEvent ee = new SongEvent();
			ee.setSongId(currentSong.getClientSongId());
			ee.setIsPlaying(1);
			eventService.sendPlayPing(ee);
			
		}else if(event.getCode() == 4){
			//paused
			PlayingSong currentSong = playingSongs.findByCurrent(1);
			SongEvent ee = new SongEvent();
			ee.setSongId(currentSong.getClientSongId());
			ee.setIsPlaying(1);
			eventService.sendPlayPing(ee);
		}
	}

}
