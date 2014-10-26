package com.iflx.pi.player.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.model.User;

public interface SongRepository extends CrudRepository<Song, Long>{
	Song findByName(String name);
	List<Song> findByUsername(String username);
	List<Song> findByPlayListName(String playListName);
}
