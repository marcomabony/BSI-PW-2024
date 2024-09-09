package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.NewsBO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.ResultDTO;
import br.edu.ifg.luziania.model.dto.UsuarioDTO;
import br.edu.ifg.luziania.model.entity.News;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/news")
public class NewsController {

    @Inject
    NewsBO newsBO;

    @GET
    @Path("/listar")
    @Produces(MediaType.APPLICATION_JSON)
    public List<NewsDTO> listarNews(){
        return newsBO.getNews();
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
        newsBO.saveNews(news);

        return Response.ok().build();
    }
}