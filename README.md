# Quiz App

Ứng dụng trắc nghiệm trực tuyến được xây dựng bằng React.

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng ở môi trường development
npm start

# Tạo database mẫu
npm run generate-db

# Chạy json-server
npm run server
```

## Deployment lên Vercel

1. Đăng ký tài khoản tại [Vercel](https://vercel.com)
2. Cài đặt Vercel CLI:
```bash
npm install -g vercel
```

3. Login vào Vercel:
```bash
vercel login
```

4. Deploy lên Vercel:
```bash
vercel
```

Hoặc bạn có thể deploy trực tiếp từ GitHub:
1. Push code lên GitHub
2. Đăng nhập vào Vercel
3. Click "New Project"
4. Chọn repository từ GitHub
5. Click "Deploy"

## Cấu trúc Database

Database được tạo tự động bằng script `generateQuestions.js`. File `db.json` chứa dữ liệu mẫu và không được đẩy lên GitHub.

## Môi trường Development

- Frontend: http://localhost:3000
- Backend (json-server): http://localhost:3001
