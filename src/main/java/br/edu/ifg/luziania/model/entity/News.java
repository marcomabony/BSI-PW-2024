package br.edu.ifg.luziania.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb007_news_migrado")
public class News extends PanacheEntityBase {

    @Id
    @SequenceGenerator(
            name = "newsMigradoSeq",
            sequenceName = "sq007_news_migrado_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "newsMigradoSeq"
    )
    private Long id;

    private String content;

    private boolean isFake;
}