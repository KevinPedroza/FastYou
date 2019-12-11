import { Component, OnInit } from '@angular/core';
import { MainService } from './../service/main.service';
import { Song } from './../service/model';
import { HttpClientModule } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  lista: Song[] = [];
  lista2: Song[] = [];
  song: string;
  closeResult: string;

  constructor(private mainService: MainService, private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  setVideo(video: string){
    sessionStorage.clear();
    video = video.replace("watch?v=", "embed/")
    sessionStorage.setItem("video", video);
  }
  
  getVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(sessionStorage.getItem("video"));
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getVideos(name) {
    this.mainService.getVideos(name).subscribe(videos => {
      this.lista = videos;

      const result = [];
      const map = new Map();

      for (const item of this.lista) {
        if (!map.has(item.img) && !map.has(item.video)) {
          map.set(item.img, true); 
          map.set(item.video, true);    // set any value to Map
          result.push({
            video: item.video,
            name: item.name,
            img: item.img
          });
        }
      }

      this.lista = result;

    });
  }

}
