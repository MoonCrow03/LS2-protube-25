package com.tecnocampus.LS2.protube_back.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String url;
    private Long duration;

    @OneToMany
    private List<Comment> commentList;

    public Video(String title, String description, String url, Long duration, List<Comment> commentList) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.duration = duration;
        this.commentList = new ArrayList<>();
    }


}
