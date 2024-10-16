package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 10000)
    private String description;
    private String url;
    private Long duration;

    @OneToMany
    private List<Comment> commentList;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    public Video(InputVideoRecord inputVideoRecord, User user) {
        this.title = inputVideoRecord.title();
        this.description = inputVideoRecord.description();
        this.duration = inputVideoRecord.duration();
        this.user = user;

        this.commentList = new ArrayList<>();
        AddUrl();
    }

    public Video(String title, String description, Long duration, User user) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.user = user;
        //this.commentList = comments;
        AddUrl();
    }

    @PostPersist
    private void AddUrl() {
        // Ensure id is greater than 0 to avoid negative URLs.
        if (id != null && id > 0) {
            url = "http://localhost:8080/media/" + (id - 1) + ".mp4";
        }
    }

    public void addComment(Comment comment) {
        commentList.add(comment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Video video = (Video) o;
        return Objects.equals(id, video.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
