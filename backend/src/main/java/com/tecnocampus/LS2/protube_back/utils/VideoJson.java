package com.tecnocampus.LS2.protube_back.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true) // Ignorar campos que no necesitas
@Getter
public class VideoJson {
    private String title;
    private String user;
    private Long duration;
    private int width;
    private int height;
    private Meta meta;

    @Builder
    public VideoJson(String title, String user, Long duration, int width, int height, Meta meta) {
        this.title = title;
        this.user = user;
        this.duration = duration;
        this.width = width;
        this.height = height;
        this.meta = meta;
    }

    @Getter
    public static class Meta {
        private String description;
        private List<F_Comment> comments;

        @Builder
        public Meta(String description) {
            this.description = description;
            this.comments = new LinkedList<F_Comment>();
        }
    }

    @Getter
    public static class F_Comment {
        private String user;
        private String text;
    }
}

