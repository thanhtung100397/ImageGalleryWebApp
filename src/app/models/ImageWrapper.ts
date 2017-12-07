import {Image} from './Image';

export class ImageWrapper {
  image: Image;
  path: string;


  constructor(image: Image, path: string) {
    this.image = image;
    this.path = path;
  }
}
