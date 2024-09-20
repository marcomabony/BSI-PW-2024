// Esse controlador é responsável por renderizar e exibir a interface para
// verificação de notícias falsas no sistema quando a URL correspondente é acessada.
package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/verificador")
public class VerificadorController {

    @Inject
    Template verificarFakeNews;

    @GET
    @Path("/fakenews")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance verificarFakeNews() {
        return verificarFakeNews.instance();
    }
}