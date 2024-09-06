package br.edu.ifg.luziania.model.dto;

public class ResultDTO {
    private String message;

    public ResultDTO(String message) {
        this.message = message;
    }

    // Getters e Setters

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}