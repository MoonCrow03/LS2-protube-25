package com.tecnocampus.LS2.protube_back.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

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

    @Getter
    public static class Meta {
        private String description;
        private List<F_Comment> comments;
    }

    @Getter
    public static class F_Comment {
        private String user;
        private String text;
    }
}

