package br.edu.ifg.luziania.model.bo;

import br.edu.ifg.luziania.model.dao.NewsDAO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.UsuarioDTO;
import br.edu.ifg.luziania.model.entity.News;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class NewsBO {

    @Inject
    NewsDAO newsDAO;

    public boolean verifyNews(String content) {
        return content.toLowerCase().contains("fake");
    }

    public void saveNews(News news) {
        newsDAO.save(news);
    }

    public List<NewsDTO> getNews() {

        return newsDAO.findAll().stream()
                .map(news -> {
                    NewsDTO dto = new NewsDTO();
                    dto.setId(news.getId());
                    dto.setContent(news.getContent());
                    dto.setIsFake(news.isFake() ? 1 : 0);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}