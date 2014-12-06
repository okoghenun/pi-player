package com.iflx.pi.player.model;

public class PlayListState {
	private Iterable<Song> songs;
	private String currentSongID;
	private int isPlaying;
	
	public Iterable<Song> getSongs() {
		return songs;
	}
	public void setSongs(Iterable<Song> songs) {
		this.songs = songs;
	}
	public String getCurrentSongID() {
		return currentSongID;
	}
	public void setCurrentSongID(String currentSongId) {
		this.currentSongID = currentSongId;
	}
	public int getIsPlaying() {
		return isPlaying;
	}
	public void setIsPlaying(int playing) {
		this.isPlaying = playing;
	}
	
	

}
