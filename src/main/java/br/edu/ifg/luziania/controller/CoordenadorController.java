// É utilizado para renderizar a página do coordenador ao ser acessada via navegador.
package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/coordenador")
public class CoordenadorController {

    @Inject
    Template coordenador;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getCoordenadorPage() {
        return coordenador.instance();
    }
}