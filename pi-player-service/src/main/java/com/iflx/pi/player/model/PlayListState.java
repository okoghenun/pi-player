package com.iflx.pi.player.model;

public class PlayListState {
	private Iterable<Song> songs;
	private String currentSongId;
	private int isPlaying;
	
	public Iterable<Song> getSongs() {
		return songs;
	}
	public void setSongs(Iterable<Song> songs) {
		this.songs = songs;
	}
	public String getCurrentSongId() {
		return currentSongId;
	}
	public void setCurrentSongId(String currentSongId) {
		this.currentSongId = currentSongId;
	}
	public int getIsPlaying() {
		return isPlaying;
	}
	public void setIsPlaying(int playing) {
		this.isPlaying = playing;
	}
	
	

}
