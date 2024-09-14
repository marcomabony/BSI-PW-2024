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

    private Boolean success;

    private Set<String> roles;

    private Long id;

    private String userName;

    private String message;

    public ResponseLoginDTO(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
