import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];
  currentPage: number;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onNextPage() {
    this.router.navigate([], {
      queryParams: { page: ++this.currentPage },
      fragment: 'loading',
    });
  }

  onPreviousPage() {
    this.router.navigate([], {
      queryParams: { page: --this.currentPage },
      fragment: 'loading',
    });
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
    this.route.queryParams.subscribe(
      (params) => (this.currentPage = params['page'] || 1)
    );
  }

  onReload() {
    this.router.navigate(['/servers'], { relativeTo: this.route });
  }
}
