package com.tecnocampus.LS2.protube_back.services;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.dto.UserDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.exceptions.UserNotFoundException;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserDTO createUser(InputUserRecord inputUser){
        User user = new User(inputUser);
        userRepository.save(user);
        return new UserDTO(user);
    }

    public UserDTO getUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return new UserDTO(user);
    }

    public void deleteUser(String username){
        userRepository.deleteByUsername(username);
    }
}
