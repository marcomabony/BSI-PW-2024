package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/historicoVerificadas")
public class HistoricoVerificadas {

    @Inject
    Template historicoVerificadas;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getHistoricoVerificadasPage() {
        return historicoVerificadas.instance();
    }
}