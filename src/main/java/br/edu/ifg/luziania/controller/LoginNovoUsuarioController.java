package br.edu.ifg.luziania.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/loginNovoUsuario")
public class LoginNovoUsuarioController {

    @Inject
    Template loginNovoUsuario;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getLoginNovoUsuarioPage() {
        return loginNovoUsuario.instance();
    }
}