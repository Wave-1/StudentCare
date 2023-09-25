import React from 'react'

export default function FormCertificates() {
  return (
    <form>
      <div className="space-y-12">

          <div className="mt-10 space-y-10">
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              GIẤY CHỨNG NHẬN NÀY CẤP CHO ĐƯƠNG SỰ ĐỂ LÀM GÌ?
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Tạm hoãn nghĩa vụ quân sự</option>
                  <option>Bổ sung hồ sơ</option>
                </select>
              </div>
            </div>
        </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            <h2>TÔI XIN CAM KẾT: </h2>
            <p>- Các thông tin trên là hoàn toàn chính xác.</p>
            <p>- Tôi đã đăng ký các môn của học kỳ này và đóng đủ học phí (học phí của HK hiện tại và học phí nợ các HK trước (nếu có)) trước khi điền link đăng ký giấy xác nhận sinh viên. </p>
            <p>- Tôi hiểu nếu còn nợ học phí thì sẽ không được cấp giấy xác nhận sinh viên, tôi phải đóng đủ học phí và điền lại link hoặc liên hệ trực tiếp phòng đào tạo để cập nhật tình hình học phí. </p>
            <p>- Tôi hiểu thời gian để được cấp xác nhận sinh viên, kể từ khi tôi điền link và hoàn tất đầy đủ học phí là 4-7 ngày. Những trường hợp ngoại lệ, tôi cần liên hệ trực tiếp Phòng công tác học sinh sinh viên (gặp Cô Huyền Thanh) để tư vấn. </p>
            <p>- Tôi đã đọc và đồng ý với các quy định của phòng công tác HSSV, tôi không có thắc mắc gì khi điền link đăng ký này. </p>
          </p>
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
      </div>

      
    </form>
  
  )
}