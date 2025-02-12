package br.edu.ifg.luziania.model.dao;

import br.edu.ifg.luziania.model.entity.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class UsuarioDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public void save(Usuario usuario) {
        entityManager.persist(usuario);
    }

    public List<Usuario> findAll() {
        return entityManager.createQuery("SELECT u FROM Usuario u", Usuario.class).getResultList();
    }

    @Transactional
    public void toggleActiveStatus(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        if (usuario != null) {
            usuario.setActive(!usuario.getActive());
            entityManager.merge(usuario);
        }
    }

    @SuppressWarnings("JpaQueryApiInspection")
    @Transactional
    public void alterarRole(Long id, String novaRole) {
        // Remover a role atual
        entityManager.createNativeQuery("DELETE FROM tb006_user_roles WHERE tb006_user_roles.user_id = :userId")
                .setParameter("userId", id)
                .executeUpdate();

        // Adicionar a nova role
        entityManager.createNativeQuery("INSERT INTO tb006_user_roles (user_id, role) VALUES (:userId, :role)")
                .setParameter("userId", id)
                .setParameter("role", novaRole)
                .executeUpdate();
    }

}