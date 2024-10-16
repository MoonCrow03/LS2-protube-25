package com.tecnocampus.LS2.protube_back.persistence;

import com.tecnocampus.LS2.protube_back.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {

}
