import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created';
  serverName = '';
  serverCreated = false;
  servers = ['TestServer 1', 'TestServer 2'];
  constructor() {
      setTimeout(() => {
        this.allowNewServer = true;
      }, 2000);
  }

  ngOnInit() {
  }

  changeInput($event: Event) {
      this.serverName = ($event.target as HTMLInputElement).value;
  }

  onCreateServer() {
      this.serverCreated = true;
      this.servers.push(this.serverName);
      this.serverCreationStatus = `Server was created ${this.serverName}`;
  }
}
