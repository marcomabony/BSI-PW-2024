package br.edu.ifg.luziania.controller;

import br.edu.ifg.luziania.model.bo.NewsBO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.ResultDTO;
import br.edu.ifg.luziania.model.entity.News;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/news")
public class NewsController {

    @Inject
    NewsBO newsBO;

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
}