package br.edu.ifg.luziania.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MensagensEnum {

    SUCESSO_LOGIN("00", "Login bem-sucedido!"),

    FALHA_LOGIN("01", "Falha no login!"),

    EMAIL_OU_SENHA_INVALIDO("02","E-mail ou senha incorretos."),
    USUARIO_DESATIVADO("07","Usuário desativado!"),

    SUCESSO_CADASTRO("03","Usuário cadastrado com sucesso!"),
    SUCESSO_ATUALIZACAO_STATUS("43","Status do usuário atualizado com sucesso!")

    ;

    private final String codigo;

    private final String mensagem;



}
