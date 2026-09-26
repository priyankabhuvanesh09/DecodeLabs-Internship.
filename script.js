

let editingStudentId = null;
const studentForm = document.getElementById("studentForm");
const studentsContainer = document.getElementById("studentsContainer");

// CREATE
studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: Number(document.getElementById("age").value)
    };

    try {

        const response = await fetch("/api/students", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Error adding student");
            return;
        }

        alert("Student added successfully!");

        studentForm.reset();

        loadStudents();

    } catch (error) {

        console.error(error);

        alert("Server error");
    }
});


// READ
async function loadStudents() {

    try {

        const response = await fetch("/api/students");

        const students = await response.json();

        studentsContainer.innerHTML = "";

        if (students.length === 0) {

            studentsContainer.innerHTML =
                "<p>No students found.</p>";

            return;
        }

        students.forEach(student => {

            const card = document.createElement("div");

            card.className = "student-card";

            card.innerHTML = `
                <h3>${student.name}</h3>

                <p>
                    <strong>Email:</strong>
                    ${student.email}
                </p>

                <p>
                    <strong>Course:</strong>
                    ${student.course}
                </p>

                <p>
                    <strong>Age:</strong>
                    ${student.age}
                </p>

                <button onclick="updateStudent('${student._id}')">
                    Update
                </button>

                <button onclick="deleteStudent('${student._id}')">
                    Delete
                </button>
            `;

            studentsContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        studentsContainer.innerHTML =
            "<p>Unable to load students.</p>";
    }
}


// UPDATE
function updateStudent(id) {

    editingStudentId = id;

    document.getElementById("editStudentForm").style.display = "block";

    window.scrollTo({
        top: document.getElementById("editStudentForm").offsetTop,
        behavior: "smooth"
    });
}
async function saveStudentUpdate() {

    const name = document.getElementById("editName").value;
    const course = document.getElementById("editCourse").value;

    if (!name || !course) {
        alert("Please enter name and course");
        return;
    }

    try {

        const response = await fetch(
            `/api/students/${editingStudentId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    course: course
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Update failed");
            return;
        }

        alert("Student updated successfully!");

        document.getElementById("editStudentForm").style.display = "none";

        document.getElementById("editName").value = "";
        document.getElementById("editCourse").value = "";

        editingStudentId = null;

        loadStudents();

    } catch (error) {

        console.error(error);

        alert("Server error");
    }
}


function cancelEdit() {

    document.getElementById("editStudentForm").style.display = "none";

    document.getElementById("editName").value = "";
    document.getElementById("editCourse").value = "";

    editingStudentId = null;
}


// DELETE
async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/students/${id}`, {

            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Delete failed");

            return;
        }

        alert("Student deleted successfully!");

        loadStudents();

    } catch (error) {

        console.error(error);

        alert("Server error");
    }
}


// Load students when page opens
loadStudents();