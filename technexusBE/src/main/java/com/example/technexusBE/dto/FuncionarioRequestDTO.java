package com.example.technexusBE.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FuncionarioRequestDTO {
    @NotBlank(message = "Nome Obrigatório ❌")
    @Size(min=8, message = "Informe Nome e Sobrenome ❌")
    private String nome;

    @NotBlank(message = "Telefone Obrigatório ❌")
    @Size(min=11, message = "Informe DDD e Número ❌")
    private String telefone;

    @NotBlank(message = "Email Obrigatório ❌")
    @Email(message = "Informe um email válido")
    private String email;

    @NotBlank(message = "Cargo Obrigatório ❌")
    @Size(min=5, message = "Informe o Cargo ❌")
    private String cargo;

    @NotBlank(message = "Setor Obrigatório ❌")
    @Size(min=2, message = "Informe o Setor ❌")
    private String setor;


    public FuncionarioRequestDTO() {
    }

    public FuncionarioRequestDTO(String nome, String telefone, String email, String cargo, String setor) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cargo = cargo;
        this.setor = setor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }
}
