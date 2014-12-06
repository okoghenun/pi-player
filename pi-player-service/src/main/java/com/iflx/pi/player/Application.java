package com.iflx.pi.player;

import java.util.List;

import javax.servlet.MultipartConfigElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
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

	@Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
       // factory.
        //factory.setMaxFileSize("128KB");
        //factory.setMaxRequestSize("128KB");
        return factory.createMultipartConfig();
    }
	
	
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		
		
    	PlayListRepository playListRepository = context.getBean(PlayListRepository.class);
    	SongRepository songRepository = context.getBean(SongRepository.class);
    	UserRepository userRepository = context.getBean(UserRepository.class);
    	
    	
    	userRepository.save(new User("admin","password","admin"));
    	userRepository.save(new User("user-1","password","user"));
    	
    	playListRepository.save(new PlayList("CCHUB-SAT-JAM","CCHUB Saturday Jam","admin"));
    	
    	System.out.println(">>>>>>>>>>>>SYSTEM INITIALIZED>>>>>>>");
       
    	
    }
}
