// components/SparkleStar.tsx
export default function SparkleStar({ className = "", fill = "#FFC0CB" }) {
    return (
      <svg
        className={`w-8 h-8 ${className}`}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M100 0 C115 45, 155 85, 200 100 C155 115, 115 155, 100 200 
             C85 155, 45 115, 0 100 C45 85, 85 45, 100 0Z"
          fill={fill}
        />
      </svg>
    );
  }
  