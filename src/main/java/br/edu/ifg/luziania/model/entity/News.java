package br.edu.ifg.luziania.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tb007_news_migrado")
public class News extends PanacheEntityBase {

    /**
     * Identificador único da notícia, gerado automaticamente por uma sequência.
     */
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

    /**
     * Conteúdo da notícia (obrigatório), armazenado no formato TEXT.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * Indicador booleano que define se a notícia é falsa (fake news).
     */
    private boolean isFake;

    /**
     * Data e hora em que a notícia foi criada.
     */
    private LocalDateTime createdAt;

    /**
     * Data e hora da última atualização da notícia.
     */
    private LocalDateTime updatedAt;

    /**
     * Identificador do usuário que cadastrou a notícia (obrigatório).
     */
    @Column(name = "user_id", nullable = false)
    private Long userId;
}