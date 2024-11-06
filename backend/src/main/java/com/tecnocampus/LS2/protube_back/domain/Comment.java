package com.tecnocampus.LS2.protube_back.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
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
    @NotNull(message = "Content cannot be null")
    @NotEmpty(message = "Content cannot be empty")
    @Size(max = 10000, message = "Content cannot exceed 10000 characters")
    private String content;

    @PastOrPresent(message = "Timestamp must be in the past or present")
    private LocalDateTime timestamp;

    public Comment(User user, Video video, String content){
        this.content = content;
        this.user = user;
        this.video = video;
        timestamp = LocalDateTime.now();
    }

}
