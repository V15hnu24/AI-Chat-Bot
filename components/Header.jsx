import React from "react";
import midasLogo from "../public/logo.jpeg";
import Image from "next/image";
import { useSubject } from "./SubjectContext";

function Header() {
  const { selectedSubject, setSelectedSubject } = useSubject();

  const handleSubjectChange = (e) => {
    console.log(e.target.value);
    setSelectedSubject(e.target.value);
  };

  return (
    <header className="bg-gray-400 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <Image
          src={midasLogo}
          alt="Logo"
          width="100"
          height="880"
          className="d-inline-block align-text-top"
        />

        {/* Company name on the right */}
        <div className="font-serif text-black text-lg font-semibold">
          AI-Chat BOT
        </div>

        {/* Subject and dropdown of options of Math, Physics and Chemistry*/}
        <div>
          <div className="font-serif text-black text-lg font-semibold">
            Subject:
            {/* Add margin-left 2px */}
            <select
              className="font-serif text-black text-lg font-semibold bg-gray-200 rounded"
              style={{ marginLeft: "5px" }}
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
