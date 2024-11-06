package com.tecnocampus.LS2.protube_back.api;

import com.tecnocampus.LS2.protube_back.dto.BasicVideoDTO;
import com.tecnocampus.LS2.protube_back.dto.CommentDTO;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.services.CommentService;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoRestController {

    @Autowired
    private VideoService videoServices;

    @Autowired
    private CommentService commentService;

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
    @GetMapping("/comments/{videoId}")
    @ResponseStatus(HttpStatus.FOUND)
    public List<CommentDTO> getVideoComments(@PathVariable Long videoId) {
        return commentService.getCommentsFromVideo(videoId);
    }

}
