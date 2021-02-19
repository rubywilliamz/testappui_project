import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProviderService } from '../api-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profileData: any = [];
  username: any;
  constructor(private apiProvider: ApiProviderService, private router: Router) { }

  ngOnInit(): void {
   
    this.getProfileData();
  }
  
 getProfileData() { 
 
   this.profileData = [];
  this. apiProvider.getData(this.apiProvider.getUserApi).subscribe((res: any) => {
    console.log('er', res.data.userData)
  this.profileData.push(res.data.userData) ;
  this.profileData.forEach((element: any) => {
    this.username = element.username;
  });
  
  console.log('profileData', this.profileData)
  })
 }
 logoutUser() {
   localStorage.clear();
   this.profileData = [];
   this.router.navigate(['/login']);
 }


}
