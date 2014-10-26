package com.iflx.pi.player.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PlayList implements Serializable{
	
	protected PlayList(){}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String name;
	private String prettyName;
	private String username;
	
	
	public PlayList(String name,String prettyName, String username){
		this.name = name;
		this.username = username;
		this.prettyName = prettyName;
	}
	
	
	public String getPrettyName() {
		return prettyName;
	}


	public void setPrettyName(String prettyName) {
		this.prettyName = prettyName;
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}


	@Override
	public String toString() {
		return "PlayList [id=" + id + ", name=" + name + ", prettyName="
				+ prettyName + ", username=" + username + "]";
	}
	
	
	

}
