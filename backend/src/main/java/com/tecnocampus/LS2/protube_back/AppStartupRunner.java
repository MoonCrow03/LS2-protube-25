package com.tecnocampus.LS2.protube_back;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class AppStartupRunner implements ApplicationRunner {
    private static final Logger LOG =
            LoggerFactory.getLogger(AppStartupRunner.class);

    // Example variables from our implementation. 
    // Feel free to adapt them to your needs
    private final Environment env;
    private final Path rootPath;
    private final Boolean loadInitialData;
    private UserRepository userRepository;
    private VideoRepository videoRepository;
    private ObjectMapper objMapper;


    public AppStartupRunner(Environment env) {
        this.env = env;
        final var rootDir = env.getProperty("pro_tube.store.dir");
        this.rootPath = Paths.get(rootDir);
        loadInitialData = env.getProperty("pro_tube.load_initial_data", Boolean.class);


        loadVideos(rootDir);
    }

    private void loadVideos(String path){
        File directory = new File(path);

        if (directory.exists() && directory.isDirectory()) {
            // List JSON files in the directory
            String[] files = directory.list((dir, name) -> name.endsWith(".json"));

            if (files != null) {
                List<String> videoFiles = Arrays.asList(files);

                // Add to database if videos are not already there
                videoFiles.forEach(this::addVideoIfNotExists);
            }
        }
    }

    private void addVideoIfNotExists(String videoFile) throws JsonProcessingException {
        String videoTitle = videoFile.replace(".json", "");

        Optional<Video> video = videoRepository.findById(videoTitle);
        if(video.isEmpty()){
            Map<String, Object> videoData = objMapper.readValue(videoFile, Map.class);

            User user = addUserIfNotExist(videoData);
            String title = videoData.get("title").toString();

            Map<String, Object> meta = (Map<String, Object>) videoData.get("meta");
            String desctription = meta.get("description").ToString();


            Video Video = new Video();
        }

    }

    private User addUserIfNotExist(Map<String, Object> data) {



        User user = new User();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Should your backend perform any task during the bootstrap, do it here
    }
}