// Esse controlador serve para exibir a página inicial do sistema quando a rota principal for acessada.
package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/")
public class HomeController {

    @Inject
    Template paginaInicial;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance index() {
        return paginaInicial.instance();
    }
}
