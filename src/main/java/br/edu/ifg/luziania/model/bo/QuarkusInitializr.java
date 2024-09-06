package br.edu.ifg.luziania.model.bo;

import io.quarkus.runtime.StartupEvent;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

import java.util.Set;

@RequestScoped
public class QuarkusInitializr {

    @Inject
    UsuarioBO userService;

    public void onStart(@Observes StartupEvent ev) {
        userService.createCustomUserUser("admin@gmail.com", "123", "Admin", Set.of("ADMINISTRADOR"));
        userService.createCustomUserUser("jornalista@gmail.com", "123", "Jornalista", Set.of("JORNALISTA"));
        userService.createCustomUserUser("coordenador@gmail.com", "123", "Coordenador", Set.of("COORDENADOR"));
    }
}
