import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TemplateService } from '../../app/services/template.service';

@Component({
  selector: 'template-home',
  templateUrl: 'template-home.html',
  styleUrls: ['template-home.scss'],
})
export class TemplateHome implements OnInit {

  constructor(private templatesService: TemplateService, private alertCtrl: AlertController, private navCtrl: NavController){

  }

  ngOnInit(){
    this.templatesService.load();
  }

  addTemplate(){

    this.alertCtrl.create({
      header: 'New template',
      message: 'What should the name of this template be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }

      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
           // this.templatesService.createTemplate(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

}
