package br.edu.ifg.luziania.model.dao;

import br.edu.ifg.luziania.model.entity.News;
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
}