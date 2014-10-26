package com.iflx.pi.player.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PlayingSong {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private long songId;
	private String clientSongId;
	private String filePath;
	private int indexInList;
	private int current;
	
	
	protected PlayingSong(){}
	
	
	public PlayingSong(long songId, String filePath,int indexInList,int current, String clientSongId){
		this.songId = songId;
		this.filePath = filePath;
		this.indexInList = indexInList;
		this.current = current;
		this.clientSongId = clientSongId;
				
	}
	
	public String getClientSongId() {
		return clientSongId;
	}


	public void setClientSongId(String clientSongId) {
		this.clientSongId = clientSongId;
	}


	public int getCurrent() {
		return current;
	}
	public void setCurrent(int current) {
		this.current = current;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getSongId() {
		return songId;
	}
	public void setSongId(long songId) {
		this.songId = songId;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public int getIndexInList() {
		return indexInList;
	}
	public void setIndexInList(int indexInList) {
		this.indexInList = indexInList;
	}
	
	
	

}
