package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "Title cannot be null")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @Column(length = 10000)
    @Size(max = 10000, message = "Description cannot exceed 10000 characters")
    private String description;

    private String videoUrl;
    private String thumbnailUrl;

    @NotNull(message = "Duration cannot be null")
    @Min(value = 1, message = "Duration must be greater than 0")
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
        AddUrls();
    }

    public Video(String title, String description, Long duration, User user) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.user = user;

        this.commentList = new ArrayList<>();
        AddUrls();
    }

    @PostPersist
    private void AddUrls() {
        if (id != null && id > 0) {
            videoUrl = "http://localhost:8080/media/" + (id - 1) + ".mp4";
            thumbnailUrl = "http://localhost:8080/media/" + (id - 1) + ".webp";
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
