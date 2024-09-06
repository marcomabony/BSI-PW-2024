package br.edu.ifg.luziania.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private String nome;
    private String apelido;
    private String telefone;
    private String celular;
    private String email;
    private String dataNascimento;
    private String estadoCivil;
    private String genero;
    private String nacionalidade;
    private String endereco;
    private String cidade;
    private String estado;
    private String cep;
    private String senha;
    private Set<String> roles;
    private Boolean active;
}