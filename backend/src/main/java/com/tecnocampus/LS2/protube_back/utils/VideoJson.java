package com.tecnocampus.LS2.protube_back.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;


@Getter
@NoArgsConstructor // Required for Jackson deserialization
@AllArgsConstructor // Optional: If you want a constructor with arguments
@JsonIgnoreProperties(ignoreUnknown = true)
public class VideoJson {
    private String title;
    private String user;
    private Long duration;
    private int width;
    private int height;
    private Meta meta;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meta {
        private String description;
        private List<F_Comment> comments;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class F_Comment {
        private String user;
        private String text;
    }
}


