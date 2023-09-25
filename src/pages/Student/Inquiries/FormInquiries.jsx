import React from 'react'

export default function FormInquiries() {
  return (
    <form>
      <div className="space-y-12">

          <div className="mt-10 space-y-10">
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              VẤN ĐỀ SINH VIÊN CẦN HỖ TRỢ
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>HỦY MÔN- ĐĂNG KÝ MÔN- XIN BẢNG ĐIỂM-GCN (SV LIÊN HỆ TRỰC TIẾP PDT ĐỂ ĐIỀN ĐƠN)</option>
                  <option>CẬP NHẬT ĐIỂM SỐ</option>
                  <option>CHUYỂN ĐIỂM (Nếu SV cần chuyển điểm cần nộp đơn xin chuyển điểm + bảng điểm trường cũ photo công chứng tại phòng đạo tạo để được giải quyết)</option>
                  <option>CẬP NHẬT ĐIỂM SỐ</option>
                  <option>ĐĂNG KÝ HỌC LẠI-THI LẠI</option>
                  <option>CÁC VẤN ĐỀ LIÊN QUAN HỌC PHÍ (trừ cập nhật HP Đã đóng).  SV chỉ được rút Học phí/ lệ phí dư  khi hoàn tất chương trình học và nhận bằng tốt nghiệp.</option>
                  <option>VẤN ĐỀ KHÁC</option> 
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              SINH VIÊN TRÌNH BÀY CHI TIẾT
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">          

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              <p>Trường hợp sinh viên muốn cập nhật học phí đã đóng, Sv gửi hình chụp biên lai đóng tiền</p>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          HỦY
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          LƯU
        </button>
      </div>
    </form>
  
  )
}