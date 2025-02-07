// Esse controlador gerencia todas as operações necessárias para a manipulação
// de usuários no sistema, como cadastro, visualização, atualização de status
// e alteração de papéis (roles).
package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.UsuarioBO;
import br.edu.ifg.luziania.model.dto.ResponseUsuarioDTO;
import br.edu.ifg.luziania.model.dto.UsuarioDTO;
import br.edu.ifg.luziania.model.enums.MensagensEnum;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Path("usuario")
public class UsuarioController {

    @Inject
    Template usuarioView;

    @Inject
    Template cadastro; // Template para a página de cadastro

    @Inject
    UsuarioBO usuarioBO;

    @GET
    @Path("listar/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UsuarioDTO> listarUsuarios(@PathParam("id") Long id){
        return usuarioBO.getUsuarios()
                .stream()
                .filter(usuario -> !Objects.equals(usuario.getId(), id))
                .toList();
    }

    @GET
    @Path("view")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getView() {
        return usuarioView.instance();
    }

    @GET
    @Path("cadastro") // Novo endpoint para a tela de cadastro
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getCadastroPage() {
        return cadastro.instance();
    }



    @POST
    @Path("salvar")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response salvarUsuario(UsuarioDTO usuarioDTO){
        try {
            usuarioBO.addUsuario(usuarioDTO);
            return Response.ok()
                    .entity(new ResponseUsuarioDTO(true, MensagensEnum.SUCESSO_CADASTRO.getMensagem())).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ResponseUsuarioDTO(false, e.getMessage())).build();
        }
    }

    @POST
    @Path("atualizar/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response atualizarStatus(@PathParam("id") Long id){
        try {
            usuarioBO.atualizarStatus(id);
            return Response.ok()
                    .entity(new ResponseUsuarioDTO(true,
                            MensagensEnum.SUCESSO_ATUALIZACAO_STATUS.getMensagem())).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ResponseUsuarioDTO(false, e.getMessage())).build();
        }
    }

    @POST
    @Path("alterarRole/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterarRole(@PathParam("id") Long id, Map<String, String> roleData){
        try {
            String novaRole = roleData.get("role");
            usuarioBO.alterarRole(id, novaRole);
            return Response.ok()
                    .entity(new ResponseUsuarioDTO(true,
                            "Role alterada com sucesso!")).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ResponseUsuarioDTO(false, e.getMessage())).build();
        }
    }



}