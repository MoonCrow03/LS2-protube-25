package com.tecnocampus.LS2.protube_back.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@Profile("!dev")
public class SecurityConfig {

    @Value("${okta.oauth2.issuer}")
    private String issuer;
    @Value("${okta.oauth2.client-id}")
    private String clientId;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/h2-console/**", "/images/**", "/videos/**", "/users/**", "/media/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(withDefaults())  // OAuth2 Login
                .logout(logout -> logout
                        .addLogoutHandler(logoutHandler()))
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/h2-console/**")) // Disable CSRF protection for the H2 console
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); // Allow frames from the same origin (required for H2 console)

        return http.build();

    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                //String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
                String encodedBaseUrl = URLEncoder.encode("https://localhost:5173", StandardCharsets.UTF_8);
                response.sendRedirect(issuer + "v2/logout?client_id=" + clientId);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        };
    }

}
