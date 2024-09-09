package br.edu.ifg.luziania.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsDTO {
    private String content;

    private Integer isFake;
}