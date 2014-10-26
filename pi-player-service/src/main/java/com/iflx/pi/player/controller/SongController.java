package com.iflx.pi.player.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.repository.SongRepository;


@RequestMapping("/songs")
@RestController
public class SongController {
	
	@Autowired
	SongRepository songRepository;
	
	@RequestMapping("/index")
	public Iterable<Song> index(){
		//capture details of user making request
		//save details if user doesn't currently exist
		//fetch all songs in play list
		//return user id along side list of songs
		Iterable<Song> songs = songRepository.findAll();
		return songs;
	}
	
	
	@RequestMapping("/upload")
	public void upload(){
		//upload song
		//notify scheduler that song has been uploaded successfully
		
	}
	

}
