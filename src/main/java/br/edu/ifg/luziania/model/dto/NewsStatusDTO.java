package br.edu.ifg.luziania.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class NewsStatusDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 4753112085559149127L;

    private String isFake;
}

