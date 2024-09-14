package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.UsuarioBO;
import br.edu.ifg.luziania.model.dto.LoginDTO;
import br.edu.ifg.luziania.model.dto.ResponseLoginDTO;
import br.edu.ifg.luziania.model.entity.Usuario;
import br.edu.ifg.luziania.model.enums.MensagensEnum;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;

@Path("/login")
public class LoginController {

    @Inject
    Template login;

    @Inject
    UsuarioBO usuarioBO;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getLoginPage() {
        return login.instance();
    }

    @POST
    @Path("/autenticar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response autenticar(LoginDTO loginDTO) {

        Usuario usuario = usuarioBO.authenticate(loginDTO.getEmail(), loginDTO.getSenha());
        if (usuario != null) {
            if (usuario.getActive()) {
                return Response.ok()
                        .entity(new ResponseLoginDTO(true, usuario.getRoles(), usuario.getId(),
                                usuario.getNome(), MensagensEnum.SUCESSO_LOGIN.getMensagem()))
                        .build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(new ResponseLoginDTO(false, null, null, null,
                                MensagensEnum.USUARIO_DESATIVADO.getMensagem()))
                        .build();
            }

        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new ResponseLoginDTO(false,
                            MensagensEnum.EMAIL_OU_SENHA_INVALIDO.getMensagem()))
                    .build();
        }
    }
}