import React from "react";
import axios from "axios";

function SectionThree() {
  const checkToken = async () => {
    const response = await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/auth/check-token`,
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjZDFiYmM3ZDcxMmMyOTlkMTBjMCIsImlhdCI6MTY4MTExNjQ0MywiZXhwIjoxNjgzNzA4NDQzfQ.ANxDMgBiJheJUfziW4Y9fQyzGibKJDStJRt7e9TARM4",
      }
    );
    console.log(response);
  };
  return (
    <div className="h-72">
      <div className="flex justify-center">
        <button
          className="bg-green-400 px-4 py-2 rounded text-white"
          onClick={() => checkToken()}
        >
          Post Token
        </button>
      </div>
    </div>
  );
}

export default SectionThree;
