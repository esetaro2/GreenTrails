package it.greentrails.backend.gestionePrenotazioni.repository;

import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrenotazioneAttivitaTuristicaRepository extends JpaRepository<PrenotazioneAttivitaTuristica, Long> {

    @Query("SELECT p FROM PrenotazioneAttivitaTuristica p JOIN p.attivitaTuristica a WHERE a.id = ?1")
    Page<PrenotazioneAttivitaTuristica> findByAttivitaTuristica(Long idAttivitaTuristica, Pageable pageable);
}