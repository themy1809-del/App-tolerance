/* FS_DATA — sinh tự động từ FabStation_QC_DayDu.pptx (79 slide) */
window.FS_DATA = {
 "SECTIONS": [
  {
   "id": "A",
   "head": "PHẦN A — LÀM 1 LẦN / ONE-TIME",
   "title": "Cài đặt thiết bị",
   "en": "Device Setup — Tablet & HoloLens",
   "desc": "Cài app, đăng ký thiết bị (MAC), đồng bộ & chỉnh cài đặt. Làm 1 lần cho mỗi máy trước khi vào quy trình QC.",
   "steps": [
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Cài app FabStation",
     "en": "Install FabStation App",
     "code": "A.1",
     "sub": "Tải & cài ứng dụng",
     "kbcap": "Badge tải app trên store",
     "body": [
      "Mở Play Store (Android) hoặc App Store (iPad).",
      "Tìm 'FabStation Steel', tải về và cài đặt."
     ],
     "path": "",
     "notes": [
      "Không cài được = thiết bị không tương thích → liên hệ support@eterio.ca."
     ],
     "warns": [],
     "kb": 1,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Mở app & cấp quyền",
     "en": "Launch & allow Camera",
     "code": "A.2",
     "sub": "Khởi chạy & cấp quyền camera",
     "kbcap": "Pop-up xin quyền camera",
     "body": [
      "Cài xong, mở (launch) app.",
      "Chấp nhận mọi pop-up xin quyền Camera — bắt buộc để app hoạt động."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 2,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Lấy địa chỉ MAC",
     "en": "Get the (virtual) MAC",
     "code": "A.3",
     "sub": "Ghi lại MAC ảo",
     "kbcap": "Màn Settings hiển thị MAC address",
     "body": [
      "Mở app → vào Settings.",
      "Ghi lại địa chỉ MAC (ảo) của thiết bị, GỒM cả dấu hai chấm ':'."
     ],
     "path": "",
     "notes": [
      "Tab Live có ô username trống là bình thường — sẽ tự điền sau khi đăng ký & đồng bộ."
     ],
     "warns": [],
     "kb": 3,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Đăng ký trên Web Portal",
     "en": "Register on Web Portal",
     "code": "A.4",
     "sub": "Khai báo thiết bị mới",
     "kbcap": "Form New Hardware (tablet)",
     "body": [
      "Đăng nhập steel.fabstation.ca bằng tài khoản được cấp.",
      "Vào 'New Hardware' → điền thông tin và dán địa chỉ MAC của tablet."
     ],
     "path": "Web Portal › New Hardware",
     "notes": [],
     "warns": [],
     "kb": 4,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Đồng bộ & đăng nhập",
     "en": "Sync Device & Login",
     "code": "A.5",
     "sub": "Sync rồi đăng nhập",
     "kbcap": "Nút Sync Device trong app",
     "body": [
      "App → Settings → bấm 'Sync Device'.",
      "Về màn login (mũi tên < góc trên trái) → Username tự điền → nhập mật khẩu → LOGIN.",
      "Tải dữ liệu xong về lại màn login → bấm LOGIN lần nữa → ra Home screen."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 5,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · TABLET",
     "vi": "Chỉnh cài đặt máy",
     "en": "Adjust tablet settings",
     "code": "A.6",
     "sub": "Khóa màn hình & tự cập nhật",
     "kbcap": "Cài đặt Auto-Lock",
     "body": [
      "Screen Lock ≥ 15 phút — iPad: Display & Brightness → Auto-Lock; Android: Security → Lock after timeout.",
      "Bật Automatic Updates — iPad: App Store → Updates; Android: Play Store → Auto-update apps."
     ],
     "path": "",
     "notes": [
      "Tránh để máy khóa/ngủ giữa lúc đang dùng FabStation."
     ],
     "warns": [],
     "kb": 6,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Chuẩn bị HoloLens",
     "en": "HoloLens prerequisites",
     "code": "A.7",
     "sub": "Thiết lập gốc & cập nhật",
     "kbcap": "Cập nhật HoloLens",
     "body": [
      "Lần đầu: hoàn tất native setup bên trong HoloLens.",
      "Cập nhật HoloLens lên bản mới: Settings → Update & Security → Check for Updates.",
      "Quá trình update có thể mất vài giờ — cắm sạc & chờ."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 7,
     "kburl": ""
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Cài app cho HoloLens",
     "en": "Install app (Microsoft Store)",
     "code": "A.8",
     "sub": "Tải app trên HoloLens",
     "kbcap": "Màn hình chính app HoloLens",
     "body": [
      "Mở Microsoft Store trên HoloLens, tìm 'FabStation'.",
      "Tải về, cài đặt và mở (launch) app."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 8,
     "kburl": "https://www.jotform.com/uploads/guest_86fc5fee7f48d333/form_files/google-play-badge.63ab2321ab8233.42129846.png"
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Cấp quyền mic & camera",
     "en": "Allow Microphone & Camera",
     "code": "A.9",
     "sub": "Chấp nhận quyền",
     "kbcap": "Pop-up quyền camera HoloLens",
     "body": [
      "Chấp nhận mọi pop-up xin quyền Microphone và Camera — bắt buộc để app hoạt động."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 9,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/acceptcammeraaccess.62f9925f66ade2.57481466.png"
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Đăng ký MAC HoloLens",
     "en": "Register HoloLens MAC",
     "code": "A.10",
     "sub": "Khai báo thiết bị HoloLens",
     "kbcap": "Form New Hardware (HoloLens)",
     "body": [
      "Mở app → màn Connection Status hiện MAC (ảo) ở phía trên. Ghi lại.",
      "Web steel.fabstation.ca → New Hardware → chọn loại HoloLens → dán MAC."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "MAC HoloLens KHÁC MAC tablet — đừng nhầm, mỗi thiết bị đăng ký riêng."
     ],
     "kb": 10,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/MAC-address.63af4418f2ac49.77512592.png"
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Kết nối qua Tablet",
     "en": "Login Tablet & pick assembly",
     "code": "A.11",
     "sub": "Đăng nhập tablet, chọn assembly",
     "kbcap": "Màn View screen / Auto-Fab",
     "body": [
      "Đăng nhập app trên Tablet trước.",
      "Chọn Demo Project → assembly B1039 (giữ chế độ VIEW mặc định).",
      "Chọn B1039.1 → OK → bấm Auto-Fab."
     ],
     "path": "",
     "notes": [
      "Kết nối Tablet–HoloLens qua dịch vụ đám mây Photon — KHÔNG cần Bluetooth."
     ],
     "warns": [],
     "kb": 11,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/set-up-tablet.63af443502a877.96679053.png"
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Mở app trên HoloLens",
     "en": "Open app on HoloLens",
     "code": "A.12",
     "sub": "Tự kết nối & quét QR",
     "kbcap": "Danh sách thiết bị HoloLens (Auto-Fab)",
     "body": [
      "Mở FabStation trên HoloLens — kính tự kết nối với Tablet.",
      "Khi mọi vòng tròn có dấu tick xanh → quét QR trong welcome package để bắt đầu overlay AR."
     ],
     "path": "",
     "notes": [
      "Không thấy tên HoloLens trong danh sách Auto-Fab? Resync lại app Tablet và kiểm tra đã đăng ký đúng loại HoloLens."
     ],
     "warns": [],
     "kb": 12,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/sync-image.63af4445eb9f47.34649726.PNG"
    },
    {
     "kicker": "PHẦN A · HOLOLENS",
     "vi": "Chỉnh cài đặt HoloLens",
     "en": "Adjust HoloLens settings",
     "code": "A.13",
     "sub": "Nguồn, đăng nhập, hologram",
     "kbcap": "Cài Power & Sleep HoloLens",
     "body": [
      "Power & Sleep: ≤ 20' khi dùng pin, ≥ 1 giờ khi cắm sạc (Settings → System → Power and Sleep).",
      "Sign-in: đặt Never để nhiều người dùng dễ hơn (Settings → Accounts → Sign-in options).",
      "Bật 'Automatically Remove all Holograms' (Settings → System → Holograms)."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 13,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/Auto-lock_iOS.62f9a523a990c4.33997747.jpg"
    }
   ]
  },
  {
   "id": "1",
   "head": "BƯỚC 1 / 7",
   "title": "Import dữ liệu vào FabStation",
   "en": "Upload project ZIP — Web Portal",
   "desc": "Tạo project và upload file .zip để app hiển thị được assembly. Làm trên máy tính (web portal).",
   "steps": [
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Đăng nhập Web Portal",
     "en": "Log in to the Web Portal",
     "code": "1.1",
     "sub": "Đăng nhập cổng web",
     "kbcap": "Trang đăng nhập Web Portal",
     "body": [
      "Mở trình duyệt, vào steel.fabstation.ca.",
      "Đăng nhập bằng CÙNG tài khoản (username/password) như app trên tablet."
     ],
     "path": "steel.fabstation.ca",
     "notes": [
      "Chưa có tài khoản? Liên hệ admin hoặc support@fabstation.com."
     ],
     "warns": [],
     "kb": 14,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/HL%20update_768.62fb1cb2527132.04714218.gif"
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Mở danh sách Project",
     "en": "Open Projects list",
     "code": "1.2",
     "sub": "Vào Projects › All Projects",
     "kbcap": "Menu Projects › All Projects",
     "body": [
      "Trên menu trái của web portal, bấm Projects.",
      "Chọn All Projects để xem toàn bộ project."
     ],
     "path": "Projects › All Projects",
     "notes": [],
     "warns": [],
     "kb": 15,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Tạo Project mới",
     "en": "Add Project",
     "code": "1.3",
     "sub": "Bấm nút Add Project",
     "kbcap": "Vị trí nút Add Project",
     "body": [
      "Bấm Add Project ở góc trên bên trái màn hình.",
      "(Lần đầu upload cho project này thì mới cần tạo mới.)"
     ],
     "path": "Projects › All Projects › Add Project",
     "notes": [],
     "warns": [],
     "kb": 16,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Điền thông tin Project",
     "en": "Register the new project",
     "code": "1.4",
     "sub": "Khai báo project mới",
     "kbcap": "Form khai báo project (các trường)",
     "body": [
      "Job Title — BẮT BUỘC.",
      "Project Name — BẮT BUỘC.",
      "Project Description — mô tả (tuỳ chọn).",
      "Project Type: Steel hoặc Metal (nếu hiện) — bấm dấu ? để xem định dạng file hỗ trợ."
     ],
     "path": "",
     "notes": [
      "Steel: .kss .ifc .json .pdf · Metal: .sldprt .sldasm .ipt .iam .rvt .step .pdf. Sai type có thể sửa lại sau khi edit project."
     ],
     "warns": [],
     "kb": 17,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Sang trang Upload",
     "en": "Add Project & Upload Files",
     "code": "1.5",
     "sub": "Tạo & chuyển sang upload",
     "kbcap": "Nút Add Project & Upload Files",
     "body": [
      "Sau khi điền xong, 2 nút sáng lên: Add Project và Add Project & Upload Files.",
      "Bấm Add Project & Upload Files để sang trang Project Upload."
     ],
     "path": "Add Project & Upload Files",
     "notes": [],
     "warns": [],
     "kb": 18,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Chọn file ZIP",
     "en": "Upload Files",
     "code": "1.6",
     "sub": "Chọn / kéo-thả file .zip",
     "kbcap": "Ô Upload Files trên trang Project Upload",
     "body": [
      "Kéo-thả file ZIP của project vào ô Upload Files.",
      "Hoặc bấm Choose File để chọn thủ công từ máy."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 19,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Xác nhận tên Project",
     "en": "Confirm Project Name",
     "code": "1.7",
     "sub": "Gõ đúng tên project",
     "kbcap": "Trường Confirm Project Name",
     "body": [
      "Gõ tên project ĐÚNG y như hiển thị, để chắc chắn upload vào đúng project."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Gõ sai tên → hệ thống không nhận, thanh tiến trình sẽ không hiện."
     ],
     "kb": 20,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Package Name Details",
     "en": "Add Package Name Details",
     "code": "1.8",
     "sub": "Thông tin bản (revision)",
     "kbcap": "Trường Package Name Details (revision)",
     "body": [
      "Nhập revision number (số bản) và revision date (ngày bản).",
      "Thông tin này dùng để theo dõi lịch sử các bản đã upload."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Đây là trường BẮT BUỘC — không điền sẽ không upload được."
     ],
     "kb": 21,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Bắt đầu Upload",
     "en": "Upload Package",
     "code": "1.9",
     "sub": "Bấm Upload Package",
     "kbcap": "Thanh xử lý khi Upload Package",
     "body": [
      "Khi đủ các trường, nút Upload Package sáng lên — bấm để bắt đầu.",
      "Để Processing Filter = ON (theo dõi revision, xử lý mọi assembly mới)."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "ĐỪNG đóng tab cho đến khi thanh xử lý xong và TỰ chuyển sang trang xác nhận."
     ],
     "kb": 22,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-48-01.67adfefeeebb21.37164305.png"
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Theo dõi tiến trình",
     "en": "Monitor the upload",
     "code": "1.10",
     "sub": "Theo dõi gói upload",
     "kbcap": "Tab Monitor › Packages in Progress",
     "body": [
      "Bấm tab Monitor ở menu trái.",
      "Packages in Progress — theo dõi gói đang upload.",
      "Package History — xem trạng thái mọi gói đã upload."
     ],
     "path": "Monitor › Packages in Progress / Package History",
     "notes": [
      "Upload có thể mất vài giờ tuỳ kích thước. Hãy upload ngay khi nhận file, và chờ xử lý xong mới mở trên app."
     ],
     "warns": [],
     "kb": 23,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-55-07.67ae4b0c090114.64188011.png"
    },
    {
     "kicker": "BƯỚC 1 · IMPORT DỮ LIỆU (WEB PORTAL)",
     "vi": "Kiểm tra xử lý thành công",
     "en": "Verify in DRAWINGS",
     "code": "1.11",
     "sub": "Check mục Drawings",
     "kbcap": "Mục Drawings: ngày ở cột PDF & IFC",
     "body": [
      "Vào mục DRAWINGS trên web portal.",
      "Mỗi bản vẽ phải có NGÀY ở cả cột PDF và cột IFC → tức đã xử lý xong.",
      "Lúc này project đã sẵn sàng để làm việc trên app."
     ],
     "path": "Web Portal › Drawings",
     "notes": [],
     "warns": [],
     "kb": 24,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-50-14.67ae47d6015582.98270262.png"
    }
   ]
  },
  {
   "id": "2",
   "head": "BƯỚC 2 / 7",
   "title": "Mở app & chọn Assembly",
   "en": "Open app, choose Inspect, select assembly",
   "desc": "QC dùng đường Inspect. Đăng nhập app → chọn project → tìm & chọn đúng sub-assembly.",
   "steps": [
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Đăng nhập app",
     "en": "Log in to FabStation App",
     "code": "2.1",
     "sub": "Mở & đăng nhập app",
     "kbcap": "Màn hình đăng nhập app",
     "body": [
      "Mở app FabStation trên tablet.",
      "Username tự hiện — chọn từ danh sách. Nhập mật khẩu được cấp.",
      "App tải dữ liệu (sync). Nếu không vào được, bấm LOGIN lại để làm mới."
     ],
     "path": "",
     "notes": [
      "App không tải? Kiểm tra Wi-Fi → Settings › Sync Device → đăng nhập lại."
     ],
     "warns": [],
     "kb": 25,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-50-26.67ae2ff095b527.59575813.png"
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Chọn đường làm việc",
     "en": "Choose a Path",
     "code": "2.2",
     "sub": "Fabricate / Inspect / View",
     "kbcap": "Home screen: Fabricate / Inspect / View",
     "body": [
      "Trên Home screen chọn đường phù hợp.",
      "QC kiểm tra → chọn INSPECT.",
      "Fabricate = gia công · View = chỉ xem (không đổi trạng thái)."
     ],
     "path": "",
     "notes": [
      "Chọn Inspect thì sau này chỉ chọn được assembly đang ở trạng thái Fabricated."
     ],
     "warns": [],
     "kb": 26,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-53-09.67b5f3e4db23b9.26427715.png"
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Chọn Project",
     "en": "Select Project",
     "code": "2.3",
     "sub": "Chọn project",
     "kbcap": "Dropdown chọn project trên Home",
     "body": [
      "Bấm ô dropdown project trên màn Home.",
      "Chọn project đang làm → danh sách assembly hiện ở pane Assemblies."
     ],
     "path": "",
     "notes": [
      "Không thấy project? Kiểm tra project đã được tạo & active trên web portal (mục Managing Projects)."
     ],
     "warns": [],
     "kb": 27,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-53-09.67b5f3e4db23b9.26427715.png"
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Tìm Assembly",
     "en": "Search Assembly",
     "code": "2.4",
     "sub": "Tìm số assembly",
     "kbcap": "Ô Search lọc assembly khi gõ",
     "body": [
      "Bấm Search, dùng bàn phím trên màn hình gõ số assembly.",
      "Vừa gõ danh sách vừa tự lọc → tìm nhanh hơn.",
      "Có thể tìm theo Sequence."
     ],
     "path": "Home › Search",
     "notes": [],
     "warns": [],
     "kb": 28,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-02-13_08-53-09.67b5f3e4db23b9.26427715.png"
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Chọn Sub-assembly",
     "en": "Select Sub-assembly",
     "code": "2.5",
     "sub": "Chọn đúng bản (instance)",
     "kbcap": "Pop-up chọn sub-assembly",
     "body": [
      "Bấm số assembly → pop-up chọn sub-assembly hiện ra.",
      "Mỗi instance là 1 bản: vd ST2015 có 4 cái → ST2015.1, ST2015.2…",
      "Inspect: chọn bản có trạng thái Fabricated. Bấm bản đúng → OK."
     ],
     "path": "",
     "notes": [
      "Chọn bản 'Not Started' để bắt đầu, hoặc bản đang dở để làm tiếp. Chọn kỹ đúng version."
     ],
     "warns": [],
     "kb": 29,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Đổi trạng thái",
     "en": "Change Status",
     "code": "2.6",
     "sub": "Xác nhận Inspecting",
     "kbcap": "Pop-up đổi trạng thái YES / View",
     "body": [
      "Hệ thống hỏi đổi trạng thái: đường Inspect → 'Inspecting'.",
      "Bấm YES để đổi trạng thái, hoặc View để chỉ xem (không đổi)."
     ],
     "path": "",
     "notes": [
      "Nếu chọn đường View, sẽ KHÔNG hiện cửa sổ này và không đổi trạng thái."
     ],
     "warns": [],
     "kb": 30,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 2 · TRÊN TABLET APP",
     "vi": "Công cụ trong Assembly",
     "en": "Features inside the assembly",
     "code": "2.7",
     "sub": "5 công cụ cốt lõi",
     "kbcap": "Menu công cụ bên trong assembly",
     "body": [
      "AR — chiếu hologram để căn chỉnh & kiểm tra (Fab-Assist / QC-Assist).",
      "3D Viewer — xem model 3D, đo kích thước.",
      "Drawings — bản vẽ PDF của assembly/part.",
      "Assets — ảnh & mark-up. Reports — NCR / CR / Welding Checklist."
     ],
     "path": "",
     "notes": [
      "Task bắt buộc phải COMPLETED mới đóng (close) được stage sản xuất."
     ],
     "warns": [],
     "kb": 31,
     "kburl": ""
    }
   ]
  },
  {
   "id": "3",
   "head": "BƯỚC 3 / 7",
   "title": "3D Viewer & Select Part",
   "en": "Prepare alignment in the 3D Viewer",
   "desc": "Trước khi vào AR: kiểm tra model trong 3D Viewer và đặt đúng Main Part (màu xanh) để align.",
   "steps": [
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Mở 3D Viewer",
     "en": "Open the 3D Viewer",
     "code": "3.1",
     "sub": "Vào 3D Viewer",
     "kbcap": "3D Viewer: tổng quan các nút",
     "body": [
      "Từ Home chọn Fabricate/Inspect/View rồi mở 3D Viewer trong assembly.",
      "Hàng nút (trái→phải): Home · Controls · Hamburger (ẩn nút) · Visuals · Select Part · Tools · Info · Assembly/Group View."
     ],
     "path": "",
     "notes": [
      "Công cụ đo trong 3D Viewer chỉ để tham khảo — luôn đo 2 kích thước để đối chiếu."
     ],
     "warns": [],
     "kb": 32,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Xoay & di chuyển model",
     "en": "Controls",
     "code": "3.2",
     "sub": "Điều khiển hiển thị",
     "kbcap": "Bảng Controls trong 3D Viewer",
     "body": [
      "Rotate 180 — xoay ngang 180°. Rotate 90 — xoay dọc 90°.",
      "Rotation/Move — chuyển giữa xoay và kéo model bằng ngón tay.",
      "Reset — về vị trí mặc định. Zoom in/out bằng 2 ngón."
     ],
     "path": "3D Viewer › Controls",
     "notes": [],
     "warns": [],
     "kb": 33,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Ẩn/hiện chi tiết",
     "en": "Visuals",
     "code": "3.3",
     "sub": "Bật/tắt part",
     "kbcap": "Visuals: nút bật/tắt part",
     "body": [
      "Vòng tròn xám đậm = part đang hiện; xám nhạt = đang ẩn. Bấm để bật/tắt.",
      "OTHER_PARTS — chỉ để lại Main Part. m_PARTS — ẩn part phụ (bu lông…).",
      "Bấm kính lúp trong Visuals để Search tìm part cụ thể."
     ],
     "path": "3D Viewer › Visuals",
     "notes": [],
     "warns": [],
     "kb": 34,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Đặt Main Part",
     "en": "Select Part",
     "code": "3.4",
     "sub": "Chọn part chính để align",
     "kbcap": "Select Part — Main Part màu xanh",
     "body": [
      "Main Part là part dùng để align với assembly thật — luôn tô MÀU XANH.",
      "Mặc định là part lớn nhất. Bấm Select Part → xoay/di chuyển → chạm part muốn đặt làm Main."
     ],
     "path": "",
     "notes": [
      "Với dầm cong / hình lạ, dùng QR Marker Placement trong Part Selector để chỉnh vị trí marker thủ công."
     ],
     "warns": [],
     "kb": 35,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Đo kích thước",
     "en": "Measure tool",
     "code": "3.5",
     "sub": "Công cụ đo (tham khảo)",
     "kbcap": "Đo bằng 2 chấm đỏ trong 3D Viewer",
     "body": [
      "Tools › Measure: zoom vào, chạm 2 chấm đỏ giữa các part để đo khoảng cách.",
      "Đổi metric / imperial bằng nút Unit bên phải.",
      "Chỉ đo được khoảng cách giữa 2 chấm đỏ."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Kích thước lấy từ model thiết kế — CHỈ dùng tham khảo, không thay thước đo thật."
     ],
     "kb": 36,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2022/02/choose-assembly.jpg"
    },
    {
     "kicker": "BƯỚC 3 · 3D VIEWER",
     "vi": "Xem theo project",
     "en": "Assembly / Project view",
     "code": "3.6",
     "sub": "Chuyển góc nhìn",
     "kbcap": "Toggle Project view / Layers",
     "body": [
      "Mặc định là Assembly view (1 assembly).",
      "Bấm Project view (góc trên phải) để xem trong bối cảnh cả project.",
      "Các assembly khác mờ đi để phân biệt; bật Layers để tắt hiệu ứng mờ."
     ],
     "path": "3D Viewer › Project view / Layers",
     "notes": [],
     "warns": [],
     "kb": 37,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2022/02/Status-pop-up_768.jpg"
    }
   ]
  },
  {
   "id": "4",
   "head": "BƯỚC 4 / 7",
   "title": "Kiểm tra bằng AR (QC-Assist)",
   "en": "AR Inspection — QC-Assist",
   "desc": "Quét QR → đặt nam châm AF → map khu vực → align model 2–3 phút → soi lỗi bằng menu AR.",
   "steps": [
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Vào QC-Assist",
     "en": "Get started with QC-Assist",
     "code": "4.1",
     "sub": "Mở chế độ AR",
     "kbcap": "Màn hình bắt đầu QC-Assist / Scan QR",
     "body": [
      "Từ Home chọn Inspect → Select an assembly.",
      "Bấm QC-Assist (đường Inspect).",
      "Cửa sổ AR mở ra, hiện thông báo 'Scan QR Code'."
     ],
     "path": "Home › Inspect › (assembly) › QC-Assist",
     "notes": [],
     "warns": [],
     "kb": 38,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-11-10_18-36ggggfffggg-21.69128968949dc1.62647342.jpg"
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Đặt QR Target",
     "en": "Place the QR Target",
     "code": "4.2",
     "sub": "Đặt mã QR lên vật liệu",
     "kbcap": "Đặt QR theo crosshair & centerline",
     "body": [
      "Đặt QR Target tại điểm bắt đầu của vật liệu.",
      "Vẽ centerline (đường tim) trên vật liệu; đặt target ở mép, crosshair khớp đường tim.",
      "QR phải nằm NGANG. Assembly dựng đứng thì xoay model cho khớp."
     ],
     "path": "",
     "notes": [
      "QR phải sát mép vật liệu. Nếu model AR bị lệch góc, xoay nhẹ QR cho song song vật liệu."
     ],
     "warns": [],
     "kb": 39,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/3d-viewer-intro1.jpg"
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Quét QR",
     "en": "Scan QR to place 3D",
     "code": "4.3",
     "sub": "Quét mã đặt model",
     "kbcap": "QR target ở vị trí ngang",
     "body": [
      "Khi AR hiện 'Scan QR Code', hướng camera vào QR target.",
      "Model 3D sẽ được đặt lên vật liệu."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 40,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/3d-viewer1.jpg"
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Đặt nam châm AF",
     "en": "Place AF Magnets",
     "code": "4.4",
     "sub": "Đặt nam châm đặc trưng",
     "kbcap": "Nam châm AF đặt mỗi ~3 feet",
     "body": [
      "Đặt nam châm AF (Artificial Feature) dọc assembly, mỗi ~3 feet (3′-0).",
      "Đặt cùng lúc với QR (quét QR và map phải làm liên tục, không ngắt).",
      "Nam châm tạo 'đặc trưng' cho camera bám (xưởng thép ít đặc trưng tự nhiên)."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Sau khi map, KHÔNG di chuyển nam châm (đã thành điểm bám). Tránh người/vật di chuyển trong tầm camera khi map."
     ],
     "kb": 41,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/visuals3Dupdated.jpg"
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Map khu vực",
     "en": "Map the Area",
     "code": "4.5",
     "sub": "Quét bản đồ vùng làm việc",
     "kbcap": "Vùng làm việc 3 mặt khi map",
     "body": [
      "Sau khi đặt nam châm & quét QR, có prompt map area.",
      "Bấm nút mapping rồi đi dọc assembly để camera ghi đặc trưng.",
      "Phạm vi 30 feet x 6 feet. Chỉ map & làm trên 3 mặt (4 mặt sẽ kém chính xác)."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "ĐỪNG rời khỏi vùng QR target trước khi bấm nút Mapping. Muốn đi xa target thì phải map trước."
     ],
     "kb": 42,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/Select-Part.png"
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Map lại mặt khác",
     "en": "Remap the other side",
     "code": "4.6",
     "sub": "Xoá & map mặt còn lại",
     "kbcap": "Tools: Clear map / Remap",
     "body": [
      "Muốn làm mặt đối diện: Tools › Clear the map & Start Remapping.",
      "Cần tạm dừng/tiếp tục: bấm nút Start/Continue mapping bên trái."
     ],
     "path": "AR › Tools › Clear the map & Start Remapping",
     "notes": [],
     "warns": [],
     "kb": 43,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Align model — tổng quan",
     "en": "Align the Model",
     "code": "4.7",
     "sub": "Căn chỉnh model",
     "kbcap": "Sơ đồ trình tự align front/back",
     "body": [
      "Bắt đầu align từ đầu có QR, rồi đi quanh vật liệu để chỉnh.",
      "Thứ tự khuyên dùng: Side View (đầu QR) → Front End → Back End.",
      "Mất ~2–3 phút, kết quả khớp gần như hoàn hảo."
     ],
     "path": "",
     "notes": [
      "Tablet độ chính xác có giới hạn — chỉ dùng làm tham chiếu. Cần chính xác cao hãy dùng HoloLens 2."
     ],
     "warns": [],
     "kb": 44,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Menu chính AR",
     "en": "AR Main Menu",
     "code": "4.8",
     "sub": "Các nút menu AR",
     "kbcap": "AR Main Menu — tổng quan nút",
     "body": [
      "Controls — mở bảng điều khiển căn chỉnh model.",
      "Select Part — đổi part align với QR. Visuals — ẩn/hiện part, chỉnh opacity, outline.",
      "Tools — orientation, mapping, đo… Home — thoát/đổi thiết bị. Info — hiện tên các nút."
     ],
     "path": "",
     "notes": [
      "Bấm 1 nút khi submenu đang mở sẽ ẩn các nút khác để giữ vùng nhìn gọn."
     ],
     "warns": [],
     "kb": 45,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Controls — đầu sau",
     "en": "Controls: back end (left)",
     "code": "4.9",
     "sub": "Cần trái = đầu SAU",
     "kbcap": "Controls submenu — cần trái/phải",
     "body": [
      "Joystick trái chỉnh ĐẦU SAU của assembly (pivot tại target).",
      "Pitch up/down — nghiêng model lên/xuống.",
      "Yaw left/right — xoay hướng trái/phải khi đứng ở đầu xa."
     ],
     "path": "AR › Controls (left joystick)",
     "notes": [],
     "warns": [],
     "kb": 46,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Controls — đầu trước",
     "en": "Controls: front end (right)",
     "code": "4.10",
     "sub": "Cần phải = đầu TRƯỚC",
     "kbcap": "Controls submenu — joystick & slider",
     "body": [
      "Joystick phải: Up/Down nâng/hạ cao độ; Left/Right dịch trái/phải.",
      "Vertical Slider — Scale Up/Down (phóng/thu model).",
      "Horizontal Slider — Front/Back (đẩy model về phía / ra xa target).",
      "Center: Rotate 90 (quanh trục X) · Rotate 180 (quanh trục Z, đảo đầu-đuôi)."
     ],
     "path": "AR › Controls (right joystick & sliders)",
     "notes": [],
     "warns": [],
     "kb": 47,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Visuals — hiển thị",
     "en": "Visuals submenu",
     "code": "4.11",
     "sub": "Ẩn part & độ trong",
     "kbcap": "Visuals: parts list, opacity, outline",
     "body": [
      "Parts List (nền xám phải) — mặc định hiện hết; bấm để ẩn từng part.",
      "'Small Parts' — ẩn hết part nhỏ (nut, bolt, weld…).",
      "Opacity: 100 / 75 / 50 / 0. Outline — thêm viền cho model."
     ],
     "path": "",
     "notes": [
      "Ở opacity 0%, outline tự bật mặc định."
     ],
     "warns": [],
     "kb": 48,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Tools trong AR",
     "en": "Tools submenu",
     "code": "4.12",
     "sub": "Công cụ AR",
     "kbcap": "Tools submenu trong AR",
     "body": [
      "Recalibrate — xoá model, hiện lại pop-up quét QR mới.",
      "Fix Orientation — reset cứng, đưa model về đúng QR khi lệch hẳn.",
      "Measure — đo khoảng cách 2 điểm. Assembly info — xem tên part (và khối lượng nếu có)."
     ],
     "path": "AR › Tools",
     "notes": [],
     "warns": [],
     "kb": 49,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 4 · QC-ASSIST (AR)",
     "vi": "Đo trong QC-Assist",
     "en": "Measure in QC-Assist",
     "code": "4.13",
     "sub": "Đo bằng tablet",
     "kbcap": "Measure tool trong AR",
     "body": [
      "Tools › Measure → bấm 'Select the 1st Point' → chạm 1 chấm đỏ làm điểm đầu.",
      "Bấm 'Select the 2nd Point' → chạm chấm đỏ/vàng để chốt phép đo.",
      "Chấm vàng hiện sau điểm 1 = mép vật liệu so với điểm 1."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Kích thước lấy từ model thiết kế, đúng tỉ lệ nhưng CHỈ để tham khảo."
     ],
     "kb": 50,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/02/clear-the-map.jpg"
    }
   ]
  },
  {
   "id": "5",
   "head": "BƯỚC 5 / 7",
   "title": "Ghi nhận & tài liệu",
   "en": "Part Checklist · Assets · Reports",
   "desc": "Tick từng part Pass/Fail, chụp & mark-up ảnh trong Assets, điền NCR/CR — làm bằng chứng QC.",
   "steps": [
    {
     "kicker": "BƯỚC 5 · GHI NHẬN (TASK)",
     "vi": "Part Checklist",
     "en": "Part Checklist task",
     "code": "5.1",
     "sub": "Tick từng chi tiết",
     "kbcap": "Tick Part Checklist trong app",
     "body": [
      "Trong AR hoặc 3D Viewer, tick từng part theo 3 trạng thái:",
      "Passed (đạt) · Failed (lỗi) · Needs Attention (cần chú ý)."
     ],
     "path": "",
     "notes": [
      "Task bắt buộc phải hoàn tất mới đóng được stage. Đây là 1 trong các task: Part Checklist / Asset / Report."
     ],
     "warns": [],
     "kb": 51,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/pix-img-01.jpg"
    },
    {
     "kicker": "BƯỚC 5 · ASSETS",
     "vi": "Mở khu Assets",
     "en": "Access the Assets Area",
     "code": "5.2",
     "sub": "Vào tab QC › Assets",
     "kbcap": "Tab QC mở trang Assets",
     "body": [
      "Home → chọn project → chọn assembly.",
      "Bấm tab QC để vào trang Assets.",
      "Mỗi assembly có gallery ảnh riêng."
     ],
     "path": "Home › (project) › (assembly) › QC › Assets",
     "notes": [],
     "warns": [],
     "kb": 52,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/MicrosoftTeams-image-7.png"
    },
    {
     "kicker": "BƯỚC 5 · ASSETS",
     "vi": "Thêm ảnh",
     "en": "Add photos",
     "code": "5.3",
     "sub": "Chụp / chọn ảnh",
     "kbcap": "Nút New: Camera / Library",
     "body": [
      "Trong tab Assets bấm New để thêm ảnh.",
      "Chọn Camera (chụp mới) hoặc Library (ảnh có sẵn trong máy).",
      "Hoặc chụp ảnh kèm hologram khi đang ở Fab-Assist/Auto-Fab (icon camera góc trên phải)."
     ],
     "path": "",
     "notes": [
      "iPad: chụp xong được nhắc mark-up ngay. HoloLens: ảnh tự lưu vào QC › Assets."
     ],
     "warns": [],
     "kb": 53,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/MicrosoftTeams-image-1.png"
    },
    {
     "kicker": "BƯỚC 5 · ASSETS",
     "vi": "Đánh dấu ảnh (mark-up)",
     "en": "Mark up the asset",
     "code": "5.4",
     "sub": "5 công cụ đánh dấu",
     "kbcap": "Thanh 5 công cụ đánh dấu",
     "body": [
      "Marker — vẽ tự do (chọn màu, độ dày). Shapes — line/arrow/circle/square.",
      "Eraser — xoá. Text Box — thêm chữ (Done để lưu). Arrow — di chuyển hình/chữ đã có.",
      "Xong bấm Save để lưu, hoặc Cancel để bỏ."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 54,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/MicrosoftTeams-image-1.png"
    },
    {
     "kicker": "BƯỚC 5 · ASSETS",
     "vi": "Xem & sửa ảnh",
     "en": "View & edit assets",
     "code": "5.5",
     "sub": "Quản lý ảnh",
     "kbcap": "Nút Save as Copy / Save / Cancel",
     "body": [
      "Chạm 1 ảnh để: xem lại, Download, Delete, hoặc Add Markup (góc trên trái).",
      "Sửa xong: Save as a Copy (tạo bản mới) · Save (ghi đè) · Cancel.",
      "Trên web portal xem ảnh tại Projects › Data."
     ],
     "path": "",
     "notes": [
      "Mark-up cũ không xoá được, chỉ thêm mới."
     ],
     "warns": [],
     "kb": 55,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/MicrosoftTeams-image-6.png"
    },
    {
     "kicker": "BƯỚC 5 · REPORTS",
     "vi": "Tạo Report",
     "en": "Reports (NCR / CR)",
     "code": "5.6",
     "sub": "Lập biên bản kiểm tra",
     "kbcap": "Mục Reports trong assembly",
     "body": [
      "Trong assembly, mục Reports: tạo NCR, CR, Welding Checklist… ngay trong app.",
      "Đính kèm ảnh từ Assets để làm bằng chứng (conformance / non-conformance)."
     ],
     "path": "",
     "notes": [
      "Mẫu report do team tạo sẵn trên web (Create a Template for Your Reports) để QC điền trong app."
     ],
     "warns": [],
     "kb": 56,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2023/01/Tools-1.png"
    }
   ]
  },
  {
   "id": "6",
   "head": "BƯỚC 6 / 7",
   "title": "Error Logging",
   "en": "Log error count & estimated value",
   "desc": "Khai báo tiền tệ & preferences 1 lần, rồi log số lỗi + giá trị tại nút Home của AR.",
   "steps": [
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Cài tiền tệ",
     "en": "Set up Currency",
     "code": "6.1",
     "sub": "Đặt đơn vị tiền (1 lần)",
     "kbcap": "Trang Account đặt currency",
     "body": [
      "Web Portal › Account: kiểm tra currency; sai thì bấm Edit company để đổi.",
      "Chỉ role Admin mới vào được Account. Không thấy → nhờ admin.",
      "Cài này áp dụng TOÀN hệ thống (global)."
     ],
     "path": "Web Portal › Account › Edit company",
     "notes": [],
     "warns": [],
     "kb": 57,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Cài preferences app",
     "en": "Set App Preferences",
     "code": "6.2",
     "sub": "Bật error logging trên app",
     "kbcap": "Settings: tuỳ chọn error logging",
     "body": [
      "FabStation app › Settings: chọn chế độ hiện error logging.",
      "Bật/tắt Estimated Value (giá trị ước tính)."
     ],
     "path": "App › Settings",
     "notes": [
      "Cài này RIÊNG cho từng thiết bị (local) — phải set trên mỗi máy."
     ],
     "warns": [],
     "kb": 58,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Ghi lỗi tại nút Home",
     "en": "Log error at Home button",
     "code": "6.3",
     "sub": "Nhập số lỗi",
     "kbcap": "Pop-up nhập số lỗi (mặc định 0)",
     "body": [
      "Log được từ mọi chế độ AR (Fab-Assist, Auto QC…). Align + inspect như thường.",
      "Bấm nút Home → pop-up hiện (mặc định = 0).",
      "Không lỗi → Confirm (về Assembly Info). Có lỗi → nhập SỐ lỗi."
     ],
     "path": "AR › Home button",
     "notes": [],
     "warns": [],
     "kb": 59,
     "kburl": ""
    },
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Nhập giá trị lỗi",
     "en": "Estimated value",
     "code": "6.4",
     "sub": "Giá trị ước tính",
     "kbcap": "Màn nhập Estimated Value",
     "body": [
      "Nếu Estimated Value đang BẬT: màn kế tiếp cho nhập giá trị (tiền) của lỗi.",
      "Ghi nhận xong → xem được ở Assembly Info và báo cáo Productivity."
     ],
     "path": "",
     "notes": [],
     "warns": [],
     "kb": 60,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/Image-31.png"
    },
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Ghi đè lỗi",
     "en": "Overwrite errors",
     "code": "6.5",
     "sub": "Sửa lại số lỗi",
     "kbcap": "Thông báo ghi đè lỗi",
     "body": [
      "Bấm Home của AR cho assembly đã có lỗi → hiện thông báo ghi đè.",
      "Bấm Yes để ghi đè và nhập lại."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Ghi đè sẽ XOÁ dữ liệu cũ → muốn cộng thêm phải nhập TỔNG số lỗi & TỔNG tiền."
     ],
     "kb": 61,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/oVERWRITE-AN-ERROR.png"
    },
    {
     "kicker": "BƯỚC 6 · ERROR LOGGING",
     "vi": "Xem lỗi đã ghi",
     "en": "View logged errors",
     "code": "6.6",
     "sub": "Tra cứu lỗi",
     "kbcap": "Lỗi hiển thị trong Assembly Info",
     "body": [
      "2 nơi xem: Assembly Info (từng assembly) và Web Portal › Analytics › Productivity.",
      "Khi app sync, có màn thống kê cá nhân: số lỗi tháng này so với tháng trước."
     ],
     "path": "",
     "notes": [
      "Thống kê cá nhân dựa trên tài khoản người log lỗi — mỗi người dùng tài khoản riêng để xem đúng số của mình."
     ],
     "warns": [],
     "kb": 62,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/Assembly-infowert.png"
    }
   ]
  },
  {
   "id": "7",
   "head": "BƯỚC 7 / 7",
   "title": "Final & Xuất Report",
   "en": "Final approval & export reports",
   "desc": "Đóng hết NCR ở stage Final → Generate report ở Analytics → Audit project khi cần.",
   "steps": [
    {
     "kicker": "BƯỚC 7 · FINAL STAGE",
     "vi": "Quick Pass cuối",
     "en": "Final stage review",
     "code": "7.1",
     "sub": "Duyệt & đổi trạng thái nhanh",
     "kbcap": "Quick Pass: Pass / Attention / Fail",
     "body": [
      "Xem lại assembly & lịch sử các stage; mọi lỗi/NCR gắn cờ hiện ở đây để review.",
      "Trong Assembly View bấm Select Feature → chọn assembly → đổi nhanh:",
      "PASS (xanh) · ATTENTION (cam) · FAIL (đỏ)."
     ],
     "path": "",
     "notes": [
      "Mọi NCR phải được đóng (closed) trong stage Final."
     ],
     "warns": [],
     "kb": 63,
     "kburl": "https://www.jotform.com/uploads/randy.warnaar/form_files/2025-11-10_21-05-18.691299fd4bbf95.21141249.jpg"
    },
    {
     "kicker": "BƯỚC 7 · FINAL STAGE",
     "vi": "Final Complete → Shipping",
     "en": "Final Complete gate",
     "code": "7.2",
     "sub": "Chốt trước khi xuất xưởng",
     "kbcap": "Màn hình Final / Shipping",
     "body": [
      "Verify xong → đánh dấu Final Complete.",
      "Chỉ assembly Final-approved mới chuyển sang Shipping được.",
      "Shipping: nếu chưa Final-approved thì bị chặn, không cho ghi shipped."
     ],
     "path": "",
     "notes": [
      "Mục đích: không để assembly còn lỗi rời xưởng; tạo trách nhiệm rõ ràng & giảm rework ngoài công trường."
     ],
     "warns": [],
     "kb": 64,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/Account-currency.png"
    },
    {
     "kicker": "BƯỚC 7 · XUẤT REPORT",
     "vi": "Generate report",
     "en": "Analytics › Productivity",
     "code": "7.3",
     "sub": "Xuất báo cáo lỗi",
     "kbcap": "Báo cáo Productivity (Error/Funds)",
     "body": [
      "Web Portal › Analytics › Productivity.",
      "Dùng filter 'chỉ assembly có lỗi' + chọn project / khoảng thời gian / status.",
      "Bấm Generate a report → bảng tổng hiện Total Error Count và Funds Saved."
     ],
     "path": "Web Portal › Analytics › Productivity",
     "notes": [],
     "warns": [],
     "kb": 65,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/error-settings.png"
    },
    {
     "kicker": "BƯỚC 7 · XUẤT REPORT",
     "vi": "Audit a Project",
     "en": "Audit a Project",
     "code": "7.4",
     "sub": "Kiểm toán & chỉnh dữ liệu",
     "kbcap": "Form Audit (Fabricator/Date/Time)",
     "body": [
      "Xem tiến độ theo assembly; sửa thời gian fab/inspect; đổi người Fabricator/Inspector.",
      "Cập nhật 1 assembly: chọn user → nhập Date (YYYY-MM-DD) → Time logged → Save.",
      "Batch update: chỉ áp dụng cho assembly 'Not Started'."
     ],
     "path": "",
     "notes": [],
     "warns": [
      "Form audit GHI ĐÈ giá trị hiện tại — kiểm tra kỹ trước khi Save. (Time logged = 0 để reset về Not Started.)"
     ],
     "kb": 66,
     "kburl": "https://www.fabstation.com/wp-content/uploads/2025/03/Image-33.png"
    }
   ]
  }
 ],
 "CHEAT": [
  "Web: project đã upload xong? Check Drawings có ngày PDF + IFC. (1.10–1.11)",
  "App: Login → Inspect → chọn project → Search assembly → đúng sub-assembly. (2.1–2.6)",
  "3D Viewer: kiểm tra & đặt Main Part (màu xanh) trước khi align. (3.4)",
  "QC-Assist: QR → nam châm AF (3ft) → map (3 mặt, 30x6ft) → align 2–3'. (4.1–4.7)",
  "Soi lỗi bằng Controls/Visuals/Tools; đo tham khảo bằng Measure. (4.8–4.13)",
  "Part Checklist (Pass/Fail) · chụp & mark-up Assets · điền NCR/CR. (5.1–5.6)",
  "Bấm Home → log số lỗi (0 nếu không có) + giá trị → Confirm. (6.3–6.4)",
  "Final: đóng hết NCR → Final Complete → Shipping. (7.1–7.2)",
  "Web: Generate report (Analytics › Productivity) + Audit khi cần. (7.3–7.4)",
  "1 (866) 979-0453"
 ],
 "SUPPORT": {
  "email": "support@fabstation.com",
  "phone": "1 (866) 979-0453",
  "portal": "steel.fabstation.ca",
  "kb": "fabstation.com/kb"
 }
};
