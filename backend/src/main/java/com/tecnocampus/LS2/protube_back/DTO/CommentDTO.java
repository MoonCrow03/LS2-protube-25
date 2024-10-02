package com.tecnocampus.LS2.protube_back.DTO;

import com.tecnocampus.LS2.protube_back.domain.Comment;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class CommentDTO {
    private Long id;
    private User user;
    private Video video;
    private String content;
    private LocalDateTime timestamp;

    public CommentDTO(Comment comment){
        this.id = comment.getId();
        this.user = comment.getUser();
        this.video = comment.getVideo();
        this.content = comment.getContent();
        this.timestamp = comment.getTimestamp();
    }

}
