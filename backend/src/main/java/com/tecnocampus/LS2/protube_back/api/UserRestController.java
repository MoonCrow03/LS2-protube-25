package com.tecnocampus.LS2.protube_back.api;

import com.tecnocampus.LS2.protube_back.dto.BasicVideoDTO;
import com.tecnocampus.LS2.protube_back.dto.CommentDTO;
import com.tecnocampus.LS2.protube_back.dto.UserDTO;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.services.CommentService;
import com.tecnocampus.LS2.protube_back.services.UserService;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private VideoService videoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@Valid @RequestBody InputUserRecord inputUser){
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

    //COMMENTS
    @GetMapping("/{username}/comments")
    @ResponseStatus(HttpStatus.FOUND)
    public List<CommentDTO> getUserComments(@PathVariable String username){
        return commentService.getCommentsFromUser(username);
    }

    @GetMapping("/{username}/videos")
    @ResponseStatus(HttpStatus.FOUND)
    public List<BasicVideoDTO> getUserVideos(@PathVariable String username){
        return videoService.getVideoByUser(username);
    }
}
