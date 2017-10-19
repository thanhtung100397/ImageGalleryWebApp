# ImageGalleryWebApp

Web app quản lí và chia sẻ hình ảnh
Công nghệ sử dụng: 
1. FrontEnd: Angular 2 
2. BackEnd: Firebase
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

|- e2e/<br />
  |----- app.e2e-spec.ts<br />
  |----- app.po.ts<br />
  |----- tsconfig.e2e.json<br />
<br />
|- node_modules/<br />
<br />
|- dist/<br />
<br />
|- src/<br />
  |----- app/<br />
  |----- assets/<br />
  |----- environments/<br />
      |----- environment.prod.ts|ts<br />
  |----- favicon.ico<br />
  |----- index.html<br />
  |----- main.ts<br />
  |----- polyfills.ts<br />
  |----- styles.css<br />
  |----- test.ts<br />
  |----- tsconfig.app.json<br />
  |----- tsconfig.spec.json<br />
  |----- typings.d.ts<br />
<br />
|- .angular-cli.json<br />
|- .editorconfig<br />  
|- .gitignore<br />
|- firebase.json<br />
|- karma.conf.js<br />
|- package.json<br />
|- protractor.conf.js<br />
|- README.md<br />
|- tsconfig.json<br />
|- tslint.json<br />

## Backend
Sử dụng Firebase (Google's mobile platform) làm backend cho ứng dụng
Các tính năng sử dụng:
1. Firebase Authentication: Xác minh người dùng
2. Realtime Database: Database NoSQL thời gian thực
3. Cloud Storage: Host upload các file (ảnh)
4. Hosting: Host để deploy web app
5. Cloud Functions: Tạo các trigger cho realtime database, cloud storage
