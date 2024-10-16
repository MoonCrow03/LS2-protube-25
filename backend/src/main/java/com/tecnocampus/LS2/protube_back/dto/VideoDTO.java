package com.tecnocampus.LS2.protube_back.dto;

import com.tecnocampus.LS2.protube_back.domain.Comment;
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
public class VideoDTO {
    private Long id;
    private String title;
    private String description;
    private String url;
    private Long duration;
    private List<Comment> commentList;
    private User user;

    public VideoDTO(Video video) {
        this.id = video.getId();
        this.title = video.getTitle();
        this.description = video.getDescription();
        this.url = video.getUrl();
        this.duration = video.getDuration();
        this.user = video.getUser();

        this.commentList = video.getCommentList();
    }
}
