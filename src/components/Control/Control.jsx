import { useState, useEffect, useRef  } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import styles from "./Controls.module.css";

export function Controls({ isDisable = false, onSend }) {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null); //auto focus 

  useEffect(() => {
    if (!isDisable) {
      textareaRef.current.focus();
    }
  }, [isDisable]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textareaRef}
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          disabled={isDisable}
          minRows={4}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button 
        className={styles.Button} 
        disabled={isDisable}
        onClick={handleContentSend}
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}