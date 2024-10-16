package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;


@Entity
@Table(name = "pt_video")
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

    public Video(InputVideoRecord inputVideoRecord) {
        this.title = inputVideoRecord.title();
        this.description = inputVideoRecord.description();
        this.duration = inputVideoRecord.duration();
        AddUrl();
    }

    public Video(String title, String description, Long duration){
        this.title = title;
        this.description = description;
        this.duration = duration;
        //this.user = user;
        //this.commentList = comments;
        AddUrl();
    }

    private void AddUrl(){
        url = "http://localhost:8080/media/" + title + ".mp4";
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
