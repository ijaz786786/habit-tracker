import React, { useState } from "react";
import "./App.css";

// Sign In Component
function SignIn({ onLogin, toggleAuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email); // Simulating login
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Sign In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={toggleAuthMode} className="auth-switch-btn">Sign Up</button>
      </p>
    </div>
  );
}

// Sign Up Component
function SignUp({ onSignUp, toggleAuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        onSignUp(email); // Simulating sign-up
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={toggleAuthMode} className="auth-switch-btn">Sign In</button>
      </p>
    </div>
  );
}

// Habit Tracker Component
function HabitTracker({ userEmail }) {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState({});

  const predefinedHabits = [
    "Drink Water",
    "Exercise",
    "Read a Book",
    "Meditate",
    "Cook a Healthy Meal",
  ];

  const addHabit = () => {
    if (habit) {
      setHabits([...habits, { name: habit, category: "General", completed: false }]);
      setHabit("");
    } else {
      alert("Please enter a habit!");
    }
  };

  const toggleCompletion = (index) => {
    setHabits((prev) => {
      const newHabits = [...prev];
      newHabits[index].completed = !newHabits[index].completed;
      return newHabits;
    });
  };

  const filteredHabits = habits.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="habit-container">
      <h2>Welcome, {userEmail}</h2>
      <div className="habit-search">
        <input
          type="text"
          placeholder="Search Habit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="habit-input">
        <input
          type="text"
          placeholder="Enter Habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <button onClick={addHabit} className="btn-primary">Add Habit</button>
      </div>

      <div className="predefined-habits">
        <h3>Predefined Habits</h3>
        <ul>
          {predefinedHabits.map((habit, index) => (
            <li
              key={index}
              onClick={() => {
                setHabits((prev) => [...prev, { name: habit, category: "General", completed: false }]);
              }}
            >
              {habit}
            </li>
          ))}
        </ul>
      </div>

      <h3>Your Habits</h3>
      <ul>
        {filteredHabits.map((habit, index) => (
          <li
            key={index}
            className={habit.completed ? "completed" : ""}
            onClick={() => toggleCompletion(index)}
          >
            {habit.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showSignIn, setShowSignIn] = useState(true); // Toggle between Sign In and Sign Up

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleSignUp = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
  };

  const toggleAuthMode = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        showSignIn ? (
          <SignIn onLogin={handleLogin} toggleAuthMode={toggleAuthMode} />
        ) : (
          <SignUp onSignUp={handleSignUp} toggleAuthMode={toggleAuthMode} />
        )
      ) : (
        <div>
          <HabitTracker userEmail={userEmail} />
          <button onClick={handleLogout} className="btn-primary">Log Out</button>
        </div>
      )}
    </div>
  );
}

export default App;