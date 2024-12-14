package com.tecnocampus.LS2.protube_back.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@Profile({"dev", "prod"})
public class DevSecurityConfig {
    @Value("${okta.oauth2.issuer}")
    private String issuer;
    @Value("${okta.oauth2.client-id}")
    private String clientId;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .logout(logout -> logout
                        .addLogoutHandler(logoutHandler()))
                .csrf(AbstractHttpConfigurer::disable) // Completely disable CSRF protection for easier development
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); // Allow frames from the same origin (required for H2 console)

        return http.build();
    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                String baseUrl = "http%3A%2F%2Flocalhost:5173/";
                response.sendRedirect(issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        };
    }
}
