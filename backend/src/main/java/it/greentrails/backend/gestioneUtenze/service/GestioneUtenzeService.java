package it.greentrails.backend.gestioneUtenze.service;

import it.greentrails.backend.entities.Preferenze;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.repository.PreferenzeRepository;
import it.greentrails.backend.gestioneUtenze.repository.UtenteRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GestioneUtenzeService {

  private final UtenteRepository repository;
  private final PreferenzeRepository preferenzeRepository;

  public Utente findById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<Utente> utente = repository.findById(id);
    if (utente.isEmpty()) {
      throw new Exception("L'utente non è stato trovato.");
    }
    return utente.get();
  }

  public Utente saveUtente(Utente utente) throws Exception {
    if (utente == null) {
      throw new Exception("L'utente è vuoto.");
    }
    return repository.save(utente);
  }

  public Optional<Utente> findByEmail(String email) {
    return repository.findOneByEmail(email);
  }

  public boolean deleteUtente(Utente utente) throws Exception {
    if (utente == null) {
      throw new Exception("L'utente è vuoto.");
    }
    repository.delete(utente);
    repository.flush();
    return repository.findById(utente.getId()).isEmpty();
  }

  public Preferenze getPreferenzeById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<Preferenze> preferenze = preferenzeRepository.findById(id);
    if (preferenze.isEmpty()) {
      throw new Exception("Le preferenze non sono state trovate.");
    }
    return preferenze.get();
  }

}
