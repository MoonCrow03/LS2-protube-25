package com.tecnocampus.LS2.protube_back.services;

import com.tecnocampus.LS2.protube_back.domain.Comment;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.dto.CommentDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputCommentRecord;
import com.tecnocampus.LS2.protube_back.dto.record.UpdateCommentRecord;
import com.tecnocampus.LS2.protube_back.persistence.CommentRepository;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoRepository videoRepository;

    @Transactional
    public CommentDTO createComment(InputCommentRecord inputComment){
        User user = userRepository.findByUsername(inputComment.username()).orElseThrow();
        Video video = videoRepository.findById(inputComment.videoId()).orElseThrow();
        Comment comment = new Comment(user, video, inputComment.content());
        video.addComment(comment);
        commentRepository.save(comment);
        videoRepository.save(video);
        return new CommentDTO(comment);
    }

    @Transactional
    public CommentDTO updateComment(Long commentId, UpdateCommentRecord updateComment){
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        comment.setContent(updateComment.newContent());
        commentRepository.save(comment);
        return new CommentDTO(comment);
    }

    public void deleteComment(Long commentId){
        commentRepository.deleteById(commentId);
    }

    public CommentDTO getComment(Long commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        return new CommentDTO(comment);
    }

    public List<CommentDTO> getCommentsFromUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow();
        List<Comment> comments = commentRepository.findByUser(user);
        return convertToDTO(comments);
    }

    public List<CommentDTO> getCommentsFromVideo(Long videoId){
        Video video = videoRepository.findById(videoId).orElseThrow();
        List<Comment> comments = commentRepository.findByVideo(video);
        return convertToDTO(comments);
    }

    private List<CommentDTO> convertToDTO(List<Comment> comments){
        List<CommentDTO> commentsToReturn = new LinkedList<>();
        for(Comment comment : comments){
            commentsToReturn.add(new CommentDTO(comment));
        }
        return commentsToReturn;
    }
}
