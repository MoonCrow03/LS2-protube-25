package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 50, message = "Username must be between 3 and 20 characters")
    private String username;

    @Email
    private String email;

    private String auth0Id;

    private String picture;

    @OneToMany
    private List<Video> uploadedVideos;

    @OneToMany
    private List<Like> likedVideos;

    public User(InputUserRecord inputUserRecord) {
        this.username = inputUserRecord.username();
        this.email = inputUserRecord.email();
        this.picture = inputUserRecord.picture();
        this.auth0Id = inputUserRecord.auth0Id();

        this.uploadedVideos = new ArrayList<>();
        this.likedVideos = new ArrayList<>();
    }

    public User(String username, String email, String auth0Id, String picture) {
        this.username = username;
        this.email = email;
        this.auth0Id = auth0Id;
        this.picture = picture;


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
