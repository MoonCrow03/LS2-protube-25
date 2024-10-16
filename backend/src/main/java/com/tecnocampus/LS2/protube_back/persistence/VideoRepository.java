package com.tecnocampus.LS2.protube_back.persistence;

import com.tecnocampus.LS2.protube_back.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, String> {
    Optional<Video> findByTitle(String title);
    void deleteById(Long id);
}
