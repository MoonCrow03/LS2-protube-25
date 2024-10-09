package com.tecnocampus.LS2.protube_back.services;

import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoServices {

    // Lee el directorio donde están almacenados los videos desde el application.properties

    @Autowired
    private Environment env;

    // Este método recupera los nombres de los archivos de video en la carpeta
   // public List<String> getVideos() {
    //    String videoDirectory = env.getProperty("pro_tube.store.dir");

      //  File directory = new File(videoDirectory);
        //String[] files = directory.list((dir, name) -> name.endsWith(".mp4")); // Cambia la extensión si es necesario
       // return files != null ? Arrays.asList(files) : List.of();
    //}

}
