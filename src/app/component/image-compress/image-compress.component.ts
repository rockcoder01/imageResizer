import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
selector: 'app-image-compress',
templateUrl: './image-compress.component.html',
styleUrls: ['./image-compress.component.scss']
})

export class ImageCompressComponent implements OnInit {

  constructor(private imageCompress: NgxImageCompressService) {

   }

file: any;
localUrl: any;
qualityImages:number= 100;
localCompressedURl:any;
imgResultBeforeCompress:string= '';
imgResultAfterCompress:string ='';
sizeOfOriginalImage:number = 0;
sizeOFCompressedImage:number= 0;
fileName:string='Select File';
ngOnInit() {
}

formatLabel(value: number) {
 return value;

}

selectFile(event: any) {
this.file = event.target.files[0];
this.fileName = this.file['name'];
if (event.target.files && event.target.files[0]) {
var reader = new FileReader();
reader.onload = (event: any) => {
this.localUrl = event.target.result;
this.sizeOfOriginalImage = this.imageCompress.byteCount(this.localUrl)/(1024);

}

reader.readAsDataURL(event.target.files[0]);
}

}

compressFile(image:any,fileName:any) {
var orientation = -1;
// this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024);
console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
this.imageCompress.compressFile(image, orientation,  50, this.qualityImages).then(
result => {
this.imgResultAfterCompress = result;
this.localCompressedURl = result;
this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024)
console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
// create file from byte
const imageName = fileName;
// call method that creates a blob from dataUri
const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
//imageFile created below is the new compressed file which can be send to API in form data
const imageFile = new File([result], imageName, { type: 'image/jpeg' });
});}


fileSizeChange(sliderValue:any) {
  this.qualityImages = sliderValue;
 this.compressFile(this.localUrl,this.fileName);
 console.log('check the quality of images',this.qualityImages)
}

dataURItoBlob(dataURI:any) {
const byteString = window.atob(dataURI);
const arrayBuffer = new ArrayBuffer(byteString.length);
const int8Array = new Uint8Array(arrayBuffer);
for (let i = 0; i < byteString.length; i++) {
int8Array[i] = byteString.charCodeAt(i);
}

const blob = new Blob([int8Array], { type: 'image/jpeg' });
return blob;
}


fileDownload(){
 
    // const downloadLink = document.createElement("a");
    //  downloadLink.href = this.localCompressedURl;
    //  downloadLink.download = this.fileName;
    //  downloadLink.click();
     window.location.href =  this.localCompressedURl;

     console.log('here is the file details ',this.localCompressedURl )
}

}