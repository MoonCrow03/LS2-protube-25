package com.tecnocampus.LS2.protube_back.exceptions;

public class VideoBadPostRequest extends RuntimeException{
    public VideoBadPostRequest(String username) {super("User: " + username + " does not exist");}
}
