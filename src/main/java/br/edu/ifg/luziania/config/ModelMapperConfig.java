//Esse código configura o ModelMapper para mapear objetos,
// ignorando valores nulos. Isso garante que, ao atualizar informações,
// dados existentes não sejam substituídos por valores vazios.
package br.edu.ifg.luziania.config;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Produces;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;

@ApplicationScoped
public class ModelMapperConfig {


    @Produces
    @ApplicationScoped
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        return mapper;
    }
}
