// POST
    // CV1: Create function getCourseAPI
    // CV2: Create function render UI
    // CV3: Create function handleCreateForm
        // 3.1 Bắt sự kiện click nhận nội dung trong ô input
        // 3.2 Tạo hàm createCourse thực hiện gửi phương thức post đi
// DELETE
    // CV1: Create button delete for course inside tag "li"
    // CV2: Add class containing ID course
    // CV3: Create function handleDeleteCourse and add onclick inside btn for handle

let courseAPI = "http://localhost:3000/course";

function renderCourses(courses) {
    let htmls = courses.map(function(course) {
        return `
            <li class="course-${course.id}">
                <h2 class="title-${course.id}">${course.name}</h2>
                <p class="des-${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Delete</button>
                <button onclick="handleUpdateCourse(${course.id})">Update</button>
            </li>
        `
    });
    let html = htmls.join("");
    document.querySelector("#list-courses").innerHTML = html;
}

function getCourseAPI(callback) {
    fetch(courseAPI) 
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    let btnCreate = document.querySelector("#create");

    btnCreate.onclick = function () {
        let name = document.querySelector("input[name='name']").value;
        let  description = document.querySelector("input[name='description']").value;

        let formCourse = {
            name: name,
            description: description
        }

        let options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formCourse)
        }
        fetch(courseAPI,options)
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                getCourseAPI(renderCourses);
            });
    }
}

function handleDeleteCourse(id) {
    let options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        // DELETE thì không cần body
    }
    fetch(courseAPI + "/" + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            // Xử lý xóa khỏi giao diên bằng DOM
            let courseItem = document.querySelector(".course-" + id);

            if(courseItem) courseItem.remove();
        });
}

function handleUpdateCourse(id) {
    document.querySelector("input[name='name']").value = document.querySelector(".title-" + id).textContent;
    document.querySelector("input[name='description']").value = document.querySelector(".des-" + id).textContent;

    let btnCreate = document.querySelector("#create");
    let btnClear = document.querySelector("#clear");
    let btnSave = document.createElement('button');

    btnCreate.style.display = 'none';
    btnClear.style.display = 'none';
    btnSave.textContent = 'Save';

    document.querySelector("#list-btn").appendChild(btnSave);

    btnSave.addEventListener('click',function() {
        let formCourse = {
            name : document.querySelector("input[name='name']").value,
            description: document.querySelector("input[name='description']").value
        }

        let options = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formCourse)
        }

        fetch(courseAPI + "/" + id, options) 
            .then(function(response) {
                return response.json();
            })
            .then(function(courses) {
                document.querySelector(".title-" + id).textContent = courses.name;
                document.querySelector(".des-" + id).textContent = courses.description;

                clearInput();
                
                btnCreate.style.display = 'inline-block';
                btnClear.style.display = 'inline-block';

                btnSave.remove();
            });
    })
}

function clearInput() {
    document.querySelector("input[name='name']").value = "";
    document.querySelector("input[name='description']").value = "";
}


// Hàm start

function start() {
    getCourseAPI(renderCourses);
    
    // Cách tường minh
    // getCourseAPI(function(courses) {
    //     renderCourses(courses);
    //  });
    handleCreateForm();
}

start();