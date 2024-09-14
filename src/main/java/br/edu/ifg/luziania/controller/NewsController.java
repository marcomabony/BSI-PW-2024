package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.NewsBO;
import br.edu.ifg.luziania.model.bo.UsuarioBO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.NewsResponseDTO;
import br.edu.ifg.luziania.model.dto.NewsStatusDTO;
import br.edu.ifg.luziania.model.dto.ResultDTO;
import br.edu.ifg.luziania.model.entity.News;
import br.edu.ifg.luziania.model.entity.Usuario;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Path("/api/news")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class NewsController {

    private final NewsBO newsBO;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public NewsResponseDTO getNews(@PathParam("id") Long id) {
        return newsBO.getNews(id);
    }


    @GET
    @Path("/listar")
    @Produces(MediaType.APPLICATION_JSON)
    public List<NewsResponseDTO> listarNews(){
        return newsBO.getNews();
    }

    @GET
    @Path("/listar/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<NewsResponseDTO> listarNewsByUser(@PathParam("id") Long id){
        return newsBO.getAllNews(id);
    }


    @POST
    @Path("/verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response verifyNews(NewsDTO newsDTO) {
        boolean isFake = newsBO.verifyNews(newsDTO.getContent());
        String message = isFake ? "A notícia é falsa!" : "A notícia é verdadeira!";

        News news = new News();
        news.setContent(newsDTO.getContent());
        news.setFake(isFake);
        newsBO.saveNews(news);

        return Response.ok(new ResultDTO(message)).build();
    }

    @POST
    @Path("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveNews(NewsDTO newsDTO) {

        News news = new News();
        news.setContent(newsDTO.getContent());
        news.setFake(newsDTO.getIsFake() == 1);
        news.setCreatedAt(LocalDateTime.now());
        news.setUpdatedAt(LocalDateTime.now());
        news.setUserId(news.getUserId());

        newsBO.saveNews(news);

        return Response.ok().build();
    }

    @PUT
    @Path("/atualizar-status/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response atualizarStatus(@PathParam("id") Long id, NewsStatusDTO newsStatusDTO) {
        try {
            newsBO.atualizarStatus(id, Objects.equals(newsStatusDTO.getIsFake(), "1"));
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Erro ao atualizar o status").build();
        }
    }

    @DELETE
    @Path("/excluir/{id}")
    public Response excluirNews(@PathParam("id") Long id){
        boolean deleted = newsBO.excluirNews(id);
        if (deleted) {
            return Response.noContent().build(); // Retorna status 204 se excluído com sucesso
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); // Retorna 404 se não encontrar
        }
    }
}