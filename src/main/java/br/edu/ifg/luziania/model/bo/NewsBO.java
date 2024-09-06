package br.edu.ifg.luziania.model.bo;

import br.edu.ifg.luziania.model.dao.NewsDAO;
import br.edu.ifg.luziania.model.entity.News;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

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
}