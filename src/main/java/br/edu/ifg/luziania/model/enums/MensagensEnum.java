package br.edu.ifg.luziania.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MensagensEnum {

    // Mensagem de sucesso para login bem-sucedido
    SUCESSO_LOGIN("00", "Login bem-sucedido!"),

    // Mensagem de falha no login
    FALHA_LOGIN("01", "Falha no login!"),

    // Mensagem para e-mail ou senha inválidos
    EMAIL_OU_SENHA_INVALIDO("02", "E-mail ou senha incorretos."),

    // Mensagem para usuário desativado
    USUARIO_DESATIVADO("07", "Usuário desativado!"),

    // Mensagem de sucesso ao cadastrar um usuário
    SUCESSO_CADASTRO("03", "Usuário cadastrado com sucesso!"),

    // Mensagem de sucesso ao atualizar o status de um usuário
    SUCESSO_ATUALIZACAO_STATUS("43", "Status do usuário atualizado com sucesso!");

    // Código da mensagem associada ao enum
    private final String codigo;

    // Mensagem correspondente ao código
    private final String mensagem;
}