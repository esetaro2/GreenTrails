package it.greentrails.backend.entities;

import it.greentrails.backend.enums.StatoItinerario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "itinerario")
public class Itinerario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Enumerated
  @Column(name = "stato", nullable = false)
  private StatoItinerario stato = StatoItinerario.PIANIFICATO;

  @Column(name = "totale", nullable = false)
  private double totale;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_visitatore", nullable = false)
  private Utente visitatore;

}