package com.tecnocampus.LS2.protube_back.exceptions;

public class VideoNotFoundException extends RuntimeException{
    public VideoNotFoundException(String videoTitle){super("Video with title: " + videoTitle + " not found");}

    public VideoNotFoundException(Long videoId){super("Video with id: " + videoId + " not found");}
}
