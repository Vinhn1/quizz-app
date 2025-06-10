import { writeFileSync } from 'fs';

// Dữ liệu mẫu cho các chủ đề
const topics = [
  { id: "1", name: "HTML", description: "Kiến thức cơ bản về HTML5, semantic elements, forms, và best practices" },
  { id: "2", name: "CSS", description: "CSS3 features, flexbox, grid, animations, và responsive design" },
  { id: "3", name: "JavaScript", description: "JavaScript fundamentals, ES6+, async programming, và DOM manipulation" },
  { id: "4", name: "ReactJS", description: "React components, props, state, hooks, và component lifecycle" },
  { id: "5", name: "TypeScript", description: "TypeScript fundamentals, type system, interfaces, và generics" },
  { id: "6", name: "Web Performance", description: "Performance optimization, lazy loading, code splitting, và caching" },
  { id: "7", name: "Testing", description: "Unit testing, integration testing, debugging tools, và best practices" },
  { id: "8", name: "State Management", description: "Redux, Context API, Zustand, và state management patterns" },
  { id: "9", name: "CSS Frameworks", description: "Tailwind CSS, Bootstrap, Material UI, và custom theming" },
  { id: "10", name: "Web Security", description: "XSS, CSRF, authentication, authorization, và security best practices" },
  { id: "11", name: "Build Tools", description: "Webpack, Vite, Babel, và modern build tooling" },
  { id: "12", name: "API Integration", description: "REST APIs, GraphQL, Axios, và data fetching patterns" },
  { id: "13", name: "PWA", description: "Service Workers, PWA features, offline support, và app-like experience" },
  { id: "14", name: "Accessibility", description: "WCAG guidelines, ARIA attributes, và accessible design patterns" },
  { id: "15", name: "Next.js", description: "React framework cho SSR, SSG, routing, và tối ưu hóa SEO" },
  { id: "16", name: "Vue.js", description: "Kiến thức về Vue, component, directive, Vue CLI, Vuex" },
  { id: "17", name: "Angular", description: "Kiến thức về Angular, module, service, dependency injection, RxJS" },
  { id: "18", name: "SASS/SCSS", description: "CSS preprocessor, biến, mixin, nesting, extend" },
  { id: "19", name: "GraphQL", description: "Query language cho API, schema, resolver, mutation, subscription" },
  { id: "20", name: "JAMstack", description: "Kiến trúc web hiện đại: JavaScript, API, Markup" },
  { id: "21", name: "ESLint", description: "Linting, code style, rule, config, plugin cho JavaScript/TypeScript" },
  { id: "22", name: "Storybook", description: "Phát triển UI component độc lập, documentation, testing" },
  { id: "23", name: "Authentication", description: "Đăng nhập, xác thực, OAuth, JWT, bảo mật phiên" },
  { id: "24", name: "i18n", description: "Quốc tế hóa, đa ngôn ngữ, dịch giao diện, format số/ngày" },
  { id: "25", name: "Mobile Web", description: "Tối ưu hóa giao diện, touch event, viewport, mobile-first" },
  { id: "26", name: "SVG & Canvas", description: "Đồ họa vector, vẽ hình, animation, tương tác trên web" },
  { id: "27", name: "WebSockets", description: "Realtime communication, socket, event, push notification" },
  { id: "28", name: "SEO", description: "Tối ưu hóa công cụ tìm kiếm, meta tag, sitemap, robots.txt" },
  { id: "29", name: "Micro Frontends", description: "Kiến trúc chia nhỏ frontend, deploy độc lập, integration" },
  { id: "30", name: "WebAssembly", description: "Chạy code native trên web, hiệu năng cao, tích hợp JS" },
  { id: "31", name: "Performance Auditing", description: "Đánh giá hiệu năng, Lighthouse, Web Vitals, phân tích" },
  { id: "32", name: "Form Validation", description: "Kiểm tra dữ liệu form, error message, UX cho form" },
  { id: "33", name: "CMS", description: "Content Management System, quản lý nội dung, headless" },
  { id: "34", name: "Progressive Enhancement", description: "Cải tiến dần, hỗ trợ trình duyệt cũ, fallback" },
  { id: "35", name: "Animation Libraries", description: "Thư viện animation: GSAP, Framer Motion, hiệu ứng UI" },
  { id: "36", name: "Package Managers", description: "npm, yarn, pnpm, quản lý dependency, script" },
  { id: "37", name: "Monorepo Tools", description: "Quản lý nhiều project: Nx, Turborepo, workspace" }
];

