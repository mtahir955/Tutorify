Here’s a `README.md` file tailored for your **Tutorify.live** project. It includes setup instructions, tech stack, features, and contribution guidance. You can customize the author details and deployment sections as needed.

---

```markdown
# 🎓 Tutorify.live

Tutorify.live is a web-based platform that connects students with qualified tutors across a wide range of subjects and education levels. Students can filter, search, and book tutors, while tutors can showcase their expertise and manage their profiles.

Live Demo: [https://tutorify.live](https://tutorify.live)

---

## 📌 Features

- 🔍 Search tutors by subject, education level, or keyword
- 🎯 Filter by price range, rating, and student count
- 🧑‍🏫 Detailed tutor profiles with expertise, experience, and rating
- 📅 "Book This Tutor" and "Request Now" modal for students
- 👨‍💻 Backend built with PHP & MySQL using PDO
- 🧠 Modern, responsive frontend using React.js and Tailwind CSS
- 📚 Dynamic subject filter and multi-criteria sorting

---

## ⚙️ Tech Stack

### Frontend
- React.js (JavaScript / JSX)
- Tailwind CSS
- Axios
- Lucide React Icons
- ShadCN UI components

### Backend
- PHP (with PDO for DB interactions)
- MySQL (or MariaDB)
- Session-based student authentication

---

## 📂 Project Structure

```

tutorify-live/
├── src/
│   ├── components/
│   │   ├── RequestModal.jsx
│   │   └── ui/  # Select, Input, Button components
│   └── pages/
│       └── TutorSearch.jsx
├── api/
│   ├── gettutors.php
│   └── request\_tutor.php
├── public/
│   └── placeholder.svg
├── index.html
└── README.md

````

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js & npm
- PHP 7.4+ with PDO extension
- MySQL
- Localhost or hosting environment (e.g., XAMPP / LAMP)

### 🔧 Setup Frontend

```bash
git clone https://github.com/mtahir955/Tutorify.git
cd tutorify-live
npm install
npm run dev
````

### ⚙️ Setup Backend

1. Place the `/api` folder in your PHP server root (`htdocs` if using XAMPP).
2. Create a MySQL database and import your schema (e.g., `tutors`, `users`, `requests`).
3. Update your DB credentials in `connect.php`.

```php
// dbconfig.php
$host = "localhost";
$dbname = "tutorify";
$username = "root";
$password = "";
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
```

---

## 📮 API Endpoints

* `GET /api/gettutors.php` – Fetch all tutor profiles
* `POST /api/send_request.php` – Send a request to a tutor (uses PHP session for student ID)

---

## 👨‍🎓 Student & Tutor Roles

* **Student**: Searches for tutors, requests sessions, uses session-based auth
* **Tutor**: Displays qualifications, subject expertise, and handles student requests

---

## 🧪 Sample Data (Optional)

You can add dummy data directly into the `tutors` table with fields like:

* `id`, `name`, `education`, `subjects (JSON array)`, `expertise`, `image`, `rating`, `price`, `studentsCount`

---

## 📢 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request ✅

---

## 📧 Contact

For support or feedback, please contact \[[support@tutorify.live](mailto:support@tutorify.live)] or open an issue on GitHub.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

```

---

Would you like a version that includes screenshots or badges (e.g., build passing, license, etc.)?
```
