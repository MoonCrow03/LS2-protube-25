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
//    private Meta meta;
//
//    public static class Meta {
//        private String description;
//        private List<String> categories;
//        private List<String> tags;
//        private List<CommentJson> comments;
//    }
//
//    public static class CommentJson{
//        private String text;
//        private String author;
//    }
}

