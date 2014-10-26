package com.iflx.pi.player.repository;

import org.springframework.data.repository.CrudRepository;

import com.iflx.pi.player.model.PlayList;
import com.iflx.pi.player.model.PlayingSong;

public interface PlayingSongsRepository extends CrudRepository<PlayingSong, Long>{
	PlayingSong findByCurrent(int current);

}
