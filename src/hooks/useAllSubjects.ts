import { AllSubjectsContext } from "./AllSubjectsProvider";
import { useContext } from "react";

const useAllSubjects = ()=> {
  return useContext(AllSubjectsContext);
};

export default useAllSubjects;
