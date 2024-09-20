// Esse controlador é responsável por renderizar e exibir a página inicial
// da aplicação quando acessada pela URL correspondente.
package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/pagina/inicial")
public class PaginaInicialController {

    @Inject
    Template paginaInicial;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getPaginaInicial() {
        return paginaInicial.instance();
    }
}