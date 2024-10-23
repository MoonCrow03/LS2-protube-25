package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.processing.Pattern;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "PROTUBE_USERS")
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    private String username;
    private String password;

    @OneToMany
    private List<Video> uploadedVideos;

    @OneToMany
    private List<Like> likedVideos;

    public User(InputUserRecord inputUserRecord) {
        this.username = inputUserRecord.username();
        this.password = inputUserRecord.password();

        this.uploadedVideos = new ArrayList<>();
        this.likedVideos = new ArrayList<>();
    }

    public User(String username, String password){
        this.username = username;
        this.password = password;

        this.uploadedVideos = new ArrayList<>();
        this.likedVideos = new ArrayList<>();
    }

    public void addVideo(Video video) {
        uploadedVideos.add(video);
    }

    public void addLike(Like like) {
        likedVideos.add(like);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(username);
    }
}
