package br.edu.ifg.luziania.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb007_news_migrado")
public class News extends PanacheEntity {

    private String content;

    private boolean isFake;
}