package com.tecnocampus.LS2.protube_back.dto.record;
import com.tecnocampus.LS2.protube_back.domain.User;

public record InputVideoRecord(String title, String description, Long duration, String username) {
}