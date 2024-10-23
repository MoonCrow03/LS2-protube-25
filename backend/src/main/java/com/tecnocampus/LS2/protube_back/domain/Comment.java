package com.tecnocampus.LS2.protube_back.domain;

import jakarta.persistence.*;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Video video;

    @Column(length = 10000)
    private String content;

    private LocalDateTime timestamp;

    public Comment(User user, Video video, String content){
        this.content = content;
        this.user = user;
        this.video = video;
        timestamp = LocalDateTime.now();
    }

}
