package com.iflx.pi.player.repository;

import org.springframework.data.repository.CrudRepository;

import com.iflx.pi.player.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);
}
