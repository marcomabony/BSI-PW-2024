// Controla logout e registro.
// O método logout invalida a sessão e redireciona para a página de login.
// O método register verifica duplicação de usuário antes de criar um novo.
package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.UsuarioBO;
import br.edu.ifg.luziania.model.entity.Usuario;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.servlet.http.HttpSession;

import java.net.URI;

@Path("/auth")
public class AuthController {

    @Inject
    UsuarioBO userService;

    @Context
    HttpServletRequest request;

    @POST
    @Path("/logout")
    public Response logout() {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return Response.seeOther(URI.create("/login.html")).build();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response register(@FormParam("username") String username,
                             @FormParam("password") String password) {
        if (Usuario.find("username", username).count() > 0) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Usuário já existe.")
                    .build();
        }

        userService.registerNewUser(username, password);
        return Response.seeOther(URI.create("/login.html")).build();
    }
}
