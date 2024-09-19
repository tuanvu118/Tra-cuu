var btnOpen = document.querySelector('.open');
var modal = document.querySelector('.modal');
var iconClose = document.querySelector('.modal_header i');
var btnClose = document.querySelector('.modal_footer button');

// Hàm gọi API và xử lý dữ liệu
async function getStudentData(studentCode) {
    try {
        const response = await fetch(`https://lcdkhoacntt1-ptit.tech/api/ctv-2024/result/${studentCode}`);
        const data = await response.json();
        
        // Nếu sinh viên trúng tuyển (result: approved)
        if (data.status === 200 && data.data.result === 'approved') {
            // Tách dữ liệu thời gian và ngày từ "interviewTime"
            const interviewTime = data.data.interviewTime.split(' '); // Tách bởi dấu cách
            const time = interviewTime[0]; // Lấy thời gian (07:30)
            const date = interviewTime[1]; // Lấy ngày (22/09/2024)

            let headerText = document.querySelector('.modal_header p');
            headerText.textContent = 'Chúc mừng bạn đã vượt qua vòng CV !';
            headerText.classList.add('success-message'); // Thêm class CSS

            document.querySelector('.modal_body').innerHTML = `
                <div class="student-info">
                    <div class="left-info">
                        <p><strong>Mã Sinh Viên:</strong> ${data.data.studentCode}</p>
                        <p><strong>Tên:</strong> ${data.data.fullname}</p>
                        <p><strong>Ngành học:</strong> ${data.data.major}</p>
                        <p><strong>Lớp:</strong> ${data.data.className}</p>
                    </div>
                    <div class="right-info">
                        <p><strong>Ngày phỏng vấn:</strong> ${date}</p>
                        <p><strong>Thời gian phỏng vấn:</strong> ${time}</p>
                    </div>
                </div>
            `;
        } 
        // Nếu sinh viên không trúng tuyển (status: 404)
        else if (data.status === 404) {
            document.querySelector('.modal_header p').textContent = 'Thông Báo';
            document.querySelector('.modal_body').innerHTML = `
                <p>Sinh viên không vượt qua vòng CV !</p>
            `;
        }
        toggleModal(); // Hiển thị modal
    } catch (error) {
        console.error('Error fetching student data:', error);
        alert('Có lỗi xảy ra khi lấy dữ liệu sinh viên!');
    }
}

function toggleModal() {
    modal.classList.toggle('hide');
}

// Lắng nghe sự kiện click
btnOpen.addEventListener('click', function () {
    var studentCode = document.querySelector('input').value.trim();
    if (studentCode) {
        getStudentData(studentCode);
    } else {
        alert('Vui lòng nhập mã sinh viên!');
    }
});

btnClose.addEventListener('click', toggleModal);
iconClose.addEventListener('click', toggleModal);
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        toggleModal();
    }
});
