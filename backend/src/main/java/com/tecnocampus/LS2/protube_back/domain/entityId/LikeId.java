package com.tecnocampus.LS2.protube_back.domain.entityId;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Getter
@Setter
public class LikeId implements Serializable { //ha d'implementar Serializable

    @ManyToOne
    private User user;

    @ManyToOne
    private Video video;

    public LikeId(User user, Video video){
        this.user = user;
        this.video = video;
    }

}
