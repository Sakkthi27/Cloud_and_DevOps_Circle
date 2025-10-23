// Replace this with your API Gateway invoke URL (ending with /student or /data)
const apiUrl = "https://jrkrqs3xwl.execute-api.us-east-1.amazonaws.com/prod/";

// Save student data
async function saveStudent() {
  const studentid = document.getElementById("studentid").value.trim();
  const name = document.getElementById("name").value.trim();
  const studentClass = document.getElementById("class").value.trim();
  const age = document.getElementById("age").value.trim();

  if (!studentid || !name || !studentClass || !age) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentid,
        name,
        class: studentClass,
        age: parseInt(age),
      }),
    });

    if (!response.ok) throw new Error("Failed to save student");

    alert("✅ Student saved successfully!");
    document.getElementById("studentid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("class").value = "";
    document.getElementById("age").value = "";
  } catch (error) {
    console.error(error);
    alert("❌ Error saving data. Check console for details.");
  }
}

// Read all students
async function readStudents() {
    try {
        const res = await fetch(apiUrl, { method: "GET" });
        const result = await res.json(); // Parse outer JSON
        const data = JSON.parse(result.body); // Parse inner 'body' JSON string

        const tbody = document.querySelector("#studentTable tbody");
        tbody.innerHTML = "";

        data.forEach((s) => {
            const row = `<tr>
                <td>${s.studentid}</td>
                <td>${s.name}</td>
                <td>${s.class}</td>
                <td>${s.age}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

    } catch (err) {
        console.error("Error fetching students:", err);
        alert("❌ Error fetching data. Check console.");
    }
}
