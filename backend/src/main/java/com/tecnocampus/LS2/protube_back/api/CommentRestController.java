package com.tecnocampus.LS2.protube_back.api;

import com.tecnocampus.LS2.protube_back.dto.CommentDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputCommentRecord;
import com.tecnocampus.LS2.protube_back.dto.record.UpdateCommentRecord;
import com.tecnocampus.LS2.protube_back.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentRestController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentDTO createComment(@Valid @RequestBody InputCommentRecord inputComment) {
        return commentService.createComment(inputComment);
    }

    @PatchMapping("/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public CommentDTO updateComment(@PathVariable Long commentId, @Valid @RequestBody UpdateCommentRecord updateComment) {
        return commentService.updateComment(commentId, updateComment);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public CommentDTO getComment(@PathVariable Long commentId) {
        return commentService.getComment(commentId);
    }
}
