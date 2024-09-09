package br.edu.ifg.luziania.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseLoginDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 8146335801730327778L;

    public Boolean success;

    public Set<String> roles;

    public String userName;

    public String message;
}
