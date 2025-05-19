import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