// Template câu hỏi cho từng chủ đề
const questionTemplates = {
  HTML: [
    "Thẻ HTML nào được sử dụng để {action}?",
    "Thuộc tính HTML nào được dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong HTML?",
    "Trong HTML, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} trong HTML5?"
  ],
  CSS: [
    "Thuộc tính CSS nào được sử dụng để {action}?",
    "Cách nào sau đây là đúng để {action} trong CSS?",
    "Trong CSS, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với CSS3?",
    "Thuộc tính nào sau đây được dùng để {action}?"
  ],
  JavaScript: [
    "Phương thức JavaScript nào được sử dụng để {action}?",
    "Cách nào sau đây là đúng để {action} trong JavaScript?",
    "Trong JavaScript, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với ES6?",
    "Hàm nào sau đây được dùng để {action}?"
  ],
  ReactJS: [
    "Hook React nào được sử dụng để {action}?",
    "Cách nào sau đây là đúng để {action} trong React?",
    "Trong React, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với React Hooks?",
    "Component nào sau đây được dùng để {action}?"
  ],
  TypeScript: [
    "Từ khóa nào trong TypeScript dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong TypeScript?",
    "Trong TypeScript, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với TypeScript?",
    "Kiểu dữ liệu nào phù hợp để {action}?"
  ],
  "Web Performance": [
    "Kỹ thuật nào giúp {action} trong web?",
    "Cách nào sau đây giúp {action} hiệu quả?",
    "Trong tối ưu hiệu năng, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} cho website?",
    "Công cụ nào hỗ trợ {action}?"
  ],
  Testing: [
    "Công cụ nào dùng để {action} trong frontend?",
    "Cách nào sau đây là đúng để {action} khi test?",
    "Trong kiểm thử, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với unit test?",
    "Thư viện nào hỗ trợ {action}?"
  ],
  "State Management": [
    "Thư viện nào dùng để {action} trong React?",
    "Cách nào sau đây là đúng để {action} state?",
    "Trong quản lý state, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Redux?",
    "API nào hỗ trợ {action}?"
  ],
  "CSS Frameworks": [
    "Framework nào dùng để {action} nhanh chóng?",
    "Cách nào sau đây là đúng để {action} với Bootstrap?",
    "Trong Tailwind, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Material UI?",
    "Class nào hỗ trợ {action}?"
  ],
  "Web Security": [
    "Kỹ thuật nào giúp {action} cho web?",
    "Cách nào sau đây là đúng để {action} bảo mật?",
    "Trong bảo mật, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với XSS?",
    "Công cụ nào hỗ trợ {action}?"
  ],
  "Build Tools": [
    "Công cụ nào dùng để {action} trong frontend?",
    "Cách nào sau đây là đúng để {action} với Webpack?",
    "Trong Vite, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Babel?",
    "Plugin nào hỗ trợ {action}?"
  ],
  "API Integration": [
    "Thư viện nào dùng để {action} API?",
    "Cách nào sau đây là đúng để {action} dữ liệu?",
    "Trong frontend, {action} API được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với REST API?",
    "Công cụ nào hỗ trợ {action}?"
  ],
  PWA: [
    "Kỹ thuật nào giúp {action} cho PWA?",
    "Cách nào sau đây là đúng để {action} offline?",
    "Trong PWA, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Service Worker?",
    "API nào hỗ trợ {action}?"
  ],
  Accessibility: [
    "Kỹ thuật nào giúp {action} cho website?",
    "Cách nào sau đây là đúng để {action} với ARIA?",
    "Trong WCAG, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} cho người khuyết tật?",
    "Thuộc tính nào hỗ trợ {action}?"
  ],
  "Next.js": [
    "API nào của Next.js dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong Next.js?",
    "Trong Next.js, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Next.js?",
    "Component nào hỗ trợ {action}?"
  ],
  "Vue.js": [
    "Directive nào của Vue dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong Vue.js?",
    "Trong Vue.js, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Vue CLI?",
    "Component nào hỗ trợ {action}?"
  ],
  Angular: [
    "Service nào của Angular dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong Angular?",
    "Trong Angular, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với RxJS?",
    "Component nào hỗ trợ {action}?"
  ],
  "SASS/SCSS": [
    "Mixin nào dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong SASS/SCSS?",
    "Trong SCSS, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với biến?",
    "Hàm nào hỗ trợ {action}?"
  ],
  GraphQL: [
    "Query nào dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong GraphQL?",
    "Trong GraphQL, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với mutation?",
    "API nào hỗ trợ {action}?"
  ],
  JAMstack: [
    "Công nghệ nào dùng để {action} trong JAMstack?",
    "Cách nào sau đây là đúng để {action} với JAMstack?",
    "Trong JAMstack, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với API?",
    "Tool nào hỗ trợ {action}?"
  ],
  ESLint: [
    "Rule nào của ESLint dùng để {action}?",
    "Cách nào sau đây là đúng để {action} với ESLint?",
    "Trong ESLint, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với config?",
    "Plugin nào hỗ trợ {action}?"
  ],
  Storybook: [
    "API nào của Storybook dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong Storybook?",
    "Trong Storybook, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với UI component?",
    "Addon nào hỗ trợ {action}?"
  ],
  Authentication: [
    "Phương pháp nào dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong frontend?",
    "Trong xác thực, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với OAuth?",
    "API nào hỗ trợ {action}?"
  ],
  i18n: [
    "Thư viện nào dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong i18n?",
    "Trong i18n, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với đa ngôn ngữ?",
    "API nào hỗ trợ {action}?"
  ],
  "Mobile Web": [
    "Kỹ thuật nào dùng để {action} trên mobile?",
    "Cách nào sau đây là đúng để {action} cho mobile web?",
    "Trong mobile web, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với touch event?",
    "API nào hỗ trợ {action}?"
  ],
  "SVG & Canvas": [
    "API nào dùng để {action} với SVG?",
    "Cách nào sau đây là đúng để {action} trên Canvas?",
    "Trong SVG, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với đồ họa web?",
    "Hàm nào hỗ trợ {action}?"
  ],
  WebSockets: [
    "API nào dùng để {action} với WebSockets?",
    "Cách nào sau đây là đúng để {action} trong realtime web?",
    "Trong WebSockets, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với socket?",
    "Event nào hỗ trợ {action}?"
  ],
  SEO: [
    "Thẻ nào dùng để {action} cho SEO?",
    "Cách nào sau đây là đúng để {action} trong SEO?",
    "Trong SEO, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với meta tag?",
    "Công cụ nào hỗ trợ {action}?"
  ],
  "Micro Frontends": [
    "Kỹ thuật nào dùng để {action} trong micro frontends?",
    "Cách nào sau đây là đúng để {action} với micro frontend?",
    "Trong micro frontend, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với integration?",
    "Tool nào hỗ trợ {action}?"
  ],
  WebAssembly: [
    "Ngôn ngữ nào dùng để {action} với WebAssembly?",
    "Cách nào sau đây là đúng để {action} trong WebAssembly?",
    "Trong WebAssembly, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với JS?",
    "API nào hỗ trợ {action}?"
  ],
  "Performance Auditing": [
    "Công cụ nào dùng để {action} hiệu năng?",
    "Cách nào sau đây là đúng để {action} với Lighthouse?",
    "Trong auditing, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Web Vitals?",
    "API nào hỗ trợ {action}?"
  ],
  "Form Validation": [
    "Thư viện nào dùng để {action} form?",
    "Cách nào sau đây là đúng để {action} trong form validation?",
    "Trong form, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với error message?",
    "API nào hỗ trợ {action}?"
  ],
  CMS: [
    "CMS nào dùng để {action}?",
    "Cách nào sau đây là đúng để {action} trong CMS?",
    "Trong CMS, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với headless CMS?",
    "API nào hỗ trợ {action}?"
  ],
  "Progressive Enhancement": [
    "Kỹ thuật nào dùng để {action} progressive enhancement?",
    "Cách nào sau đây là đúng để {action} với trình duyệt cũ?",
    "Trong progressive enhancement, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với fallback?",
    "API nào hỗ trợ {action}?"
  ],
  "Animation Libraries": [
    "Thư viện nào dùng để {action} animation?",
    "Cách nào sau đây là đúng để {action} với GSAP?",
    "Trong animation, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với Framer Motion?",
    "API nào hỗ trợ {action}?"
  ],
  "Package Managers": [
    "Công cụ nào dùng để {action} dependency?",
    "Cách nào sau đây là đúng để {action} với npm?",
    "Trong package manager, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với yarn?",
    "Lệnh nào hỗ trợ {action}?"
  ],
  "Monorepo Tools": [
    "Tool nào dùng để {action} monorepo?",
    "Cách nào sau đây là đúng để {action} với Nx?",
    "Trong monorepo, {action} được thực hiện bằng cách nào?",
    "Đâu là cách đúng để {action} với workspace?",
    "API nào hỗ trợ {action}?"
  ]
};

