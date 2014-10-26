package com.iflx.pi.player.repository;

import org.springframework.data.repository.CrudRepository;

import com.iflx.pi.player.model.PlayList;
import com.iflx.pi.player.model.Song;

public interface PlayListRepository extends CrudRepository<PlayList, Long> {
	PlayList findByUsername(String username);

}
