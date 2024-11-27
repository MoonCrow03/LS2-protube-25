package com.tecnocampus.LS2.protube_back.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.AppStartupRunner;
import com.tecnocampus.LS2.protube_back.dto.BasicVideoDTO;
import com.tecnocampus.LS2.protube_back.dto.CommentDTO;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputCommentRecord;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.services.CommentService;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import com.tecnocampus.LS2.protube_back.utils.VideoJson;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoRestController {

    @Autowired
    private VideoService videoServices;

    @Autowired
    private CommentService commentService;

    private final String videoDirectory;

    @Autowired
    public VideoRestController(Environment env) {
        this.videoDirectory = env.getProperty("pro_tube.store.dir");
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("thumbnail") MultipartFile thumbnailFile,
            @RequestParam("user") String username,
            @RequestParam("duration") Long duration) {
        try {
            // Save the video file

            String videoName = videoServices.GetNextID()+"";

            Path videoPath = Paths.get(videoDirectory, videoName+".mp4");
            Files.copy(videoFile.getInputStream(), videoPath, StandardCopyOption.REPLACE_EXISTING);

            // Save the thumbnail file
            Path thumbnailPath = Paths.get(videoDirectory, videoName+".webp");
            Files.copy(thumbnailFile.getInputStream(), thumbnailPath, StandardCopyOption.REPLACE_EXISTING);

            // Store metadata (title, description, userId, etc.) in a database

            VideoJson videoJson = new VideoJson(title,username,duration,1920,1080, new VideoJson.Meta(description, new LinkedList<>()));

            Path jsonPath = Paths.get(videoDirectory, videoName);
            saveVideoJson(videoJson,jsonPath);

            addVideoIfNotExists(videoName+".json",username);

            return ResponseEntity.ok("Video uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload video.");
        }
    }

    private void saveVideoJson(VideoJson videoJson, Path videoPath) throws IOException {
        // Get the JSON file path (same name as video, but with .json extension)
        String jsonFileName = videoPath.getFileName().toString() + ".json";
        Path jsonFilePath = videoPath.getParent().resolve(jsonFileName);

        // Serialize the VideoJson object to the JSON file
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFilePath.toFile(), videoJson);

        System.out.println("Metadata saved to JSON file: " + jsonFilePath);
    }

        public void addVideoIfNotExists(String videoFile, String username) {
            File file = new File(Paths.get(videoDirectory).toString(), videoFile);
            VideoJson videoJson;

            ObjectMapper objMapper = new ObjectMapper();

            try {
                videoJson = objMapper.readValue(file, VideoJson.class);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            InputVideoRecord inputVidRecord = new InputVideoRecord(
                    videoJson.getTitle(),
                    videoJson.getMeta().getDescription(),
                    videoJson.getDuration(),
                    username
            );

            VideoDTO videoDTO = videoServices.createVideo(inputVidRecord);



        }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VideoDTO createVideo(@Valid @RequestBody InputVideoRecord video) {
        return videoServices.createVideo(video);
    }

    @GetMapping("/title/{videoTitle}")
    @ResponseStatus(HttpStatus.FOUND)
    public VideoDTO getVideo(@PathVariable String videoTitle) {
        return videoServices.getVideo(videoTitle);
    }

    @GetMapping("/search/{input}")
    @ResponseStatus(HttpStatus.FOUND)
    public List<BasicVideoDTO> getVideoListByString(@PathVariable String input) {
        return videoServices.getVideoListByString(input);
    }

    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.FOUND)
    public BasicVideoDTO getVideo(@PathVariable Long videoId) {
        return videoServices.getVideoById(videoId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteVideo(@PathVariable Long id) {
        videoServices.deleteVideo(id);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.FOUND)
    public List<BasicVideoDTO> getVideoList() {
        return videoServices.getAllVideos();
    }

    //COMMENTS
    @PostMapping("/{videoId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentDTO createComment(@Valid @RequestBody InputCommentRecord inputComment) {
        return commentService.createComment(inputComment);
    }

    @GetMapping("/{videoId}/comments")
    @ResponseStatus(HttpStatus.FOUND)
    public List<CommentDTO> getVideoComments(@PathVariable Long videoId) {
        return commentService.getCommentsFromVideo(videoId);
    }

}
