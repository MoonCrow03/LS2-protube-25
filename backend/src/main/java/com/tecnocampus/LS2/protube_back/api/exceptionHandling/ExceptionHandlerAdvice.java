package com.tecnocampus.LS2.protube_back.api.exceptionHandling;

import com.tecnocampus.LS2.protube_back.exceptions.UserNotFoundException;
import com.tecnocampus.LS2.protube_back.exceptions.VideoBadPostRequest;
import com.tecnocampus.LS2.protube_back.exceptions.VideoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
    String userNotFoundHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(VideoNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Video not found")
    String videoNotFoundHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(VideoBadPostRequest.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "User does not exist")
    String badVideoRequestHandler(Exception e) {
        return e.getMessage();
    }

    /*
    @ResponseBody
    @ExceptionHandler(CourseNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Course not found")
    String objectNotFoundHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DuplicatedTitleException.class)
    @ResponseStatus(code = HttpStatus.CONFLICT, reason = "a Course with the same title already exists")
    String titleAlreadyExists(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(PorfileNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "a profile with this name doesn't exists")
    String PorfileNotFoundException(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(ImpossibleToPutCourseAvailable.class)
    @ResponseStatus(code = HttpStatus.CONFLICT, reason = "This course doesn't have at least one lesson, can't set as available")
    String ImpossibleToPutCourseAvailable(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(CantUpdateCourseException.class)
    @ResponseStatus(code = HttpStatus.CONFLICT, reason = "The course has to be not available to modify")
    String CantUpdateCourseException(Exception e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(CourseCompletedException.class)
    @ResponseStatus(code = HttpStatus.CONFLICT, reason = "All lessons are already completed")
    String CourseCompletedException(Exception e) {
        return e.getMessage();
    }

     */
}
