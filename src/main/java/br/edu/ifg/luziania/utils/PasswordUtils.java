package br.edu.ifg.luziania.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {

    /**
     * Gera um hash seguro para a senha fornecida usando o algoritmo BCrypt.
     * @param password A senha que será hashada.
     * @return O hash gerado da senha.
     */
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /**
     * Verifica se a senha fornecida corresponde ao hash armazenado.
     * @param candidate A senha candidata a ser verificada.
     * @param hashed O hash da senha armazenada.
     * @return true se a senha fornecida corresponder ao hash, false caso contrário.
     */
    public static boolean checkPassword(String candidate, String hashed) {
        return BCrypt.checkpw(candidate, hashed);
    }
}