package com.tecnocampus.LS2.protube_back.services;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.dto.UserDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.exceptions.UserNotFoundException;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Transactional
    public UserDTO createUser(InputUserRecord inputUser){
        User user = new User(inputUser);
        userRepository.save(user);
        return new UserDTO(user);
    }

    public UserDTO getUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return new UserDTO(user);
    }

    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }
    // Method to save or update user data in the local database
    public User saveOrUpdateUser(String auth0Id, String email, String name) {
        // Check if the user already exists by Auth0 ID
        User user = userRepository.findByAuth0Id(auth0Id);

        if (user == null) {
            // If the user doesn't exist, create a new one
            user = new User();
            user.setAuth0Id(auth0Id);
            user.setEmail(email);
            user.setUsername(name);
            userRepository.save(user);  // Save new user to the database
        } else {
            // If the user exists, update their information (optional)
            user.setEmail(email);
            user.setUsername(name);
            userRepository.save(user);  // Save updated user to the database
        }

        return user;
    }
}