// Các action cho từng chủ đề
const actions = {
  HTML: [
    "tạo form đăng nhập",
    "chèn hình ảnh",
    "tạo bảng dữ liệu",
    "tạo danh sách có thứ tự",
    "tạo liên kết"
  ],
  CSS: [
    "căn giữa phần tử",
    "tạo animation",
    "responsive design",
    "tạo gradient",
    "tạo shadow"
  ],
  JavaScript: [
    "xử lý sự kiện click",
    "tạo Promise",
    "lọc mảng",
    "xử lý bất đồng bộ",
    "tạo object"
  ],
  ReactJS: [
    "quản lý state",
    "tạo custom hook",
    "xử lý side effect",
    "tối ưu render",
    "tạo context"
  ],
  TypeScript: [
    "khai báo biến kiểu number",
    "định nghĩa interface",
    "sử dụng generic",
    "kiểm tra kiểu dữ liệu",
    "sử dụng enum"
  ],
  "Web Performance": [
    "tối ưu tốc độ tải trang",
    "giảm kích thước ảnh",
    "lazy load component",
    "cache dữ liệu",
    "minify code"
  ],
  Testing: [
    "viết unit test",
    "test component React",
    "mock API",
    "kiểm tra coverage",
    "debug lỗi"
  ],
  "State Management": [
    "quản lý state toàn cục",
    "dùng Redux",
    "dùng Context API",
    "tối ưu render",
    "reset state"
  ],
  "CSS Frameworks": [
    "tạo layout với Bootstrap",
    "tùy biến theme Material UI",
    "dùng utility class Tailwind",
    "import CSS framework",
    "override style"
  ],
  "Web Security": [
    "chống XSS",
    "bảo vệ CSRF",
    "mã hóa dữ liệu",
    "xác thực người dùng",
    "phân quyền truy cập"
  ],
  "Build Tools": [
    "bundle code với Webpack",
    "transpile code với Babel",
    "hot reload với Vite",
    "cấu hình build",
    "tối ưu build"
  ],
  "API Integration": [
    "fetch dữ liệu từ REST API",
    "gửi request với Axios",
    "xử lý response",
    "gọi GraphQL API",
    "handle error khi fetch"
  ],
  PWA: [
    "cài đặt Service Worker",
    "lưu cache offline",
    "hiển thị notification",
    "add to home screen",
    "kiểm tra manifest"
  ],
  Accessibility: [
    "thêm ARIA label",
    "tăng contrast màu",
    "hỗ trợ keyboard navigation",
    "đọc màn hình",
    "tối ưu cho người khiếm thị"
  ],
  "Next.js": [
    "tạo page mới",
    "fetch data server-side",
    "tối ưu SEO",
    "routing động",
    "triển khai production"
  ],
  "Vue.js": [
    "tạo component",
    "sử dụng directive",
    "quản lý state với Vuex",
    "routing với Vue Router",
    "build project"
  ],
  Angular: [
    "tạo service",
    "inject dependency",
    "quản lý state với RxJS",
    "routing module",
    "build project"
  ],
  "SASS/SCSS": [
    "tạo biến",
    "dùng mixin",
    "nesting selector",
    "import file",
    "kế thừa style"
  ],
  GraphQL: [
    "tạo query",
    "tạo mutation",
    "định nghĩa schema",
    "fetch data",
    "realtime subscription"
  ],
  JAMstack: [
    "triển khai site tĩnh",
    "kết nối API",
    "tối ưu build",
    "sử dụng CDN",
    "deploy lên Netlify"
  ],
  ESLint: [
    "bật rule lint",
    "fix lỗi code style",
    "cấu hình plugin",
    "ignore file",
    "tích hợp CI"
  ],
  Storybook: [
    "tạo story mới",
    "test UI component",
    "tích hợp addon",
    "build static storybook",
    "viết documentation"
  ],
  Authentication: [
    "đăng nhập bằng Google",
    "xác thực JWT",
    "bảo vệ route",
    "lưu token",
    "logout user"
  ],
  i18n: [
    "dịch giao diện",
    "format số",
    "format ngày tháng",
    "chuyển đổi ngôn ngữ",
    "tải file dịch"
  ],
  "Mobile Web": [
    "tối ưu touch event",
    "thiết lập viewport",
    "responsive cho mobile",
    "tối ưu tốc độ tải",
    "ẩn thanh địa chỉ"
  ],
  "SVG & Canvas": [
    "vẽ hình tròn",
    "tạo animation SVG",
    "render text trên canvas",
    "xử lý sự kiện click",
    "import SVG"
  ],
  WebSockets: [
    "gửi message realtime",
    "nhận event từ server",
    "kết nối socket",
    "xử lý disconnect",
    "broadcast message"
  ],
  SEO: [
    "tối ưu meta tag",
    "tạo sitemap.xml",
    "tạo robots.txt",
    "tối ưu heading",
    "tối ưu tốc độ tải"
  ],
  "Micro Frontends": [
    "triển khai app con",
    "tích hợp shell app",
    "chia nhỏ codebase",
    "deploy độc lập",
    "giao tiếp giữa app"
  ],
  WebAssembly: [
    "biên dịch Rust sang wasm",
    "import wasm vào JS",
    "tối ưu hiệu năng",
    "gọi hàm wasm từ JS",
    "xử lý memory"
  ],
  "Performance Auditing": [
    "chạy Lighthouse",
    "đo Web Vitals",
    "phân tích performance",
    "tối ưu TTI",
    "kiểm tra CLS"
  ],
  "Form Validation": [
    "kiểm tra email hợp lệ",
    "hiển thị error message",
    "validate số điện thoại",
    "bắt buộc nhập trường",
    "validate password"
  ],
  CMS: [
    "tạo post mới",
    "quản lý user",
    "kết nối API headless",
    "tùy biến theme",
    "import/export dữ liệu"
  ],
  "Progressive Enhancement": [
    "thêm fallback cho JS",
    "cải tiến UI cho trình duyệt cũ",
    "tối ưu progressive loading",
    "hỗ trợ không có JS",
    "tối ưu accessibility"
  ],
  "Animation Libraries": [
    "tạo animation với GSAP",
    "tạo hiệu ứng hover",
    "animation scroll",
    "tích hợp Framer Motion",
    "tối ưu hiệu suất animation"
  ],
  "Package Managers": [
    "cài đặt package",
    "gỡ package",
    "chạy script",
    "update dependency",
    "tạo lockfile"
  ],
  "Monorepo Tools": [
    "tạo workspace mới",
    "chạy lệnh cho nhiều project",
    "tối ưu build monorepo",
    "tích hợp CI/CD",
    "quản lý dependency chung"
  ]
};

