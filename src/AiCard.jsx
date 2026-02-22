import React, { useState } from 'react';
import './AiCard.css';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; 

const AiCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = async () => {
    if (!inputValue.trim()) return;

    const originalInput = inputValue;
    setIsLoading(true);
    setInputValue("Thinking... ✦");

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "stepfun/step-3.5-flash:free",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI assistant inside a small chat UI. Keep your response extremely concise (under 20 words) and friendly."
              },
              {
                role: "user",
                content: originalInput
              }
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponse = data.choices[0].message.content;
      setInputValue(aiResponse);

    } catch (error) {
      console.error("Error fetching AI:", error);
      setInputValue(`Error: ${error.message}`); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleResponse();
    }
  };

  return (
    <div className="container-ai-input">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="area"></div>
      ))}

      <label className="container-wrap">
        <input type="checkbox" />
        <div className="card">
          <div className="background-blur-balls">
            <div className="balls">
              <span className="ball rosa"></span>
              <span className="ball violet"></span>
              <span className="ball green"></span>
              <span className="ball cyan"></span>
            </div>
          </div>
          <div className="content-card">
            <div className="background-blur-card">
              <div className="eyes">
                <span className="eye"></span>
                <span className="eye"></span>
              </div>
              <div className="eyes happy">
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  ></path>
                </svg>
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="container-ai-chat">
            <div className="chat">
              <div className="chat-bot">
                <textarea
                  placeholder="Ask me anything...✦˚"
                  name="chat_bot"
                  id="chat_bot"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                ></textarea>
              </div>
              <div className="options">
                <div className="btns-add">
                   <button>
                    <svg viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none"></path>
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6"></path>
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667"></path>
                    </svg>
                  </button>
                </div>
                <button className="btn-submit" onClick={handleResponse} disabled={isLoading}>
                  <i>
                    <svg viewBox="0 0 512 512">
                      <path d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" fill="currentColor"></path>
                    </svg>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default AiCard;