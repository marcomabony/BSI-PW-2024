// Esse controlador é responsável por carregar a página de cadastro
// de novos usuários no sistema quando acessada pela URL correspondente.
package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/novoUsuarioCadastro")
public class NovoUsuarioCadastroController {

    @Inject
    Template novoUsuarioCadastro;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getNovoUsuarioCadastroPage() {
        return novoUsuarioCadastro.instance();
    }
}