// Các câu trả lời cho từng chủ đề
const answers = {
  HTML: [
    ["<form>", "<input>", "<button>", "<div>"],
    ["<img>", "<image>", "<picture>", "<photo>"],
    ["<table>", "<grid>", "<list>", "<data>"],
    ["<ol>", "<ul>", "<li>", "<list>"],
    ["<a>", "<link>", "<href>", "<url>"]
  ],
  CSS: [
    ["margin: auto", "padding: auto", "text-align: center", "align: center"],
    ["@keyframes", "animation", "transition", "transform"],
    ["@media", "responsive", "flexible", "adaptive"],
    ["linear-gradient", "gradient", "color-mix", "blend"],
    ["box-shadow", "shadow", "drop-shadow", "text-shadow"]
  ],
  JavaScript: [
    ["addEventListener", "onClick", "click", "handleClick"],
    ["new Promise", "Promise", "async", "await"],
    ["filter", "map", "forEach", "reduce"],
    ["async/await", "Promise", "callback", "setTimeout"],
    ["{}", "[]", "new Object", "Object.create"]
  ],
  ReactJS: [
    ["useState", "useReducer", "useContext", "useRef"],
    ["useCustom", "customHook", "useHook", "createHook"],
    ["useEffect", "useLayoutEffect", "useCallback", "useMemo"],
    ["React.memo", "useMemo", "useCallback", "PureComponent"],
    ["createContext", "Context.Provider", "useContext", "Context.Consumer"]
  ],
  TypeScript: [
    ["let x: number", "let x = 5", "let x: string", "let x: boolean"],
    ["interface User {}", "type User = {}", "class User {}", "enum User {}"],
    ["Array<T>", "Array", "Object", "Set"],
    ["typeof x", "instanceof x", "isNaN(x)", "parseInt(x)"],
    ["enum Color {Red, Green}", "let color = 'red'", "const color = 1", "type Color = string"]
  ],
  "Web Performance": [
    ["nén ảnh", "tăng kích thước ảnh", "giảm contrast", "tăng font-size"],
    ["lazy load", "eager load", "preload", "reload"],
    ["cache", "no-cache", "clear cache", "reset cache"],
    ["minify code", "beautify code", "format code", "split code"],
    ["gzip", "brotli", "zip", "rar"]
  ],
  Testing: [
    ["Jest", "Mocha", "Chai", "Tất cả đáp án trên"],
    ["render", "mount", "shallow", "deep"],
    ["mock", "spy", "stub", "fake"],
    ["coverage", "debug", "log", "trace"],
    ["assert", "expect", "should", "must"]
  ],
  "State Management": [
    ["Redux", "MobX", "Context API", "Tất cả đáp án trên"],
    ["dispatch", "subscribe", "connect", "combineReducers"],
    ["useContext", "useState", "useEffect", "useRef"],
    ["memo", "useMemo", "useCallback", "useReducer"],
    ["reset", "clear", "remove", "delete"]
  ],
  "CSS Frameworks": [
    ["container", "row", "col", "grid"],
    ["theme", "palette", "color", "font"],
    ["bg-blue-500", "text-red-500", "p-4", "m-2"],
    ["import", "require", "include", "add"],
    ["override", "extend", "replace", "reset"]
  ],
  "Web Security": [
    ["escape", "sanitize", "validate", "encode"],
    ["token", "cookie", "session", "header"],
    ["hash", "encrypt", "decode", "parse"],
    ["login", "register", "logout", "profile"],
    ["admin", "user", "guest", "root"]
  ],
  "Build Tools": [
    ["webpack", "vite", "babel", "parcel"],
    ["transpile", "compile", "interpret", "execute"],
    ["hot reload", "live reload", "cold reload", "manual reload"],
    ["config", "setup", "install", "init"],
    ["optimize", "minimize", "maximize", "analyze"]
  ],
  "API Integration": [
    ["fetch", "axios", "XMLHttpRequest", "Tất cả đáp án trên"],
    ["GET", "POST", "PUT", "DELETE"],
    ["json", "xml", "csv", "txt"],
    ["GraphQL", "REST", "SOAP", "gRPC"],
    ["try/catch", "if/else", "switch", "for"]
  ],
  PWA: [
    ["service worker", "web worker", "shared worker", "none"],
    ["cache", "localStorage", "sessionStorage", "cookie"],
    ["notification", "alert", "prompt", "confirm"],
    ["manifest", "favicon", "robots.txt", "sitemap.xml"],
    ["install", "uninstall", "update", "remove"]
  ],
  Accessibility: [
    ["aria-label", "alt", "title", "placeholder"],
    ["contrast", "brightness", "saturation", "hue"],
    ["tabindex", "accesskey", "role", "id"],
    ["screen reader", "voice over", "narrator", "talkback"],
    ["WCAG", "WAI-ARIA", "Section 508", "Tất cả đáp án trên"]
  ],
  "Next.js": [
    ["getServerSideProps", "getStaticProps", "getInitialProps", "useEffect"],
    ["getServerSideProps", "useEffect", "componentDidMount", "useLayoutEffect"],
    ["Link", "Router", "Route", "Switch"],
    ["Dynamic Routing", "Static Routing", "Client Routing", "Hash Routing"],
    ["Vercel", "Netlify", "Heroku", "Firebase"]
  ],
  "Vue.js": [
    ["v-if", "v-for", "v-bind", "v-model"],
    ["v-bind", "v-model", "v-on", "v-slot"],
    ["Vuex", "Redux", "MobX", "Pinia"],
    ["Vue Router", "React Router", "Angular Router", "Express Router"],
    ["npm run build", "yarn build", "vue-cli-service build", "ng build"]
  ],
  Angular: [
    ["Injectable", "Component", "Directive", "Pipe"],
    ["constructor", "ngOnInit", "ngAfterViewInit", "ngOnDestroy"],
    ["RxJS", "Redux", "MobX", "Vuex"],
    ["RouterModule", "AppModule", "HttpClientModule", "FormsModule"],
    ["ng build", "npm run build", "yarn build", "ng serve"]
  ],
  "SASS/SCSS": [
    ["$color", "$font-size", "$spacing", "$border-radius"],
    ["@mixin", "@include", "@extend", "@function"],
    ["nesting", "parent selector", "child selector", "sibling selector"],
    ["@import", "@use", "@forward", "@require"],
    ["@extend", "@mixin", "@include", "@function"]
  ],
  GraphQL: [
    ["query", "mutation", "subscription", "fragment"],
    ["mutation", "query", "subscription", "fragment"],
    ["type", "schema", "resolver", "directive"],
    ["Apollo Client", "Relay", "urql", "fetch"],
    ["subscription", "query", "mutation", "fragment"]
  ],
  JAMstack: [
    ["Netlify", "Vercel", "Heroku", "Firebase"],
    ["API", "CDN", "Serverless", "SPA"],
    ["build", "deploy", "preview", "test"],
    ["CDN", "API", "SPA", "SSR"],
    ["Netlify", "Vercel", "Heroku", "Firebase"]
  ],
  ESLint: [
    ["no-unused-vars", "no-console", "eqeqeq", "semi"],
    ["--fix", "--init", "--config", "--help"],
    ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "airbnb", "standard"],
    [".eslintignore", ".gitignore", ".prettierignore", ".npmignore"],
    ["eslint-plugin-react", "eslint-plugin-jsx-a11y", "eslint-plugin-import", "eslint-plugin-prettier"]
  ],
  Storybook: [
    ["storiesOf", "addDecorator", "addParameters", "configure"],
    ["@storybook/react", "@storybook/vue", "@storybook/angular", "@storybook/html"],
    ["addon-actions", "addon-links", "addon-knobs", "addon-notes"],
    ["build-storybook", "start-storybook", "test-storybook", "deploy-storybook"],
    ["docs", "controls", "actions", "viewport"]
  ],
  Authentication: [
    ["OAuth", "JWT", "Session", "Cookie"],
    ["JWT", "OAuth", "Session", "Cookie"],
    ["Private Route", "Public Route", "Protected Route", "Admin Route"],
    ["localStorage", "sessionStorage", "cookie", "memory"],
    ["logout", "login", "register", "refresh"]
  ],
  i18n: [
    ["i18next", "react-intl", "vue-i18n", "formatjs"],
    ["Intl.NumberFormat", "Number.toLocaleString", "parseFloat", "parseInt"],
    ["Intl.DateTimeFormat", "Date.toLocaleDateString", "moment.js", "date-fns"],
    ["changeLanguage", "setLocale", "switchLang", "setLanguage"],
    ["json", "yaml", "xml", "csv"]
  ],
  "Mobile Web": [
    ["touchstart", "touchend", "touchmove", "click"],
    ["<meta viewport>", "<meta charset>", "<meta description>", "<meta author>"],
    ["media query", "flexbox", "grid", "container query"],
    ["lazy load", "minify", "cache", "compress"],
    ["hide address bar", "show address bar", "fullscreen", "minimize"]
  ],
  "SVG & Canvas": [
    ["<circle>", "<rect>", "<ellipse>", "<line>"],
    ["animate", "transition", "transform", "keyframes"],
    ["fillText", "strokeText", "drawImage", "putImageData"],
    ["addEventListener", "onclick", "onmousedown", "onmouseup"],
    ["import", "require", "include", "add"]
  ],
  WebSockets: [
    ["send", "emit", "broadcast", "receive"],
    ["onmessage", "onopen", "onclose", "onerror"],
    ["WebSocket", "Socket.io", "SignalR", "Pusher"],
    ["disconnect", "reconnect", "close", "open"],
    ["broadcast", "emit", "send", "receive"]
  ],
  SEO: [
    ["<meta>", "<title>", "<link>", "<script>"],
    ["robots.txt", "sitemap.xml", "manifest.json", "favicon.ico"],
    ["robots.txt", "sitemap.xml", "manifest.json", "favicon.ico"],
    ["<h1>", "<h2>", "<h3>", "<h4>"],
    ["minify", "cache", "compress", "lazy load"]
  ],
  "Micro Frontends": [
    ["Module Federation", "Single SPA", "import-map", "iframe"],
    ["Shell App", "Host App", "Remote App", "Micro App"],
    ["split codebase", "merge codebase", "refactor", "rewrite"],
    ["independent deploy", "monolithic deploy", "shared deploy", "none"],
    ["postMessage", "custom event", "callback", "observer"]
  ],
  WebAssembly: [
    ["Rust", "C++", "Go", "AssemblyScript"],
    ["wasm-bindgen", "emscripten", "as-bind", "binaryen"],
    ["WebAssembly.instantiate", "WebAssembly.compile", "WebAssembly.validate", "WebAssembly.Module"],
    ["importObject", "exportObject", "memory", "table"],
    ["memory", "table", "instance", "module"]
  ],
  "Performance Auditing": [
    ["Lighthouse", "WebPageTest", "PageSpeed Insights", "GTmetrix"],
    ["FCP", "LCP", "CLS", "TTI"],
    ["performance.mark", "performance.measure", "console.time", "console.timeEnd"],
    ["TTI", "FCP", "LCP", "CLS"],
    ["CLS", "LCP", "FID", "TTFB"]
  ],
  "Form Validation": [
    ["yup", "formik", "react-hook-form", "vee-validate"],
    ["error message", "helper text", "tooltip", "alert"],
    ["pattern", "minLength", "maxLength", "required"],
    ["required", "optional", "readonly", "disabled"],
    ["minLength", "maxLength", "pattern", "required"]
  ],
  CMS: [
    ["WordPress", "Strapi", "Contentful", "Sanity"],
    ["user", "admin", "editor", "viewer"],
    ["REST API", "GraphQL", "gRPC", "SOAP"],
    ["theme", "plugin", "template", "widget"],
    ["import", "export", "backup", "restore"]
  ],
  "Progressive Enhancement": [
    ["fallback", "polyfill", "shim", "default"],
    ["graceful degradation", "progressive enhancement", "responsive design", "mobile first"],
    ["progressive loading", "lazy loading", "eager loading", "suspense"],
    ["no-js", "js-only", "css-only", "html-only"],
    ["aria-label", "alt", "title", "placeholder"]
  ],
  "Animation Libraries": [
    ["GSAP", "Framer Motion", "Anime.js", "Lottie"],
    ["hover", "focus", "active", "visited"],
    ["scroll", "resize", "click", "hover"],
    ["Framer Motion", "GSAP", "Anime.js", "Lottie"],
    ["requestAnimationFrame", "setTimeout", "setInterval", "Promise"]
  ],
  "Package Managers": [
    ["npm", "yarn", "pnpm", "bower"],
    ["npm uninstall", "yarn remove", "pnpm remove", "bower uninstall"],
    ["npm run", "yarn run", "pnpm run", "bower run"],
    ["npm update", "yarn upgrade", "pnpm update", "bower update"],
    ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bower.json"]
  ],
  "Monorepo Tools": [
    ["Nx", "Turborepo", "Lerna", "Rush"],
    ["run-many", "affected", "dep-graph", "workspace"],
    ["build", "test", "lint", "deploy"],
    ["CI/CD", "GitHub Actions", "GitLab CI", "CircleCI"],
    ["shared dependency", "workspace", "package", "module"]
  ]
};

