import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  year: number = 0;
  title: string = "";
  movieId: string = "";

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
      //Get all Movies
      onGetMovies() {
        this.dbService.getMovies().subscribe((data: any[]) => {
          this.moviesDB = data;
        });
      }
      //Create a new Movie, POST request
      onSaveMovie() {
        let obj = { title: this.title, year: this.year };
        this.dbService.createMovie(obj).subscribe(result => {
          this.onGetMovies();
        });
      }
      // Update a Movie
      onSelectUpdateMovie(item) {
        this.title = item.title;
        this.year = item.year;
        this.movieId = item._id;
      }
      onUpdateMovie() {
        let obj = { title: this.title, year: this.year };
        this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
          this.onGetMovies();
        });
      }
    
      //Delete Movie
      onDeleteMovie(item) {
        this.dbService.deleteMovie(item._id).subscribe(result => {
          this.onGetMovies();
        });
      }
      onDeleteMovieByYear(year) {
        for (let i = 0; i < this.moviesDB.length; i++) {
          let item = this.moviesDB[i];
          if (this.moviesDB[i].year < year){
            this.dbService.deleteMovie(item._id).subscribe(result => {
            this.onGetMovies();
            });
          }
        }
      }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}