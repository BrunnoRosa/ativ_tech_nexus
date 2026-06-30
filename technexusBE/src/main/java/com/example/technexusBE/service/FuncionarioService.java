package com.example.technexusBE.service;

import com.example.technexusBE.dto.FuncionarioRequestDTO;
import com.example.technexusBE.dto.FuncionarioResponseDTO;
import com.example.technexusBE.model.FuncionarioModel;
import com.example.technexusBE.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private FuncionarioRepository repository;

    public List<FuncionarioResponseDTO> listar(){
        return repository.findAll().stream().map(funcionario -> new FuncionarioResponseDTO(funcionario.getNome(), funcionario.getTelefone(), funcionario.getEmail(), funcionario.getCargo(), funcionario.getSetor())).toList();
    }

    public FuncionarioModel salvar(FuncionarioRequestDTO salvarDTO){
        if(repository.findByEmail(salvarDTO.getEmail()).isPresent()){
            throw  new RuntimeException("Funcionário já Cadastrado. ❌");
        }
        FuncionarioModel novoCadastro = new FuncionarioModel();
        novoCadastro.setNome(salvarDTO.getNome());
        novoCadastro.setTelefone(salvarDTO.getTelefone());
        novoCadastro.setEmail(salvarDTO.getEmail());
        novoCadastro.setCargo(salvarDTO.getCargo());
        novoCadastro.setSetor(salvarDTO.getSetor());

        return repository.save(novoCadastro);
    }

    public FuncionarioModel atualizar(Long id, FuncionarioRequestDTO atualizarDTO){
        FuncionarioModel novoCadastro = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cadastro não localizado. ❌"));

        // Verifica se o e-mail já está em uso por OUTRO funcionário
        repository.findByEmail(atualizarDTO.getEmail()).ifPresent(funcionario -> {
            if (!funcionario.getId().equals(id)) {
                throw new RuntimeException("Funcionário já Cadastrado. ❌");
            }
        });

        novoCadastro.setNome(atualizarDTO.getNome());
        novoCadastro.setTelefone(atualizarDTO.getTelefone());
        novoCadastro.setEmail(atualizarDTO.getEmail());
        novoCadastro.setCargo(atualizarDTO.getCargo());
        novoCadastro.setSetor(atualizarDTO.getSetor());

        return repository.save(novoCadastro);
    }

    public void deletar(Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException("Cadastro não Localizado. ❌");
        }
        repository.deleteById(id);
    }

}
