package com.tecnocampus.LS2.protube_back.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String username){super("User with username: " + username + " not found");}
}
