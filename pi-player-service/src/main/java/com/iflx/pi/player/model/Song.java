package com.iflx.pi.player.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Song implements Serializable {
	
	protected Song(){}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String name;
	private int status;
	private int priority;
	private String filePath;
	private String imagePath;
	private double fileSize;
	private String username;
	private String playListName;
	private String album;
	private String artist;
	private String year;
	private String genre;
	private double duration;
	
	public Song(String name,String filePath, String username, String playListName ){
		this.name=name;
		this.filePath = filePath;
		this.username = username;
		this.playListName = playListName;
	    this.status = 0;
	    this.priority = 1;
	    this.imagePath = null;
	    this.fileSize = 0; 
	}
	
	public Song(String name,String filePath, String username, String playListName,String album,String artist,String year,String genre, double duration ){
		this.name=name;
		this.filePath = filePath;
		this.username = username;
		this.playListName = playListName;
	    this.status = 0;
	    this.priority = 1;
	    this.imagePath = null;
	    this.fileSize = 0; 
	    this.artist = artist;
	    this.album = album;
	    this.year = year;
	    this.genre = genre;
	    this.duration = duration;
	}
	
	
	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public double getDuration() {
		return duration;
	}



	public void setDuration(double duration) {
		this.duration = duration;
	}


	public String getPlayListName() {
		return playListName;
	}

	public void setPlayListName(String playListName) {
		this.playListName = playListName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public double getFileSize() {
		return fileSize;
	}

	public void setFileSize(double fileSize) {
		this.fileSize = fileSize;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}


	@Override
	public String toString() {
		return "Song [id=" + id + ", name=" + name + ", status=" + status
				+ ", priority=" + priority + ", filePath=" + filePath
				+ ", imagePath=" + imagePath + ", fileSize=" + fileSize
				+ ", username=" + username + ", playListName=" + playListName
				+ "]";
	}

	
	
	
	
}
