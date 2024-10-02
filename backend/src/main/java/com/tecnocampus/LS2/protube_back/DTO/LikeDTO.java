package com.tecnocampus.LS2.protube_back.DTO;

import com.tecnocampus.LS2.protube_back.domain.entityId.LikeId;
import com.tecnocampus.LS2.protube_back.domain.Like;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LikeDTO {

    private LikeId id;
    private boolean like;

    public LikeDTO(Like like){
        this.id = like.getId();
        this.like = like.isLiked();
    }
}
