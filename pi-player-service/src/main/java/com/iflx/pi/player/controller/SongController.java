package com.iflx.pi.player.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iflx.pi.player.model.PlayListState;
import com.iflx.pi.player.model.PlayingSong;
import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.repository.PlayingSongsRepository;
import com.iflx.pi.player.repository.SongRepository;
import com.iflx.pi.player.util.PiPlayer;

@RequestMapping("/songs")
@RestController
public class SongController {

	@Autowired
	PiPlayer player;
	@Autowired
	SongRepository songRepository;
	@Autowired
	PlayingSongsRepository playingSongs;

	@RequestMapping("/index")
	public PlayListState index() {
		// capture details of user making request
		// save details if user doesn't currently exist
		// fetch all songs in play list
		// return user id along side list of songs
		Iterable<Song> songs = songRepository.findAll();
		PlayingSong currentSong = playingSongs.findByCurrent(1);
		PlayListState currentState = new PlayListState();
		currentState.setSongs(songs);
		if (currentSong != null) {
			currentState.setCurrentSongId(currentSong.getClientSongId());
		}
		if (player.isPlaying()) {
			currentState.setIsPlaying(1);
		} else {
			currentState.setIsPlaying(0);
		}

		return currentState;
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public @ResponseBody String handleFileUpload(
			@RequestParam("song-id") String songId,
			@RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();

				String fileName = file.getOriginalFilename();
				fileName = new Date().getTime() + fileName.replace(" ", "-");

				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(new File(fileName)));
				stream.write(bytes);
				stream.close();
				Song song = songRepository.findBySongId(songId);
				song.setFilePath(fileName);
				songRepository.save(song);
				// check if current song can be added to play list
				long playListLength = playingSongs.count();
				if (playListLength == 0) {
					// add song to play list and play
					playingSongs.save(new PlayingSong(song.getId(), song
							.getFilePath(), (int) playListLength + 1, 1, song
							.getSongId()));
					player.open(new File(fileName));
					player.play();
				} else if (playListLength < 5) {
					// simply add to play list
					playingSongs.save(new PlayingSong(song.getId(), song
							.getFilePath(), (int) playListLength + 1, 0, song
							.getSongId()));
				}
				return "You successfully uploaded " + songId + " into "
						+ songId + "-uploaded !";
			} catch (Exception e) {
				return "You failed to upload " + songId + " => "
						+ e.getMessage();
			}
		} else {
			return "You failed to upload " + songId
					+ " because the file was empty.";
		}
	}

}
