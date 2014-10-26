package com.iflx.pi.player;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.iflx.pi.player.model.PlayList;
import com.iflx.pi.player.model.Song;
import com.iflx.pi.player.model.User;
import com.iflx.pi.player.repository.PlayListRepository;
import com.iflx.pi.player.repository.SongRepository;
import com.iflx.pi.player.repository.UserRepository;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		
    	PlayListRepository playListRepository = context.getBean(PlayListRepository.class);
    	SongRepository songRepository = context.getBean(SongRepository.class);
    	UserRepository userRepository = context.getBean(UserRepository.class);
    	
    	
    	userRepository.save(new User("admin","password","admin"));
    	userRepository.save(new User("user-1","password","user"));
    	
    	playListRepository.save(new PlayList("CCHUB-SAT-JAM","CCHUB Saturday Jam","admin"));
    	
    	songRepository.save(new Song("Song admin 1","filepath","admin","CCHUB-SAT-JAM"));
    	songRepository.save(new Song("Song admin 2","filepath","admin","CCHUB-SAT-JAM"));
    	songRepository.save(new Song("Song admin 3","filepath","admin","CCHUB-SAT-JAM"));
    	
    	songRepository.save(new Song("Song user 1","filepath","user","CCHUB-SAT-JAM"));
    	songRepository.save(new Song("Song user 1","filepath","user","CCHUB-SAT-JAM"));
    	songRepository.save(new Song("Song user 1","filepath","user","CCHUB-SAT-JAM"));
    	
    	
    	// fetch all customers
        List<Song> songs = songRepository.findByPlayListName("CCHUB-SAT-JAM");
        System.out.println("Songs in CCHUB-SAT-JAM:");
        System.out.println("-------------------------------");
        for (Song song : songs) {
            System.out.println(song);
        }
        
    	
    }
}
