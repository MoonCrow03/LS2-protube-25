package com.tecnocampus.LS2.protube_back;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputCommentRecord;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.services.CommentService;
import com.tecnocampus.LS2.protube_back.services.UserService;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import com.tecnocampus.LS2.protube_back.utils.VideoJson;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Component
public class AppStartupRunner implements ApplicationRunner {
    private static final Logger LOG = LoggerFactory.getLogger(AppStartupRunner.class);

    private final Environment env;
    private final Path rootPath;
    private final Boolean loadInitialData;
    private final VideoService videoService;
    private final UserService userService;
    private final CommentService commentService;
    private final ObjectMapper objMapper;
    private final UserRepository userRepository;

    public AppStartupRunner(Environment env, ObjectMapper objectMapper, VideoService videoService, UserService userService, CommentService commentService, UserRepository userRepository) {
        this.env = env;
        final var rootDir = env.getProperty("pro_tube.store.dir");
        this.rootPath = Paths.get(rootDir);
        this.loadInitialData = env.getProperty("pro_tube.load_initial_data", Boolean.class);
        this.objMapper = objectMapper;
        this.videoService = videoService;
        this.userService = userService;
        this.commentService = commentService;
        this.userRepository = userRepository;
    }

    @PostConstruct
    @Transactional
    public void init() {
        addDefaultUsers();
        loadVideos(rootPath.toString());
    }

    @Transactional
    public void loadVideos(String path) {
        File directory = new File(path);

        if (directory.exists() && directory.isDirectory()) {
            String[] files = directory.list((dir, name) -> name.endsWith(".json"));

            if (files != null) {
                List<String> videoFiles = Arrays.asList(files);

                videoFiles.sort((file1, file2) -> {
                    Integer num1 = extractNumber(file1);
                    Integer num2 = extractNumber(file2);
                    return num1.compareTo(num2);
                });

                videoFiles.forEach(this::addVideoIfNotExists);
            }
        }
    }

    private Integer extractNumber(String fileName) {
        String number = fileName.replaceAll("\\D+", ""); // Remove non-numeric characters
        return number.isEmpty() ? 0 : Integer.parseInt(number); // Default to 0 if no number is found
    }

    @Transactional
    public void addVideoIfNotExists(String videoFile) {
        File file = new File(rootPath.toString(), videoFile);
        VideoJson videoJson;

        try {
            videoJson = objMapper.readValue(file, VideoJson.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        addIfUnexistentUser(videoJson.getUser());
        InputVideoRecord inputVidRecord = new InputVideoRecord(
                videoJson.getTitle(),
                videoJson.getMeta().getDescription(),
                videoJson.getDuration(),
                videoJson.getUser()
        );

        VideoDTO videoDTO = videoService.createVideo(inputVidRecord);

        for (VideoJson.F_Comment comment : videoJson.getMeta().getComments()) {
            addIfUnexistentUser(comment.getAuthor());
            InputCommentRecord inputCommentRecord = new InputCommentRecord(
                    comment.getAuthor(),
                    videoDTO.getId(),
                    comment.getText()
            );

            commentService.createComment(inputCommentRecord);
        }
    }

    @Transactional
    public void addDefaultUsers() {
        InputUserRecord inputUser = new InputUserRecord("protube-admin", "12345@gmail.com","a","a");
        userService.createUser(inputUser);
    }


    public void addIfUnexistentUser(String username){
       if(!userService.userExist(username)){
           String emailUser = username.replaceAll("\\s+", "").toLowerCase() + "@gmail.com";
           userService.createUser(new InputUserRecord(username, emailUser,"http://localhost:8080/assets/default_pic.png","1"));
       }
    }

    @Override
    public void run(ApplicationArguments args) {
        // Should your backend perform any task during the bootstrap, do it here
    }
}