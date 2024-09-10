package br.edu.ifg.luziania.model.dao;

import br.edu.ifg.luziania.model.dto.NewsResponseDTO;
import br.edu.ifg.luziania.model.entity.News;
import br.edu.ifg.luziania.model.entity.Usuario;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class NewsDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public void save(News news) {
        entityManager.persist(news);
    }

    public List<News> findAll() {
        return entityManager.createQuery("SELECT n FROM News n", News.class).getResultList();
    }

    @Transactional
    public boolean excluirNews(Long id) {
        News news = News.findById(id);
        if (news != null) {
            news.delete();
            return true;
        }
        return false;
    }

    @Transactional
    public void atualizarStatus(Long id, boolean fake) {
        News news = entityManager.find(News.class, id);
        if (news != null) {
            entityManager.createNativeQuery("UPDATE tb007_news_migrado SET isfake =:isfake where id =:id")
                    .setParameter("id", id)
                    .setParameter("isfake", fake)
                    .executeUpdate();
        } else {
            throw new RuntimeException("Notícia não encontrada");
        }
    }

    public NewsResponseDTO find(Long id) {
        News news = entityManager.find(News.class, id);
        NewsResponseDTO dto = new NewsResponseDTO();
        dto.setId(news.getId());
        dto.setContent(news.getContent());
        dto.setIsFake(news.isFake() ? 1 : 0);
        dto.setCreatedUser(news.getCreatedUser());
        dto.setCreatedAt(news.getCreatedAt());
        dto.setUpdatedAt(news.getUpdatedAt());
        return dto;
    }
}