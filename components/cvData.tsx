import { TypeAnimation } from "react-type-animation";

export interface IWorkExperience {
  position: string;
  company: string;
  from_to: string;
  description: string;
}

export interface IEducation {
  degree: string;
  institution: string;
  from_to: string;
}

export interface ICVData {
  name: string;
  email: string;
  work_experiences: IWorkExperience[];
  education: IEducation[];
}

export const CVData = ({ name }: ICVData) => {
  return (
    <>
      <TypeAnimation
        sequence={[`Welcome ${name}`, 3000, "Here is your CV Data!", 3000]}
        wrapper="span"
        speed={60}
        style={{ display: "inline-block" }}
        repeat={Infinity}
        className="text-center mt-28 text-5xl"
        cursor={false}
      />
    </>
  );
};
