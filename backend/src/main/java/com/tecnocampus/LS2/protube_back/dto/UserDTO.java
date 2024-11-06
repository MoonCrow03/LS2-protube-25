package com.tecnocampus.LS2.protube_back.dto;

import com.tecnocampus.LS2.protube_back.domain.Comment;
import com.tecnocampus.LS2.protube_back.domain.Like;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    private List<VideoDTO> uploadedVideos = new ArrayList<>();
    private List<LikeDTO> likedVideos = new ArrayList<>();
    private String password;

    public UserDTO(User user){
        this.username = user.getUsername();
        this.uploadedVideos = user.getUploadedVideos().stream().map(VideoDTO::new).toList();
        this.likedVideos = user.getLikedVideos().stream().map(LikeDTO::new).toList();
        this.password = user.getPassword();
    }

    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
