package br.edu.ifg.luziania.model.bo;

import br.edu.ifg.luziania.model.dao.UsuarioDAO;
import br.edu.ifg.luziania.model.dto.UsuarioDTO;
import br.edu.ifg.luziania.model.entity.Usuario;
import br.edu.ifg.luziania.utils.PasswordUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@ApplicationScoped
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UsuarioBO {

    private final UsuarioDAO usuarioDAO;

    private final ModelMapper mapper;

    public void addUsuario(UsuarioDTO usuarioDTO) {
        usuarioDTO.setSenha(PasswordUtils.hashPassword(usuarioDTO.getSenha()));
        Usuario usuario = mapper.map(usuarioDTO, Usuario.class);
        usuarioDAO.save(usuario);
    }

    public List<UsuarioDTO> getUsuarios() {

        return usuarioDAO.findAll().stream()
                .map(usuario -> {
                    UsuarioDTO dto = new UsuarioDTO();
                    dto.setNome(usuario.getNome());
                    dto.setTelefone(usuario.getTelefone());
                    dto.setEmail(usuario.getEmail());
                    dto.setDataNascimento(usuario.getDataNascimento());
                    dto.setEstadoCivil(usuario.getEstadoCivil());
                    dto.setGenero(usuario.getGenero());
                    dto.setNacionalidade(usuario.getNacionalidade());
                    dto.setEndereco(usuario.getEndereco());
                    dto.setCidade(usuario.getCidade());
                    dto.setEstado(usuario.getEstado());
                    dto.setCep(usuario.getCep());
                    dto.setSenha(usuario.getSenha());
                    dto.setActive(usuario.getActive());
                    dto.setRoles(usuario.getRoles());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void createCustomUserUser(String username, String password, String nome, Set<String> roles) {
        if (Usuario.find("email", username).count() == 0) {
            Usuario admin = new Usuario();
            admin.setNome(nome);
            admin.setEmail(username);
            admin.setSenha(PasswordUtils.hashPassword(password));
            admin.setRoles(roles);
            admin.setActive(Boolean.TRUE);
            admin.persist();
        }
    }

    @Transactional
    public void registerNewUser(String username, String password) {
        Usuario user = new Usuario();
        user.setEmail(username);
        user.setSenha(PasswordUtils.hashPassword(password));
        user.roles = Set.of("JORNALISTA");
        user.persist();
    }

    public Usuario authenticate(String username, String password) {
        Usuario user = Usuario.find("email", username).firstResult();
        if (user != null && checkPassword(password, user.getSenha())) {
            return user;
        }
        return null;
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private boolean checkPassword(String candidate, String hashed) {
        return BCrypt.checkpw(candidate, hashed);
    }
}