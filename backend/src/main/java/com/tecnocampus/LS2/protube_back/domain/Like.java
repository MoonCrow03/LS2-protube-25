package com.tecnocampus.LS2.protube_back.domain;

import com.tecnocampus.LS2.protube_back.domain.entityId.LikeId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Like {

    @EmbeddedId
    private LikeId id;

    private boolean liked;

    public Like(User user, Video video, boolean liked){
        id = new LikeId(user, video);
        this.liked = liked;
    }
}
