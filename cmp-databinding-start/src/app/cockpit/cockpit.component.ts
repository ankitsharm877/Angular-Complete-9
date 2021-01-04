import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent{
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent:string}>();
  @Output('bpCreated') blueCreated = new EventEmitter<{serverName: string, serverContent:string}>();
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput',{static:true}) serverContentInput : ElementRef;

  onAddServer(serverNameInput) {
  /*  this.serverCreated.emit({
    serverName: this.newServerName, serverContent:this.newServerContent
   }); */
   this.serverCreated.emit({
    serverName: serverNameInput.value, serverContent:this.serverContentInput.nativeElement.value
   });
  }

  onAddBlueprint(serverNameInput) {
    /* this.blueCreated.emit({
      serverName: this.newServerName, serverContent:this.newServerContent
     }); */
     this.blueCreated.emit({
      serverName: serverNameInput.value, serverContent:this.serverContentInput.nativeElement.value
     });
  }

}
