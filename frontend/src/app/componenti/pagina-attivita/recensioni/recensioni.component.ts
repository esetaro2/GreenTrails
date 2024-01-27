import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecensioneService } from 'src/app/servizi/recensione.service';
import { UploadService } from 'src/app/servizi/upload.service';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioniComponent implements OnInit {

  constructor(public dialog: MatDialog, config: NgbRatingConfig, private recensioneService: RecensioneService, private route: ActivatedRoute,
    private uploadService: UploadService, private cookieService: CookieService) {
    config.max = 5;
    config.readonly = true;
  }

  recensioni: any;
  idAttivita: number = 0;
  hasRecensione: boolean = false;
  isGestore: boolean = false;
  imageUrls: string[] = [];
  fileNames: string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAttivita = +params['id'];
    })
    this.visualizzaListaRecensioni();
  }

  visualizzaListaRecensioni(): void {

    this.recensioneService.visualizzaRecensioniPerAttivita(this.idAttivita).subscribe((recensione) => {
      this.recensioni = recensione.data;

      const promises = this.recensioni.map((item: any, index: number) => {
        return new Promise<void>((resolve) => {
          this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
            if (listaFiles.data.length > 0) {
              const fileName = listaFiles.data[0];
              this.uploadService.serviFile(item.media, fileName).subscribe((file) => {
                this.fileNames.push(fileName);
      
                let reader = new FileReader();
                reader.onloadend = () => {
                  this.imageUrls[index] = reader.result as string;
                  resolve();
                };
                reader.readAsDataURL(file);
              });
            } else {
              resolve();
            }
          });
        });
      });

      console.log(this.cookieService.get('ruolo'));
      this.hasRecensione = this.recensioni.some((item: any) => item.visitatore.email === this.cookieService.get('email').replace(/"/g, ''));
      this.isGestore = this.cookieService.get('ruolo') === 'ROLE_GESTORE_ATTIVITA'
    });
  }

  isImage(file: string): boolean {
    return file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png');
  }

  isVideo(file: string): boolean {
    return file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.avi') || file.toLowerCase().endsWith('.mov');
  }

  openDialogue(index: number) {
    const fileName = this.fileNames[index];
    if (this.isImage(fileName)) {
      const dialogRef = this.dialog.open(GalleryDialogComponent, {
        data: {
          image: this.imageUrls[index]
        }
      });
    } else if (this.isVideo(fileName)) {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        data: {
          video: this.imageUrls[index]
        }
      });
    } else {
      // console.error(`Unsupported file type: ${fileName}`);
    }
  }
}