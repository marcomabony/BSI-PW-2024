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

    /**
     * Identificador único do usuário, gerado automaticamente por uma sequência.
     */
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

    /**
     * Nome completo do usuário (obrigatório).
     */
    @Column(nullable = false)
    private String nome;

    /**
     * Apelido ou nome alternativo do usuário (opcional).
     */
    private String apelido;

    /**
     * Número de telefone fixo do usuário (opcional).
     */
    private String telefone;

    /**
     * Número de celular do usuário (opcional).
     */
    private String celular;

    /**
     * Data de nascimento do usuário (opcional).
     */
    private String dataNascimento;

    /**
     * Estado civil do usuário (opcional).
     */
    private String estadoCivil;

    /**
     * Gênero do usuário (opcional).
     */
    private String genero;

    /**
     * Nacionalidade do usuário (opcional).
     */
    private String nacionalidade;

    /**
     * Endereço residencial do usuário (opcional).
     */
    private String endereco;

    /**
     * Cidade onde o usuário reside (opcional).
     */
    private String cidade;

    /**
     * Estado onde o usuário reside (opcional).
     */
    private String estado;

    /**
     * CEP do endereço do usuário (opcional).
     */
    private String cep;

    /**
     * Indica se o usuário está ativo (padrão: true).
     */
    @Column(nullable = false)
    private Boolean active = true;

    /**
     * E-mail do usuário, utilizado para login, deve ser único e é obrigatório.
     */
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * Senha do usuário (obrigatória).
     */
    @Column(nullable = false)
    private String senha;

    /**
     * Conjunto de papéis (roles) atribuídos ao usuário, como 'JORNALISTA'.
     * Armazenados na tabela 'tb006_user_roles'.
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tb006_user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    public Set<String> roles = Set.of("JORNALISTA");
}