package com.tecnocampus.LS2.protube_back;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.services.UserService;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import com.tecnocampus.LS2.protube_back.utils.VideoJson;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
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
    private final ObjectMapper objMapper;

    public AppStartupRunner(Environment env, ObjectMapper objectMapper, VideoService videoService, UserService userService) {
        this.env = env;
        final var rootDir = env.getProperty("pro_tube.store.dir");
        this.rootPath = Paths.get(rootDir);
        this.loadInitialData = env.getProperty("pro_tube.load_initial_data", Boolean.class);
        this.objMapper = objectMapper;
        this.videoService = videoService;
        this.userService = userService;
    }

    @PostConstruct
    @Transactional
    public void init() {
        addDefaultUser();
        loadVideos(rootPath.toString());
    }

    @Transactional
    public void loadVideos(String path) {
        File directory = new File(path);

        if (directory.exists() && directory.isDirectory()) {
            String[] files = directory.list((dir, name) -> name.endsWith(".json"));

            if (files != null) {
                List<String> videoFiles = Arrays.asList(files);
                videoFiles.forEach(this::addVideoIfNotExists);
            }
        }
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

        InputVideoRecord inputVidRecord = new InputVideoRecord(
                videoJson.getTitle(),
                videoJson.getMeta().getDescription(),
                videoJson.getDuration(),
                "protube-admin"
        );

        videoService.createVideo(inputVidRecord);
    }

    @Transactional
    public void addDefaultUser() {
        InputUserRecord inputUser = new InputUserRecord("protube-admin", "12345");
        userService.createUser(inputUser);
    }

    @Override
    public void run(ApplicationArguments args) {
        // Should your backend perform any task during the bootstrap, do it here
    }
}