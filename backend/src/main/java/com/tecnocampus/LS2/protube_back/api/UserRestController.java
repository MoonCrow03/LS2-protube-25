package com.tecnocampus.LS2.protube_back.api;

import com.tecnocampus.LS2.protube_back.dto.UserDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody InputUserRecord inputUser){
        return userService.createUser(inputUser);
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.FOUND)
    public UserDTO getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    @DeleteMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String username){
        userService.deleteUser(username);
    }
}
