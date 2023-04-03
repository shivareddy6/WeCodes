import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { LANGUAGES } from "../../constants";
import monacoThemes from "monaco-themes/themes/themelist";

const EditorNav = ({ language, setLanguage }) => {
//   console.log(monacoThemes);
  return (
    <div className="w-[200px] py-2">
      <Dropdown
        // className="w-[200px]"
        placeholder={language.label}
        options={LANGUAGES}
        value={language.value}
        key={language.id}
        handleChange={(e) => setLanguage(e)}
      />
    </div>
  );
};

export default EditorNav;
