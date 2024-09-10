package br.edu.ifg.luziania.model.bo;

import br.edu.ifg.luziania.model.dao.NewsDAO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.NewsResponseDTO;
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

    public NewsResponseDTO getNews(Long id) {
        return newsDAO.find(id);
    }

    public List<NewsResponseDTO> getNews() {

        return newsDAO.findAll().stream()
                .map(news -> {
                    NewsResponseDTO dto = new NewsResponseDTO();
                    dto.setId(news.getId());
                    dto.setContent(news.getContent());
                    dto.setIsFake(news.isFake() ? 1 : 0);
                    dto.setCreatedUser(news.getCreatedUser());
                    dto.setCreatedAt(news.getCreatedAt());
                    dto.setUpdatedAt(news.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public boolean excluirNews(Long id) {
        return newsDAO.excluirNews(id);
    }

    public void atualizarStatus(Long id, boolean fake) {
        newsDAO.atualizarStatus(id, fake);
    }
}