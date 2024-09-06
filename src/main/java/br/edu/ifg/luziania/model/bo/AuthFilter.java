package br.edu.ifg.luziania.model.bo;


import jakarta.annotation.Priority;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.net.URI;

//@Provider
//@Priority(Priorities.AUTHENTICATION)
//public class AuthFilter implements ContainerRequestFilter {
//
//    @Context
//    HttpServletRequest request;
//
//    @Override
//    public void filter(ContainerRequestContext ctx) throws IOException {
//        String path = ctx.getUriInfo().getPath();
//
//        // Defina os caminhos que não requerem autenticação
//        if (path.startsWith("index.html") || path.startsWith("templates/auth") || path.startsWith("templates/login.html") || path.startsWith("templates/register.html")) {
//            return;
//        }
//
//        // Permitir acesso a páginas públicas, como CSS, JS, imagens
//        if (path.startsWith("public/") || path.contains(".")) {
//            return;
//        }
//
//        HttpSession session = request.getSession(false);
//        if (session == null || session.getAttribute("username") == null) {
//            ctx.abortWith(Response.seeOther(URI.create("templates/login.html")).build());
//        }
//    }
//}
