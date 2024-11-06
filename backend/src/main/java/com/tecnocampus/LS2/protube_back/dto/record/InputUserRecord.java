package com.tecnocampus.LS2.protube_back.dto.record;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record InputUserRecord(String username, String password) {

}
