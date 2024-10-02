package com.tecnocampus.LS2.protube_back.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    //MES ATRIBUTS DE USER

    @OneToMany
    private List<Video> uploadedVideos = new ArrayList<Video>();

    @OneToMany
    private List<Like> likedVideos;



    public User(String name){
        this.name = name;
    }








}
