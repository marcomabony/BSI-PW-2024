package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/paginaOperador")
public class OperadorController {

    @Inject
    Template painelOperador;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getPaginaOperador() {
        return painelOperador.instance();
    }

    // Outros métodos para manipular dados, como adicionar, remover ou listar usuários
}