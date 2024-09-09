package br.edu.ifg.luziania.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb005_user")
public class Usuario extends PanacheEntityBase {

    @Id
    @SequenceGenerator(
            name = "usuarioSeq",
            sequenceName = "sq005_usuario_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "usuarioSeq"
    )
    public Long id;


    @Column(nullable = false)
    private String nome;

    private String apelido;

    private String telefone;

    private String celular;

    private String dataNascimento;

    private String estadoCivil;

    private String genero;

    private String nacionalidade;

    private String endereco;

    private String cidade;

    private String estado;

    private String cep;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tb006_user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    public Set<String> roles = Set.of("JORNALISTA");
}