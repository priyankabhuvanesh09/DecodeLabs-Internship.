```javascript
function enrollCourse(courseName) {

    let enrolledCourses = document.getElementById("enrolledCourses");

    // Check if the course is already enrolled
    if (enrolledCourses.innerHTML.includes(courseName)) {
        alert(courseName + " is already enrolled!");
        return;
    }

    // Create the course card
    let course = document.createElement("div");

    course.className = "my-course-card";

    course.innerHTML = `
        <h3>${courseName}</h3>

        <p>Progress: 0%</p>

        <progress value="0" max="100"></progress>

        <button type="button" onclick="continueCourse('${courseName}')">
            Continue Learning
        </button>
    `;

    // Add course to My Courses
    enrolledCourses.appendChild(course);

    alert(courseName + " enrolled successfully!");
}


function continueCourse(courseName) {

    alert("You are continuing " + courseName + "!");
}


function editProfile() {

    alert("Profile editing feature will be available soon!");
}


function logout() {

    alert("You have been logged out successfully!");
}


function login(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("Please enter your email and password.");

    } else {

        alert("Login successful!");

        window.location.href = "index.html";
    }
}
```
