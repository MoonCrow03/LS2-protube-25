package com.tecnocampus.LS2.protube_back.dto;

import com.tecnocampus.LS2.protube_back.domain.Video;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BasicVideoDTO {
    private Long id;
    private String title;
    private String user;
    private String description;
    private String videoUrl;
    private String thumbnailUrl;
    private Long duration;

    public BasicVideoDTO(Video video) {
        this.id = video.getId();
        this.title = video.getTitle();
        this.user = video.getUser().getUsername();
        this.description = video.getDescription();
        this.videoUrl = video.getVideoUrl();
        this.thumbnailUrl = video.getThumbnailUrl();
        this.duration = video.getDuration();
    }
}
