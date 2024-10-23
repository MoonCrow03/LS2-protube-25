package com.tecnocampus.LS2.protube_back.dto;

import com.tecnocampus.LS2.protube_back.domain.Comment;
import com.tecnocampus.LS2.protube_back.domain.Like;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private String username;
    private List<Video> uploadedVideos = new ArrayList<>();
    private List<Like> likedVideos = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private String password;

    public UserDTO(User user){
        this.username = user.getUsername();
        this.uploadedVideos = user.getUploadedVideos();
        this.likedVideos = user.getLikedVideos();
        this.comments = user.getComments();
        this.password = user.getPassword();
    }

    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
