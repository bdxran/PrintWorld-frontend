import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../services/category.service";
import {SubCategory} from "../../services/sub-category.service";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-model-modify',
  templateUrl: './model-modify.component.html',
  styleUrls: ['./model-modify.component.css']
})
export class ModelModifyComponent implements OnInit {

  public categories: Category[] = [
    // @ts-ignore
    {id: 0, name: "Object"},
    // @ts-ignore
    {id: 1, name: "Object1"},
    // @ts-ignore
    {id: 2, name: "Object2"},
    // @ts-ignore
    {id: 3, name: "Object3"}
  ];
  public subCategories: SubCategory[] = [
    // @ts-ignore
    {id: 0, name: "Object"},
    // @ts-ignore
    {id: 1, name: "Object1"},
    // @ts-ignore
    {id: 2, name: "Object2"},
    // @ts-ignore
    {id: 3, name: "Object3"}
  ];
  public filePaths = new Map();
  public images = new Map();
  public imagesTmp = new Map();
  public imageIds = new Map();
  public index: number = 1;
  private modelsJson: any;
  public model: Model = {} as Model;
  public countImage: number;

  public modelForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    numberElement: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    zip: new FormControl(),
    photoFile: new FormControl()
  })

  public imageUpload = new FormGroup({
    img: new FormControl(),
  })

  constructor(private router: Router, private routerActive: ActivatedRoute,
              private modelService: ModelService, public fb: FormBuilder,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    let id = this.routerActive.snapshot.paramMap.get("id");
    console.log(id);

    this.modelService.findModelById(id).subscribe(
      data => {
        this.modelsJson = JSON.stringify(data);
        this.model = JSON.parse(this.modelsJson);
        this.countImage = this.model["imageIds"]?.length;

        for (let idImage of this.model["imageIds"]) {
          this.imageService.getImage(idImage).subscribe(
            data => {
              let imageJson = JSON.stringify(data);
              let image = JSON.parse(imageJson);
              var imageName = image["name"] + "." + image["extension"];

              this.imageService.downloadImage(idImage).subscribe(
                data => {
                  console.log("Name image :" + imageName);

                  let b: any = data;
                  //A Blob() is almost a File() - it's just missing the two properties below which we will add
                  b.lastModifiedDate = new Date();
                  b.name = imageName;
                  let file = <File>data;

                  this.images.set(this.index, file);
                  this.patchValue(file);
                  this.imageUpload.get('img').updateValueAndValidity();

                  const reader = new FileReader();
                  reader.onload = () => {
                    this.filePaths.set(this.index, reader.result as string);
                    this.index++;
                  }
                  reader.readAsDataURL(file);

                  this.images.set(this.index, file);
                  this.imageIds.set(this.index, idImage);
                }
              );
            });
        }


        // @ts-ignore
        this.modelForm = this.fb.group({
          name: [this.model["name"]],
          description: [this.model["description"]],
          numberElement: [this.model["numberElement"]],
          category: [this.model["categoryId"]],
          subCategory: [this.model["subCategoryIds"]],
          zip: new FormControl(),
          photoFile: [this.model["imageIds"]],
        });
      },
      error => {
        console.log(error);
      })
  }

  public imagePreview(event: Event) {
    console.log("Preview image " + this.index);
    const file = (event.target as HTMLInputElement).files[0];

    this.images.set(this.index, file);
    this.imagesTmp.set(this.index, file["name"]);
    console.log("Name image : " + this.imagesTmp.get(this.index));

    this.patchValue(file);

    this.imageUpload.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.set(this.index, reader.result as string);
      this.uploadImage();
      this.index++;
    }
    reader.readAsDataURL(file);
  }

  private patchValue(image: File) {
    this.imageUpload.patchValue({
      img: image
    });
  }

  private uploadImage() {
    console.log("Upload Image")
    var formData: any = new FormData();
    formData.append("image", this.imageUpload.get("img").value);

    this.imageService.uploadImage(formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  public counter(index: number) {
    return new Array(index);
  }

  public remove(count: number) {
    console.log("Delete image : " + count);
    this.images.delete(count);
    this.filePaths.delete(count);
    this.imagesTmp.delete(count);
    for (let i = count; i < this.images.size + 1; i++) {
      this.images.set(i, this.images.get(i + 1));
      this.filePaths.set(i, this.filePaths.get(i + 1));
      this.imagesTmp.set(i, this.imagesTmp.get(i + 1));
    }
    this.countImage--;
    this.index--;
    if (this.imageIds.get(count) != undefined) {
      this.imageService.delete(this.imageIds.get(count))
    }
  }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.modelForm.patchValue({
      zip: file
    });
    this.modelForm.get('zip').updateValueAndValidity()
  }

  get formValue() {
    return this.modelForm.controls;
  }

  public modifyModel() {
    console.log("Modify Model")
    let model = new Model(this.model["id"], this.modelForm.get("name").value, this.modelForm.get("description").value,
      this.model["nameFile"], undefined, this.modelForm.get("numberElement").value, this.model["note"],
      this.model["size"], this.modelForm.get("category").value, this.modelForm.get("subCategory").value)
    let modelJson = JSON.stringify(model)
    var formData: any = new FormData();
    if (this.modelForm.get("zip") != null) {
      console.log("Pass new model file : " + this.modelForm.get("zip").value);
      formData.append("file", this.modelForm.get("zip").value);
    } else {
      formData.append("file", null);
    }
    let realSizeImageTmp = this.imagesTmp.size + this.countImage + 1;
    for (let i = this.countImage + 1; i < realSizeImageTmp; i++) {
      console.log(this.imagesTmp.get(i));
      formData.append("images", this.imagesTmp.get(i));
    }
    formData.append("model", modelJson);

    this.modelService.modifyModel(formData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