// Hàm xáo trộn mảng
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Hàm tạo câu hỏi cho 1 quiz nhỏ
function generateQuizQuestionsFlat(topic, templates, actionsArr, answersArr, quizIndex) {
  const questions = [];
  const questionsPerQuiz = 20;
  
  // Tạo 20 câu hỏi khác nhau cho mỗi đề
  for (let i = 0; i < questionsPerQuiz; i++) {
    // Xáo trộn các mảng mỗi lần tạo câu hỏi
    const shuffledTemplates = shuffleArray([...templates]);
    const shuffledActions = shuffleArray([...actionsArr]);
    const shuffledAnswers = shuffleArray([...answersArr]);
    
    // Lấy ngẫu nhiên một template, action và answer
    const template = shuffledTemplates[0];
    const action = shuffledActions[0];
    const answerSet = shuffledAnswers[0];
    
    // Tạo câu hỏi mới với các từ khóa ngẫu nhiên
    const question = template.replace("{action}", action);
    
    // Tạo bộ đáp án mới bằng cách xáo trộn
    const shuffledAnswerSet = shuffleArray([...answerSet]);
    
    questions.push({
      id: `${topic.id}-${quizIndex + 1}-${i + 1}`,
      topicId: topic.id,
      quizId: `${topic.id}-${quizIndex + 1}`,
      quizTitle: `Đề số ${quizIndex + 1}`,
      question: question,
      answers: shuffledAnswerSet,
      correctAnswer: answerSet[0] // Giữ nguyên đáp án đúng
    });
  }
  return questions;
}

// Hàm tạo tất cả câu hỏi phẳng cho tất cả topic
function generateAllQuestionsFlat() {
  let allQuestions = [];
  topics.forEach(topic => {
    const templates = questionTemplates[topic.name];
    const actionsArr = actions[topic.name];
    const answersArr = answers[topic.name];
    
    // Tạo 10 đề cho mỗi topic
    for (let quizIndex = 0; quizIndex < 10; quizIndex++) {
      // Xáo trộn các mảng cho mỗi đề
      const shuffledTemplates = shuffleArray([...templates]);
      const shuffledActions = shuffleArray([...actionsArr]);
      const shuffledAnswers = shuffleArray([...answersArr]);
      
      allQuestions = allQuestions.concat(
        generateQuizQuestionsFlat(
          topic, 
          shuffledTemplates, 
          shuffledActions, 
          shuffledAnswers, 
          quizIndex
        )
      );
    }
  });
  return allQuestions;
}

// Tạo dữ liệu và lưu vào file
const data = {
  topics,
  questions: generateAllQuestionsFlat()
};

// Lưu vào file db.json
writeFileSync('./db.json', JSON.stringify(data, null, 2));

console.log('Đã tạo xong dữ liệu cho quiz app!'); 