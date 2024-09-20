package br.edu.ifg.luziania.model.bo;

import br.edu.ifg.luziania.model.dao.NewsDAO;
import br.edu.ifg.luziania.model.dto.NewsDTO;
import br.edu.ifg.luziania.model.dto.NewsResponseDTO;
import br.edu.ifg.luziania.model.dto.UsuarioDTO;
import br.edu.ifg.luziania.model.entity.News;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class NewsBO {

    private final NewsDAO newsDAO;

    private final ModelMapper modelMapper;

    private final UsuarioBO usuarioBO;

    public boolean verifyNews(String content) {
        return content.toLowerCase().contains("fake");
    }

    public void saveNews(News news) {
        newsDAO.save(news);
    }

    public NewsResponseDTO getNews(Long id) {
        NewsResponseDTO newsResponseDTO = newsDAO.find(id);
        newsResponseDTO.setCreatedUser(usuarioBO.findById(newsResponseDTO.getUserId()).getNome());
        return newsResponseDTO;
    }

    public List<NewsResponseDTO> getAllNews(Long id) {
        return  newsDAO.findAll(id).stream()
                .map(news -> {
                    NewsResponseDTO dto = new NewsResponseDTO();
                    dto.setTitle(news.getContent().substring(0, 20));
                    dto.setId(news.getId());
                    dto.setContent(news.getContent());
                    dto.setIsFake(news.isFake() ? 1 : 0);
                    dto.setCreatedUser(usuarioBO.findById(news.getUserId()).getNome());
                    dto.setCreatedAt(news.getCreatedAt());
                    dto.setUpdatedAt(news.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<NewsResponseDTO> getNews() {

        return newsDAO.findAll().stream()
                .map(news -> {
                    var user = usuarioBO.findById(news.getUserId());
                    NewsResponseDTO dto = new NewsResponseDTO();
                    dto.setId(news.getId());
                    dto.setContent(news.getContent());
                    dto.setIsFake(news.isFake() ? 1 : 0);
                    if (user != null) {
                        dto.setCreatedUser(user.getNome());
                    }
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