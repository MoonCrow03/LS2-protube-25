package com.tecnocampus.LS2.protube_back.controller;

import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

    @Autowired UserService userService;

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
        if (principal != null) {
            model.addAttribute("profile", principal.getClaims());

            String auth0Id = principal.getAttribute("sub");  // Auth0 unique user ID
            String email = principal.getAttribute("email");
            String name = principal.getUserInfo().getNickName();
            String picture = principal.getPicture();

            userService.createUser(new InputUserRecord(name,email,picture,auth0Id));
            return "redirect:http://localhost:5173?token=" + principal.getAccessTokenHash();
        }

        return "index";
    }

}
