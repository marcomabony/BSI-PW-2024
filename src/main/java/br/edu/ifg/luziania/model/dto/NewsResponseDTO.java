package br.edu.ifg.luziania.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NewsResponseDTO extends NewsDTO {

    private String title;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}