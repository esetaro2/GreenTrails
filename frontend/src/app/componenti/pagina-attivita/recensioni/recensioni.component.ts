import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecensioneService } from 'src/app/servizi/recensione.service';
import { UploadService } from 'src/app/servizi/upload.service';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioniComponent implements OnInit {

  constructor(config: NgbRatingConfig, private recensioneService: RecensioneService, private route: ActivatedRoute,
    private uploadService: UploadService) {
    config.max = 5;
    config.readonly = true;
  }

  recensioni: any;
  idAttivita: number = 0;
  idVisitatore: number = 0;
  hasRecensione: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAttivita = +params['id'];
    })

    this.visualizzaListaRecensioni();
  }

  visualizzaListaRecensioni(): void {
    this.recensioneService.visualizzaRecensioniPerAttivita(this.idAttivita).subscribe((risposta) => {
      this.recensioni = risposta.data;
      console.log("Recensioni: ", this.recensioni);
      
      this.recensioni

      this.hasRecensione = this.recensioni.some((item: any) => item.visitatore.email === 'mariorossi@gmail.com');
    });
  }
}
