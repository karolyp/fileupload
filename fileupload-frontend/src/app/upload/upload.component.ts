import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isHovering: boolean;
  files: File[] = [];
  filenames: Set<string> = new Set<string>();

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    this.addFiles(files);
  }

  onChangeEvent($event): void {
    this.addFiles($event.target.files);
  }

  removeFile(file: File): void {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
      this.filenames.delete(file.name);
    }
  }

  addFiles(filesToUpload: FileList): void {
    if (filesToUpload.length > 10 || this.files.length >= 10) {
      this.snackBar.open('Legfeljebb 10 fájl tölthető fel egyszerre!', null, {
        duration: 1500
      });
      return;
    }
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload.item(i);
      if (!this.filenames.has(file.name)) {
        this.filenames.add(file.name);
        this.files.push(file);
      } else {
        console.log('asdasd nono');
        this.snackBar.open('Már van ilyen nevű fájl!', null, {
          duration: 1500
        });
      }
    }
  }

  getFileType(file: File): string {
    let fileType = 'Ismeretlen fájl';
    const tokens = file.name.split('.');
    if (tokens.length > 1) {
      const extension = tokens[tokens.length - 1];
      fileType = `${extension.toUpperCase()}-fájl`;
    }
    return fileType;
  }

  doUpload($event: MouseEvent) {
    console.log('pressed');
  }
}
