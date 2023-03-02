import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: User[] = [];
  selectedUser: any;
  showEditModal = false;
  visible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users) => (this.users = users));
  }
  editUser(user: User) {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }
  submitUser() {
    // Update the user on the server and then update the local user list
    this.http
      .put(
        `https://jsonplaceholder.typicode.com/users/${this.selectedUser.id}`,
        this.selectedUser
      )
      .subscribe(() => {
        const index = this.users.findIndex(
          (user) => user.id === this.selectedUser.id
        );
        this.users[index] = this.selectedUser;
        this.cancelEdit();
      });
  }
  cancelEdit() {
    this.selectedUser = null;
    this.showEditModal = false;
  }
  deleteUser(user: User) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Find the index of the user in your user list
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index >= 0) {
        // Remove the user from the list
        this.users.splice(index, 1);
        // Reset the selected user and the edit modal flag
        this.selectedUser = null;
        this.showEditModal = false;
      }
    }
  }

  showData() {
    this.visible = !this.visible;
  }
}
