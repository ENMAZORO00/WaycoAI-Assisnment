import React, { useState } from "react";
import "./App.css";

const suggestions = {
  tokyo: {
    title: "Nighttime Go-Karting in Shibuya",
    description:
      "Drive through Shibuya’s neon-lit streets in custom go-karts—thrilling nighttime adventure!",
    image: "/images/tokyoImage.jpeg",
  },
  kyoto: {
    title: "Traditional Tea Ceremony in Gion",
    description:
      "Immerse yourself in culture at a historic Gion teahouse for an authentic tea ceremony.",
    image: "/images/tokyoImage.jpeg",
  },
};

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to your Japan adventure planner! 🇯🇵 Let me suggest 2 activities for your trip:",
    },
    {
      sender: "bot",
      text: `• Tokyo: ${suggestions.tokyo.title}\n  ${suggestions.tokyo.description}`,
    },
    {
      sender: "bot",
      text: `• Kyoto: ${suggestions.kyoto.title}\n  ${suggestions.kyoto.description}`,
    },
  ]);
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState(null);

  const handleChoice = (city) => {
    const userMsg = {
      sender: "user",
      text: `I’d love the ${suggestions[city].title}!`,
    };
    const nextBot = {
      sender: "bot",
      text: "Great choice! 👍 Here are two more for your 4-day trip:",
    };
    const followUps = [
      {
        sender: "bot",
        text:
          city === "tokyo"
            ? "• Kyoto: Traditional Maiko performance & walking tour in Higashiyama."
            : "• Tokyo: Early morning Tsukiji Outer Market food tour.",
      },
      {
        sender: "bot",
        text: "Would you like to confirm these activities for your trip?",
      },
    ];

    setMessages((prev) => [...prev, userMsg, nextBot, ...followUps]);
    setChoice(city);
    setStep(2);
  };

  const handleConfirm = () => {
    const userMsg = { sender: "user", text: "Yes, please confirm!" };
    const botMsg = {
      sender: "bot",
      text: "Fantastic! Your activities are confirmed. Have an amazing trip! 🎉",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setStep(3);
  };

  return (
    <div className="container">
      {/* ───── Chat Pane ───── */}
      <div className="chat-pane">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}

        {step === 1 && (
          <div className="choices">
            <button onClick={() => handleChoice("tokyo")}>
              Pick Tokyo Activity
            </button>
            <button onClick={() => handleChoice("kyoto")}>
              Pick Kyoto Activity
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="choices">
            <button onClick={handleConfirm}>Confirm Activities</button>
          </div>
        )}
      </div>

      {/* ───── Visual Pane ───── */}
      <div className="visual-pane">
        {step === 1 &&
          Object.values(suggestions).map((s, idx) => (
            <div key={idx} className="card">
              <img src={s.image} alt={s.title} />
              <h4>{s.title}</h4>
              <p>{s.description}</p>
            </div>
          ))}

        {step === 2 && choice && (
          <>
            {/* User’s pick */}
            <div className="card">
              <img src={suggestions[choice].image} alt="chosen" />
              <h4>{suggestions[choice].title}</h4>
              <p>{suggestions[choice].description}</p>
            </div>
            {/* Follow-up */}
            <div className="card">
              <img
                src={
                  choice === "tokyo"
                    ? "/images/tokyoImage.jpeg"
                    : "/images/tokyoImage.jpeg"
                }
                alt="follow-up"
              />
              <h4>
                {choice === "tokyo"
                  ? "Maiko Performance & Higashiyama Tour"
                  : "Tsukiji Outer Market Food Tour"}
              </h4>
              <p>
                {choice === "tokyo"
                  ? "Watch Maiko dancers and stroll historic Higashiyama."
                  : "Sample fresh sushi, tamago, and more at Tsukiji."}
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="confirmation">
            <h3>✅ Your itinerary:</h3>
            <ul>
              <li>{suggestions[choice].title}</li>
              <li>
                {choice === "tokyo"
                  ? "Maiko Performance & Higashiyama Tour"
                  : "Tsukiji Outer Market Food Tour"}
              </li>
            </ul>
            <p>Enjoy your adventure in Japan! ✈️🍵🏎️</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
