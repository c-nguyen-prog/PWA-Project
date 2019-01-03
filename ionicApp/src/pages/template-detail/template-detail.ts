
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TemplatesService } from '../../app/services/templates.service';
import { Template } from '../../app/interfaces/template';

@Component({
  selector: 'template-detail',
  templateUrl: './template-detail.html',
  styleUrls: ['./template-detail.scss'],
})
export class templateDetailPage implements OnInit {

  private template: Template;

  constructor(private route: ActivatedRoute, private templatesService: TemplatesService, private navCtrl: NavController) {

    // Initialise a placeholder note until the actual note can be loaded in
    this.template = {

    destination: '', //iban
    recipient:'',
    amount: 0,
    reference: '',
      id: ''
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let templateId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.templatesService.loaded){
      this.template = this.templatesService.getTemplate(templateId)
    } else {
      this.templatesService.load().then(() => {
        this.template = this.templatesService.getTemplate(templateId)
      });
    }

  }

  templateChanged(){
    this.templatesService.save();
  }

  deleteTemplate(){
    this.templatesService.deleteTemplate(this.template);
    this.navCtrl.navigateBack('/templates');
  }

}
