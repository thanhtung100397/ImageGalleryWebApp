# ImageGalleryWebApp

Web app quản lí và chia sẻ hình ảnh
Nhóm 1  - Lớp thực hành số 1 môn phát triển ứng dụng web INT3306 3
# Member
1.Trần Thanh Tùng (Nhóm Trưởng)

2 Bùi Quang Trường

3. Phạm Quang Trường

4.Đỗ Xuân Toàn

5.Nguyễn Vân Hải

## Development server

1. Chạy `ng serve` start local server. 
2. Vào đường dẫn `http://localhost:4200/` trên trình duyệt

## Hosting

Web được trên trên firebase Hosting
https://imagegallery-476df.firebaseapp.com/app-home

## Struture

|- e2e/
  |----- app.e2e-spec.ts
  |----- app.po.ts
  |----- tsconfig.e2e.json

|- node_modules/

|- dist/

|- src/
  |----- app/
  |----- assets/
  |----- environments/
      |----- environment.prod.ts|ts
  |----- favicon.ico
  |----- index.html
  |----- main.ts
  |----- polyfills.ts
  |----- styles.css
  |----- test.ts
  |----- tsconfig.app.json
  |----- tsconfig.spec.json
  |----- typings.d.ts

|- .angular-cli.json 
|- .editorconfig    
|- .gitignore
|- firebase.json
|- karma.conf.js
|- package.json
|- protractor.conf.js
|- README.md
|- tsconfig.json
|- tslint.json

#Database 
Sử dụng Firebase (Google's mobile platform) làm backend cho ứng dụng
Các tính năng sử dụng:
1. Firebase Authentication: Xác minh người dùng
2. Realtime Database: Database NoSQL thời gian thực
3. Cloud Storage: Host upload các file (ảnh)
4. Hosting: Host để deploy web app
5. Cloud Functions: Tạo các trigger cho realtime database, cloud storage
